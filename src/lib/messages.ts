import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function getConversations(userId: string) {
  try {
    const token = await getAccessToken();
    const response = await fetch(
      `${supabaseUrl}/functions/v1/get-conversations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
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
    const token = await getAccessToken();
    const response = await fetch(
      `${supabaseUrl}/functions/v1/create-conversation`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    const token = await getAccessToken();
    const response = await fetch(`${supabaseUrl}/functions/v1/fetch-users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = await getAccessToken();
    const response = await fetch(`${supabaseUrl}/functions/v1/send-message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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
    const token = await getAccessToken();
    const response = await fetch(`${supabaseUrl}/functions/v1/get-messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
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

async function getSession() {
  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  return data.session;
}

async function getAccessToken() {
  const session = await getSession();
  return session?.access_token || null;
}
