import { Button } from "@/components/ui/button";
import { Bell, ChevronRight, Search } from "lucide-react";
import { useCallback, useState } from "react";
import { useAuthContext } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ArticleCard } from "@/components/ArticleCard";
import img1 from "@/assets/images/home-img-1.jpg";
import img2 from "@/assets/images/home-img-2.jpg";
import img3 from "@/assets/images/home-img-3.jpg";
import img4 from "@/assets/images/home-img-4.jpg";
import SearchOverlay from "@/components/SearchOverlay";

const categories = [
  "All",
  "Gym Centers",
  "Amenities",
  "Trainers",
  "Locations",
  "Gym Map",
];

const articles = [
  {
    id: "article-1",
    text: "Find gym location nearest to you. Each center is equipped with state of the art facilities.",
    linkTo: "/gyms",
    icon: "🏋️",
    img: img1,
  },
  {
    id: "article-2",
    text: "Enjoy world-class facilities designed to enhance your fitness journey and provide ultimate comfort.",
    linkTo: "facilities",
    icon: "⭐",
    img: img2,
  },
  {
    id: "article-3",
    text: "Join our diverse range of group fitness classes led by certified instructors for all fitness levels.",
    linkTo: "classes",
    icon: "💪",
    img: img3,
  },
  {
    id: "article-4",
    text: "Meet Our Expert Trainers.",
    linkTo: "trainers",
    icon: "👨‍🏫",
    img: img4,
  },
  {
    id: "article-5",
    text: "Track your progress with our advanced fitness monitoring and analytics dashboard.",
    linkTo: "analytics",
    icon: "📊",
    img: img2,
  },
];

const Home = () => {
  const { signOut, user: authUser } = useAuthContext();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleNavigate = useCallback(
    (linkTo: string) => {
      navigate(linkTo);
    },
    [navigate]
  );

  const handleSearchFocus = () => {
    setIsSearchActive(true);
  };

  const handleCloseSearch = () => {
    setIsSearchActive(false);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await signOut();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Signed out successfully!");
        navigate("/signin");
      }
    } catch (err: any) {
      toast.error(
        err.message || "An unexpected error occurred during sign out."
      );
    }
  };

  // Check if authUser is null and redirect to sign-in page
  // useEffect(() => {
  if (!authUser) {
    navigate("/signin");
  }
  // }, [authUser, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black  text-white">
      <div className="max-w-sm mx-auto lg:max-w-7xl lg:mx-auto">
        {isSearchActive ? (
          <SearchOverlay handleCloseSearch={handleCloseSearch} />
        ) : (
          <>
            {/* Header */}
            <header className="flex justify-between items-center p-4 lg:p-6 lg:pt-8">
              <div className="font-medium">
                <h1 className="text-lg lg:text-2xl font-bold">
                  Hi, {authUser?.user_metadata.name.split(" ")[0]}!
                </h1>
                <p className="text-gray-400 text-sm lg:text-base">
                  Let's start training
                </p>
              </div>
              <div className="flex items-center gap-3 lg:gap-4">
                <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-lg">
                  💪
                </div>
                <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                {authUser && (
                  <Button
                    onClick={handleSignOut}
                    className="ml-4 bg-red-600 hover:bg-red-700 text-white"
                  >
                    Sign Out
                  </Button>
                )}
              </div>
            </header>

            {/* Desktop Layout */}
            <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:px-6">
              {/* Left Column - Search and Banner */}
              <div className="lg:col-span-2">
                {/* Search */}
                <div className="relative my-4 mx-4 lg:mx-0 lg:my-6">
                  <Search className="z-20 absolute top-1/2 left-4 transform -translate-y-1/2 text-white w-5 h-5" />
                  <input
                    type="text"
                    className="w-full h-12 lg:h-14 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl pl-12 text-base lg:text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                    placeholder="Search gyms, trainers, classes..."
                    onFocus={handleSearchFocus}
                  />
                </div>

                {/* Banner */}
                <div className="mx-4 lg:mx-0 mb-6 lg:mb-8 h-48 lg:h-64 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl relative overflow-hidden group cursor-pointer">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  <div className="relative h-full flex flex-col justify-center pl-6 lg:pl-8 pr-4">
                    <h2 className="font-bold text-xl lg:text-3xl leading-tight mb-4 lg:mb-6 max-w-xs lg:max-w-md">
                      Experience World-Class Fitness With Us.
                    </h2>
                    <Button className="flex itementer justify-center bg-white text-black hover:bg-gray-100  hover:shadow-lg self-start shadow-xl hover:scale-105 transition-transform">
                      Start Your Journey
                    </Button>
                  </div>
                  {/* Decorative elements */}
                  <div className="absolute -right-4 -top-4 w-24 h-24 lg:w-32 lg:h-32 bg-white/10 rounded-full"></div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 lg:w-40 lg:h-40 bg-white/5 rounded-full"></div>
                </div>
              </div>

              {/* Right Column - Categories (Desktop) */}
              <div className="hidden lg:block">
                <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
                <div className="space-y-3">
                  {categories.slice(1).map((category, i) => (
                    <div
                      key={i}
                      className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-all cursor-pointer group"
                    >
                      <span className="font-medium group-hover:text-orange-400 transition-colors">
                        {category}
                      </span>
                      <ChevronRight className="w-4 h-4 float-right mt-0.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Categories (Mobile) */}
            <div className="lg:hidden px-4">
              <div className="flex gap-3 overflow-x-auto pb-2 px-1 scrollbar-hide">
                {categories.map((category, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveCategory(i)}
                    className={`flex-shrink-0 px-4 py-2 rounded-full font-medium transition-color duration-300 whitespace-nowrap cursor-pointer ${
                      activeCategory === i
                        ? "bg-accent text-white shadow-lg scale-105"
                        : "bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 hover:bg-gray-700/50"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles/Cards */}

            <main className="p-4 lg:px-6">
              <div className="lg:grid lg:grid-cols-2 xl:grid-cols-3 gap-6 space-y-6 lg:space-y-0">
                {articles.map((article) => (
                  <ArticleCard
                    key={article.id}
                    article={article}
                    onNavigate={handleNavigate}
                  />
                ))}
              </div>
            </main>

            {/* Bottom spacing */}
            <div className="h-8 lg:h-12"></div>
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
