import { useState } from "react";
import { Trash2, Play, Clock, Star, Calendar, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { educationalVideos, courses } from "../data/education";

const MyList = () => {
  const [activeTab, setActiveTab] = useState("list"); // 'list' or 'subscriptions'
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
    <div className="min-h-screen dark:bg-black bg-gray-50 pt-24 px-4 md:px-16 pb-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Tabs */}
        <div className="flex gap-6 mb-8 border-b dark:border-gray-800 border-gray-200">
          <button
            onClick={() => setActiveTab("list")}
            className={`pb-4 text-lg font-bold transition-colors relative ${
              activeTab === "list"
                ? "text-[#FAD502]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            My List
            {activeTab === "list" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FAD502] rounded-t-full" />
            )}
          </button>
          <button
            onClick={() => setActiveTab("subscriptions")}
            className={`pb-4 text-lg font-bold transition-colors relative ${
              activeTab === "subscriptions"
                ? "text-[#FAD502]"
                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
            }`}
          >
            My Subscriptions
            {activeTab === "subscriptions" && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-[#FAD502] rounded-t-full" />
            )}
          </button>
        </div>

        {/* My List Section */}
        {activeTab === "list" && (
          <div className="mb-16">
            {myList.length === 0 ? (
              <div className="text-center py-10 dark:bg-gray-900 bg-white rounded-xl shadow-sm border dark:border-gray-800 border-gray-100 transition-colors duration-300">
                <p className="dark:text-gray-300 text-gray-600 text-xl mb-4 transition-colors duration-300">
                  Your list is empty
                </p>
                <Link
                  to="/subjects"
                  className="dark:text-white text-[#090D0E] underline hover:text-[#FAD502] transition"
                >
                  Browse content to add to your list
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {myList.map((item) => (
                  <div
                    key={item.id}
                    className="dark:bg-gray-900 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group"
                  >
                    {/* Remove Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        removeFromList(item.id);
                      }}
                      className="absolute top-4 left-4 z-10 bg-white/90 p-2 rounded-full text-red-500 hover:bg-red-50 transition-colors shadow-sm"
                      title="Remove from list"
                    >
                      <Trash2 size={18} />
                    </button>

                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={item.thumbnail}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute top-4 right-4 bg-[#090D0E] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#FAD502] shadow-sm">
                        {item.genre}
                      </div>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                      <div className="mb-4">
                        <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2 line-clamp-2 transition-colors duration-300">
                          {item.title}
                        </h2>
                        <p className="text-sm dark:text-gray-400 text-gray-500 font-medium transition-colors duration-300">
                          Instructor: {item.instructor || "Edastra Expert"}
                        </p>
                      </div>

                      <p className="dark:text-gray-300 text-gray-600 mb-6 line-clamp-3 flex-1 transition-colors duration-300">
                        {item.description}
                      </p>

                      <div className="space-y-3 border-t dark:border-gray-800 border-gray-100 pt-4 transition-colors duration-300">
                        <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                          <Star size={18} className="text-yellow-500 mr-2" />
                          <span className="font-semibold">
                            {item.rating} Rating
                          </span>
                        </div>
                        <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                          <Clock size={18} className="text-blue-600 mr-2" />
                          <span>
                            {item.duration || `${item.modules} Modules`}
                          </span>
                        </div>
                        <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                          <Calendar
                            size={18}
                            className="text-purple-600 mr-2"
                          />
                          <span>{item.year}</span>
                        </div>
                      </div>

                      <Link
                        to={`/watch/${item.id}`}
                        className="w-full mt-6 bg-[#FAD502] text-[#090D0E] py-2 rounded-lg font-medium hover:bg-[#FAD502]/80 transition-colors duration-200 flex items-center justify-center gap-2"
                      >
                        <Play size={18} />
                        Watch Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* My Subscriptions Section */}
        {activeTab === "subscriptions" && (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mySubscriptions.map((item) => (
                <div
                  key={item.id}
                  className="dark:bg-gray-900 bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full relative group"
                >
                  <div
                    className="absolute top-4 left-4 z-10 bg-green-100 p-2 rounded-full text-green-600 shadow-sm"
                    title="Subscribed"
                  >
                    <CheckCircle size={18} />
                  </div>

                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-[#090D0E] backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-[#FAD502] shadow-sm">
                      {item.genre}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold dark:text-white text-gray-900 mb-2 line-clamp-2 transition-colors duration-300">
                        {item.title}
                      </h2>
                      <p className="text-sm dark:text-gray-400 text-gray-500 font-medium transition-colors duration-300">
                        Instructor: {item.instructor || "Edastra Expert"}
                      </p>
                    </div>

                    <p className="dark:text-gray-300 text-gray-600 mb-6 line-clamp-3 flex-1 transition-colors duration-300">
                      {item.description}
                    </p>

                    <div className="space-y-3 border-t dark:border-gray-800 border-gray-100 pt-4 transition-colors duration-300">
                      <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                        <Star size={18} className="text-yellow-500 mr-2" />
                        <span className="font-semibold">
                          {item.rating} Rating
                        </span>
                      </div>
                      <div className="flex items-center dark:text-gray-300 text-gray-700 transition-colors duration-300">
                        <Clock size={18} className="text-blue-600 mr-2" />
                        <span>
                          {item.duration || `${item.modules} Modules`}
                        </span>
                      </div>
                    </div>

                    <button className="w-full mt-6 border-2 dark:border-white border-[#090D0E] dark:text-white text-[#090D0E] py-2 rounded-lg font-medium hover:bg-[#090D0E] hover:text-[#FAD502] dark:hover:bg-white dark:hover:text-black transition-colors duration-200 flex items-center justify-center gap-2">
                      View Course
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyList;
