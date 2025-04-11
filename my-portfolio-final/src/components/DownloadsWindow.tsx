import React from "react";
import Draggable from "react-draggable";

interface DownloadsWindowProps {
  onClose: () => void;
}

const DownloadsWindow: React.FC<DownloadsWindowProps> = ({ onClose }) => {
  return (
    <Draggable handle=".window-header">
      <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[34rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
        {/* Header */}
        <div className="window-header bg-pink-600 text-white p-3 flex justify-between items-center text-sm font-semibold">
          <span>📂 Retro Downloads</span>
          <button onClick={onClose} className="text-white font-bold">
            ✖
          </button>
        </div>

        {/* Content */}
        <div className="bg-white p-4 text-sm text-gray-800 font-mono h-[24rem] overflow-y-auto">
          <p className="mb-3">
            Choose your favorite Y2K-era downloads below 💾👇
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="/downloads/cursor-sparkle-trail.zip"
                download
                className="hover:underline text-pink-700"
              >
                ✨ cursor-sparkle-trail.zip — Sparkly mouse trails like it’s
                1999.
              </a>
            </li>
            <li>
              <a
                href="/downloads/dialup-sound.mp3"
                download
                className="hover:underline text-pink-700"
              >
                🔊 dialup-sound.mp3 — The nostalgic screech of the internet.
              </a>
            </li>
            <li>
              <a
                href="/downloads/under-construction-banner.gif"
                download
                className="hover:underline text-pink-700"
              >
                🚧 under-construction-banner.gif — Let visitors know your site
                is never done.
              </a>
            </li>
            <li>
              <a
                href="/downloads/guestbook-template.txt"
                download
                className="hover:underline text-pink-700"
              >
                📓 guestbook-template.txt — Old-school message board style
                guestbook.
              </a>
            </li>
            <li>
              <a
                href="/downloads/clippy-plugin.trapped"
                download
                className="hover:underline text-pink-700"
              >
                📎 clippy-plugin.trapped — Clippy is trapped... and slightly
                cursed.
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-pink-700">
                🧨 retro-virus-but-safe.txt — Harmless fun with suspicious
                vibes.
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline text-pink-700">
                🕹️ install-me.exe — This totally legit installer does nothing.
                (Or does it?)
              </a>
            </li>
          </ul>

          <div className="mt-6 text-center text-xs text-pink-400">
            <p>
              Warning: These files are not actually functional, just for fun &
              nostalgia 💖
            </p>
          </div>
        </div>
      </div>
    </Draggable>
  );
};

export default DownloadsWindow;
