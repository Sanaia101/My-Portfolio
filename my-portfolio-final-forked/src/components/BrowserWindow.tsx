import React, { FC, useState } from "react";
import Draggable from "react-draggable";
import { motion } from "framer-motion";

interface BrowserWindowProps {
  onClose: () => void;
}

const BrowserWindow: FC<BrowserWindowProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState<string | null>(null);

  const gifs: Record<string, string> = {
    about: "/gifs/dancing-baby.gif",
    blog: "/gifs/hamsterdance.gif",
    guestbook: "/gifs/glitter-heart.gif",
    downloads: "/gifs/loading-bar.gif",
  };

  return (
    <Draggable handle=".window-header">
      <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[40rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="window-header bg-gradient-to-r from-pink-500 to-pink-400 text-white p-3 flex justify-between items-center text-sm font-semibold">
          <span>🌐 PinkBrowser - Retro Web Explorer</span>
          <button onClick={onClose} className="text-white font-bold">
            ✖
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center bg-pink-100 px-3 py-2 text-xs gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="bg-white border border-pink-300 rounded px-2 py-1 w-full text-[10px] font-mono">
            http://www.sanaia-washington.com
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white p-4 h-[25rem] overflow-y-auto text-sm text-gray-800 space-y-4 font-mono">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-pink-600">
              🌸 Welcome to Sanaia's Page 🌸
            </h1>
            <motion.div
              className="overflow-hidden whitespace-nowrap text-pink-500 text-xs mt-1"
              animate={{ x: ["100%", "-100%"] }}
              transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
            >
              Under Construction 🚧 🚀 Stay tuned for updates!
            </motion.div>
          </div>

          <div className="border-2 border-pink-300 p-4 bg-pink-50 rounded shadow-inner">
            <p>
              This site was built with love, glitter, and{" "}
              <span className="font-bold">HTML 1.0</span>. Expect pop-ups, pixel
              art, and all the Y2K nostalgia you can handle 💾
            </p>
            <ul className="list-disc list-inside mt-2 text-pink-600">
              <li>
                <a href="#" className="hover:underline">
                  About Me
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Socials
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Downloads
                </a>
              </li>
            </ul>
          </div>

          <div className="text-center text-pink-500 text-xs mt-4">
            <p>Best viewed in Netscape Navigator™</p>
            <img
              src="/sticker.png"
              alt="Retro sticker"
              className="mx-auto mt-2 w-16"
            />
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default BrowserWindow;
