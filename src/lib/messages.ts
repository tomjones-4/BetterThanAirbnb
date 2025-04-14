import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "http://127.0.0.1:54323/project/default";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "your-anon-key";

const supabase = createClientComponentClient({
  supabaseUrl: supabaseUrl,
  supabaseKey: supabaseKey,
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

export async function createConversation(
  recipientId: string,
  initialMessage: string
) {
  try {
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer \${supabase.auth.session()?.access_token}`,
        },
        body: JSON.stringify({ recipientId, initialMessage }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw error;
  }
}

export async function fetchUsers() {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/fetch-users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
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

export async function getMessages(conversationId: string) {
  try {
    const response = await fetch(`${supabaseUrl}/functions/v1/get-messages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ conversationId }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching messages:", error);
    throw error;
  }
}
