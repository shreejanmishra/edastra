import { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  SkipBack,
  SkipForward,
} from "lucide-react";

const VideoPlayer = ({ videoUrl, thumbnail, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const videoRef = useRef(null);

  const togglePlay = async () => {
    if (videoRef.current) {
      try {
        if (isPlaying) {
          videoRef.current.pause();
        } else {
          await videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error("Playback error:", error);
        // If play was interrupted, ensure state matches reality
        if (videoRef.current.paused) {
          setIsPlaying(false);
        }
      }
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgress = () => {
    if (videoRef.current) {
      const progress =
        (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(progress);
    }
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    if (videoRef.current && Number.isFinite(videoRef.current.duration)) {
      videoRef.current.currentTime =
        (percentage / 100) * videoRef.current.duration;
      setProgress(percentage);
    }
  };

  const skip = (seconds) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes("youtube.com/embed")) return url;
    if (url.includes("youtube.com/watch")) {
      const videoId = url.split("v=")[1]?.split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1]?.split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  };

  const isYoutube =
    videoUrl &&
    (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be"));

  if (isYoutube) {
    const embedUrl = getEmbedUrl(videoUrl);
    return (
      <div className="relative w-full aspect-video bg-black flex items-center justify-center">
        <iframe
          src={`${embedUrl}?autoplay=0&rel=0`}
          title={title}
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          sandbox="allow-same-origin allow-scripts allow-presentation allow-popups"
        ></iframe>
      </div>
    );
  }

  return (
    <div
      className="relative w-full aspect-video bg-black group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        className="w-full h-full"
        poster={thumbnail}
        onTimeUpdate={handleProgress}
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Play button overlay when paused */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={togglePlay}
            className="bg-white/30 hover:bg-white/50 rounded-full p-6 transition"
          >
            <Play size={48} className="text-white" />
          </button>
        </div>
      )}

      {/* Controls */}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Progress bar */}
        <div
          className="w-full h-1 bg-gray-600 cursor-pointer mb-4 rounded-full overflow-hidden"
          onClick={handleSeek}
        >
          <div
            className="h-full bg-red-600 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={togglePlay}
              className="text-white hover:text-gray-300 transition"
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            <button
              onClick={() => skip(-10)}
              className="text-white hover:text-gray-300 transition"
            >
              <SkipBack size={20} />
            </button>

            <button
              onClick={() => skip(10)}
              className="text-white hover:text-gray-300 transition"
            >
              <SkipForward size={20} />
            </button>

            <button
              onClick={toggleMute}
              className="text-white hover:text-gray-300 transition"
            >
              {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
            </button>

            <span className="text-white text-sm">{title}</span>
          </div>

          <button
            onClick={toggleFullscreen}
            className="text-white hover:text-gray-300 transition"
          >
            <Maximize size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
