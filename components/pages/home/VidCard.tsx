import React, { useRef, useState, useEffect } from "react";

interface VidCardProps {
  videoSrc: string;
  title?: string;
  description?: string;
  className?: string;
  posterSrc: string;
}

const PlayIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const PauseIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const VidCard: React.FC<VidCardProps> = ({
  videoSrc,
  title,
  description,
  className = "",
  posterSrc = "/path-to-default-poster-image.jpg",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          setIsPlaying(false);
        });
    }
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div
      className={`relative border-4 border-primary rounded-2xl h-[400px] overflow-hidden group ${className}`}
    >
      <div className="h-full">
        <video
          ref={videoRef}
          src={videoSrc}
          className="w-full h-full object-cover"
          poster={posterSrc}
          title={title}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between">
        <div className="bg-gradient-to-t from-transparent to-primary/80 p-4">
          {title && (
            <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-gray-200 text-out">{description}</p>
          )}
        </div>
        <button
          onClick={togglePlay}
          className="self-center m-4 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all duration-300"
        >
          {isPlaying ? (
            <PauseIcon className="w-8 h-8 text-white" />
          ) : (
            <PlayIcon className="w-8 h-8 text-white" />
          )}
        </button>
      </div>
    </div>
  );
};

export default VidCard;
