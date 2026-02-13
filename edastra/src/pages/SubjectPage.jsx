import React, { useState, useEffect } from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { categories } from "../data/education";
import MovieCard from "../components/MovieCard";
import { ArrowLeft } from "lucide-react";
import bgImage from "../assets/bgImage2.jpg";

const SubjectPage = () => {
  const { subject } = useParams();
  const location = useLocation();
  const [subjectData, setSubjectData] = useState(null);
  const bg = location.state?.bgImage || bgImage;

  useEffect(() => {
    const decodedSubject = decodeURIComponent(subject);

    // Map specific subjects to broader categories
    let categoryName = decodedSubject;
    if (decodedSubject === "Maths") categoryName = "Mathematics";
    if (
      ["Physics", "Chemistry", "Biology", "EVS", "Science"].includes(
        decodedSubject
      )
    ) {
      categoryName = "Science (Physics, Chemistry, Biology)";
    }
    if (
      [
        "History",
        "Civics",
        "Geography",
        "Political Science",
        "Sociology",
        "Economics",
        "Psychology",
        "Philosophy",
      ].includes(decodedSubject)
    ) {
      categoryName = "Social Science";
    }
    if (
      [
        "Computer",
        "Multimedia & Web Technology",
        "Informatics Practices",
        "Computer Science",
      ].includes(decodedSubject)
    ) {
      categoryName = "Computer Science";
    }
    if (
      [
        "Rhymes",
        "Stories",
        "Alphabets",
        "Drawing",
        "Fine Arts",
        "English",
      ].includes(decodedSubject)
    ) {
      categoryName = "English";
    }
    if (["Numbers", "Maths", "Mathematics"].includes(decodedSubject)) {
      categoryName = "Mathematics";
    }

    const category = categories.find((cat) => cat.name === categoryName);

    if (category) {
      // If we mapped to a broader category, we might want to filter items further if possible,
      // but for now, showing the broader category content is better than nothing.
      // We can update the display name to match the requested subject but show category items.
      setSubjectData({
        ...category,
        name: decodedSubject, // Keep the original requested name for the header
      });
    } else {
      setSubjectData({ name: decodedSubject, items: [] });
    }
  }, [subject]);

  if (!subjectData) {
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
            to="/subjects"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FAD502] transition-colors mb-4"
          >
            <ArrowLeft size={20} /> Back to Subjects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold flex items-center gap-3">
            <span className="w-2 h-8 md:h-10 bg-[#FAD502] rounded-full block shadow-[0_0_10px_#FAD502]"></span>
            {subjectData.name}
          </h1>
        </div>

        {subjectData.items.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-xl">
              No content found for this subject.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {subjectData.items.map((item) => (
              <div key={item.id} className="w-full">
                <MovieCard item={item} className="w-full" bgImage={bg} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubjectPage;
