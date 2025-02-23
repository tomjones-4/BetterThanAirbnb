
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { Messages } from "@/components/Messages";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

const Index = () => {
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  return (
    <div className="relative min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <SearchBar />
        {/* Your existing landing page content here */}
      </div>

      {/* Messages Sidebar */}
      <div
        className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isMessagesOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <Messages />
      </div>

      {/* Toggle Button */}
      <Button
        onClick={() => setIsMessagesOpen(!isMessagesOpen)}
        className="fixed bottom-6 right-6 rounded-full h-12 w-12 p-0 flex items-center justify-center shadow-lg"
        variant="default"
      >
        <MessageCircle className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Index;
