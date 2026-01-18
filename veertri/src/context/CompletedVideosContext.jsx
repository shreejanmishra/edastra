import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const CompletedVideosContext = createContext();

export const CompletedVideosProvider = ({ children }) => {
  const [completedVideos, setCompletedVideos] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("completedVideos") || "[]");
    }
    return [];
  });

  // Sync to localStorage whenever completedVideos changes
  useEffect(() => {
    localStorage.setItem("completedVideos", JSON.stringify(completedVideos));
  }, [completedVideos]);

  const isCompleted = useCallback(
    (videoId) => completedVideos.includes(videoId),
    [completedVideos]
  );

  const toggleComplete = useCallback((videoId) => {
    setCompletedVideos((prev) => {
      if (prev.includes(videoId)) {
        return prev.filter((id) => id !== videoId);
      }
      return [...prev, videoId];
    });
  }, []);

  const markComplete = useCallback((videoId) => {
    setCompletedVideos((prev) => {
      if (prev.includes(videoId)) {
        return prev; // Already completed
      }
      return [...prev, videoId];
    });
  }, []);

  const markIncomplete = useCallback((videoId) => {
    setCompletedVideos((prev) => prev.filter((id) => id !== videoId));
  }, []);

  const value = useMemo(
    () => ({
      completedVideos,
      isCompleted,
      toggleComplete,
      markComplete,
      markIncomplete,
    }),
    [completedVideos, isCompleted, toggleComplete, markComplete, markIncomplete]
  );

  return (
    <CompletedVideosContext.Provider value={value}>
      {children}
    </CompletedVideosContext.Provider>
  );
};

export const useCompletedVideos = () => {
  const context = useContext(CompletedVideosContext);
  if (!context) {
    throw new Error(
      "useCompletedVideos must be used within a CompletedVideosProvider"
    );
  }
  return context;
};
