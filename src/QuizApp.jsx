import React, { useState, useEffect } from "react";
import { questions } from "./data";
import "./QuizApp.css";

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [quizOver, setQuizOver] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      nextQuestion();
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswer = (selectedOption) => {
    if (selectedOption === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    nextQuestion();
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(10);
    } else {
      setQuizOver(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(10);
    setQuizOver(false);
  };

  const percentage = (score / questions.length) * 100;
  let message = "";
  let emoji = "";

  if (percentage === 100) {
    message = "🎉 Perfect Score! You are a Genius!";
    emoji = "🏆";
  } else if (percentage >= 75) {
    message = "😊 Well Done! Keep it up!";
    emoji = "🎯";
  } else if (percentage >= 50) {
    message = "👍 Good effort! Try for a better score!";
    emoji = "📚";
  } else {
    message = "😟 Don't give up! Keep practicing!";
    emoji = "💡";
  }

  return (
    <div className={`quiz-container ${darkMode ? "dark" : ""}`}>
      <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {quizOver ? (
        <div className="result">
          <h2>Quiz Completed! {emoji}</h2>
          <p className="message">{message}</p>

          {/* Score Display */}
          <div className="score-container">
            <p>
              Your Score:{" "}
              <span className="score">
                {score} / {questions.length}
              </span>
            </p>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Restart Button */}
          <button onClick={restartQuiz} className="restart-button">
            🔄 Play Again
          </button>
        </div>
      ) : (
        <div className="quiz-content">
          <h2>{questions[currentQuestion].question}</h2>
          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            ></div>
          </div>
          <div className="options">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="option-button"
              >
                {option}
              </button>
            ))}
          </div>
          <p className="timer">Time Left: {timeLeft}s</p>
        </div>
      )}
    </div>
  );
};

export default QuizApp;
