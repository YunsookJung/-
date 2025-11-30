import React, { useState } from 'react';
import { Question } from '../types';
import { AlertCircle, CheckCircle, XCircle, Trash2, Bot, Loader2 } from 'lucide-react';
import { askGeminiTutor } from '../services/geminiService';

interface IncorrectNoteProps {
  incorrectQuestions: Question[];
  removeQuestion: (id: string) => void;
}

export const IncorrectNote: React.FC<IncorrectNoteProps> = ({ incorrectQuestions, removeQuestion }) => {
  const [activeQuestionId, setActiveQuestionId] = useState<string | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleRetry = (questionId: string) => {
    setActiveQuestionId(activeQuestionId === questionId ? null : questionId);
    setSelectedAnswer(null);
    setAiExplanation(null);
  };

  const handleAnswerSelect = (idx: number) => {
    setSelectedAnswer(idx);
  };

  const askAi = async (q: Question) => {
    setLoadingAi(true);
    const prompt = `
      컴활 2급 오답 노트 질문: "${q.question}"
      보기: ${q.options.join(", ")}
      
      이 문제의 핵심 개념과 정답이 ${q.options[q.correctAnswer]}인 이유를 쉽게 설명해줘.
    `;
    const res = await askGeminiTutor(prompt);
    setAiExplanation(res);
    setLoadingAi(false);
  };

  if (incorrectQuestions.length === 0) {
    return (
      <div className="pb-20 pt-10 px-6 text-center">
        <div className="bg-green-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">오답 노트가 비어있습니다.</h2>
        <p className="text-gray-500">
          틀린 문제가 자동으로 이곳에 저장됩니다.<br />
          문제를 풀며 실력을 쌓아보세요!
        </p>
      </div>
    );
  }

  return (
    <div className="pb-20 pt-4 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-2 text-gray-800 flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        오답 노트
      </h2>
      <p className="text-gray-500 mb-6 text-sm">
        총 {incorrectQuestions.length}개의 복습할 문제가 있습니다.
      </p>

      <div className="space-y-4">
        {incorrectQuestions.map((q, idx) => {
          const isExpanded = activeQuestionId === q.id;
          const isCorrect = selectedAnswer === q.correctAnswer;

          return (
            <div key={q.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-4 flex justify-between items-start gap-3">
                <div className="flex-1">
                  <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded mb-2 inline-block">
                    복습 필요
                  </span>
                  <h3 className="font-bold text-gray-800 text-lg">{q.question}</h3>
                </div>
                <button 
                  onClick={() => removeQuestion(q.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="삭제"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="px-4 pb-4">
                {!isExpanded ? (
                  <button 
                    onClick={() => handleRetry(q.id)}
                    className="w-full bg-blue-50 text-blue-600 font-bold py-2 rounded-lg hover:bg-blue-100 transition"
                  >
                    다시 풀기
                  </button>
                ) : (
                  <div className="space-y-3 animate-fade-in mt-2">
                    <div className="grid gap-2">
                      {q.options.map((opt, optIdx) => (
                        <button
                          key={optIdx}
                          onClick={() => handleAnswerSelect(optIdx)}
                          className={`p-3 rounded-lg text-left text-sm border-2 transition-all ${
                            selectedAnswer === optIdx 
                              ? (optIdx === q.correctAnswer 
                                ? 'border-green-500 bg-green-50 text-green-800' 
                                : 'border-red-500 bg-red-50 text-red-800')
                              : 'border-gray-100 hover:border-gray-300'
                          }`}
                        >
                          <span className="mr-2 font-bold">{optIdx + 1}.</span> {opt}
                        </button>
                      ))}
                    </div>

                    {selectedAnswer !== null && (
                      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-2 font-bold mb-2">
                          {isCorrect ? (
                            <span className="text-green-600 flex items-center gap-1"><CheckCircle size={18}/> 정답입니다!</span>
                          ) : (
                             <span className="text-red-600 flex items-center gap-1"><XCircle size={18}/> 오답입니다.</span>
                          )}
                        </div>
                        <p className="text-gray-700 text-sm mb-3"><span className="font-bold">해설:</span> {q.explanation}</p>
                        
                        <div className="flex gap-2">
                           <button 
                             onClick={() => askAi(q)}
                             className="flex-1 bg-indigo-100 text-indigo-700 py-2 rounded font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-200"
                           >
                             {loadingAi ? <Loader2 className="animate-spin" size={16}/> : <Bot size={16}/>}
                             AI 상세 설명
                           </button>
                           {isCorrect && (
                             <button 
                               onClick={() => removeQuestion(q.id)}
                               className="flex-1 bg-gray-200 text-gray-700 py-2 rounded font-bold text-sm hover:bg-gray-300"
                             >
                               오답노트에서 삭제
                             </button>
                           )}
                        </div>
                        {aiExplanation && (
                          <div className="mt-3 text-sm bg-white p-3 rounded border border-gray-200 whitespace-pre-line text-gray-700">
                            {aiExplanation}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};