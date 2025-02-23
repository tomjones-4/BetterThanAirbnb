import { useState } from "react";
import { Search, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

export const SearchBar = () => {
  const [location, setLocation] = useState("");
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = (e: React.FormEvent) => {
    console.log('clicked handleSubmit')
    console.log(`query: ${query}`);
    e.preventDefault();
    if (query.trim()) {
        navigate(`/search?location=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="glass-card p-4 rounded-2xl flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Where do you want to go?"
            value={query}
            // onChange={(e) => setLocation(e.target.value)}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10 w-full"
          />
        </div>
        
        <div className="flex-1 relative">
          <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Check in - Check out"
            className="pl-10 w-full"
          />
        </div>
        
        <Button className="w-full md:w-auto" onClick={handleSubmit}>
          <Search className="mr-2" size={20} />
          Search
        </Button>
      </div>
    </div>
  );
};