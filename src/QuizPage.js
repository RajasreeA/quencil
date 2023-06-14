import React, { useState, useEffect } from "react";
import "./Login.css"; // Import the CSS file for UserPortal component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const UserPortal = ({ quiz, onLogin }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("username");
  const [password, setPassword] = useState("");
  const [quizz, setQuizz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");

  useEffect(() => {
    // Retrieve the quiz data from local storage
    const storedQuizz = localStorage.getItem("quiz");
    if (storedQuizz) {
      setQuizz(JSON.parse(storedQuizz));
    }
  }, []);

  useEffect(() => {
    // Save the score to local storage whenever it changes

    var leaderboard = [];
    leaderboard.push({ score: score, username: username });
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
    console.log(JSON.stringify(leaderboard), "leaderboard data");
  }, [score]);

  const handleLogin = (e) => {
    e.preventDefault();

    // Here, you can implement the logic to validate user credentials
    // For simplicity, we'll check if the username and password are not empty

    if (username.trim() !== "" && password.trim() !== "") {
      setLoggedIn(true);
    }
    if (username === "admin" && password === "password") {
      onLogin();
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUsername("");
    setPassword("");
    // setScore(0);
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextQuestion = () => {
    // Check if the selected option is correct
    if (selectedOption === quizz[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setSelectedOption("");
    setCurrentQuestion(currentQuestion + 1);
  };
  console.log(currentQuestion, quizz?.length, "jbhjhhjj h");
  return (
    <div className="user-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, {username}!</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          {currentQuestion < quizz?.length ? (
            <div>
              <h2>Question {currentQuestion + 1}</h2>
              <h3>{quizz[currentQuestion].question}</h3>
              <ul>
                {quizz[currentQuestion].options.map((option, index) => (
                  <li key={index}>
                    <label>
                      <input
                        type="radio"
                        name="option"
                        value={option}
                        checked={selectedOption === option}
                        onChange={() => handleOptionSelect(option)}
                      />
                      {option}
                    </label>
                  </li>
                ))}
              </ul>
              <button
                onClick={handleNextQuestion}
                class="btn-primary"
                disabled={!selectedOption}
              >
                Next
              </button>
            </div>
          ) : (
            <div>
              <h2>Quiz Completed!</h2>
              <p>
                Your score: {score} out of {quizz?.length}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {username.trim() === "" || password.trim() === "" ? (
              <p className="error-message">
                Please enter a username and password.
              </p>
            ) : null}
            <button className="btn btn-primary" type="submit">
              Login
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserPortal;
