import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const AppMobile: React.FC = () => {
  const [aiMessages, setAiMessages] = useState<
    { sender: "user" | "ai"; text: string }[]
  >([]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);
  const [showAiBuddy, setShowAiBuddy] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);

  const [showProjects, setShowProjects] = useState(false);
  const [showResume, setShowResume] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [songIndex, setSongIndex] = useState(0);
  const [showContact, setShowContact] = useState(false);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showCallPad, setShowCallPad] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activePhoto, setActivePhoto] = useState<string | null>(null);

  const fakeSongs = [
    { title: "Glitter", artist: "Tyler, the Creator" },
    { title: "Pink + White", artist: "Frank Ocean" },
    { title: "Shea Butter Baby", artist: "Ari Lennox" },
    { title: "Can I", artist: "Kehlani" },
  ];

  const handlePrev = () =>
    setSongIndex((prev) => (prev - 1 + fakeSongs.length) % fakeSongs.length);
  const handleNext = () =>
    setSongIndex((prev) => (prev + 1) % fakeSongs.length);

  useEffect(() => {
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState<string[]>([]);

  const bootLines: string[] = [
    "Booting Sanaia's iOS...",
    "Loading widgets ✔",
    "Applying aesthetic theme ✔",
    "Welcome to SoftPastelOS 🌸",
    "C:\\SANAIA-MOBILE>_",
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

  const getAIResponse = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes("name")) return "Her name is Sanaia Washington.";
    if (q.includes("college") || q.includes("school"))
      return "She studies at the University of Houston, majoring in Computer Information Systems.";
    if (q.includes("graduate")) return "She is graduating in May 2025!";
    if (q.includes("gpa"))
      return "Her current GPA is 3.4 with a 3.9 in her major.";
    if (q.includes("internship"))
      return "She interned for two years with the IT team at Flynn Group, supporting Arby's.";
    if (q.includes("security"))
      return "She’s currently preparing for her CompTIA Security+ certification.";
    if (q.includes("goal"))
      return "Her goal is to get a Master's degree in Cybersecurity.";
    if (q.includes("skills"))
      return "She’s skilled in React, EJS, Vue, and full-stack development.";
    if (q.includes("food") || q.includes("favorite food"))
      return "Sanaia’s favorite foods are Asian cuisine, soul food, and wings!";
    if (q.includes("hobby") || q.includes("fun") || q.includes("free time"))
      return "Sanaia enjoys crocheting, reading, traveling, and building Legos in her free time!";
    return "Sorry, I don’t have that info yet! 🌸";
  };

  const handleUserMessage = () => {
    if (!userInput.trim()) return;
    const question = userInput.trim();
    setAiMessages((prev) => [...prev, { sender: "user", text: question }]);
    setUserInput("");
    setAiTyping(true);
    setTimeout(() => {
      const response = getAIResponse(question);
      setAiMessages((prev) => [...prev, { sender: "ai", text: response }]);
      setAiTyping(false);
    }, 1000);
  };

  if (!booted) {
    return (
      <div className="bg-black text-green-400 font-mono text-sm h-screen flex flex-col justify-center items-center p-4 text-center">
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

  const icons = [
    {
      emoji: "🧠",
      label: "AI Buddy",
      action: () => {
        setShowAiBuddy(true);
        setAiMessages((prev) =>
          prev.length === 0
            ? [
                {
                  sender: "ai",
                  text: "Hey there! I'm your AI Buddy 🤖. Ask me anything about Sanaia – her skills, favorite foods, or what she’s up to! 🌸",
                },
              ]
            : prev
        );
      },
    },

    { emoji: "🎓", label: "Education", action: () => setShowEducation(true) },
    { emoji: "💼", label: "Projects", action: () => setShowProjects(true) },
    { emoji: "🖼️", label: "Photos", action: () => setShowPhotos(true) },
    {
      emoji: "💾",
      label: "Resume",
      action: () => setShowResume(true),
    },

    { emoji: "⚙️", label: "Skills", action: () => setShowSkills(true) },
  ];

  return (
    <div className="min-h-screen bg-neutral-800 flex items-center justify-center p-4 font-sans overflow-y-scroll snap-y snap-mandatory scroll-smooth">
      <div className="w-full max-w-sm bg-pink-50 snap-start rounded-[2rem] border-4 border-white ring-4 ring-pink-300 shadow-2xl flex flex-col items-center px-4 pt-6 space-y-4">
        <div className="text-sm text-gray-600 w-full flex justify-end px-2">
          <span>📶 LTE 🔋</span>
        </div>

        <div className="bg-pink-300 rounded-xl p-4 shadow text-white text-left w-full max-w-xs">
          <p className="text-sm font-light">
            {new Date()
              .toLocaleDateString(undefined, { weekday: "long" })
              .toUpperCase()}
          </p>
          <p className="text-xl font-bold leading-none">
            {new Date().toLocaleDateString(undefined, {
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="text-sm font-light mt-1">
            {currentTime.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-4 w-full max-w-xs">
          <div className="col-span-3 bg-pink-200 text-pink-800 text-left rounded-xl p-3 shadow-md">
            <p className="text-xs font-semibold">Reminders</p>
            <ul className="text-xs mt-1 list-disc list-inside space-y-1">
              <li>✅ Deploy Sayles Away Travel web application</li>
              <li>🔐 Practice CTF challenges weekly</li>
              <li>🧱 Build new Lego display (Avengers tower?)</li>
            </ul>
          </div>
          {icons.map((icon, i) => (
            <div
              key={i}
              onClick={icon.action || (() => {})}
              className="bg-white/80 backdrop-blur-md border border-white rounded-2xl shadow-md p-3 flex flex-col items-center justify-center cursor-pointer"
            >
              <div className="text-xl">{icon.emoji}</div>
              <span className="text-[11px] mt-1 text-gray-700 font-semibold">
                {icon.label}
              </span>
            </div>
          ))}
        </div>

        <div className="w-full max-w-xs space-y-3 mt-4">
          <div className="bg-white/80 text-left text-xs rounded-xl p-3 shadow border border-white">
            <p className="font-semibold text-gray-700 mb-1">Now Playing 🎧</p>
            <p className="text-gray-600">
              "{fakeSongs[songIndex].title}" by {fakeSongs[songIndex].artist}
            </p>
            <div className="mt-2 flex items-center justify-between gap-2 text-[10px] text-gray-700">
              <button
                onClick={handlePrev}
                className="px-2 py-1 bg-pink-100 rounded shadow hover:bg-pink-200"
              >
                ⏮️
              </button>
              <button className="px-3 py-1 bg-pink-500 text-white rounded shadow hover:bg-pink-600">
                ⏯️
              </button>
              <button
                onClick={handleNext}
                className="px-2 py-1 bg-pink-100 rounded shadow hover:bg-pink-200"
              >
                ⏭️
              </button>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="60"
                className="w-1/2 h-1 accent-pink-400"
              />
            </div>
          </div>

          <div className="bg-white/80 text-left text-xs rounded-xl p-3 shadow border border-white">
            <p className="font-semibold text-gray-700 mb-1">Weather ☁️</p>
            <p className="text-gray-600">72°F • Mostly Sunny</p>
          </div>

          <div className="bg-white/80 text-left text-xs rounded-xl p-3 shadow border border-white">
            <p className="font-semibold text-gray-700 mb-1">Search 🔍</p>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type to search..."
              className="w-full p-1 mt-1 rounded bg-white border border-gray-300 text-xs"
            />
            {searchQuery && (
              <p className="mt-2 text-gray-500">
                Searching for: <strong>{searchQuery}</strong>
              </p>
            )}
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-lg border border-white rounded-full px-6 py-3 flex gap-12 justify-center w-full max-w-xs shadow mt-6">
          <button
            onClick={() => setShowCallPad(true)}
            className="taskbar-icon hover:scale-105 transition"
          >
            📞
            <span className="sr-only">Open Dialpad</span>
          </button>

          <button
            onClick={() => setShowBrowser(true)}
            className="taskbar-icon hover:scale-105 transition"
          >
            🌐
            <span className="sr-only">Open Browser</span>
          </button>

          <button
            onClick={() => setShowMessages(true)}
            className="taskbar-icon text-2xl hover:scale-105 transition-transform active:scale-95"
            title="Messages"
          >
            💬
          </button>
        </div>
        <footer className="text-xs text-gray-400 mt-4 italic">
          SoftPastelOS • {new Date().toLocaleDateString()}
        </footer>
      </div>

      {showCallPad && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-center rounded-xl shadow-xl border border-pink-300 w-full max-w-xs space-y-4 p-4 relative">
            {/* Header */}
            <div className="flex justify-between items-center text-pink-600 font-semibold text-sm">
              <span>📱 Pink Dialer</span>
              <button
                onClick={() => setShowCallPad(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>

            {/* Contact Info Display */}
            <div className="bg-pink-100 text-pink-700 font-mono text-[13px] leading-snug p-3 rounded-md border border-pink-300 space-y-1">
              <p className="font-bold text-sm">📞 Sanaia Washington</p>
              <p>(469) 486-1831</p>
              <p>📧 sanaiawash@gmail.com</p>
              <a
                href="https://www.linkedin.com/in/sanaia-washington-51a027245/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-pink-600 hover:text-pink-800 transition"
              >
                linkedin.com/in/sanaiawashington
              </a>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-3 gap-2 text-pink-600 font-bold text-lg">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map(
                (num) => (
                  <button
                    key={num}
                    className="bg-pink-100 border border-pink-300 rounded-full w-12 h-12 flex items-center justify-center shadow hover:bg-pink-200 transition"
                  >
                    {num}
                  </button>
                )
              )}
            </div>

            <footer className="text-center text-[10px] text-gray-400 italic pt-2 border-t border-pink-200">
              📞 Connecting retro vibes with real connections 💖
            </footer>
          </div>
        </div>
      )}

      {showPhotos && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-sm rounded-xl shadow-xl border border-pink-300 w-full max-w-md max-h-[75vh] flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-pink-500 text-white px-4 py-2 flex justify-between items-center font-semibold">
              <span>📸 Photo Gallery</span>
              <button
                onClick={() => setShowPhotos(false)}
                className="font-bold text-sm"
              >
                ✖
              </button>
            </div>

            {/* Photo Gallery */}
            <div className="p-4 bg-pink-50 flex-1 overflow-y-auto space-y-4 flex flex-col items-center justify-start">
              <div className="group w-full max-w-[80%] relative">
                <img
                  src="/Christmas.PNG"
                  alt="Christmas Vibes"
                  className="rounded-lg border border-pink-200 shadow-sm w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="group w-full max-w-[80%] relative">
                <img
                  src="/braids.png"
                  alt="Braids Slay"
                  className="rounded-lg border border-pink-200 shadow-sm w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </div>

            {/* Footer */}
            <footer className="text-center text-[10px] text-gray-400 italic py-2 border-t border-pink-200">
              📷
            </footer>
          </div>
        </div>
      )}

      {showMessages && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-sm rounded-xl shadow-xl border border-pink-300 w-full max-w-md h-[75vh] flex flex-col overflow-hidden">
            {/* Header with Contact Name */}
            <div className="bg-pink-500 text-white px-4 py-2 text-sm font-semibold flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-pink-200 border border-white text-pink-600 flex items-center justify-center text-xs font-bold">
                  A
                </div>
                <span>Ashley</span>
              </div>
              <button
                onClick={() => setShowMessages(false)}
                className="font-bold"
              >
                ✖
              </button>
            </div>

            {/* Message Thread */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 bg-pink-50 text-sm">
              {/* Ashley */}
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  Okay but why does your portfolio look ✨different✨ on my
                  phone?
                </div>
              </div>

              {/* You */}
              <div className="flex justify-end">
                <div className="bg-pink-400 text-white rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  Haha I designed it that way! Mobile has a compact taskbar &
                  smoother popups 📱
                </div>
              </div>

              {/* Ashley */}
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  Omg the boot-up screen is sooo cute 💻 it’s giving hacker
                  Barbie
                </div>
              </div>

              {/* You */}
              <div className="flex justify-end">
                <div className="bg-pink-400 text-white rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  Yesss 💅 when you open it on desktop it gives full vintage
                  desktop vibes. More windows, more flair.
                </div>
              </div>

              {/* Ashley */}
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  I love the trash bin with Clippy L 😭
                </div>
              </div>

              {/* You */}
              <div className="flex justify-end">
                <div className="bg-pink-400 text-white rounded-2xl px-4 py-2 max-w-[75%] shadow-sm">
                  Had to give him a cage & a retirement party 😂
                </div>
              </div>
            </div>

            {/* Input Bar */}
            <div className="bg-white border-t border-pink-200 px-4 py-2 flex gap-2">
              <input
                type="text"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                placeholder="iMessage..."
                className="flex-1 rounded-full border border-pink-300 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                onClick={() => {
                  if (!userInput.trim()) return;
                  setAiMessages((prev) => [
                    ...prev,
                    { sender: "user", text: userInput },
                  ]);
                  setUserInput("");
                }}
                className="bg-pink-500 text-white rounded-full px-4 py-2 font-semibold text-sm hover:bg-pink-600 transition"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}

      {showEducation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-sm rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-700">🎓 Education</p>
              <button
                onClick={() => setShowEducation(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>
            <div className="text-xs text-gray-600 space-y-2">
              <p>
                <strong>University of Houston</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Major: Computer Information Systems</li>
                <li>Graduating: May 2025</li>
                <li>GPA: 3.4 Overall | 3.9 in Major</li>
              </ul>
              <p className="mt-2">
                <strong>Focus Areas:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Frontend: React, EJS, Vue</li>
                <li>Backend: Node.js, Express, MongoDB</li>
                <li>UI/UX, Responsive Design, and Accessibility</li>
              </ul>
              <p className="mt-2">
                <strong>Projects & Experience:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Built full-stack travel and portfolio applications</li>
                <li>
                  Interned for 2 years with Flynn Group's IT team (Arby’s)
                </li>
                <li>Working toward CompTIA Security+ certification</li>
              </ul>
              <p className="mt-2 text-pink-500 font-semibold">
                💻 Passionate about building fun, modern web experiences!
              </p>
            </div>
          </div>
        </div>
      )}

      {showBrowser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-sm rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-xl max-h-[85vh] overflow-hidden space-y-4">
            {/* Header */}
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-pink-600">🌐 Sanaia's Browser</p>
              <button
                onClick={() => setShowBrowser(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>

            {/* Fake URL bar */}
            <div className="flex items-center gap-2 bg-pink-100 border border-pink-300 rounded-md px-3 py-1 text-xs">
              <span className="text-pink-500">🔍</span>
              <input
                disabled
                value="https://www.pinkOS.com"
                className="bg-transparent w-full outline-none text-pink-700 placeholder:text-pink-300"
              />
            </div>

            {/* Body Content */}
            <div className="bg-white border border-gray-200 rounded-xl p-4 h-[55vh] overflow-y-auto space-y-3 text-xs text-gray-700">
              <div className="text-center text-pink-600 font-semibold text-base">
                🚧 Welcome to PinkNet 🌐
              </div>
              <p className="text-center text-xs italic mb-2">
                Your destination for pastel internet nostalgia ✨
              </p>

              <div className="space-y-2">
                <div className="border border-pink-200 bg-pink-50 rounded-lg p-3 shadow-sm">
                  <h3 className="font-bold text-pink-600 mb-1">
                    📰 90s News Flash!
                  </h3>
                  <p>
                    “Y2K Bug narrowly avoided!” - Local floppy disk survives
                    near deletion event.
                  </p>
                </div>

                <div className="border border-gray-200 rounded-lg p-3 bg-white">
                  <h3 className="font-bold text-pink-500 mb-1">
                    💖 Featured Site
                  </h3>
                  <p>
                    <strong>🌐 Sanaia's Portfolio</strong>: A portfolio powered
                    by pixels & pink power.
                  </p>
                </div>

                <div className="text-center text-gray-400 text-[10px] italic mt-4 border-t pt-2 border-pink-200">
                  🧠 Surf safe. Powered by PinkOS™
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showProjects && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-sm rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-md max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-pink-600">📁 Projects</p>
              <button
                onClick={() => setShowProjects(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>

            <div className="space-y-3">
              <div className="bg-pink-100 border border-pink-300 rounded-xl p-3 animate-pulse">
                <p className="font-semibold text-pink-700 mb-1">
                  🚧 Sayles Away Travel
                </p>
                <p className="text-xs text-gray-700">
                  A sleek full-stack travel web app — built with 💖 using React,
                  Node.js, MySQL, and AWS.
                </p>
                <div className="mt-2 p-2 bg-white border border-pink-200 rounded text-center shadow text-xs text-pink-600 font-bold">
                  🚀 Coming Soon to a Browser Near You...
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="font-semibold text-pink-500 mb-1">
                  🧠 Advanced App Dev Project
                </p>
                <p className="text-xs text-gray-600">
                  A full-stack app combining Node.js and Python with
                  interactive, responsive design.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="font-semibold text-pink-500 mb-1">
                  🛠 Info Systems App Development
                </p>
                <p className="text-xs text-gray-600">
                  Created a user-friendly computer parts menu using Python —
                  simple, fast, functional.
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="font-semibold text-pink-500 mb-1">
                  🧅 Intrusion Detection Lab
                </p>
                <p className="text-xs text-gray-600">
                  Detected & analyzed cyber threats using Wireshark and Security
                  Onion like a pro 🕵🏽‍♀️
                </p>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-3">
                <p className="font-semibold text-pink-500 mb-1">
                  🌐 Network Infrastructure Design
                </p>
                <p className="text-xs text-gray-600">
                  Designed a complete ISO-compliant network layout with subnets,
                  topology, and budgeting.
                </p>
              </div>
            </div>

            <footer className="text-center text-[11px] text-gray-400 italic pt-2 border-t border-pink-200">
              🚧 Projects built with passion, code, and pastel magic ✨
            </footer>
          </div>
        </div>
      )}

      {showResume && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-sm rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-md max-h-[85vh] overflow-hidden space-y-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-pink-600">💾 Resume</p>
              <button
                onClick={() => setShowResume(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>

            <div className="flex items-center justify-center h-full">
              <a
                href="/SanaiaWashingtonResume.pdf"
                download
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-pink-400 bg-pink-200 text-pink-800 font-bold text-xs shadow-md hover:shadow-lg hover:bg-pink-300 transition-all duration-300 group"
              >
                <span className="animate-bounce">📥</span>
                Download Resume
                <span className="absolute right-2 top-1 text-[10px] text-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  (PDF)
                </span>
              </a>
            </div>

            <footer className="text-center text-[11px] text-gray-400 italic pt-2 border-t border-pink-200">
              📄 Built with pixels, professionalism & pink power 💖
            </footer>
          </div>
        </div>
      )}

      {showSkills && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-sm rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-xs">
            <div className="flex justify-between items-center mb-2">
              <p className="font-semibold text-gray-700">⚙️ Skills</p>
              <button
                onClick={() => setShowSkills(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>
            <ul className="list-disc text-xs text-gray-600 pl-5 space-y-1">
              <li>React, Vue, EJS</li>
              <li>Full Stack Dev</li>
              <li>Cybersecurity Fundamentals</li>
              <li>Node, Express, MongoDB</li>
            </ul>
          </div>
        </div>
      )}

      {showAiBuddy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white text-left text-xs rounded-xl p-4 shadow-xl border border-pink-300 w-full max-w-xs">
            <div className="flex justify-between items-center mb-1">
              <p className="font-semibold text-gray-700">AI Buddy 🧠</p>
              <button
                onClick={() => setShowAiBuddy(false)}
                className="text-pink-500 font-bold text-sm"
              >
                ✖
              </button>
            </div>
            <div className="h-32 overflow-y-auto space-y-1 text-xs">
              {aiMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`text-left ${
                    msg.sender === "ai" ? "text-pink-600" : "text-gray-800"
                  }`}
                >
                  <strong>{msg.sender === "ai" ? "AI" : "You"}:</strong>{" "}
                  {msg.text}
                </div>
              ))}
              {aiTyping && (
                <div className="italic text-pink-400">AI is typing...</div>
              )}
            </div>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleUserMessage()}
              placeholder="Ask me anything..."
              className="w-full p-1 mt-2 rounded bg-white border border-gray-300 text-xs"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppMobile;
