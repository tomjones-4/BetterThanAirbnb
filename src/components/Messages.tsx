import React, { useState, useEffect } from "react";
import {
  getConversations,
  sendMessage,
  getMessages,
  fetchUsers,
  createConversation,
} from "@/lib/messages";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  name: string;
  email: string;
}

const Messages = () => {
  const [conversations, setConversations] = useState<any[]>([]);
  const [selectedConversationId, setSelectedConversationId] = useState<
    string | null
  >(null);
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const [initialMessage, setInitialMessage] = useState("");
  const { session } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      if (session?.user?.id) {
        try {
          await fetchConversations(session.user.id);
          const usersData = await fetchUsers();
          setUsers(usersData?.users || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [session]);

  const fetchUsersData = async () => {
    try {
      const data = await fetchUsers();
      setUsers(data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchConversations = async (userId: string) => {
    try {
      const data = await getConversations(userId);
      setConversations(data.conversations);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    try {
      const data = await getMessages(conversationId);
      setMessages(data.messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage && selectedConversationId) {
      try {
        await sendMessage(
          selectedConversationId,
          session?.user?.id,
          newMessage
        );
        setNewMessage("");
        // Fetch messages again to update the UI
        fetchMessages(selectedConversationId);
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r p-4">
        <h2 className="text-lg font-semibold mb-4">Conversations</h2>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Start New Conversation</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>New Conversation</DialogTitle>
              <DialogDescription>
                Select a user to start a conversation with.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Recipient
                </Label>
                <Select
                  onValueChange={setSelectedUser}
                  defaultValue={users[0]?.id}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select a recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="message" className="text-right">
                  Message
                </Label>
                <Textarea
                  id="message"
                  className="col-span-3"
                  value={initialMessage}
                  onChange={(e) => setInitialMessage(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Start Conversation</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <div className="space-y-2">
          {conversations.map((conversation) => (
            <Button
              key={conversation.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => {
                setSelectedConversationId(conversation.id);
                fetchMessages(conversation.id);
              }}
            >
              Conversation {conversation.id}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {selectedConversationId ? (
          <>
            <Card className="flex-1 overflow-hidden">
              <CardHeader>
                <h3 className="text-lg font-semibold">Chat</h3>
              </CardHeader>
              <CardContent className="p-4">
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <div className="space-y-2">
                    {messages.map((message) => (
                      <div key={message.id}>{message.content}</div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
            <div className="p-4">
              <Input
                type="text"
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="mr-2"
              />
              <Button onClick={handleSendMessage}>Send</Button>
            </div>
          </>
        ) : (
          <div className="p-4">Select a conversation to start chatting</div>
        )}
      </div>
    </div>
  );
};

export default Messages;
