import { useParams, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getContentBySubjectAndClass } from "../data/subjects";
import MovieCard from "../components/MovieCard";
import { ChevronLeft } from "lucide-react";
import bgImage from "../assets/bgImage2.jpg";

const ClassCurriculum = () => {
  const { subject, classId } = useParams();
  const location = useLocation();
  const [content, setContent] = useState([]);
  const bg = location.state?.bgImage || bgImage;

  useEffect(() => {
    const data = getContentBySubjectAndClass(subject, classId);
    setContent(data);
  }, [subject, classId]);

  return (
    <div
      className="min-h-screen bg-black pt-24 px-4 md:px-16 pb-12 bg-cover bg-center bg-no-repeat bg-fixed"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <div className="min-h-screen bg-black/50 backdrop-blur-sm pt-24 px-4 md:px-16 pb-12 -mt-24 -mx-4 md:-mx-16">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              to="/subjects"
              className="inline-flex items-center text-gray-400 hover:text-white mb-4 transition"
            >
              <ChevronLeft size={20} className="mr-1" />
              Back to Subjects
            </Link>
            <h1 className="text-4xl font-bold text-white mb-2">
              {decodeURIComponent(subject)}
            </h1>
            <p className="text-xl text-[#FAD502]">Class {classId} Curriculum</p>
          </div>

          {/* Content Grid */}
          {content.length === 0 ? (
            <div className="text-center py-20 bg-gray-900/80 rounded-xl border border-gray-800">
              <p className="text-gray-400 text-xl mb-4">
                No content available for this class yet.
              </p>
              <p className="text-gray-500">
                Check back later for updated curriculum materials.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {content.map((item) => (
                <MovieCard key={item.id} item={item} bgImage={bg} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClassCurriculum;
