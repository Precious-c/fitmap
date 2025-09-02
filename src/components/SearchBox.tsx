import { Search } from "lucide-react";
interface SearchBoxProps {
  text?: string;
}
const SearchBox = ({ text }: SearchBoxProps) => {
  return (
    <div className="relative my-4 mx-4 lg:mx-0 lg:my-6">
      <Search className="z-20 absolute top-1/2 left-4 transform -translate-y-1/2 text-white w-5 h-5" />
      <input
        type="text"
        className="w-full h-12 lg:h-14 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl pl-12 text-base lg:text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all"
        placeholder={text}
      />
    </div>
  );
};

export default SearchBox;
