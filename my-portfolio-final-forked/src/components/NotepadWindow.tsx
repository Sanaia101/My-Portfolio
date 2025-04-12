import React from "react";
import Draggable from "react-draggable";

interface NotepadWindowProps {
  onClose: () => void;
}

const NotepadWindow: React.FC<NotepadWindowProps> = ({ onClose }) => {
  return (
    <Draggable handle=".notepad-header">
      <div className="absolute top-40 left-40 w-80 bg-yellow-100 border-[3px] border-yellow-300 shadow-xl rounded-md z-50 font-mono">
        <div className="notepad-header bg-yellow-300 text-black px-4 py-2 font-bold flex justify-between items-center cursor-move rounded-t-md">
          <span>📌 Notepad</span>
          <button
            onClick={onClose}
            className="text-black hover:text-red-600 font-bold text-lg"
          >
            ✕
          </button>
        </div>
        <div className="p-4 text-gray-900">
          <ul className="list-disc list-inside space-y-2 text-sm">
            <li>
              <strong>Follow deployment plan</strong> for Sayles Away Travel Web
              Application
            </li>
            <li>
              <strong>Get Security+ certification</strong>
            </li>
          </ul>
        </div>
      </div>
    </Draggable>
  );
};

export default NotepadWindow;
