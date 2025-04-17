import { createClient } from "@supabase/supabase-js";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertConversations() {
  try {
    const conversations = [
      {
        user_id_1: "user_id_1", // Replace with actual user ID
        user_id_2: "user_id_2", // Replace with actual user ID
      },
      {
        user_id_1: "user_id_3", // Replace with actual user ID
        user_id_2: "user_id_4", // Replace with actual user ID
      },
    ];

    const { data, error } = await supabase
      .from("conversations")
      .insert(conversations);

    if (error) {
      console.error("Error inserting conversations:", error);
    } else {
      console.log("Conversations inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

insertConversations();

// Should be able to run this script with:
// deno run --allow-net --allow-env supabase/testing/insert-conversations.js
