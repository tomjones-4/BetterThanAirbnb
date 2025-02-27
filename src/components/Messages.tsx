
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, ImagePlus, Check, CheckCheck } from "lucide-react";
import { Input } from "@/components/ui/input";

interface Message {
  id: number;
  sender: string;
  text: string;
  unread: boolean;
  timestamp: string;
  image?: string;
  readAt?: string;
}

interface MessagesProps {
  onClose?: () => void;
}

export const Messages = ({ onClose }: MessagesProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John",
      text: "Hello!",
      unread: true,
      timestamp: "2024-02-24T10:00:00Z",
    },
    {
      id: 2,
      sender: "Jane",
      text: "How are you?",
      unread: false,
      timestamp: "2024-02-24T10:01:00Z",
      readAt: "2024-02-24T10:02:00Z",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const markAsRead = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((message) =>
        message.id === id
          ? { ...message, unread: false, readAt: new Date().toISOString() }
          : message
      )
    );
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || selectedImage) {
      const newMsg: Message = {
        id: messages.length + 1,
        sender: "You",
        text: newMessage,
        unread: true,
        timestamp: new Date().toISOString(),
      };

      if (selectedImage) {
        newMsg.image = URL.createObjectURL(selectedImage);
      }

      setMessages([...messages, newMsg]);
      setNewMessage("");
      setSelectedImage(null);
    }
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
        <ul className="space-y-4">
          {messages.map((message) => (
            <li
              key={message.id}
              className="py-2 px-3 rounded-lg bg-gray-50 last:border-none"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="font-semibold">{message.sender}</p>
                  <p className="text-gray-600">{message.text}</p>
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Message attachment"
                      className="mt-2 max-w-[200px] rounded-lg"
                    />
                  )}
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </span>
                    {message.readAt ? (
                      <CheckCheck className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Check className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
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
      <div className="mt-4 space-y-2">
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <div className="flex items-center gap-2">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
            id="image-upload"
          />
          <Button
            variant="outline"
            size="icon"
            onClick={() => document.getElementById("image-upload")?.click()}
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
          <Button
            className="flex-1"
            onClick={handleSendMessage}
            disabled={!newMessage.trim() && !selectedImage}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
