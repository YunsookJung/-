import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { StudyMode } from './components/StudyMode';
import { QuizMode } from './components/QuizMode';
import { ExamMode } from './components/ExamMode';
import { IncorrectNote } from './components/IncorrectNote';
import { Question } from './types';

const App: React.FC = () => {
  const [currentView, setView] = useState('dashboard');
  const [incorrectQuestions, setIncorrectQuestions] = useState<Question[]>([]);

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem('incorrectQuestions');
    if (saved) {
      try {
        setIncorrectQuestions(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load incorrect questions", e);
      }
    }
  }, []);

  // Save to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('incorrectQuestions', JSON.stringify(incorrectQuestions));
  }, [incorrectQuestions]);

  const addIncorrectQuestion = (question: Question) => {
    setIncorrectQuestions(prev => {
      // Prevent duplicates
      if (prev.some(q => q.id === question.id)) return prev;
      return [...prev, question];
    });
  };

  const removeIncorrectQuestion = (id: string) => {
    setIncorrectQuestions(prev => prev.filter(q => q.id !== id));
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'study':
        return <StudyMode />;
      case 'quiz':
        return <QuizMode addIncorrectQuestion={addIncorrectQuestion} />;
      case 'exam':
        return <ExamMode addIncorrectQuestion={addIncorrectQuestion} />;
      case 'incorrect':
        return <IncorrectNote incorrectQuestions={incorrectQuestions} removeQuestion={removeIncorrectQuestion} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <main className="w-full">
        {renderView()}
      </main>
      <Navigation currentView={currentView} setView={setView} />
    </div>
  );
};

export default App;