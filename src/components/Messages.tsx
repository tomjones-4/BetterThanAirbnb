
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types";
import { ArrowRight, Clock, Check } from "lucide-react";
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

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  return (
    <div className="flex flex-col h-[600px] bg-white rounded-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Messages</h2>
        <p className="text-sm text-gray-500 mt-1">
          Response time: usually within an hour
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-6">
          {messages.map((message) => {
            const isCurrentUser = message.senderId === currentUserId;
            
            return (
              <div
                key={message.id}
                className={`flex gap-4 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0" />
                <div className={`flex flex-col max-w-[75%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`relative px-4 py-3 rounded-2xl ${
                      isCurrentUser
                        ? 'bg-primary text-white'
                        : 'bg-gray-50 text-gray-900'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-xs text-gray-500">
                      {formatMessageTime(message.timestamp)}
                    </span>
                    {isCurrentUser && (
                      <span className="text-xs text-gray-500">
                        {message.read ? (
                          <Check className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="relative">
          <Textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="pr-12 min-h-[100px] resize-none rounded-xl border-gray-300 focus:border-gray-400 focus:ring-0"
          />
          <Button
            onClick={handleSendMessage}
            className="absolute bottom-3 right-3 p-2 h-auto rounded-full"
            size="icon"
          >
            <ArrowRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
