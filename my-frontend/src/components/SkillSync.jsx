import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import QuizOverlay from "./quiz/QuizOverlay";
import GuessMyNumber from "./game/GuessMyNumber";

function SkillSync() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [flipped, setFlipped] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showQuizOverlay, setShowQuizOverlay] = useState(false);
  const [showGame, setShowGame] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();
    if (form.email === "test@example.com" && form.password === "123456") {
      setIsAuthenticated(true);
    } else {
      alert("Invalid credentials. Try test@example.com / 123456");
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600">
        <motion.div
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-indigo-600">
            Welcome to SkillSync
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring focus:ring-indigo-200"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
            >
              Login
            </motion.button>
          </form>
          <p className="text-sm text-gray-500 mt-4 text-center">
            Use <b>test@example.com</b> / <b>123456</b> to login.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="font-inter bg-slate-100 overflow-x-hidden">
      {/* Header */}
      <motion.header
        className="bg-white shadow-sm"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img
              src="/logo.png"
              alt="SkillSync Logo"
              className="h-10 w-10 rounded-lg"
            />
            <h1 className="text-xl font-bold text-gray-900">SkillSync</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              {["Flashcards", "Progress", "Community"].map((item, i) => (
                <motion.li key={i} whileHover={{ scale: 1.1 }}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-600 hover:text-indigo-600 font-medium transition"
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </nav>
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Sign In
          </motion.button> */}
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial={{ x: -80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Your AI-Powered Study Buddy
            </h2>
            <p className="text-indigo-100 mb-6">
              Transform how you learn with personalized flashcards, quizzes, and
              progress tracking powered by AI.
            </p>
            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowOverlay(true)}
                className="bg-white text-indigo-600 px-6 py-2 rounded-lg font-medium hover:bg-indigo-50 transition"
              >
                Get Started
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowInstructions(true)}
                className="border border-white text-white px-6 py-2 rounded-lg font-medium hover:bg-indigo-700 transition"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className="md:w-1/2"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: [0, -10, 0], opacity: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img src="/hero.png" alt="Hero" className="rounded-lg shadow-xl" />
          </motion.div>
        </div>
      </section>

      {/* ✅ Modal Overlay */}
      {showInstructions && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="bg-white p-8 rounded-xl shadow-xl max-w-lg w-full text-center"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-indigo-600">
              Welcome to SkillSync
            </h2>
            <p className="text-gray-600 mb-6">
              🚀 SkillSync helps you study smarter with:
              <br /> • AI-powered flashcards
              <br /> • Interactive quizzes
              <br /> • Progress tracking
              <br /> • A supportive community
              <br /> • 🧠MIND SET GAME ON CLICK GET STARTED
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowInstructions(false)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Close
            </motion.button>
          </motion.div>
        </motion.div>
      )}

      {/* 🔥 Fullscreen Overlay with Animation (Game + Quiz) */}
      <AnimatePresence>
        {showOverlay && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600 p-8"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-5xl w-full p-10 overflow-y-auto">
              <button
                onClick={() => setShowOverlay(false)}
                className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
              >
                ❌
              </button>
              <h2 className="text-3xl font-bold text-center text-indigo-600 mb-8">
                Let’s Begin!
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                {/* 🎮 Game Section */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-50 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Game Section 🎮
                  </h3>
                  <p className="text-gray-700">
                    Play interactive memory games to boost your learning.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowGame(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
                  >
                    Start Game
                  </motion.button>
                </motion.div>
                {showGame && (
                  <GuessMyNumber
                    onClose={() => setShowGame(false)}
                    onNext={() => alert("Next button clicked!")}
                  />
                )}

                {/* 📝 Quiz Section */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-indigo-50 rounded-xl p-6 shadow-md"
                >
                  <h3 className="text-xl font-semibold mb-4">
                    Quiz Section 📝
                  </h3>
                  <p className="text-gray-700">
                    Test your knowledge with quizzes and get instant feedback.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setShowQuizOverlay(true)}
                    className="bg-indigo-600 text-white px-6 py-3 rounded-lg"
                  >
                    Start Quiz
                  </motion.button>
                </motion.div>
                {/* Quiz Overlay */}
                <QuizOverlay
                  showQuizOverlay={showQuizOverlay}
                  setShowQuizOverlay={setShowQuizOverlay}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Flashcards */}
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.section
          id="flashcards"
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Flashcards Demo
            </h2>
          </div>

          <motion.div
            className="flashcard mx-auto mb-8 relative cursor-pointer"
            style={{ height: "250px", maxWidth: "500px" }}
            onClick={() => setFlipped(!flipped)}
            whileHover={{ scale: 1.05 }}
          >
            <div
              className="flashcard-inner w-full h-full transition-transform duration-700"
              style={{
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "none",
              }}
            >
              <div className="absolute inset-0 bg-white rounded-xl shadow-lg flex items-center justify-center backface-hidden">
                <h3 className="text-xl font-semibold">
                  What is the capital of France?
                </h3>
              </div>
              <div
                className="absolute inset-0 bg-indigo-50 rounded-xl shadow-lg flex items-center justify-center backface-hidden"
                style={{ transform: "rotateY(180deg)" }}
              >
                <p className="text-lg">Paris</p>
              </div>
            </div>
          </motion.div>

          {/* <div className="flex justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
            >
              Flip Card
            </motion.button>
            
             <motion.button
              whileHover={{ scale: 1.05 }}
              className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            >
              Add Card
            </motion.button>
          </div> */}
        </motion.section>

        {/* Quiz Section */}
        {/* <motion.section
          id="quiz"
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Test Your Knowledge
          </h2>
          <motion.div
            className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto"
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-xl font-semibold mb-4">
              Which of the following is NOT a JavaScript data type?
            </h3>
            <div className="space-y-3 mb-6">
              {["Boolean", "String", "Number", "Character"].map((opt, idx) => (
                <label
                  key={idx}
                  className="flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={opt}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>
            <div className="flex justify-between">
              <button className="text-indigo-600 font-medium hover:text-indigo-800 transition">
                Previous
              </button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Submit Answer
              </motion.button>
            </div>
          </motion.div>
        </motion.section> */}

        {/* Progress Section */}
        <motion.section
          id="progress"
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Your Progress
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-white p-6 rounded-lg shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold mb-4">Study Stats</h3>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: "12", label: "Sessions" },
                  { value: "87", label: "Cards" },
                  { value: "92%", label: "Accuracy" },
                ].map((stat, i) => (
                  <motion.div
                    key={i}
                    className="bg-indigo-50 p-4 rounded-lg text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.2 }}
                  >
                    <p className="text-2xl font-bold text-indigo-600">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="bg-white p-6 rounded-lg shadow"
              whileHover={{ scale: 1.02 }}
            >
              <h3 className="text-lg font-semibold mb-4">Today's Goal</h3>
              <div className="flex items-center mb-4">
                <div className="relative w-full h-4 bg-gray-200 rounded-full">
                  <motion.div
                    className="absolute top-0 left-0 h-4 bg-green-500 rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "75%" }}
                    transition={{ duration: 1 }}
                  />
                </div>
                <span className="ml-4 text-sm font-medium">75%</span>
              </div>
              <p className="text-gray-600 mb-6">
                You've completed 6 of 8 planned cards for today.
              </p>
            </motion.div>
          </div>
        </motion.section>
      </main>

      {/* Community Section */}
      <motion.section
        id="community"
        className="py-16 bg-gradient-to-r from-purple-50 to-blue-50"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
            Join Our Learning Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                img: "/community1.png",
                title: "Study Groups",
                text: "Join or create study groups for your courses.",
              },
              {
                img: "/community2.png",
                title: "Discussion Forums",
                text: "Get help from peers and educators.",
              },
              {
                img: "/community3.png",
                title: "Live Tutorials",
                text: "Attend live sessions with experts.",
              },
            ].map((card, i) => (
              <motion.div
                key={i}
                className="bg-white p-6 rounded-xl shadow-sm"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
              >
                <img src={card.img} className="rounded-lg mb-4" />
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <p>{card.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <motion.footer
        className="bg-gray-800 text-white py-16"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">SkillSync</h3>
            <p className="text-gray-400">
              Your AI-powered study companion to help you learn faster and
              remember longer.
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-bold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              {["Flashcards", "Progress Tracking", "Study Timer"].map(
                (item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ x: 5, color: "#fff" }}
                    className="cursor-pointer"
                  >
                    {item}
                  </motion.li>
                )
              )}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              {["Blog", "Guides", "Support"].map((item, i) => (
                <motion.li
                  key={i}
                  whileHover={{ x: 5, color: "#fff" }}
                  className="cursor-pointer"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex space-x-4">
              {[
                {
                  img: "/facebook.png",
                  alt: "Facebook",
                  link: "https://www.facebook.com/share/1An6ZB2QKr",
                },
                {
                  img: "/instagram.png",
                  alt: "Instagram",
                  link: "https://www.instagram.com/_simply.rajkumar?igsh=bzhrZWV2dDJubGY2",
                },
                {
                  img: "/linkedin.png",
                  alt: "LinkedIn",
                  link: "https://www.linkedin.com/in/raj-kumar-592240314",
                },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.link}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="bg-gray-700 p-2 rounded-lg"
                >
                  <img src={social.img} alt={social.alt} className="h-6 w-6" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Text */}
        <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-400">
          <p>© 2025 SkillSync. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
}

export default SkillSync;
