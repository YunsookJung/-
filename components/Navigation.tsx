import React from 'react';
import { BookOpen, CheckSquare, PieChart, GraduationCap, ClipboardList } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
  const navItems = [
    { id: 'dashboard', label: '홈', icon: <PieChart size={24} /> },
    { id: 'study', label: '핵심요약', icon: <BookOpen size={24} /> },
    { id: 'quiz', label: '단원문제', icon: <CheckSquare size={24} /> },
    { id: 'exam', label: '모의고사', icon: <GraduationCap size={24} /> },
    { id: 'incorrect', label: '오답노트', icon: <ClipboardList size={24} /> },
  ];

  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 pb-safe shadow-lg z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setView(item.id)}
            className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
              currentView === item.id ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {item.icon}
            <span className="text-[10px] sm:text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};