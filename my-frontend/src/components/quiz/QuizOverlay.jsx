import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function QuizOverlay({ showQuizOverlay, setShowQuizOverlay }) {
  const quizQuestions = [
    {
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["Boolean", "String", "Number", "Character"],
      answer: "Character",
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Netscape", "Microsoft", "Sun Microsystems", "Oracle"],
      answer: "Netscape",
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "<!-- -->", "#", "/* */"],
      answer: "//",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setFeedback("⚠️ Please select an answer.");
      return;
    }
    if (selectedAnswer === quizQuestions[currentIndex].answer) {
      setFeedback("✅ Correct Answer!");
    } else {
      setFeedback("❌ Wrong Answer!");
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedAnswer("");
      setFeedback(null);
    } else {
      setFeedback("🎉 Quiz Completed!");
    }
  };

  return (
    <AnimatePresence>
      {showQuizOverlay && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-xl shadow-xl max-w-xl w-full p-8 relative"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* Close Button */}
            <button
              onClick={() => setShowQuizOverlay(false)}
              className="absolute top-4 right-4 bg-gray-200 hover:bg-gray-300 rounded-full p-2"
            >
              ❌
            </button>

            <h3 className="text-xl font-semibold mb-4 text-indigo-600">
              {quizQuestions[currentIndex].question}
            </h3>

            {/* Options */}
            <div className="space-y-3 mb-6">
              {quizQuestions[currentIndex].options.map((opt, idx) => (
                <label
                  key={idx}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                    selectedAnswer === opt
                      ? "bg-indigo-50 border-indigo-400"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="quiz"
                    value={opt}
                    checked={selectedAnswer === opt}
                    onChange={() => setSelectedAnswer(opt)}
                    className="h-4 w-4 text-indigo-600"
                  />
                  <span>{opt}</span>
                </label>
              ))}
            </div>

            {/* Feedback */}
            {feedback && (
              <p
                className={`text-center font-semibold mb-4 ${
                  feedback.includes("Correct")
                    ? "text-green-600"
                    : feedback.includes("Wrong")
                    ? "text-red-600"
                    : "text-blue-600"
                }`}
              >
                {feedback}
              </p>
            )}

            {/* Buttons */}
            <div className="flex justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleSubmit}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                Submit Answer
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={handleNext}
                disabled={!feedback}
                className={`px-4 py-2 rounded-lg ${
                  feedback
                    ? "bg-green-500 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default QuizOverlay;
