import { useState, useRef, useEffect } from "react";
import SEO from "../components/SEO";
import {
  Trash2,
  Play,
  Clock,
  Star,
  Calendar,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { educationalVideos, courses } from "../data/education";
import myCorner from "../assets/myCorner.jpg";

const MyCornerRow = ({ title, items, onRemove, isSubscription = false }) => {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (items.length === 0) {
    return (
      <div className="px-4 md:px-16 mb-12">
        <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-8 text-center shadow-xl">
          <h2 className="dark:text-white text-gray-900 text-xl md:text-2xl font-bold mb-4">
            {title}
          </h2>
          <p className="dark:text-gray-300 text-gray-600 text-lg mb-4">
            Your list is empty
          </p>
          <Link
            to="/subjects"
            className="inline-block bg-[#FAD502] text-black font-semibold px-6 py-2 rounded-full hover:bg-[#FAD502]/80 transition"
          >
            Browse Content
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-16 mb-12">
      <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-4 md:p-6 shadow-xl relative group transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
        {/* Header */}
        <div className="mb-4 px-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="dark:text-white text-gray-200 text-xl md:text-2xl font-bold tracking-wide uppercase flex items-center gap-3">
              <span className="w-1.5 h-6 md:h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
              {title}
            </h2>
          </div>
        </div>

        {/* Scroll Buttons */}
        <button
          onClick={() => scroll("left")}
          className="hidden md:block absolute left-2 top-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronLeft size={24} />
        </button>

        <button
          onClick={() => scroll("right")}
          className="hidden md:block absolute right-2 top-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ChevronRight size={24} />
        </button>

        {/* Content Row */}
        <div
          ref={rowRef}
          className="flex gap-6 overflow-x-scroll scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-64 md:w-72 group/card relative flex flex-col h-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
            >
              {/* Remove Button */}
              {!isSubscription && onRemove && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    onRemove(item.id);
                  }}
                  className="absolute top-3 left-3 z-10 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover/card:opacity-100"
                  title="Remove from list"
                >
                  <Trash2 size={18} />
                </button>
              )}

              <Link to={`/watch/${item.id}`} className="block h-full">
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                  />
                  <div className="absolute top-3 right-3 bg-[#090D0E] backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#FAD502] shadow-sm">
                    {item.genre}
                  </div>

                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-[#FAD502] p-3 rounded-full transform scale-0 group-hover/card:scale-100 transition-transform duration-300">
                      <Play size={24} className="text-black fill-black" />
                    </div>
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-2 line-clamp-1 group-hover/card:text-[#FAD502] transition-colors">
                    {item.title}
                  </h3>

                  <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Star
                        size={14}
                        className="text-[#FAD502] fill-[#FAD502]"
                      />
                      <span>{item.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{item.duration}</span>
                    </div>
                  </div>

                  {isSubscription && (
                    <div className="mt-auto flex items-center gap-2 text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30 p-2 rounded-lg text-xs">
                      <CheckCircle size={14} />
                      <span className="font-medium">Active</span>
                    </div>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const MyCorner = () => {
  // In a real app, this would come from user's saved data
  const [myList, setMyList] = useState([
    ...educationalVideos.slice(0, 3),
    ...courses.slice(0, 2),
  ]);

  const [mySubscriptions] = useState(courses.slice(0, 3));

  const removeFromList = (id) => {
    setMyList(myList.filter((item) => item.id !== id));
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${myCorner})` }}
    >
      <div className="min-h-screen dark:bg-black/50 dark:backdrop-blur-sm transition-colors duration-300 pt-24 pb-20">
        <SEO
          title="My Corner - Edastra | Your Personal Learning Dashboard"
          description="Access your saved content, subscriptions, and continue learning from where you left off. Your personalized Edastra dashboard."
          keywords="my list, saved videos, learning dashboard, subscriptions, continue watching"
          canonicalUrl="https://edastra.com/my-corner"
        />
        {/* My List Section */}
        <MyCornerRow title="My List" items={myList} onRemove={removeFromList} />

        {/* My Subscriptions Section */}
        <MyCornerRow
          title="My Subscriptions"
          items={mySubscriptions}
          isSubscription={true}
        />
      </div>
    </div>
  );
};

export default MyCorner;
