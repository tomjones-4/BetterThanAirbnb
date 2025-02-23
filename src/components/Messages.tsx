
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Message } from "@/types";
import { mockMessages, mockUsers } from "@/data/mockData";

export const Messages = () => {
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const { toast } = useToast();
  const currentUserId = "u3"; // Normally this would come from auth

  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      toast({
        title: "Error",
        description: "Please enter a message",
        variant: "destructive",
      });
      return;
    }

    const message: Message = {
      id: `m${messages.length + 1}`,
      senderId: currentUserId,
      receiverId: "u1", // For demo, sending to first host
      content: newMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    setMessages([...messages, message]);
    setNewMessage("");
    toast({
      title: "Success",
      description: "Message sent successfully",
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-6">Messages</h2>
      
      <div className="space-y-4 mb-6">
        {messages.map((message) => {
          const sender = mockUsers.find(user => user.id === message.senderId);
          const isCurrentUser = message.senderId === currentUserId;
          
          return (
            <div
              key={message.id}
              className={`flex gap-2 ${isCurrentUser ? 'flex-row-reverse' : 'flex-row'}`}
            >
              <img
                src={sender?.avatar}
                alt={sender?.name}
                className="w-8 h-8 rounded-full"
              />
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  isCurrentUser
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p className="text-sm font-medium mb-1">{sender?.name}</p>
                <p>{message.content}</p>
                <p className="text-xs opacity-75 mt-1">
                  {new Date(message.timestamp).toLocaleString()}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-2">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1"
        />
        <Button onClick={handleSendMessage}>Send</Button>
      </div>
    </div>
  );
};
