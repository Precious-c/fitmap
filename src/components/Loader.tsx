interface LoaderProps {
  bgColor?: string;
}
const Loader = ({ bgColor }: LoaderProps) => {
  return (
    <div
      className={`flex justify-center items-center min-h-screen ${
        bgColor ? `bg-[${bgColor}]` : "bg-gray-900"
      }`}
    >
      <div className="animate-spin rounded-full h-12 w-12 border-t-2  border-accent"></div>
    </div>
  );
};

export default Loader;
