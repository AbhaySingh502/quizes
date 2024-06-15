// src/components/Quiz.js
import React, { useState, useEffect } from 'react';
import './Quiz.css';

const Quiz = ({ questions }) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questions.length).fill(null));
    const [timer, setTimer] = useState(600);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        const savedState = JSON.parse(localStorage.getItem('quizState'));
        if (savedState) {
            setCurrentQuestionIndex(savedState.currentQuestionIndex);
            setAnswers(savedState.answers);
            setTimer(savedState.timer);
        }

        const interval = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    localStorage.setItem('quizState', JSON.stringify({
                        currentQuestionIndex,
                        answers,
                        timer: prevTimer - 1
                    }));
                    return prevTimer - 1;
                }
                clearInterval(interval);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        localStorage.setItem('quizState', JSON.stringify({
            currentQuestionIndex,
            answers,
            timer
        }));
    }, [currentQuestionIndex, answers, timer]);

    const handleAnswer = (answer) => {
        const updatedAnswers = [...answers];
        updatedAnswers[currentQuestionIndex] = answer;
        setAnswers(updatedAnswers);

        if (answer === questions[currentQuestionIndex].answer) {
            setFeedback('Correct!');
        } else {
            setFeedback('Incorrect!');
        }

        setTimeout(() => {
            setFeedback('');
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            }
        }, 1000);
    };

    if (timer === 0) {
        return <div className="quiz-container">Time's up!</div>;
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className="quiz-container">
            <div className="timer">Time remaining: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}</div>
            <div className="progress">Question {currentQuestionIndex + 1} of {questions.length}</div>
            <h2>{currentQuestion.question}</h2>
            <ul className="options">
                {currentQuestion.options.map((option, index) => (
                    <li key={index}>
                        <button className='btn' onClick={() => handleAnswer(option)}>{option}</button>
                    </li>
                ))}
            </ul>
            {feedback && <div className="feedback">{feedback}</div>}
        </div>
    );
};

export default Quiz;
