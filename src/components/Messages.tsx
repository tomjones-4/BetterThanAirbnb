import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MessagesProps {
  onClose?: () => void;
}

export const Messages = ({ onClose }: MessagesProps) => {
  const [messages, setMessages] = useState([
    { id: 1, sender: "John", text: "Hello!", unread: true },
    { id: 2, sender: "Jane", text: "How are you?", unread: false },
  ]);

  const markAsRead = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id ? { ...message, unread: false } : message
      )
    );
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Messages</h2>
        {onClose && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex-1 overflow-y-auto">
        <ul>
          {messages.map((message) => (
            <li
              key={message.id}
              className="py-2 border-b border-gray-200 last:border-none"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{message.sender}</p>
                  <p className="text-gray-500">{message.text}</p>
                </div>
                {message.unread && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => markAsRead(message.id)}
                  >
                    Mark as Read
                  </Button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
