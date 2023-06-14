import React, { useEffect, useState } from "react";
import "./Login.css";
import UserPortal from "./QuizPage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPlus,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";

const AdminPortal = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [showCreateQuiz, setShowCreateQuiz] = useState(false);
  const [leaderboardVisible, setLeaderboardVisible] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [ques, setQues] = useState([]);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  const handleLeaderboard = () => {
    setLeaderboardVisible(true);
    setShowCreateQuiz(false);
    const leaderboard = JSON.parse(localStorage.getItem("leaderboard"));
    setLeaderboardData(leaderboard);
  };

  useEffect(() => {
    setQues(JSON.parse(localStorage.getItem("quiz")));
    setQuestions(ques);
    setLeaderboardVisible(false);
  }, []);
  console.log(leaderboardVisible, "bhbhjhjb");
  const handleCreateQuiz = () => {
    localStorage.setItem("quiz", JSON.stringify(questions));
    console.log("Quiz created and saved:", questions);
  };

  const handleAddQuestion = () => {
    setQuestions([
      ...questions,
      { question: "", options: ["", "", ""], correctAnswer: "" },
    ]);
  };

  const handleToggleCreateQuiz = () => {
    setShowCreateQuiz(true);

    setLeaderboardVisible(false);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (index, optionIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].options[optionIndex] = value;

    if (updatedQuestions[index].correctAnswer === optionIndex.toString()) {
      updatedQuestions[index].correctAnswer = value;
    }

    setQuestions(updatedQuestions);
  };

  return (
    <div className="admin-container">
      {loggedIn ? (
        <div>
          <h2>Welcome, Admin!</h2>
          <button className="btn btn-secondary" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
          </button>
          <button className="btn btn-primary" onClick={handleLeaderboard}>
            Leader Dashboard
          </button>
          <button className="btn btn-info" onClick={handleToggleCreateQuiz}>
            Quiz Creation
          </button>
          {showCreateQuiz ? (
            <div>
              <h3>Create Quiz</h3>

              {questions.map((question, index) => (
                <div key={index}>
                  <h4>Question {index + 1}</h4>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  <input
                    type="text"
                    placeholder="Question"
                    className="form-control"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                  />

                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <input
                        type="text"
                        placeholder={`Option ${optionIndex + 1}`}
                        className="form-control"
                        value={option}
                        onChange={(e) =>
                          handleOptionChange(index, optionIndex, e.target.value)
                        }
                      />
                    </div>
                  ))}

                  <select
                    className="form-control"
                    value={question.correctAnswer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctAnswer",
                        e.target.value
                      )
                    }
                  >
                    <option value="">Select Correct Answer</option>
                    {question.options.map((option, optionIndex) => (
                      <option key={optionIndex} value={option}>
                        Option {optionIndex + 1}
                      </option>
                    ))}
                  </select>
                </div>
              ))}

              <button className="btn btn-primary" onClick={handleAddQuestion}>
                <FontAwesomeIcon icon={faPlus} />
              </button>
              <button className="btn btn-success" onClick={handleCreateQuiz}>
                Create Question
              </button>
            </div>
          ) : (
            <>
              {leaderboardVisible && (
                <div>
                  <h3>Leaderboard</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboardData &&
                        leaderboardData.map((data, index) => (
                          <tr key={index}>
                            <td>{data.username}</td>
                            <td>{data.score}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        <UserPortal quiz={questions} onLogin={handleLogin} />
      )}
    </div>
  );
};

export default AdminPortal;
