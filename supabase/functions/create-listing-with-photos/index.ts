import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";

console.log("Create Listing with Photos function booting up...");

serve(async (req) => {
  // Handle CORS preflight request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // 1. Initialize Supabase Client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // 2. Get User
    const {
      data: { user },
      error: userError,
    } = await supabaseClient.auth.getUser();
    if (userError || !user) {
      console.error("User auth error:", userError);
      return new Response(JSON.stringify({ error: "User not authenticated" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = user.id;
    console.log("Authenticated user:", userId);

    // 3. Parse FormData
    const formData = await req.formData();
    const address = formData.get("address") as string;
    const price = parseInt(formData.get("price") as string);
    const fromDate = formData.get("fromDate") as string;
    const toDate = formData.get("toDate") as string;
    const amenities = JSON.parse(formData.get("amenities") as string); // Assuming amenities are sent as a JSON string array
    const photos = formData.getAll("photos") as File[];

    console.log("Received form data:", {
      address,
      price,
      fromDate,
      toDate,
      amenities,
      photoCount: photos.length,
    });

    // Basic validation (can be expanded)
    if (!address || !price || !fromDate || !toDate || !amenities) {
      return new Response(
        JSON.stringify({ error: "Missing required listing fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // 4. Insert Listing (without photos initially)
    const { data: listingData, error: insertError } = await supabaseClient
      .from("listings")
      .insert({
        address,
        price,
        from_date: fromDate,
        to_date: toDate,
        amenities,
        user_id: userId, // Assuming you have a user_id column
        // photo_urls will be updated later
      })
      .select()
      .single(); // Use single() if you expect exactly one row back

    if (insertError || !listingData) {
      console.error("Listing insert error:", insertError);
      return new Response(
        JSON.stringify({
          error: "Failed to create listing record",
          details: insertError?.message,
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }
    const listingId = listingData.id;
    console.log("Listing created with ID:", listingId);

    // 5. Upload Photos
    const uploadedPhotoUrls: string[] = [];
    if (photos && photos.length > 0 && photos[0].size > 0) {
      // Check if photos exist and are not empty placeholders
      console.log(`Attempting to upload ${photos.length} photos...`);
      for (const photo of photos) {
        const fileName = `${Date.now()}-${photo.name}`;
        const filePath = `user_images/${userId}/listings/${listingId}/${fileName}`;

        const { error: uploadError } = await supabaseClient.storage
          .from("listing_images") // Assuming your bucket is named 'listing_images'
          .upload(filePath, photo, {
            cacheControl: "3600",
            upsert: false, // Don't overwrite existing files (optional)
            contentType: photo.type,
          });

        if (uploadError) {
          console.error(`Photo upload error (${fileName}):`, uploadError);
          // Decide on error handling: continue, or stop and potentially rollback/notify?
          // For now, we'll log and continue, but the listing won't have this photo URL.
          // A more robust solution might try to delete the listing record here.
          continue; // Skip adding this URL if upload failed
        }

        // 6. Get Public URL
        const { data: urlData } = supabaseClient.storage
          .from("listing_images")
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          console.log(`Photo uploaded (${fileName}), URL:`, urlData.publicUrl);
          uploadedPhotoUrls.push(urlData.publicUrl);
        } else {
          console.warn(
            `Could not get public URL for uploaded file: ${filePath}`
          );
        }
      }
      console.log("Finished uploading photos.");

      // 7. Update Listing with Photo URLs (only if photos were uploaded)
      if (uploadedPhotoUrls.length > 0) {
        const { error: updateError } = await supabaseClient
          .from("listings")
          .update({ photo_urls: uploadedPhotoUrls })
          .eq("id", listingId);

        if (updateError) {
          console.error("Listing update error (photo URLs):", updateError);
          // Log error, but the listing exists, just without photo URLs linked
          // Return success but maybe with a warning? Or return error? Let's return error for now.
          return new Response(
            JSON.stringify({
              error: "Listing created, but failed to link photos",
              details: updateError?.message,
            }),
            {
              status: 500, // Or maybe a 207 Multi-Status?
              headers: { ...corsHeaders, "Content-Type": "application/json" },
            }
          );
        }
        console.log("Listing updated with photo URLs:", listingId);
      }
    } else {
      console.log("No photos provided or photos array is empty.");
    }

    // 8. Return Success
    return new Response(
      JSON.stringify({
        success: true,
        listingId: listingId,
        photoUrls: uploadedPhotoUrls,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Unhandled function error:", error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
