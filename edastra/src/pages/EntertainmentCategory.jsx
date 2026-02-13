import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { getEntertainmentContent } from "../data/entertainment";
import MovieCard from "../components/MovieCard";
import { ArrowLeft } from "lucide-react";
import entertainmentBg from "../assets/entertainmentBg2.png";

const EntertainmentCategory = () => {
  const { categoryId } = useParams();
  const location = useLocation();
  const [categoryData, setCategoryData] = useState(null);
  const bg = location.state?.bgImage || entertainmentBg;

  useEffect(() => {
    const data = getEntertainmentContent();
    const category = data.categories.find((cat) => cat.id === categoryId);
    setCategoryData(category);
  }, [categoryId]);

  if (!categoryData) {
    return (
      <div className="min-h-screen dark:bg-black bg-gray-50 flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div
      className="min-h-screen dark:bg-black bg-gray-50 dark:text-white text-gray-900 transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen dark:bg-black/50 dark:backdrop-blur-sm transition-colors duration-300 pt-24 px-4 md:px-16 pb-12">
        <div className="mb-8">
          <Link
            to="/entertainment"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FAD502] transition-colors mb-4"
          >
            <ArrowLeft size={20} /> Back to Entertainment
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <span className="w-2 h-8 md:h-10 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
            {categoryData.title}
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categoryData.items.map((item) => (
            <div key={item.id} className="w-full">
              <MovieCard item={item} className="w-full" bgImage={bg} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EntertainmentCategory;
