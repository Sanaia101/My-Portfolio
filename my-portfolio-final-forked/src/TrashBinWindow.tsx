import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Draggable from "react-draggable";

interface TrashBinWindowProps {
  onClose: () => void;
}

const TrashBinWindow: React.FC<TrashBinWindowProps> = ({ onClose }) => {
  const [activeFile, setActiveFile] = useState<null | {
    name: string;
    message: string;
  }>(null);
  const [full, setFull] = useState(false);

  const files = [
    {
      name: "MySpaceLayout.css",
      message: "This glitter background was peak design ✨",
    },
    { name: "NeopetsHighScore.png", message: "RIP 200k Neopoints 💸" },
    { name: "FlashGame.swf", message: "Requires Flash Player 6. Good luck!" },
    { name: "x0f3dd###.dll", message: "Corrupted. What even is this?" },
    { name: "???.exe", message: "Run this to meet instant regret." },
    {
      name: "virus_but_trust_me.txt",
      message: "Totally not a virus... pinky swear! 🤞",
    },
    {
      name: "clippy_assistant.trapped",
      message: "Clippy says: 'It looks like you're trying to escape...'",
    },
  ];

  const playRetroSound = () => {
    const audio = new Audio("/retro-click.mp3");
    audio.play().catch((e) => console.warn("Autoplay prevented:", e));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFull(true);
      setTimeout(() => setFull(false), 3000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Draggable handle=".window-header">
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[28rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
        <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
          <span>{full ? "🗑️ Trash (FULL)" : "🗑️ Trash"}</span>
          <button onClick={onClose} className="text-white font-bold">
            ✖
          </button>
        </div>

        <div className="p-4 space-y-2 text-sm text-gray-800 h-64 overflow-y-auto bg-pink-50">
          {files.map((file) => (
            <div
              key={file.name}
              className="cursor-pointer hover:text-pink-700"
              onClick={() => setActiveFile(file)}
            >
              📄 {file.name}
            </div>
          ))}
          <div className="mt-4 border-t pt-2">
            <div className="text-xs text-gray-500 italic mb-2">
              Clippy (Retired)
            </div>
            <div className="text-center text-lg">📎🚫</div>
            <div className="text-center text-xs text-gray-500">
              "I'm in a cage... help..."
            </div>
          </div>
        </div>

        <div className="p-3 border-t border-pink-200 bg-pink-100 flex justify-center">
          <button
            onClick={playRetroSound}
            className="bg-pink-600 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-700 transition"
          >
            🔁 Restore Files
          </button>
        </div>

        <AnimatePresence>
          {activeFile && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="absolute inset-0 bg-white/90 backdrop-blur-sm p-6 flex flex-col items-center justify-center z-50"
            >
              <div className="text-xl font-bold mb-2">📂 {activeFile.name}</div>
              <p className="text-sm text-gray-700 mb-4">{activeFile.message}</p>
              <button
                onClick={() => setActiveFile(null)}
                className="bg-pink-500 text-white px-4 py-1 rounded-full text-sm hover:bg-pink-600"
              >
                Close
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Draggable>
  );
};

export default TrashBinWindow;
