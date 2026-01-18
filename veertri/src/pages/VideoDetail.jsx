import { useParams, Link } from "react-router-dom";
import { useState, useEffect, Suspense, lazy, useMemo } from "react";
import SEO from "../components/SEO";
import {
  Play,
  Plus,
  ThumbsUp,
  ThumbsDown,
  Share2,
  FileText,
  ClipboardCheck,
} from "lucide-react";
import { getContentById } from "../data/content";
import { educationalVideos, courses } from "../data/education";
import { entertainmentContent } from "../data/entertainment";

const VideoPlayer = lazy(() => import("../components/VideoPlayer"));

const VideoDetail = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [similarContent, setSimilarContent] = useState([]);
  const [isExerciseCompleted, setIsExerciseCompleted] = useState(false);
  const [isTestCompleted, setIsTestCompleted] = useState(false);

  useEffect(() => {
    const item = getContentById(id);
    setContent(item);

    // Save to last viewed
    if (item) {
      localStorage.setItem("lastViewedVideoId", item.id);

      // Check completion status
      const completedExercises = JSON.parse(
        localStorage.getItem("completedExercises") || "[]",
      );
      setIsExerciseCompleted(completedExercises.includes(item.id));

      const completedTests = JSON.parse(
        localStorage.getItem("completedTests") || "[]",
      );
      setIsTestCompleted(completedTests.includes(item.id));
    }

    // Get similar content (same genre)
    if (item) {
      const all = [...educationalVideos, ...courses, ...entertainmentContent];
      const similar = all
        .filter((c) => c.genre === item.genre && c.id !== item.id)
        .slice(0, 6);
      setSimilarContent(similar);
    }
  }, [id]);

  const toggleExercise = () => {
    if (!content) return;
    const completedExercises = JSON.parse(
      localStorage.getItem("completedExercises") || "[]",
    );
    let newCompleted;
    if (isExerciseCompleted) {
      newCompleted = completedExercises.filter((i) => i !== content.id);
    } else {
      newCompleted = [...completedExercises, content.id];
    }
    localStorage.setItem("completedExercises", JSON.stringify(newCompleted));
    setIsExerciseCompleted(!isExerciseCompleted);
  };

  const toggleTest = () => {
    if (!content) return;
    const completedTests = JSON.parse(
      localStorage.getItem("completedTests") || "[]",
    );
    let newCompleted;
    if (isTestCompleted) {
      newCompleted = completedTests.filter((i) => i !== content.id);
    } else {
      newCompleted = [...completedTests, content.id];
    }
    localStorage.setItem("completedTests", JSON.stringify(newCompleted));
    setIsTestCompleted(!isTestCompleted);
  };

  // Generate VideoObject structured data for SEO (must be before conditional return)
  const videoStructuredData = useMemo(() => {
    if (!content) return null;
    return {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: content.title,
      description: content.description,
      thumbnailUrl: content.thumbnail || content.backdrop,
      uploadDate: `${content.year}-01-01`,
      duration: content.duration || "PT30M",
      contentUrl: content.videoUrl,
      embedUrl: content.videoUrl,
      publisher: {
        "@type": "Organization",
        name: "Veertri",
        logo: {
          "@type": "ImageObject",
          url: "https://veertri.com/logo.png",
        },
      },
    };
  }, [content]);

  if (!content) {
    return (
      <div className="bg-black min-h-screen flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-black min-h-screen">
      {content && (
        <SEO
          title={`${content.title} - Watch on Veertri`}
          description={content.description}
          keywords={`${content.genre}, ${content.title}, educational video, veertri`}
          canonicalUrl={`https://veertri.com/watch/${id}`}
          ogImage={content.backdrop || content.thumbnail}
          ogType="video.other"
          structuredData={videoStructuredData}
        />
      )}
      {/* Video Player or Hero Image */}
      <div className="relative">
        {isPlaying ? (
          <Suspense
            fallback={
              <div className="w-full h-screen bg-black flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-[#FAD502] border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            <VideoPlayer
              videoUrl={content.videoUrl}
              thumbnail={content.backdrop}
              title={content.title}
            />
          </Suspense>
        ) : (
          <div className="relative h-screen">
            <img
              src={content.backdrop}
              alt={content.title}
              loading="lazy"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-4 md:p-16">
              <h1 className="text-white text-3xl md:text-6xl font-bold mb-4">
                {content.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="bg-[#FAD502] hover:bg-[#FAD502]/80 text-[#090D0E] font-semibold px-6 md:px-8 py-2 md:py-3 rounded-md flex items-center gap-2 transition"
                >
                  <Play size={24} fill="currentColor" />
                  <span>Play</span>
                </button>

                <button
                  onClick={toggleExercise}
                  className={`${
                    isExerciseCompleted
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-white/20 hover:bg-white/30"
                  } backdrop-blur-sm text-white font-semibold px-6 py-2 md:py-3 rounded-md flex items-center gap-2 transition`}
                >
                  <FileText size={20} />
                  <span>
                    {isExerciseCompleted ? "Exercises Done" : "Exercises"}
                  </span>
                </button>

                <button
                  onClick={toggleTest}
                  className={`${
                    isTestCompleted
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-white/20 hover:bg-white/30"
                  } backdrop-blur-sm text-white font-semibold px-6 py-2 md:py-3 rounded-md flex items-center gap-2 transition`}
                >
                  <ClipboardCheck size={20} />
                  <span>{isTestCompleted ? "Test Taken" : "Take Test"}</span>
                </button>

                <button className="bg-[#090D0E] hover:bg-[#090D0E]/80 text-[#FAD502] rounded-full p-3 transition">
                  <Plus size={24} />
                </button>

                <button className="bg-[#090D0E] hover:bg-[#090D0E]/80 text-[#FAD502] rounded-full p-3 transition">
                  <ThumbsUp size={24} />
                </button>

                <button className="bg-[#090D0E] hover:bg-[#090D0E]/80 text-[#FAD502] rounded-full p-3 transition">
                  <ThumbsDown size={24} />
                </button>

                <button className="bg-[#090D0E] hover:bg-[#090D0E]/80 text-[#FAD502] rounded-full p-3 transition">
                  <Share2 size={24} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content Details */}
      <div className="px-8 md:px-16 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Info */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-4 text-white mb-4">
              <span className="text-green-500 font-semibold text-xl">
                {content.rating}
              </span>
              <span className="text-lg">{content.year}</span>
              <span className="text-lg">
                {content.duration || `${content.modules} Modules`}
              </span>
              <span className="border border-gray-400 px-2 py-1 text-sm">
                HD
              </span>
            </div>

            <p className="text-white text-lg mb-6">{content.description}</p>
          </div>

          {/* Sidebar Info */}
          <div className="text-gray-400">
            <div className="mb-4">
              <span className="text-gray-500">Cast: </span>
              <span className="text-white">{content.cast?.join(", ")}</span>
            </div>

            <div className="mb-4">
              <span className="text-gray-500">
                {content.director ? "Director: " : "Creator: "}
              </span>
              <span className="text-white">
                {content.director || content.creator}
              </span>
            </div>

            <div className="mb-4">
              <span className="text-gray-500">Genre: </span>
              <span className="text-white">{content.genre}</span>
            </div>
          </div>
        </div>

        {/* Similar Content */}
        <div className="mt-12">
          <h2 className="text-white text-2xl font-bold mb-6">More Like This</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {similarContent.map((item) => (
              <Link
                key={item.id}
                to={`/watch/${item.id}`}
                className="group cursor-pointer"
              >
                <div className="relative rounded-md overflow-hidden mb-2">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-white text-sm font-semibold">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-xs">{item.year}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetail;
