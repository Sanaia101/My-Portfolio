import React, { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { motion, AnimatePresence } from "framer-motion";

interface PhotosWindowProps {
  onClose: () => void;
}

const photoPaths = ["/Christmas.PNG", "/braids.png"];

const PhotosWindow: React.FC<PhotosWindowProps> = ({ onClose }) => {
  const [index, setIndex] = useState(0);

  // Preload images
  useEffect(() => {
    photoPaths.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % photoPaths.length);
    }, 1500); // Faster slideshow
    return () => clearInterval(interval);
  }, []);

  return (
    <Draggable handle=".window-header">
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[26rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-sm font-semibold">
          <span>🖼️ Photo Viewer</span>
          <button onClick={onClose} className="text-white font-bold">
            ✖
          </button>
        </div>

        {/* Slideshow */}
        <div className="p-4 bg-pink-50 h-[20rem] flex items-center justify-center relative">
          <AnimatePresence mode="wait">
            <motion.img
              key={photoPaths[index]}
              src={photoPaths[index]}
              alt={`Photo ${index + 1}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.6 }}
              className="w-full max-h-full object-contain rounded border border-pink-300 shadow"
            />
          </AnimatePresence>
        </div>

        <div className="text-center text-xs text-pink-600 pb-3">
          Auto-rotating slideshow every 1.5s ✨
        </div>
      </div>
    </Draggable>
  );
};

export default PhotosWindow;
