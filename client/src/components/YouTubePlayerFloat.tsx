import React, { useState, useEffect, useRef } from "react";
import YouTube from "react-youtube";

const YouTubePlayerFloat: React.FC = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const playerRef = useRef<HTMLDivElement>(null);

  // Snap to the nearest corner based on last left position
  const snapToCornerBasedOnLeft = (positionX: number, positionY: number) => {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    const midpointX = windowWidth / 2;
    const midpointY = windowHeight / 2;

    let snappedPosition = { x: 0, y: 0 };

    // Determine nearest horizontal side (left or right)
    if (positionX < midpointX) {
      snappedPosition.x = 10; // Snap to left
    } else {
      snappedPosition.x = windowWidth - 320; // Snap to right (adjust width)
    }

    // Determine nearest vertical side (top or bottom)
    if (positionY < midpointY) {
      snappedPosition.y = 10; // Snap to top
    } else {
      snappedPosition.y = windowHeight - 220; // Snap to bottom (adjust height)
    }

    return snappedPosition;
  };

  // Handle dragging
  const handleDrag = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - offset.x,
        y: e.clientY - offset.y,
      });
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      // Snap to the nearest corner
      setPosition(snapToCornerBasedOnLeft(position.x, position.y));
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", handleMouseUp);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (playerRef.current) {
      const rect = playerRef.current.getBoundingClientRect();
      setOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
    setIsDragging(true);
    document.addEventListener("mousemove", handleDrag);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // Set initial position when component mounts
  useEffect(() => {
    const initialPosition = snapToCornerBasedOnLeft(position.x, position.y);
    setPosition(initialPosition);
  }, []);

  return (
    <div
      ref={playerRef}
      className="fixed"
      style={{
        left: position.x,
        top: position.y,
        cursor: "move",
        width: "320px",
        height: "180px",
        zIndex: 1000,
        transition: isDragging ? "none" : "all 0.3s ease-in-out",
        border: "2px solid white",
      }}
      onMouseDown={handleMouseDown}
    >
      <div className="bg-neutral-800 p-2 w-full h-full relative">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-neutral-700 p-1 rounded-full">
          <svg
            width="20px"
            height="20px"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#ffffff"
          >
            <path
              d="M4 8C4 9.10457 3.10457 10 2 10C0.895431 10 0 9.10457 0 8C0 6.89543 0.895431 6 2 6C3.10457 6 4 6.89543 4 8Z"
              fill="#ffffff"
            />
            <path
              d="M10 8C10 9.10457 9.10457 10 8 10C6.89543 10 6 9.10457 6 8C6 6.89543 6.89543 6 8 6C9.10457 6 10 6.89543 10 8Z"
              fill="#ffffff"
            />
            <path
              d="M14 10C15.1046 10 16 9.10457 16 8C16 6.89543 15.1046 6 14 6C12.8954 6 12 6.89543 12 8C12 9.10457 12.8954 10 14 10Z"
              fill="#ffffff"
            />
          </svg>
        </div>
        <YouTube
          videoId="oL0umpPPe-8"
          iframeClassName="w-full h-full"
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      </div>
    </div>
  );
};

export default YouTubePlayerFloat;
