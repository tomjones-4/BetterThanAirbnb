import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { faker } from "https://cdn.skypack.dev/@faker-js/faker";
import "https://deno.land/std@0.177.0/dotenv/load.ts";

const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_ANON_KEY");

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase credentials");
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function insertFakeUsers(count = 5) {
  try {
    const users = [];
    for (let i = 0; i < count; i++) {
      users.push({
        email: faker.internet.email(),
        name: faker.person.fullName(),
      });
    }

    const { data, error } = await supabase.from("users").insert(users);

    if (error) {
      console.error("Error inserting users:", error);
    } else {
      console.log("Users inserted successfully:", data);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

insertFakeUsers();

// Should be able to run this script with:
// deno run --allow-net --allow-env supabase/testing/insert-users.js
