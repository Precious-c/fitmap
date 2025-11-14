import { Heart, MapPin, Search } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";
import gymImg from "@/assets/images/gym-2.jpg";
import { supabase } from "@/lib/supabase";
import ratingIcon from "@/assets/images/icons8-star-filled-24.png";

interface SearchOverlayProps {
  handleCloseSearch: () => void;
}

export interface GymProfile {
  id: string;
  gym_name: string;
  business_license?: string | null;

  location: {
    city: string;
    state: string;
    address: string;
    geo_lat: number;
    geo_lng: number;
  };

  address?: string | null;
  phone?: string | null;
  website?: string | null;
  description?: string | null;
  logo_url?: string | null;
  verified?: boolean | null;

  operating_hours?: Record<string, string> | null;

  amenities?: string[] | null;

  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    yearly: number;
  };

  opening_hours: {
    weekday: string;
    weekend: string;
  };

  rating?: number | null;
  email?: string | null;
}

const SearchOverlay = ({ handleCloseSearch }: SearchOverlayProps) => {
  const [gyms, setGyms] = useState<GymProfile[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<"list" | "map">("list");

  const handleToggleTab = () => {
    activeTab === "list" ? setActiveTab("map") : setActiveTab("list");
  };

  useEffect(() => {
    const fetchGyms = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("gym_profiles").select("*");
      if (!error && data) {
        setGyms(data);
      }
      setLoading(false);
    };
    fetchGyms();
  }, []);

  console.log(gyms[0]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-black z-50 flex flex-col p-4 lg:p-6 transition-all duration-1000 ease-in-out opacity-100 scale-100">
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-grow mr-4">
          <Search className="z-20 absolute top-1/2 left-4 transform -translate-y-1/2 text-white w-5 h-5" />
          <input
            type="text"
            className="w-full h-12 lg:h-14 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-2xl pl-12 text-base lg:text-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            placeholder="Search gyms, trainers, classes..."
            autoFocus // Focus the input when the overlay appears
          />
        </div>
        <Button
          onClick={handleCloseSearch}
          variant="ghost"
          className="text-white hover:bg-gray-700"
        >
          Cancel
        </Button>
      </div>
      {/* Search Results will go here */}
      {loading ? (
        <p>Loading</p>
      ) : (
        <div className="flex-grow flex flex-col items-center gap-4  text-gray-400 text-lg overflow-y-auto ">
          <h4>Find Your Perfect Gym Center</h4>

          <div className="w-full flex flex-col justify-center items-center gap-6">
            <div className="flex justify-between w-full">
              <Button
                onClick={handleToggleTab}
                className={`${
                  activeTab === "list"
                    ? "bg-white hover:bg-white/95"
                    : "bg-white-inactive hover:bg-white-inactive/95 "
                } text-black cursor-pointer `}
              >
                List View
              </Button>
              <Button
                onClick={handleToggleTab}
                className={`${
                  activeTab === "map"
                    ? "bg-white hover:bg-white/95 "
                    : "bg-white-inactive  hover:bg-white-inactive/95"
                } text-black cursor-pointer `}
              >
                Map View
              </Button>
            </div>

            <div className="w-full">
              <div className="flex flex-col md:flex-row flex-wrap gap-4">
                {gyms.map((gym) => (
                  <div className="w-full max-w-[380px] bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:scale-[1.01]">
                    {/* Image Section */}
                    <div className="relative h-32 overflow-hidden">
                      <div
                        className="w-full h-full bg-gray-200 bg-cover bg-center transition-transform duration-300 group-hover:scale-101"
                        style={{
                          backgroundImage: `url(${gymImg})`,
                        }}
                      >
                        {/* Gradient overlay for better text readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>

                        {/* Heart Icon */}
                        <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors cursor-pointer">
                          <Heart
                            strokeWidth={2.5}
                            className="w-4 h-4 text-white hover:fill-red-500 hover:text-red-500 transition-colors"
                          />
                        </div>

                        {gym.opening_hours && (
                          <div className="absolute bottom-3 left-3">
                            <div className="bg-green-500/90 backdrop-blur-sm text-white text-xs font-medium px-3 py-1.5 rounded-full">
                              Open until{" "}
                              {gym.opening_hours.weekday?.split("-")[1]?.trim()}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 space-y-2">
                      {/* Title and Rating Row */}
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="font-bold text-xl text-gray-900 leading-tight flex-1 line-clamp-2">
                          {gym.gym_name}
                        </h3>
                        <div className="flex items-center gap-1  px-2 py-1 rounded-lg">
                          <img
                            src={ratingIcon}
                            alt="rating"
                            className="w-4 h-4"
                          />
                          <span className="text-sm font-semibold text-amber-700">
                            {gym.rating}
                          </span>
                          <span className="text-xs text-gray-500">(21)</span>
                        </div>
                      </div>

                      {/* Location */}
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                        <div className="text-sm text-gray-600 leading-tight">
                          <p className="line-clamp-1">{gym.address}</p>
                          <p className="text-red-600 font-medium">
                            {gym.location.city}
                          </p>
                        </div>
                      </div>

                      {/* Amenities */}
                      <div className="flex flex-wrap gap-1.5">
                        {gym.amenities?.slice(0, 4).map((amenity, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-medium"
                          >
                            {amenity}
                          </span>
                        ))}
                        {Array.isArray(gym.amenities) &&
                          gym.amenities.length > 3 && (
                            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-1 rounded-md">
                              +{gym.amenities.length - 3} more
                            </span>
                          )}
                      </div>

                      {/* Price and CTA */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-gray-900">
                              ₦{gym.pricing.monthly.toLocaleString("en-US")}
                            </span>
                            <span className="text-sm text-gray-500">
                              /month
                            </span>
                          </div>
                        </div>

                        <Button
                          variant="outline"
                          className="border-2 border-accent text-black  hover:text-white font-semibold px-6 transition-all duration-200 hover:scale-105"
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;
