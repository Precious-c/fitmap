import SearchBox from "@/components/SearchBox";

const Search = () => {
  return (
    <div className="h-screen max-w-lg  text-sm gap-3">
      <SearchBox text="Search gyms, yoga studios, trainers..." />

      <h1>Find Your Perfect Gym Center</h1>
      <div>
        <button className="text-black">List View </button>
        <button>Map View </button>
      </div>
    </div>
  );
};

export default Search;
