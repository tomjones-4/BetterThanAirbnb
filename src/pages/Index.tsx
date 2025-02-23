import { SearchBar } from "@/components/SearchBar";
import { Messages } from "@/components/Messages";

const Index = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <SearchBar />
      <div className="mt-8">
        <Messages />
      </div>
    </div>
  );
};

export default Index;
