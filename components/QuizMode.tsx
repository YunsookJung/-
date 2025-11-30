import React, { useState } from 'react';
import { CHAPTERS, QUESTIONS } from '../services/data';
import { Question } from '../types';
import { CheckCircle, XCircle, Bot, Loader2, ArrowRight, Sparkles } from 'lucide-react';
import { askGeminiTutor, generateAiQuestions } from '../services/geminiService';

interface QuizModeProps {
  addIncorrectQuestion: (q: Question) => void;
}

export const QuizMode: React.FC<QuizModeProps> = ({ addIncorrectQuestion }) => {
  const [selectedChapterId, setSelectedChapterId] = useState<string | null>(null);
  const [dynamicQuestions, setDynamicQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  // AI State
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [generatingQuestions, setGeneratingQuestions] = useState(false);

  // Combine static and dynamic questions
  const baseQuestions = selectedChapterId 
    ? QUESTIONS.filter(q => q.chapterId === selectedChapterId)
    : [];
  
  const activeQuestions = [...baseQuestions, ...dynamicQuestions];
  const currentQuestion: Question | undefined = activeQuestions[currentQuestionIndex];
  const currentChapter = CHAPTERS.find(c => c.id === selectedChapterId);

  const handleChapterSelect = (id: string) => {
    setSelectedChapterId(id);
    setDynamicQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswer(null);
    setShowResult(false);
    setAiExplanation(null);
  };

  const handleGenerateMoreQuestions = async () => {
    if (!currentChapter) return;
    setGeneratingQuestions(true);
    const newQuestions = await generateAiQuestions(currentChapter.title, 5);
    if (newQuestions.length > 0) {
       setDynamicQuestions(prev => [...prev, ...newQuestions]);
       // If we were at the end, move to the new question
       if (currentQuestionIndex >= activeQuestions.length) {
         // automatic advance handled by render since activeQuestions grows
       }
    } else {
      alert("AI 문제 생성에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
    setGeneratingQuestions(false);
  };

  const handleAnswerClick = (index: number) => {
    if (showResult || !currentQuestion) return;
    setUserAnswer(index);
    setShowResult(true);

    if (index !== currentQuestion.correctAnswer) {
      addIncorrectQuestion(currentQuestion);
    }
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer(null);
      setShowResult(false);
      setAiExplanation(null);
    } else {
      // End of list
      const confirmGen = window.confirm("준비된 문제를 모두 풀었습니다! AI로 새로운 문제를 생성할까요?");
      if (confirmGen) {
        handleGenerateMoreQuestions();
      } else {
        setSelectedChapterId(null);
      }
    }
  };

  const askAiAboutQuestion = async () => {
    if (!currentQuestion) return;
    setLoadingAi(true);
    const prompt = `
      컴퓨터활용능력 2급 문제: "${currentQuestion.question}"
      보기: ${currentQuestion.options.join(", ")}
      
      이 문제의 정답이 왜 ${currentQuestion.options[currentQuestion.correctAnswer]}인지, 
      그리고 왜 다른 보기는 오답인지 자세히 설명해줘.
    `;
    const response = await askGeminiTutor(prompt);
    setAiExplanation(response);
    setLoadingAi(false);
  };

  if (!selectedChapterId) {
    return (
      <div className="pb-20 pt-4 px-4 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">단원별 문제 풀이</h2>
        <div className="grid gap-4">
          {CHAPTERS.map(chapter => {
            const qCount = QUESTIONS.filter(q => q.chapterId === chapter.id).length;
            return (
              <button
                key={chapter.id}
                onClick={() => handleChapterSelect(chapter.id)}
                className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 text-left hover:border-blue-500 transition-colors flex justify-between items-center group"
              >
                <div>
                  <div className="text-xs text-gray-500 mb-1">{chapter.subject}</div>
                  <div className="font-bold text-gray-800 text-lg group-hover:text-blue-600 transition-colors">{chapter.title}</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                    기본 {qCount}문제
                  </div>
                  <div className="text-[10px] text-gray-400 flex items-center gap-1">
                    <Sparkles size={10} /> AI 무한 생성
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Loading state for initial AI generation if empty
  if (activeQuestions.length === 0 && !generatingQuestions) {
     // If no static questions exist, try generate immediately
     handleGenerateMoreQuestions();
     return (
       <div className="flex flex-col items-center justify-center h-64">
         <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
         <p>AI가 문제를 생성하고 있습니다...</p>
       </div>
     );
  }
  
  if (generatingQuestions && activeQuestions.length === 0) {
      return (
       <div className="flex flex-col items-center justify-center h-64">
         <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
         <p>AI가 문제를 생성하고 있습니다...</p>
       </div>
     );
  }

  return (
    <div className="pb-20 pt-4 px-4 max-w-3xl mx-auto h-full flex flex-col min-h-[80vh]">
      <div className="flex justify-between items-center mb-6">
        <button onClick={() => setSelectedChapterId(null)} className="text-gray-500 hover:text-gray-800 font-medium">
          &larr; 목록으로
        </button>
        <div className="text-sm font-medium bg-gray-100 px-3 py-1 rounded-full text-gray-600">
          {currentQuestionIndex + 1} / {activeQuestions.length}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 flex-grow">
        <div className="mb-2">
            {currentQuestion?.chapterId === 'ai_generated' && (
                <span className="text-[10px] bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full font-bold flex w-fit items-center gap-1 mb-2">
                    <Sparkles size={10}/> AI 생성 문제
                </span>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">
            {currentQuestion?.question}
            </h3>
        </div>

        <div className="space-y-3">
          {currentQuestion?.options.map((option, idx) => {
            let buttonStyle = "bg-gray-50 border-gray-200 hover:bg-gray-100";
            if (showResult) {
              if (idx === currentQuestion.correctAnswer) {
                buttonStyle = "bg-green-100 border-green-500 text-green-800 font-bold";
              } else if (idx === userAnswer && idx !== currentQuestion.correctAnswer) {
                buttonStyle = "bg-red-100 border-red-500 text-red-800";
              } else {
                buttonStyle = "bg-gray-50 border-gray-200 opacity-50";
              }
            } else if (userAnswer === idx) {
              buttonStyle = "bg-blue-100 border-blue-500";
            }

            return (
              <button
                key={idx}
                onClick={() => handleAnswerClick(idx)}
                disabled={showResult}
                className={`w-full text-left p-4 rounded-xl border-2 transition-all ${buttonStyle}`}
              >
                <span className="inline-block w-6 h-6 rounded-full bg-white border border-gray-300 text-center text-sm leading-5 mr-3 text-gray-500">
                  {idx + 1}
                </span>
                {option}
              </button>
            );
          })}
        </div>
      </div>

      {showResult && (
        <div className="bg-white rounded-xl shadow p-5 mb-4 animate-fade-in border-t-4 border-blue-500">
          <div className="flex items-start gap-3 mb-4">
            {userAnswer === currentQuestion?.correctAnswer ? (
              <CheckCircle className="text-green-500 shrink-0" size={24} />
            ) : (
              <XCircle className="text-red-500 shrink-0" size={24} />
            )}
            <div>
              <p className="font-bold text-lg mb-1">
                {userAnswer === currentQuestion?.correctAnswer ? "정답입니다!" : "오답입니다."}
              </p>
              {userAnswer !== currentQuestion?.correctAnswer && (
                 <p className="text-sm text-red-500 font-medium mb-1">오답 노트에 자동 저장되었습니다.</p>
              )}
              <p className="text-gray-600 leading-relaxed text-sm">
                <span className="font-bold text-gray-800">해설: </span>
                {currentQuestion?.explanation}
              </p>
            </div>
          </div>
          
          <div className="flex gap-2 mt-4">
            <button 
              onClick={askAiAboutQuestion}
              className="flex-1 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-700 py-3 rounded-lg font-bold hover:bg-indigo-100 transition"
              disabled={loadingAi}
            >
              {loadingAi ? <Loader2 className="animate-spin" /> : <Bot size={18} />}
              {loadingAi ? "AI 답변 중..." : "AI 질문"}
            </button>
            <button 
              onClick={nextQuestion}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition"
            >
              다음 문제 <ArrowRight size={18} />
            </button>
          </div>
          
          {aiExplanation && (
             <div className="mt-4 p-4 bg-indigo-50 rounded-lg text-sm text-gray-800 whitespace-pre-line border border-indigo-100">
               <strong className="block mb-2 text-indigo-800 flex items-center gap-1">
                 <Bot size={14}/> 상세 설명
               </strong>
               {aiExplanation}
             </div>
          )}
        </div>
      )}
      
      {!showResult && (
          <div className="flex justify-end mb-20">
             <button 
                onClick={handleGenerateMoreQuestions}
                disabled={generatingQuestions}
                className="text-xs flex items-center gap-1 text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full hover:bg-purple-100 disabled:opacity-50"
             >
                {generatingQuestions ? <Loader2 className="animate-spin" size={12} /> : <Sparkles size={12} />}
                {generatingQuestions ? "생성 중..." : "AI 문제 추가 생성"}
             </button>
          </div>
      )}
    </div>
  );
};