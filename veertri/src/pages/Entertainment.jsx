import React, { useState, useEffect, Suspense, lazy } from "react";
import HeroSection from "../components/HeroSection";
import SEO from "../components/SEO";
import { getEntertainmentContent } from "../data/entertainment";
import entertainmentBg from "../assets/entertainmentBg2.png";

const CategoryRow = lazy(() => import("../components/CategoryRow"));

const Entertainment = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const data = getEntertainmentContent();
    setContent(data);
  }, []);

  if (!content) return null;

  return (
    <div
      className="min-h-screen transition-colors duration-300 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${entertainmentBg})` }}
    >
      <div className="min-h-screen dark:bg-black/50 dark:backdrop-blur-sm transition-colors duration-300 pt-24 pb-20">
        <SEO
          title="Entertainment - Veertri | Educational Movies & Shows"
          description="Watch educational entertainment content including movies, shows, and documentaries. Learning meets fun at Veertri."
          keywords="educational movies, kids shows, learning videos, entertainment, documentaries"
          canonicalUrl="https://veertri.com/entertainment"
        />
        <div className="px-4 md:px-16 mb-8">
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/20 dark:border-gray-800">
            <HeroSection content={content.featured} isCompact={true} />
          </div>
        </div>

        <div>
          <Suspense
            fallback={
              <div className="flex justify-center py-10">
                <div className="w-10 h-10 border-4 border-[#FAD502] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            {content.categories.map((category, index) => (
              <CategoryRow
                key={index}
                title={category.title}
                items={category.items}
                linkTo={`/entertainment/${category.id}`}
                bgImage={entertainmentBg}
                isEntertainment={true}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Entertainment;
