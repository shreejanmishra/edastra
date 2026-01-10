import HeroSection from "../components/HeroSection";
import bgImage from "../assets/bgImage2.jpg";
import { categories, getFeaturedContent } from "../data/education";
import {
  getContentBySubjectAndClass,
  getSubjectHeaderImage,
} from "../data/subjects";
import { getContentById } from "../data/content";
import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  ArrowRight,
} from "lucide-react";
import MovieCard from "../components/MovieCard";
import { Link } from "react-router-dom";

const ProgressDonut = ({ completed, total, percentage, color, label }) => (
  <div className="flex flex-col items-center gap-1">
    <div className="relative w-12 h-12">
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-gray-200 dark:text-gray-700"
        />
        <circle
          cx="24"
          cy="24"
          r="18"
          stroke={color}
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={2 * Math.PI * 18}
          strokeDashoffset={2 * Math.PI * 18 * (1 - percentage / 100)}
          strokeLinecap="round"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-[10px] font-bold dark:text-white text-gray-900">
        {completed}/{total}
      </div>
    </div>
    <span className="text-[10px] font-medium text-gray-200 dark:text-gray-400 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

const BoardSelector = ({ selectedBoard, onSelectBoard }) => {
  const [isOpen, setIsOpen] = useState(false);
  const boards = ["CBSE", "ICSE", "IB", "Maharashtra Board"];
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="px-4 md:px-16 mb-6 flex justify-start relative z-30">
      <div
        className="relative inline-block text-left w-full md:w-64"
        ref={dropdownRef}
      >
        <label className="block text-sm font-medium text-gray-100 dark:text-gray-300 mb-2 ml-1">
          Select Board
        </label>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="relative w-full pl-4 pr-10 py-3 text-left text-base border border-white/20 dark:border-gray-600/30 rounded-2xl dark:bg-gray-900/60 bg-white/90 backdrop-blur-md text-gray-900 dark:text-white shadow-lg hover:shadow-xl hover:border-[#FAD502]/50 focus:outline-none focus:ring-2 focus:ring-[#FAD502]/50 transition-all duration-300 group"
        >
          <span className="block truncate font-medium">{selectedBoard}</span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <ChevronDown
              className={`h-5 w-5 text-gray-400 group-hover:text-[#FAD502] transition-transform duration-300 ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
        </button>

        {isOpen && (
          <div className="absolute mt-2 w-full rounded-2xl bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-2xl ring-1 ring-black/5 focus:outline-none z-50 overflow-hidden border border-gray-100 dark:border-gray-700/50 origin-top animate-in fade-in zoom-in-95 duration-200">
            <div className="py-2 max-h-60 overflow-auto scrollbar-hide">
              {boards.map((board) => (
                <button
                  key={board}
                  onClick={() => {
                    onSelectBoard(board);
                    setIsOpen(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm transition-all duration-200
                    ${
                      selectedBoard === board
                        ? "bg-[#FAD502]/10 text-[#FAD502] font-bold"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:pl-6"
                    }
                  `}
                >
                  {board}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ClassSelector = ({ selectedClass, onSelectClass }) => {
  const rowRef = useRef(null);
  // const classes = Array.from({ length: 12 }, (_, i) => i + 1);
  // const classes = Array.from({ length: 10 }, (_, i) => i + 1); // Commented out 11th and 12th class cards
  const classes = [
    "Pre-school",
    ...Array.from({ length: 10 }, (_, i) => i + 1),
  ];

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="relative px-4 md:px-16 mb-8 group">
      <button
        onClick={() => scroll("left")}
        className="hidden md:block min-[1400px]:hidden absolute left-4 top-[60%] -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll("right")}
        className="hidden md:block min-[1400px]:hidden absolute right-4 top-[60%] -translate-y-1/2 z-20 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight size={24} />
      </button>

      <div
        ref={rowRef}
        className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth py-4 min-[1400px]:justify-start min-[1400px]:overflow-visible"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {classes.map((classNum) => (
          <button
            key={classNum}
            onClick={() => onSelectClass(classNum)}
            className={`flex-shrink-0 w-24 h-24 rounded-xl flex items-center justify-center border-2 transition-all duration-300 ${
              selectedClass === classNum
                ? "bg-[#FAD502] border-[#FAD502] text-[#090D0E] scale-110 shadow-[0_0_20px_rgba(250,213,2,0.4)]"
                : "dark:bg-gray-800 bg-white dark:border-gray-700 border-gray-100 shadow-lg dark:text-gray-300 text-gray-800 hover:border-[#FAD502] dark:hover:text-white hover:text-black hover:shadow-xl hover:-translate-y-1"
            }`}
          >
            <div className="text-center">
              {classNum === "Pre-school" ? (
                <span className="block text-sm font-bold leading-tight">
                  Pre
                  <br />
                  School
                </span>
              ) : (
                <>
                  <span className="block text-lg font-bold">Class</span>
                  <span className="block text-2xl font-bold">{classNum}</span>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

const SubjectContentRow = ({ title, selectedClass, selectedBoard }) => {
  const [items, setItems] = useState([]);
  const [stats, setStats] = useState({
    videos: { completed: 0, total: 0, percentage: 0 },
    exercises: { completed: 0, total: 0, percentage: 0 },
    tests: { completed: 0, total: 0, percentage: 0 },
  });
  const [isExpanded, setIsExpanded] = useState(true);
  const rowRef = useRef(null);

  // Read localStorage once on mount to avoid repeated reads
  const completedData = useMemo(() => {
    return {
      videos: JSON.parse(localStorage.getItem("completedVideos") || "[]"),
      exercises: JSON.parse(localStorage.getItem("completedExercises") || "[]"),
      tests: JSON.parse(localStorage.getItem("completedTests") || "[]"),
    };
  }, []);

  const calculateStats = useCallback((currentItems, currentCompletedData) => {
    if (!currentItems || currentItems.length === 0)
      return {
        videos: { completed: 0, total: 0, percentage: 0 },
        exercises: { completed: 0, total: 0, percentage: 0 },
        tests: { completed: 0, total: 0, percentage: 0 },
      };

    const videoCount = currentItems.filter((item) =>
      currentCompletedData.videos.includes(item.id)
    ).length;
    const exerciseCount = currentItems.filter((item) =>
      currentCompletedData.exercises.includes(item.id)
    ).length;
    const testCount = currentItems.filter((item) =>
      currentCompletedData.tests.includes(item.id)
    ).length;

    const total = currentItems.length;

    return {
      videos: {
        completed: videoCount,
        total,
        percentage: Math.round((videoCount / total) * 100),
      },
      exercises: {
        completed: exerciseCount,
        total,
        percentage: Math.round((exerciseCount / total) * 100),
      },
      tests: {
        completed: testCount,
        total,
        percentage: Math.round((testCount / total) * 100),
      },
    };
  }, []);

  useEffect(() => {
    // Filter content based on subject and selected class
    const filteredItems = getContentBySubjectAndClass(
      title,
      selectedClass,
      selectedBoard
    );
    setItems(filteredItems);
    setStats(calculateStats(filteredItems, completedData));
  }, [title, selectedClass, selectedBoard, completedData, calculateStats]);

  const handleProgressUpdate = () => {
    // When a video is completed, we might need to refresh local storage data or just update local stats
    // Ideally we should reload from local storage here since one item changed
    const freshCompletedData = {
      videos: JSON.parse(localStorage.getItem("completedVideos") || "[]"),
      exercises: JSON.parse(localStorage.getItem("completedExercises") || "[]"),
      tests: JSON.parse(localStorage.getItem("completedTests") || "[]"),
    };
    setStats(calculateStats(items, freshCompletedData));
  };

  const scroll = (direction) => {
    if (rowRef.current) {
      const scrollAmount = direction === "left" ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="px-4 md:px-16 mb-12">
      <div className="dark:bg-gray-900/40 bg-white/10 backdrop-blur-sm border dark:border-gray-800 border-gray-200 rounded-2xl p-4 md:p-6 shadow-xl relative group transition-all duration-300 hover:shadow-2xl hover:border-gray-300 dark:hover:border-gray-700">
        {/* Header */}
        <div
          className="mb-4 px-1 flex items-center justify-between cursor-pointer"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Link
            to={`/subjects/${encodeURIComponent(title)}`}
            onClick={(e) => e.stopPropagation()}
            className="group/title flex items-center gap-3"
          >
            <h2 className="dark:text-white text-gray-200 text-xl md:text-2xl font-bold tracking-wide uppercase flex items-center gap-3 transition-colors duration-300 group-hover/title:text-[#FAD502]">
              <span className="w-1.5 h-6 md:h-8 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
              {title}
            </h2>
            <span className="opacity-0 group-hover/title:opacity-100 transition-opacity duration-300 text-[#FAD502]">
              <ArrowRight size={24} />
            </span>
          </Link>

          <div className="flex items-center gap-6">
            {/* Progress Donuts */}
            <div className="flex items-center gap-4">
              <ProgressDonut
                completed={stats.videos.completed}
                total={stats.videos.total}
                percentage={stats.videos.percentage}
                color="#FAD502"
                label="Videos"
              />
              <ProgressDonut
                completed={stats.exercises.completed}
                total={stats.exercises.total}
                percentage={stats.exercises.percentage}
                color="#3B82F6"
                label="Exercises"
              />
              <ProgressDonut
                completed={stats.tests.completed}
                total={stats.tests.total}
                percentage={stats.tests.percentage}
                color="#10B981"
                label="Tests"
              />
            </div>

            {/* Chevron */}
            <div
              className={`transition-transform duration-300 ${
                isExpanded ? "rotate-180" : ""
              }`}
            >
              <ChevronDown
                className="dark:text-white text-gray-900"
                size={24}
              />
            </div>
          </div>
        </div>

        {isExpanded && (
          <>
            {/* Scroll Buttons */}
            <button
              onClick={() => scroll("left")}
              className="hidden md:block absolute left-2 top-[60%] -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FAD502] hover:text-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={() => scroll("right")}
              className="hidden md:block absolute right-2 top-[60%] -translate-y-1/2 z-20 bg-black/50 hover:bg-[#FAD502] hover:text-black text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
              <ChevronRight size={24} />
            </button>

            {/* Cards Container */}
            <div
              ref={rowRef}
              className="flex gap-4 overflow-x-scroll scrollbar-hide scroll-smooth py-4 px-1 "
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {items.map((item, index) => (
                <MovieCard
                  key={item.id}
                  item={item}
                  isFirst={index === 0}
                  isLast={index === items.length - 1}
                  onToggleComplete={handleProgressUpdate}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Subjects = () => {
  const [selectedClass, setSelectedClass] = useState(() => {
    const saved = localStorage.getItem("selectedClass");
    if (saved === "Pre-school") return "Pre-school";
    if (saved) return parseInt(saved);
    return "Pre-school";
  });
  const [selectedBoard, setSelectedBoard] = useState("CBSE");
  const [heroContent, setHeroContent] = useState(null);

  useEffect(() => {
    localStorage.setItem("selectedClass", selectedClass);
  }, [selectedClass]);

  useEffect(() => {
    const lastViewedId = localStorage.getItem("lastViewedVideoId");
    let content = null;
    // Only use last viewed if it is a subject video (has dash in ID)
    if (
      lastViewedId &&
      lastViewedId.includes("-") &&
      !lastViewedId.startsWith("ent-")
    ) {
      content = getContentById(lastViewedId);
    }

    if (!content) {
      content = getFeaturedContent();
    }

    setHeroContent(content);
  }, []);

  const getSubjectsForClass = (classNum) => {
    if (classNum === "Pre-school") {
      return [
        { name: "Rhymes" },
        { name: "Stories" },
        { name: "Alphabets" },
        { name: "Numbers" },
        { name: "Drawing" },
      ];
    }
    if (classNum >= 1 && classNum <= 5) {
      return [
        { name: "Maths" },
        { name: "English" },
        { name: "Hindi" },
        { name: "EVS" },
      ];
    } else if (classNum >= 6 && classNum <= 10) {
      return [
        { name: "Maths" },
        { name: "English" },
        { name: "Hindi" },
        { name: "Science" },
        { name: "Computer" },
        { name: "History" },
        { name: "Civics" },
        { name: "Geography" },
      ];
    } else if (classNum >= 11 && classNum <= 12) {
      return [
        {
          title: "Science",
          subjects: ["Maths", "Biology", "Physics", "Chemistry"],
        },
        {
          title: "Commerce",
          subjects: ["Accountancy", "Economics", "Business Studies", "Maths"],
        },
        {
          title: "Arts",
          subjects: [
            "History",
            "Geography",
            "Economics",
            "Political Science",
            "Sociology",
            "Psychology",
            "Philosophy",
          ],
        },
        {
          title: "Additional Subjects",
          subjects: [
            "English",
            "Hindi",
            "Computer Science",
            "Engineering Graphics",
            "Informatics Practices",
            "Fine Arts",
            "Physical Education",
            "Fashion Studies",
            "Multimedia & Web Technology",
            "Entrepreneurship",
            "Home Science",
            "Psychology",
            "Sociology",
          ],
        },
      ];
    }
    return [];
  };

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen dark:bg-black/30 dark:backdrop-blur-sm transition-colors duration-300 pt-24">
        <div className="px-4 md:px-16 mb-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800">
            <HeroSection content={heroContent} isCompact={true} />
          </div>
        </div>

        <div className="relative z-10 pb-20">
          <BoardSelector
            selectedBoard={selectedBoard}
            onSelectBoard={setSelectedBoard}
          />
          {/* Class Selector Carousel */}
          <ClassSelector
            selectedClass={selectedClass}
            onSelectClass={setSelectedClass}
          />

          {/* Subject Rows */}
          <div className="mt-8">
            {(() => {
              const subjects = getSubjectsForClass(selectedClass);
              // Check if it's the grouped structure (has title and subjects array)
              if (subjects.length > 0 && subjects[0].subjects) {
                return subjects.map((group, index) => (
                  <div key={index} className="mb-12">
                    <h2 className="text-[#FAD502] text-3xl font-bold px-4 md:px-16 mb-6 border-b dark:border-gray-800 border-gray-200 pb-2 transition-colors duration-300">
                      {group.title}
                    </h2>
                    {group.subjects.map((subject) => (
                      <SubjectContentRow
                        key={subject}
                        title={subject}
                        selectedClass={selectedClass}
                        selectedBoard={selectedBoard}
                      />
                    ))}
                  </div>
                ));
              } else {
                // Flat structure
                return subjects.map((subject) => (
                  <SubjectContentRow
                    key={subject.name}
                    title={subject.name}
                    selectedClass={selectedClass}
                    selectedBoard={selectedBoard}
                  />
                ));
              }
            })()}

            {/* Empty State Message if no content found for any subject */}
            <div className="px-4 md:px-16 mt-8 text-gray-500 text-center">
              <p>
                Showing curriculum for Class {selectedClass} ({selectedBoard})
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
