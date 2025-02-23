import SearchResults from "@/components/SearchResults";
import { mockProperties } from "@/data/mockData";

const Search = () => {
  return (
    <div>
        <h1>Search Page</h1>
        <SearchResults properties={mockProperties} />
    </div>
  );
};
export default Search;