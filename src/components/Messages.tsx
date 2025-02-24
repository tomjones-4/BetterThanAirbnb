
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types";
import { X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface MessagesProps {
  hostId: string;
  propertyId: string;
}

export const Messages = ({ hostId, propertyId }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const currentUserId = "82c0b714-5e71-4b34-b2c3-916d69262916"; // Hardcoded for demo

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('fake_messages')
        .select(`
          id,
          content,
          created_at,
          read,
          sender:sender_id(id, name, avatar_url),
          receiver:receiver_id(id, name, avatar_url)
        `)
        .or(`sender_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`)
        .order('created_at', { ascending: true });

      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }

      const formattedMessages = data.map((msg: any) => ({
        id: msg.id,
        senderId: msg.sender.id,
        receiverId: msg.receiver.id,
        content: msg.content,
        timestamp: msg.created_at,
        read: msg.read,
      }));

      setMessages(formattedMessages);
    };

    fetchMessages();
  }, [currentUserId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    const { data, error } = await supabase
      .from('fake_messages')
      .insert([
        {
          sender_id: currentUserId,
          receiver_id: hostId,
          content: newMessage,
          read: false,
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message",
        variant: "destructive",
      });
      return;
    }

    const newMsg: Message = {
      id: data.id,
      senderId: currentUserId,
      receiverId: hostId,
      content: newMessage,
      timestamp: data.created_at,
      read: false,
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
    toast({
      title: "Success",
      description: "Message sent successfully",
    });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Message Host</h2>
        <p className="text-sm text-muted-foreground">
          Discuss your stay before booking
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${
                    isCurrentUser
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-75 mt-1">
                    {new Date(message.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 resize-none"
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
};

