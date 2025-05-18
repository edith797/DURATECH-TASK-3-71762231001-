import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import '../styles/Assessment.css';
import anime from 'animejs/lib/anime.es.js';

const assessmentsData = {
  c1: [
    {
      question: 'What does HTML stand for?',
      options: [
        'Hyper Text Markup Language',
        'Home Tool Markup Language',
        'Hyperlinks and Text Markup Language',
      ],
      answer: 0,
    },
    {
      question: 'Which property is used to change the background color in CSS?',
      options: ['color', 'background-color', 'bgcolor'],
      answer: 1,
    },
    {
      question: 'Which HTML tag is used to define an unordered list?',
      options: ['<ul>', '<ol>', '<li>'],
      answer: 0,
    },
    {
      question: 'How do you create a hyperlink in HTML?',
      options: [
        '<a href="url">link</a>',
        '<link href="url">link</link>',
        '<hyperlink>link</hyperlink>',
      ],
      answer: 0,
    },
    {
      question: 'Which HTML attribute is used to define inline styles?',
      options: ['class', 'style', 'styles'],
      answer: 1,
    },
  ],
  c2: [
    {
      question: 'Which hook is used to manage state in React?',
      options: ['useEffect', 'useState', 'useContext'],
      answer: 1,
    },
    {
      question: 'What does JSX stand for?',
      options: ['JavaScript XML', 'Java Syntax eXtension', 'JavaScript eXecution'],
      answer: 0,
    },
    {
      question: 'Which method is used to update state in React class components?',
      options: ['setState()', 'updateState()', 'changeState()'],
      answer: 0,
    },
    {
      question: 'How do you pass data from parent to child components?',
      options: ['props', 'state', 'context'],
      answer: 0,
    },
    {
      question: 'What is the purpose of useEffect hook?',
      options: [
        'To manage component side effects',
        'To manage state',
        'To create context',
      ],
      answer: 0,
    },
  ],
};

const courseNames = {
  c1: 'HTML Basics',
  c2: 'React Fundamentals',
};

export default function Assessment() {
  const { enrolledCourses, assessments, saveAssessmentScore } = useContext(AppContext);

  const [activeCourse, setActiveCourse] = useState(null);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    anime({
      targets: '.assessment-container',
      opacity: [0, 1],
      translateY: [20, 0],
      easing: 'easeOutQuad',
      duration: 600,
    });
  }, [activeCourse]);

  if (enrolledCourses.length === 0) {
    return (
      <div className="assessment-container">
        <main className="assessment-content">
          <h2>No Courses Enrolled</h2>
          <p>You need to enroll in courses before you can take assessments.</p>
        </main>
      </div>
    );
  }

  const questions = activeCourse ? assessmentsData[activeCourse] || [] : [];

  const handleOptionSelect = (idx) => {
    setSelectedOption(idx);
  };

  const handleNext = () => {
    if (selectedOption === null) {
      alert('Please select an option to proceed.');
      return;
    }
    const isCorrect = selectedOption === questions[currentQIndex].answer;

    if (currentQIndex + 1 < questions.length) {
      if (isCorrect) setScore((prev) => prev + 1);
      setCurrentQIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      const finalScore = isCorrect ? score + 1 : score;
      setScore(finalScore);
      setShowScore(true);
      saveAssessmentScore(activeCourse, finalScore);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
  };

  const handleBackToList = () => {
    setActiveCourse(null);
    setCurrentQIndex(0);
    setSelectedOption(null);
    setScore(0);
    setShowScore(false);
  };

  return (
    <div className="assessment-container">
      <main className="assessment-content">
        {!activeCourse ? (
          <>
            <h2>Your Enrolled Courses - Assessments</h2>
            <ul className="course-list">
              {enrolledCourses.map((cid) => (
                <li key={cid} className="course-item">
                  <span className="course-name">
                    {courseNames[cid] || cid.toUpperCase()}
                  </span>
                  {assessments[cid] !== undefined ? (
                    <>
                      <span className="score-display">
                        Score: {assessments[cid]} / {assessmentsData[cid]?.length || '?'}
                      </span>
                      <button
                        className="retake-assessment-btn"
                        onClick={() => {
                          setActiveCourse(cid);
                          setCurrentQIndex(0);
                          setSelectedOption(null);
                          setScore(0);
                          setShowScore(false);
                        }}
                      >
                        Retake Assessment
                      </button>
                    </>
                  ) : (
                    <button
                      className="take-assessment-btn"
                      onClick={() => {
                        setActiveCourse(cid);
                        setCurrentQIndex(0);
                        setSelectedOption(null);
                        setScore(0);
                        setShowScore(false);
                      }}
                    >
                      Take Assessment
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </>
        ) : !showScore ? (
          <>
            <h2>Assessment for {courseNames[activeCourse] || activeCourse.toUpperCase()}</h2>
            <div className="question-section">
              <h3>
                Question {currentQIndex + 1} of {questions.length}
              </h3>
              <p className="question-text">{questions[currentQIndex].question}</p>
              <ul className="options-list">
                {questions[currentQIndex].options.map((option, idx) => (
                  <li
                    key={idx}
                    className={selectedOption === idx ? 'selected' : ''}
                    onClick={() => handleOptionSelect(idx)}
                  >
                    {option}
                  </li>
                ))}
              </ul>
              <button className="next-btn" onClick={handleNext}>
                {currentQIndex + 1 === questions.length ? 'Submit' : 'Next'}
              </button>
              <button className="back-btn" onClick={handleBackToList}>
                Back to Courses
              </button>
            </div>
          </>
        ) : (
          <>
            <h2>Assessment for {courseNames[activeCourse] || activeCourse.toUpperCase()}</h2>
            <div className="score-section">
              <h3>
                Your Score: {score} / {questions.length}
              </h3>
              <button className="restart-btn" onClick={handleRestart}>
                Retake Assessment
              </button>
              <button className="back-btn" onClick={handleBackToList}>
                Back to Courses
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
