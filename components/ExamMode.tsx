import React, { useState, useEffect } from 'react';
import { QUESTIONS } from '../services/data';
import { Question } from '../types';
import { Timer, AlertTriangle } from 'lucide-react';

interface ExamModeProps {
  addIncorrectQuestion: (q: Question) => void;
}

export const ExamMode: React.FC<ExamModeProps> = ({ addIncorrectQuestion }) => {
  const [isActive, setIsActive] = useState(false);
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [timeLeft, setTimeLeft] = useState(40 * 60); // 40 minutes in seconds
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isActive && timeLeft > 0 && !isFinished) {
      interval = window.setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      finishExam();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isFinished]);

  const startExam = () => {
    // Shuffle and pick random questions (simulating 40 questions)
    // In a real scenario with "1000 questions", we would pick 40 distinct ones.
    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(shuffled.length, 40));
    setExamQuestions(selected);
    setAnswers(new Array(selected.length).fill(null));
    setTimeLeft(40 * 60);
    setIsActive(true);
    setIsFinished(false);
  };

  const handleAnswer = (qIndex: number, optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[qIndex] = optionIndex;
    setAnswers(newAnswers);
  };

  const finishExam = () => {
    setIsFinished(true);
    setIsActive(false);
    
    // Auto-save incorrect answers
    examQuestions.forEach((q, idx) => {
        const selected = answers[idx];
        if (selected !== null && selected !== q.correctAnswer) {
            addIncorrectQuestion(q);
        }
    });
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((ans, idx) => {
      if (ans === examQuestions[idx].correctAnswer) correct++;
    });
    return Math.round((correct / examQuestions.length) * 100);
  };

  if (!isActive && !isFinished) {
    return (
      <div className="pb-20 pt-10 px-6 max-w-3xl mx-auto text-center h-full flex flex-col justify-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-600">
            <Timer size={48} />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">실전 모의고사</h2>
          <p className="text-gray-500">
            실제 시험과 동일한 환경에서 테스트하세요.<br/>
            제한시간 40분, 총 40문항
          </p>
        </div>
        
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left text-sm text-yellow-800 flex items-start gap-2">
          <AlertTriangle size={18} className="shrink-0 mt-0.5" />
          <p>시험 종료 시 틀린 문제는 자동으로 <strong>오답 노트</strong>에 저장됩니다.</p>
        </div>

        <button 
          onClick={startExam}
          className="w-full bg-blue-600 text-white text-lg font-bold py-4 rounded-xl shadow-lg hover:bg-blue-700 transition-transform active:scale-95"
        >
          시험 시작하기
        </button>
      </div>
    );
  }

  if (isFinished) {
    const score = calculateScore();
    const passed = score >= 60;

    return (
      <div className="pb-20 pt-8 px-4 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">시험 결과</h2>
          <div className={`text-5xl font-extrabold mb-2 ${passed ? 'text-blue-600' : 'text-red-500'}`}>
            {score}점
          </div>
          <p className={`font-medium ${passed ? 'text-green-600' : 'text-gray-500'}`}>
            {passed ? "축하합니다! 합격 기준을 통과하셨습니다." : "조금 더 노력이 필요합니다. (60점 이상 합격)"}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200 font-bold text-gray-700 flex justify-between">
            <span>채점 결과</span>
            <span className="text-xs font-normal text-gray-500 self-center">오답은 자동 저장됨</span>
          </div>
          <div className="divide-y divide-gray-100">
            {examQuestions.map((q, idx) => {
              const isCorrect = answers[idx] === q.correctAnswer;
              return (
                <div key={q.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {isCorrect ? '정답' : '오답'}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 mb-2">{idx + 1}. {q.question}</p>
                      {!isCorrect && (
                        <div className="text-sm bg-gray-50 p-3 rounded text-gray-600">
                          <p><span className="font-bold">내 답:</span> {answers[idx] !== null ? q.options[answers[idx]!] : '미응답'}</p>
                          <p><span className="font-bold text-blue-600">정답:</span> {q.options[q.correctAnswer]}</p>
                          <p className="mt-1 text-xs text-gray-500">{q.explanation}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button 
          onClick={() => { setIsFinished(false); setIsActive(false); }}
          className="w-full mt-6 bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900"
        >
          목록으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-4 px-4 max-w-3xl mx-auto h-screen flex flex-col">
      <div className="flex justify-between items-center mb-4 bg-white p-3 rounded-lg shadow-sm sticky top-0 z-10">
        <div className="flex items-center gap-2 text-red-500 font-bold font-mono text-xl">
          <Timer /> {formatTime(timeLeft)}
        </div>
        <button 
          onClick={finishExam}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-gray-300"
        >
          제출하기
        </button>
      </div>

      <div className="space-y-6 overflow-y-auto pb-10">
        {examQuestions.map((q, qIdx) => (
          <div key={q.id} className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
            <div className="flex gap-2 mb-4">
              <span className="text-blue-600 font-bold text-lg">{qIdx + 1}.</span>
              <h3 className="text-gray-800 font-medium text-lg leading-snug">{q.question}</h3>
            </div>
            <div className="space-y-2 pl-6">
              {q.options.map((opt, optIdx) => (
                <label key={optIdx} className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer border border-transparent hover:border-gray-200 transition-all">
                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${answers[qIdx] === optIdx ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                    {answers[qIdx] === optIdx && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                  <input 
                    type="radio" 
                    name={`q-${q.id}`} 
                    className="hidden" 
                    checked={answers[qIdx] === optIdx}
                    onChange={() => handleAnswer(qIdx, optIdx)}
                  />
                  <span className={`${answers[qIdx] === optIdx ? 'text-blue-700 font-medium' : 'text-gray-600'}`}>{opt}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};