import { useRef, useCallback, memo } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import MovieCard from "./MovieCard";
import { Link } from "react-router-dom";

const CategoryRow = memo(
  ({
    title,
    items,
    isLarge = false,
    linkTo,
    bgImage,
    isEntertainment = false,
  }) => {
    const rowRef = useRef(null);

    const scroll = useCallback((direction) => {
      if (rowRef.current) {
        const scrollAmount =
          direction === "left"
            ? -rowRef.current.clientWidth
            : rowRef.current.clientWidth;
        rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }, []);

    return (
      <div className="px-4 md:px-16 mb-12">
        <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-4 md:p-6 shadow-xl relative group transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
          {/* Header */}
          <div className="mb-4 px-1 flex items-center justify-between">
            {linkTo ? (
              <Link
                to={linkTo}
                state={{ bgImage }}
                className="group/title flex items-center gap-3"
              >
                <h2 className="dark:text-white text-white text-xl md:text-2xl font-bold tracking-wide uppercase flex items-center gap-3 transition-colors duration-300 group-hover/title:text-[#FAD502]">
                  <span className="w-1.5 h-6 md:h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
                  {title}
                </h2>
                <span className="opacity-0 group-hover/title:opacity-100 transition-opacity duration-300 text-[#FAD502]">
                  <ArrowRight size={24} />
                </span>
              </Link>
            ) : (
              <h2 className="dark:text-white text-gray-900 text-xl md:text-2xl font-bold tracking-wide uppercase flex items-center gap-3 transition-colors duration-300">
                <span className="w-1.5 h-6 md:h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
                {title}
              </h2>
            )}
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

          {/* Items Row */}
          <div
            ref={rowRef}
            className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
            style={{
              scrollbarWidth: "none",
              msOverflowStyle: "none",
              paddingRight: "20px",
            }}
          >
            {items.map((item) => (
              <MovieCard
                key={item.id}
                item={item}
                isLarge={isLarge}
                bgImage={bgImage}
                isEntertainment={isEntertainment}
              />
            ))}
          </div>
        </div>
      </div>
    );
  },
);

export default CategoryRow;
