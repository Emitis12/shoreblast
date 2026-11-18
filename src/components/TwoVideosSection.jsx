
import React, { useRef, useState, useEffect } from "react";
import {
  FaVolumeMute,
  FaVolumeUp,
  FaPlay,
  FaPause,
  FaExpand,
} from "react-icons/fa";

const formatTime = (time) => {
  if (!Number.isFinite(time)) return "00:00";

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
  const playerRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [volume, setVolume] = useState(0.5);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [speed, setSpeed] = useState(1);

  // Keep video volume and mute state synchronized
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    video.volume = volume;
    video.muted = muted;
    video.playbackRate = speed;
  }, [volume, muted, speed]);

  const updateProgress = () => {
    const video = videoRef.current;

    if (!video) return;

    const current = video.currentTime || 0;
    const total = video.duration || 0;

    setCurrentTime(current);
    setProgress(total > 0 ? (current / total) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) return;

    setDuration(video.duration || 0);
    updateProgress();
  };

  const togglePlay = async () => {
    const video = videoRef.current;

    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        console.error("Video playback failed:", error);
        setIsPlaying(false);
      }
    } else {
      video.pause();
    }
  };

  const toggleMute = () => {
    setMuted((prev) => !prev);
  };

  const handleVolumeChange = (e) => {
    const vol = parseFloat(e.target.value);

    setVolume(vol);
    setMuted(vol === 0);
  };

  const handleProgressClick = (e) => {
    const video = videoRef.current;

    if (!video || !video.duration) return;

    const rect = e.currentTarget.getBoundingClientRect();

    const percent = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );

    const newTime = percent * video.duration;

    video.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(percent * 100);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = parseFloat(e.target.value);

    setSpeed(newSpeed);
  };

  const handleFullscreen = () => {
    const player = playerRef.current;

    if (!player) return;

    if (player.requestFullscreen) {
      player.requestFullscreen();
    } else if (player.webkitRequestFullscreen) {
      player.webkitRequestFullscreen();
    } else if (player.msRequestFullscreen) {
      player.msRequestFullscreen();
    }
  };

  return (
    <div
      ref={playerRef}
      className="relative group aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/10"
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        muted={muted}
        preload="metadata"
        playsInline
        className="w-full h-full object-cover"
        onLoadedMetadata={handleLoadedMetadata}
        onDurationChange={handleLoadedMetadata}
        onTimeUpdate={updateProgress}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          updateProgress();
        }}
      />

      {/* Play overlay */}
      {!isPlaying && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label={`Play video ${index}`}
          className="absolute inset-0 z-10 flex items-center justify-center bg-[#091b2b]/30 hover:bg-[#091b2b]/50 transition-all duration-300"
        >
          <span className="w-20 h-20 md:w-24 md:h-24 flex items-center justify-center rounded-full bg-amber-500 text-[#10283f] shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-white">
            <FaPlay className="text-2xl md:text-3xl ml-1" />
          </span>
        </button>
      )}

      {/* Custom video controls */}
      <div
        className={`absolute inset-x-0 bottom-0 z-20 flex flex-col justify-end px-4 md:px-6 pb-4 pt-16 bg-gradient-to-t from-[#071523]/95 via-[#071523]/60 to-transparent transition-all duration-300 ${
          isPlaying
            ? "opacity-100 md:opacity-0 md:group-hover:opacity-100"
            : "opacity-100"
        }`}
      >
        {/* Progress bar */}
        <div
          role="slider"
          aria-label="Video progress"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress)}
          tabIndex={0}
          className="h-1.5 w-full bg-white/30 rounded-full cursor-pointer mb-4 overflow-hidden hover:h-2 transition-all"
          onClick={handleProgressClick}
          onKeyDown={(e) => {
            const video = videoRef.current;

            if (!video || !video.duration) return;

            if (e.key === "ArrowRight") {
              video.currentTime = Math.min(
                video.duration,
                video.currentTime + 5
              );
            }

            if (e.key === "ArrowLeft") {
              video.currentTime = Math.max(
                0,
                video.currentTime - 5
              );
            }
          }}
        >
          <div
            className="h-full bg-amber-500 rounded-full transition-[width] duration-150"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Control buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-white">
          <div className="flex items-center gap-3 md:gap-5">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? "Pause video" : "Play video"}
              className="hover:text-amber-400 transition-colors"
            >
              {isPlaying ? <FaPause size={17} /> : <FaPlay size={17} />}
            </button>

            <button
              type="button"
              onClick={toggleMute}
              aria-label={muted ? "Unmute video" : "Mute video"}
              className="hover:text-amber-400 transition-colors"
            >
              {muted ? <FaVolumeMute size={19} /> : <FaVolumeUp size={19} />}
            </button>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              aria-label="Volume"
              className="w-16 md:w-20 accent-amber-500 cursor-pointer"
            />

            <span className="text-xs md:text-sm font-medium tabular-nums text-white/90">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3 md:gap-5">
            <select
              value={speed}
              onChange={handleSpeedChange}
              aria-label="Playback speed"
              className="bg-white/10 border border-white/20 text-white text-xs md:text-sm rounded-md px-2 py-1.5 outline-none cursor-pointer"
            >
              {[0.5, 1, 1.25, 1.5, 2].map((s) => (
                <option key={s} value={s} className="text-black">
                  {s}x
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleFullscreen}
              aria-label="Enter fullscreen"
              className="hover:text-amber-400 transition-colors"
            >
              <FaExpand size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const TwoVideosSection = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 px-5 md:px-8 bg-[#10283f]">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Section heading */}
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-amber-500" />

            <span className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">
              See What We Do
            </span>

            <span className="w-10 h-[2px] bg-amber-500" />
          </div>

          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-5">
            Our Work in Action
          </h2>

          <p className="text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-8">
            Watch how we deliver industry-leading solutions across different
            environments with precision, safety, and innovation.
          </p>

          <div className="w-16 h-1 bg-amber-500 mx-auto mt-6 rounded-full" />
        </div>

        {/* Video */}
        <div className="max-w-5xl mx-auto">
          <VideoCard
            index={1}
            src="/videos/sample2.mp4"
            poster="/videos/thumb2.jpg"
          />
        </div>

        {/* Learn more link */}
        <div className="text-center mt-12">
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-3 bg-amber-500 hover:bg-white text-[#10283f] font-bold px-7 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
          >
            Learn More About Our Services

            <FaPlay className="text-xs transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default TwoVideosSection;
