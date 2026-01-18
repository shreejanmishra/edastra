import { Link } from "react-router-dom";
import { Play, Clock, Star, Calendar, CheckCircle } from "lucide-react";
import { useCallback, memo } from "react";
import { useCompletedVideos } from "../context/CompletedVideosContext";

const MovieCard = memo(
  ({
    item,
    isLarge = false,
    className = "",
    onToggleComplete,
    bgImage,
    isEntertainment = false,
  }) => {
    const { isCompleted: checkCompleted, toggleComplete } =
      useCompletedVideos();
    const isCompleted = checkCompleted(item.id);

    const handleToggleComplete = useCallback(
      (e) => {
        e.preventDefault();
        e.stopPropagation();

        toggleComplete(item.id);

        if (onToggleComplete) {
          onToggleComplete();
        }
      },
      [item.id, onToggleComplete, toggleComplete]
    );

    let widthClass = "";
    if (className) {
      widthClass = className;
    } else if (isEntertainment) {
      widthClass = isLarge
        ? "w-[85vw] md:w-[40vw] lg:w-[35vw]"
        : "w-[80vw] md:w-[45vw] lg:w-[28vw]";
    } else {
      widthClass = isLarge ? "w-80 md:w-96" : "w-64 md:w-72";
    }

    return (
      <Link
        to={`/watch/${item.id}`}
        state={{ bgImage }}
        className={`group/card relative flex flex-col h-full bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl ${widthClass} flex-shrink-0`}
      >
        {/* Thumbnail Container */}
        <div className="relative aspect-video overflow-hidden">
          <img
            src={item.thumbnail}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />

          {/* Play Button Overlay */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
            <div className="bg-[#FAD502] text-black p-3 rounded-full shadow-lg transform scale-75 group-hover/card:scale-100 transition-transform duration-300">
              <Play size={24} fill="currentColor" />
            </div>
          </div>

          {/* Completion Status */}
          <button
            onClick={handleToggleComplete}
            className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-300 z-20 ${
              isCompleted
                ? "bg-green-500 text-white opacity-100 shadow-md"
                : "bg-black/50 text-white hover:bg-green-500/50 opacity-0 group-hover/card:opacity-100"
            }`}
            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
          >
            <CheckCircle size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover/card:text-[#FAD502] transition-colors">
            {item.title}
          </h3>

          <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400 mb-3">
            <div className="flex items-center gap-1">
              <Star size={12} className="text-[#FAD502] fill-[#FAD502]" />
              <span>{item.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar size={12} />
              <span>{item.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock size={12} />
              <span>{item.duration || `${item.seasons} Seasons`}</span>
            </div>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              HD
            </span>
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded">
              EN
            </span>
          </div>

          {/* Description - Always render to maintain height consistency */}
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-4 flex-grow min-h-[2.5rem]">
            {item.description || ""}
          </p>
        </div>
      </Link>
    );
  }
);

export default MovieCard;
