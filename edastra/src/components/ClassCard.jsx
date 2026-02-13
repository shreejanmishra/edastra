import { Link } from "react-router-dom";

const ClassCard = ({ classNum, subject }) => {
  return (
    <Link
      to={`/subjects/${encodeURIComponent(subject)}/class/${classNum}`}
      className="flex-shrink-0 w-48 h-32 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center hover:scale-105 transition-transform duration-300 border border-gray-700 hover:border-[#FAD502] group"
    >
      <div className="text-center">
        <h3 className="text-2xl font-bold text-white group-hover:text-[#FAD502] transition-colors">
          Class {classNum}
        </h3>
        <p className="text-gray-400 text-sm mt-1">CBSE Curriculum</p>
      </div>
    </Link>
  );
};

export default ClassCard;
