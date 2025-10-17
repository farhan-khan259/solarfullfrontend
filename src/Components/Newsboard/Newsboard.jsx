import { useEffect, useRef } from "react";
import partnerVideo from "../../Assets/Pictures/dashvideo.MP4";
import "./Newsboard.css";

export default function Newsboard() {
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Wait for the video metadata to load before trying to play
    const playVideo = () => {
      video.play().catch((err) => {
        console.log(
          "Autoplay with sound blocked, muting video as fallback.",
          err
        );
        video.muted = true;
        video.play().catch(() => {});
      });
    };

    // Only attempt to play after metadata loaded
    video.addEventListener("loadedmetadata", playVideo);

    return () => {
      video.removeEventListener("loadedmetadata", playVideo);
    };
  }, []);

  return (
    <div className="partners-section">
      <div className="partners-grid">
        <video
          ref={videoRef}
          src={partnerVideo}
          autoPlay
          muted={false} // attempt to play with sound
          loop
          className="partner-video"
        />
      </div>
    </div>
  );
}
