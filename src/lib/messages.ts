import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "http://localhost:54321";

const supabase = createClientComponentClient({
  supabaseUrl: supabaseUrl,
});

export async function getConversations(userId: string) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-conversations`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching conversations:", error);
    throw error;
  }
}

export async function sendMessage(
  conversationId: string,
  senderId: string,
  content: string
) {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/send-message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId, senderId, content }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
}
