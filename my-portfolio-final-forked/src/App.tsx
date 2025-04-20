import TrashBinWindow from "./TrashBinWindow";
import BrowserWindow from "./components/BrowserWindow";
import DownloadsWindow from "./components/DownloadsWindow";
import PhotosWindow from "./components/PhotosWindow";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import NotepadWindow from "./components/NotepadWindow";

const App: React.FC = () => {
  const [showAiBuddy, setShowAiBuddy] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [aiMessages, setAiMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [showSkills, setShowSkills] = useState(false);
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showTrash, setShowTrash] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showDownloads, setShowDownloads] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [zIndices, setZIndices] = useState<Record<string, number>>({});
  const [zCounter, setZCounter] = useState(100);
  const [showProjects, setShowProjects] = useState(false);
  const [showNotepad, setShowNotepad] = useState(false);

  const bringToFront = (key: string) => {
    setZCounter((prev) => {
      const newZ = prev + 1;
      setZIndices((z) => ({ ...z, [key]: newZ }));
      return newZ;
    });
  };

  const toggleWindow = (
    setter: React.Dispatch<React.SetStateAction<boolean>>,
    current: boolean,
    key: string
  ) => {
    if (current) {
      setter(false);
    } else {
      bringToFront(key);
      setter(true);
    }
  };

  const bootLines: string[] = [
    "Initializing PinkOS...",
    "Verifying system integrity ✔",
    "Launching Sanaia's Desktop ✔",
    "Loading UI... ✔",
    "Welcome, User. 🌸",
    "C:\\SANAIA>_",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setVisibleLines((prev) => [...prev, bootLines[index]]);
      index++;
      if (index === bootLines.length) {
        clearInterval(interval);
        setTimeout(() => setBooted(true), 1000);
      }
    }, 700);
    return () => clearInterval(interval);
  }, []);

  if (!booted) {
    return (
      <div className="bg-black text-green-500 font-mono text-sm h-screen flex flex-col justify-center items-center p-4 text-center">
        {visibleLines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.3 }}
          >
            {line}
          </motion.p>
        ))}
      </div>
    );
  }

  return (
    <main>
      {/* SIDEBAR ICONS */}
      <div className="fixed top-20 left-2 flex flex-col items-center gap-6 z-40">
        <button
          onClick={() => toggleWindow(setShowTrash, showTrash, "trash")}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">🗑️</span>
          <span className="text-[10px] mt-1 text-white">Trash</span>
        </button>
        <button
          onClick={() => toggleWindow(setShowNotepad, showNotepad, "notepad")}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">📝</span>
          <span className="text-[10px] mt-1 text-white">Notepad</span>
        </button>
        <button
          onClick={() => toggleWindow(setShowBrowser, showBrowser, "browser")}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">🌐</span>
          <span className="text-[10px] mt-1 text-white">Browser</span>
        </button>
        <button
          onClick={() => toggleWindow(setShowDownloads, showDownloads, "downloads")}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">📂</span>
          <span className="text-[10px] mt-1 text-white">Downloads</span>
        </button>
        <button
          onClick={() => {
            if (!showAiBuddy && aiMessages.length === 0) {
              setAiMessages([
                {
                  sender: "ai",
                  text:
                    "Hey there! I’m your AI Buddy, happy to chat about all things Sanaia. 🌸\n",
                },
              ]);
            }
            toggleWindow(setShowAiBuddy, showAiBuddy, "ai");
          }}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">🧠</span>
          <span className="text-[10px] mt-1 text-white">AI Buddy</span>
        </button>
        <button
          onClick={() => toggleWindow(setShowPhotos, showPhotos, "photos")}
          className="flex flex-col items-center cursor-pointer hover:scale-110 transition-transform focus:outline-none"
        >
          <span className="text-2xl">🖼️</span>
          <span className="text-[10px] mt-1 text-white">Photos</span>
        </button>
      </div>


      {/* START MENU */}
      {showStartMenu && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-12 left-4 w-48 bg-white border border-pink-400 shadow-xl z-50 rounded text-sm p-2"
        >
          <p className="font-bold mb-2">🌸 PinkOS Menu</p>
          <ul className="space-y-1">
            <li>
              <button
                onClick={() => {
                  setShowSkills(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowSkills(false)}
                className="hover:underline"
              >
                ⚙️ Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowResume(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowResume(false)}
                className="hover:underline"
              >
                💾 Resume
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowContact(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowContact(false)}
                className="hover:underline"
              >
                📞 Contact
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowEducation(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowEducation(false)}
                className="hover:underline"
              >
                🎓 Education
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowAiBuddy(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowAiBuddy(false)}
                className="hover:underline"
              >
                🧠 AI Buddy
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowPhotos(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowPhotos(false)}
                className="hover:underline"
              >
                🖼️ Photos
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowDownloads(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowDownloads(false)}
                className="hover:underline"
              >
                📂 Downloads
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowBrowser(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowBrowser(false)}
                className="hover:underline"
              >
                🌐 Browser
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setShowTrash(true);
                  setShowStartMenu(false);
                }}
                onTouchStart={() => setShowTrash(false)}
                className="hover:underline"
              >
                🗑️ Trash
              </button>
            </li>
          </ul>
        </motion.div>
      )}

      {showPhotos && (
        <div
          style={{ zIndex: zIndices["photos"] || 1 }}
          onMouseDown={() => bringToFront("photos")}
          onTouchStart={() => bringToFront("photos")}
        >
          <PhotosWindow onClose={() => setShowPhotos(false)} />
        </div>
      )}

      {showTrash && (
        <div
          style={{ zIndex: zIndices["trash"] || 1 }}
          onMouseDown={() => bringToFront("trash")}
          onTouchStart={() => bringToFront("trash")}
        >
          <TrashBinWindow onClose={() => setShowTrash(false)} />
        </div>
      )}

      {showBrowser && (
        <div
          style={{ zIndex: zIndices["browser"] || 1 }}
          onMouseDown={() => bringToFront("browser")}
          onTouchStart={() => bringToFront("browser")}
        >
          <BrowserWindow onClose={() => setShowBrowser(false)} />
        </div>
      )}

      {showDownloads && (
        <div
          style={{ zIndex: zIndices["downloads"] || 1 }}
          onMouseDown={() => bringToFront("downloads")}
          onTouchStart={() => bringToFront("downloads")}
        >
          <DownloadsWindow onClose={() => setShowDownloads(false)} />
        </div>
      )}

      {showResume && (
        <div
          style={{ zIndex: zIndices["resume"] || 1 }}
          onMouseDown={() => bringToFront("resume")}
          onTouchStart={() => bringToFront("resume")}
        >
          <Draggable handle=".window-header" cancel=".close-btn">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[36rem] h-[28rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
                <span>💾 Resume</span>
                <button
                  onClick={() => setShowResume(false)}
                  onTouchStart={() => setShowResume(false)}
                  className="text-white font-bold"
                >
                  ✖
                </button>
              </div>
              <iframe
                src="/SanaiaWashingtonResume.pdf"
                title="Resume"
                className="w-full h-full border-none"
              />
            </div>
          </Draggable>
        </div>
      )}
      {showProjects && (
        <div
          style={{ zIndex: zIndices["projects"] || 1 }}
          onMouseDown={() => bringToFront("projects")}
          onTouchStart={() => bringToFront("projects")}
        >
          <Draggable handle=".window-header" cancel=".close-btn">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[30rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
                <span>📁 Projects</span>
                <button
                  onClick={() => setShowProjects(false)}
                  onTouchStart={() => setShowProjects(false)}
                  className="text-white font-bold"
                >
                  ✖
                </button>
              </div>

              <div className="p-4 text-sm text-gray-800">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-pink-600 font-bold">
                    🌎 Sayles Away Travel
                  </h3>
                  <span className="text-xs bg-pink-500 text-white px-2 py-0.5 rounded-full animate-pulse">
                    NEW!
                  </span>
                </div>
                <p>
                  A full stack travel web application. Led a team of 7 as
                  Project Manager to plan, build, and deploy a responsive travel
                  platform.
                </p>
                <ul className="list-disc list-inside mt-2 text-sm text-pink-700">
                  <li>👑 Project Manager</li>
                  <li>✨ Frontend: React, HTML, CSS</li>
                  <li>⚙️ Backend: Node.js, Python, MySQL</li>
                  <li>☁️ Deployment: AWS & GitHub</li>
                </ul>

                <div className="mt-4 bg-black text-green-500 font-mono text-xs p-3 rounded shadow-inner border border-pink-300">
                  <p>C:\Users\Sanaia&gt; npm start</p>
                  <p>✔ Launching Sayles Away Travel...</p>
                  <p>🌐 Connected. All systems online.</p>
                </div>

                <hr className="my-4" />

                <h4 className="text-pink-600 font-semibold">
                  Other Cool Projects
                </h4>
                <ul className="list-disc list-inside mt-1 text-sm text-gray-700">
                  <li>
                    🛡️ Intrusion Detection with Wireshark, Security Onion & Kali
                    Linux
                  </li>
                  <li>
                    🌐 Information Systems Infrastructure Design with MS Visio
                  </li>
                  <li>🧰 Computer Parts Service Menu (Python)</li>
                  <li>🧠 Advanced App Dev with Full Stack Node.js + JS</li>
                </ul>
              </div>
            </div>
          </Draggable>
        </div>
      )}

      {showSkills && (
        <div
          style={{ zIndex: zIndices["skills"] || 1 }}
          onMouseDown={() => bringToFront("skills")}
          onTouchStart={() => bringToFront("skills")}
        >
          <Draggable handle=".window-header" cancel=".close-btn">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[30rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
                <span>⚙️ Skills</span>
                <button
                  onClick={() => setShowSkills(false)}
                  onTouchStart={() => setShowSkills(false)}
                  className="text-white font-bold"
                >
                  ✖
                </button>
              </div>
              <div className="p-4 space-y-3 text-sm text-gray-800">
                <h4 className="font-semibold text-pink-700 text-base">
                  Web Development
                </h4>
                <p>Proficient in both front-end and back-end technologies:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>HTML, CSS, JavaScript</li>
                  <li>React, Vue, EJS</li>
                  <li>Tailwind CSS, Bootstrap</li>
                  <li>Node.js, Express</li>
                  <li>MongoDB, MySQL</li>
                  <li>RESTful API development</li>
                  <li>Full-stack app architecture</li>
                </ul>
                <hr className="my-2" />
                <h4 className="font-semibold text-pink-700 text-base">
                  Cybersecurity
                </h4>
                <p>Knowledgeable in security fundamentals and practices:</p>
                <ul className="list-disc list-inside pl-4">
                  <li>CompTIA Security+ (in progress)</li>
                  <li>Network security & intrusion detection</li>
                  <li>Penetration testing tools (e.g., Wireshark, Nmap)</li>
                  <li>Authentication, authorization, and access control</li>
                  <li>Security principles: CIA Triad, risk management</li>
                  <li>Secure development practices for web apps</li>
                </ul>
              </div>
            </div>
          </Draggable>
        </div>
      )}

      {showEducation && (
        <div
          style={{ zIndex: zIndices["education"] || 1 }}
          onMouseDown={() => bringToFront("education")}
          onTouchStart={() => bringToFront("education")}
        >
          <Draggable handle=".window-header" cancel=".close-btn">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[30rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
                <span>🎓 Education</span>
                <button
                  onClick={() => setShowEducation(false)}
                  onTouchStart={() => setShowEducation(false)}
                  className="text-white font-bold"
                >
                  ✖
                </button>
              </div>
              <div className="p-4 text-sm leading-relaxed text-gray-800">
                <h4 className="font-semibold text-pink-700">
                  University of Houston
                </h4>
                <p>B.S. in Computer Information Systems</p>
                <p className="italic text-xs">Graduating May 2025</p>
                <p>GPA: 3.4 | Major GPA: 3.9</p>
                <hr className="my-2" />
                <h4 className="font-semibold text-pink-700">Collin College</h4>
                <p>Associates of Science | GPA: 3.7</p>
                <hr className="my-2" />
                <h4 className="font-semibold text-pink-700">High School</h4>
                <p>The Colony High School</p>
              </div>
            </div>
          </Draggable>
        </div>
      )}

      {showContact && (
        <div
          style={{ zIndex: zIndices["contact"] || 1 }}
          onMouseDown={() => bringToFront("contact")}
          onTouchStart={() => bringToFront("contact")}
        >
          <Draggable handle=".window-header" cancel=".close-btn">
            <div className="absolute top-28 left-1/2 transform -translate-x-1/2 w-[28rem] bg-white border border-pink-300 shadow-2xl rounded-xl z-50 overflow-hidden">
              <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
                <span>📞 Contact</span>
                <button
                  onClick={() => setShowContact(false)}
                  onTouchStart={() => setShowContact(false)}
                  className="text-white font-bold"
                >
                  ✖
                </button>
              </div>
              <div className="p-4 space-y-3 text-sm text-gray-800">
                <p>You can reach out to me via the following methods:</p>
                <p>
                  <strong>Email:</strong> sanaiawash@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> (469) 486-1831
                </p>
                <p>
                  <strong>LinkedIn:</strong>{" "}
                  <a
                    href="https://www.linkedin.com/in/sanaia-washington-51a027245/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    linkedin.com/in/sanaia
                  </a>
                </p>
                <p>
                  <strong>GitHub:</strong>{" "}
                  <a
                    href="https://github.com/sanaia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:underline"
                  >
                    github.com/sanaia
                  </a>
                </p>
              </div>
            </div>
          </Draggable>
        </div>
      )}

     

    

      {/* TASKBAR */}

      <div className="fixed bottom-0 left-0 w-full bg-pink-500 text-white text-xs h-10 flex items-center justify-between px-2 border-t-2 border-pink-700 z-50">
        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex gap-4 text-white font-semibold text-xs">
            <button
              onClick={() => setShowStartMenu((prev) => !prev)}
              onTouchStart={() => setShowStartMenu(false)}
              className="bg-pink-800 hover:bg-pink-700 px-3 py-1 rounded shadow flex items-center gap-2"
            >
              <span className="text-lg">🌸</span>
              <span className="font-semibold">Start</span>
            </button>
            <button
              onClick={() => setShowResume(true)}
              onTouchStart={() => setShowResume(false)}
              className="hover:underline"
            >
              💾 Resume
            </button>
            <button
              onClick={() => setShowProjects(true)}
              onTouchStart={() => setShowProjects(false)}
              className="hover:underline"
            >
              📁 Projects
            </button>
            <button
              onClick={() => setShowContact(true)}
              onTouchStart={() => setShowContact(false)}
              className="hover:underline"
            >
              📞 Contact
            </button>
            <button
              onClick={() => setShowSkills(true)}
              onTouchStart={() => setShowSkills(false)}
              className="hover:underline"
            >
              ⚙️ Skills
            </button>
            <button
              onClick={() => setShowEducation(true)}
              onTouchStart={() => setShowEducation(false)}
              className="hover:underline"
            >
              🎓 Education
            </button>
          </nav>
        </div>
        <span className="opacity-80 pr-2">
          🕒{" "}
          {new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      </div>

      {/* AI BUDDY WINDOW */}
      {showAiBuddy && (
        <Draggable handle=".window-header" cancel=".close-btn">
          <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[28rem] bg-white rounded-xl border border-pink-300 shadow-2xl z-50 flex flex-col overflow-hidden">
            <div className="window-header bg-pink-500 text-white p-3 flex justify-between items-center text-base font-semibold">
              <span>AI Buddy</span>
              <button
                onClick={() => setShowAiBuddy(false)}
                onTouchStart={() => setShowAiBuddy(false)}
                className="text-white font-bold"
              >
                ✖
              </button>
            </div>
            <div className="flex-1 px-4 py-3 space-y-3 overflow-y-auto max-h-[22rem] bg-white">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.sender === "ai" ? "justify-start" : "justify-end"
                  }`}
                >
                  <div
                    className={`px-4 py-2 max-w-[80%] rounded-2xl text-sm shadow-md ${
                      msg.sender === "ai"
                        ? "bg-pink-100 text-gray-800"
                        : "bg-pink-500 text-white"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {aiTyping && (
                <div className="text-xs italic text-gray-500 pl-2">
                  AI Buddy is typing...
                </div>
              )}
            </div>
            <div className="p-3 border-t border-pink-200 bg-pink-50">
              <input
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleUserMessage()}
                className="w-full border border-pink-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="Ask me anything about Sanaia..."
              />
            </div>
          </div>
        </Draggable>
      )}
    </main>
  );
};

export default App;
