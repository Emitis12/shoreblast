import React, { useRef, useState, useEffect } from "react";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaExpand,
} from "react-icons/fa";

const formatTime = (time) => {
  const minutes = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const VideoCard = ({ index, src, poster }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  useEffect(() => {
    const video = videoRef.current;
    const interval = setInterval(() => {
      if (video && !video.paused) {
        setCurrentTime(video.currentTime);
        setProgress((video.currentTime / video.duration) * 100);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video.paused) {
      video.play();
      setIsPlaying(true);
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    const video = videoRef.current;
    video.muted = !muted;
    setMuted(!muted);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);
    setVolume(vol);
    videoRef.current.volume = vol;
    if (vol > 0 && muted) toggleMute();
  };

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * videoRef.current.duration;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);
    videoRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleLoadedMetadata = () => {
    setDuration(videoRef.current.duration);
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) video.requestFullscreen();
    else if (video.webkitRequestFullscreen) video.webkitRequestFullscreen();
    else if (video.msRequestFullscreen) video.msRequestFullscreen();
  };

  return (
    <div className="relative group aspect-video rounded-lg overflow-hidden shadow-lg transition transform hover:scale-[1.01] bg-black">
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        volume={volume}
        preload="metadata"
        className="w-full h-full object-cover"
        onLoadedMetadata={handleLoadedMetadata}
      />

      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/50 transition hover:bg-black/60 z-10"
        >
          <FaPlay className="text-white text-5xl" />
        </button>
      )}

      <div
        className={`absolute inset-0 flex flex-col justify-end transition duration-300 bg-gradient-to-t from-black/70 via-transparent to-transparent px-4 pb-4
        ${isPlaying ? 'md:opacity-0 md:group-hover:opacity-100 opacity-100' : 'opacity-0 md:group-hover:opacity-100'}`}
      >
        <div
          className="h-2 w-full bg-gray-600 rounded cursor-pointer mb-2"
          onClick={handleProgressClick}
        >
          <div
            className="h-full bg-blue-600 rounded"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-white text-sm">
          <div className="flex items-center gap-3">
            <button onClick={togglePlay}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>

            <button onClick={toggleMute}>
              {muted ? <FaVolumeMute /> : <FaVolumeUp />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-20"
            />

            <span>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={speed}
              onChange={handleSpeedChange}
              className="bg-white text-black rounded px-1 py-0.5"
            >
              {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                <option key={s} value={s}>
                  {s}x
                </option>
              ))}
            </select>

            <button onClick={handleFullscreen}>
              <FaExpand />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TwoVideosSection = () => {
  return (
    <section className="py-12 px-4 bg-gray-100">
      <div className="max-w-6xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold mb-4">Our Work in Action</h2>
        <p className="text-lg text-gray-700 max-w-3xl mx-auto">
          Watch how we deliver industry-leading solutions across different environments with precision, safety, and innovation.
        </p>
      </div>

      {/* Only second video displayed, made slightly larger */}
      <div className="max-w-5xl mx-auto">
        <VideoCard index={1} src="/videos/sample2.mp4" poster="/videos/thumb2.jpg" />
      </div>

      <div className="text-center mt-10">
        <button className="bg-blue-700 text-white px-6 py-3 rounded-md text-lg hover:bg-blue-800 transition">
          Learn More About Our Services
        </button>
      </div>
    </section>
  );
};

export default TwoVideosSection;
