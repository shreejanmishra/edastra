import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import {
  getFeaturedContent,
  educationalVideos,
  courses,
} from "../data/education";
import { useEffect, useState, Suspense, lazy } from "react";
import bgImage from "../assets/bgImage2.jpg";

const CategoryRow = lazy(() => import("../components/CategoryRow"));

const HomePage = () => {
  const [featuredContent, setFeaturedContent] = useState(null);

  useEffect(() => {
    setFeaturedContent(getFeaturedContent());
  }, []);

  // Define Home Page Categories
  const homeCategories = [
    {
      id: 1,
      name: "Trending Now",
      items: [...educationalVideos.slice(0, 8), ...courses.slice(0, 5)],
      link: "/home/trending",
    },
    {
      id: 2,
      name: "New Educational Videos",
      items: educationalVideos.slice(0, 12),
      link: "/home/new-educational",
    },
    {
      id: 3,
      name: "Popular Courses",
      items: courses.slice(0, 12),
      link: "/home/popular-courses",
    },
    {
      id: 4,
      name: "Top Rated",
      items: [
        ...educationalVideos.filter((m) => parseFloat(m.rating) >= 4.8),
        ...courses.filter((t) => parseFloat(t.rating) >= 4.8),
      ],
      link: "/home/top-rated",
    },
  ];

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="min-h-screen dark:bg-black/50 dark:backdrop-blur-sm transition-colors duration-300 pt-24 pb-20">
        {/* Hero Section */}
        <div className="px-4 md:px-16 mb-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800">
            <HeroSection content={featuredContent} isCompact={true} />
          </div>
        </div>

        {/* Pre-Launch Banner */}
        <div className="px-4 md:px-16 mb-12">
          <Link to="/pre-launch" className="block group">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#FAD502] to-[#e5c302] p-8 shadow-lg transform transition-all duration-300 hover:scale-[1.01] border border-[#FAD502]/50">
              <div className="flex flex-col md:flex-row items-center justify-between relative z-10 gap-6">
                <div className="flex-1 text-left">
                  <h2 className="text-2xl md:text-3xl font-bold text-black mb-2">
                    Join Our Beta-Testing!
                  </h2>
                  <p className="text-black/80 text-base md:text-lg font-medium leading-relaxed">
                    Be the first to experience the future of education. We are
                    currently developing an edutainment app and looking for
                    feedback. Sign up now for 3 months of free premium access on
                    release.
                  </p>
                  <p className="text-black mt-2 text-sm md:text-base">
                    <span className="text-black font-bold"> Note:</span> The app
                    is filled with mock data at the moment
                  </p>
                </div>
                <div className="flex-shrink-0 bg-black text-[#FAD502] px-6 py-3 rounded-full font-bold flex items-center gap-2 group-hover:bg-gray-900 transition-colors shadow-md whitespace-nowrap">
                  Register Now
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-black/10 rounded-full blur-2xl"></div>
            </div>
          </Link>
        </div>

        {/* Category Rows */}
        <div>
          <Suspense
            fallback={
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-[#FAD502] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            {homeCategories.map((category) => (
              <CategoryRow
                key={category.id}
                title={category.name}
                items={category.items}
                isLarge={category.id === 1}
                linkTo={category.link}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
