import React, { useState } from 'react';
import { CHAPTERS } from '../services/data';
import { askGeminiTutor } from '../services/geminiService';
import { Book, ChevronDown, ChevronUp, Bot, Loader2 } from 'lucide-react';

export const StudyMode: React.FC = () => {
  const [expandedChapter, setExpandedChapter] = useState<string | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);

  const toggleChapter = (id: string) => {
    setExpandedChapter(expandedChapter === id ? null : id);
  };

  const handleAskAI = async (conceptTitle: string, context: string[]) => {
    setLoadingAi(true);
    setSelectedConcept(conceptTitle);
    const prompt = `컴퓨터활용능력 2급 공부 중입니다. '${conceptTitle}'에 대해 더 자세히 설명해주세요. \n문맥: ${context.join(", ")}`;
    
    const response = await askGeminiTutor(prompt);
    setAiExplanation(response);
    setLoadingAi(false);
  };

  const closeAiModal = () => {
    setAiExplanation(null);
    setSelectedConcept(null);
  };

  return (
    <div className="pb-20 pt-4 px-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
        <Book className="text-blue-600" />
        핵심 요약집
      </h2>

      <div className="space-y-4">
        {CHAPTERS.map((chapter) => (
          <div key={chapter.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => toggleChapter(chapter.id)}
              className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="text-left">
                <span className="text-xs font-bold text-blue-500 block mb-1">{chapter.subject}</span>
                <span className="font-bold text-gray-800">{chapter.title}</span>
              </div>
              {expandedChapter === chapter.id ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
            </button>

            {expandedChapter === chapter.id && (
              <div className="p-4 bg-white divide-y divide-gray-100">
                {chapter.concepts.map((concept) => (
                  <div key={concept.id} className="py-4 first:pt-0 last:pb-0">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-gray-900 flex-1">
                        <span className="text-blue-600 mr-2">#{concept.id}</span>
                        {concept.title}
                      </h4>
                      <button 
                        onClick={() => handleAskAI(concept.title, concept.content)}
                        className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-full"
                        aria-label="AI 설명 듣기"
                      >
                        <Bot size={18} />
                      </button>
                    </div>
                    <ul className="list-disc pl-5 space-y-1">
                      {concept.content.map((line, idx) => (
                        <li key={idx} className="text-gray-600 text-sm leading-relaxed">{line}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* AI Tutor Modal */}
      {(aiExplanation || loadingAi) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="bg-blue-600 p-4 flex justify-between items-center">
              <h3 className="text-white font-bold flex items-center gap-2">
                <Bot /> AI 선생님 - {selectedConcept}
              </h3>
              <button onClick={closeAiModal} className="text-white hover:text-blue-200 text-xl font-bold">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto">
              {loadingAi ? (
                <div className="flex flex-col items-center py-8">
                  <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                  <p className="text-gray-500">Gemini가 설명을 작성하고 있습니다...</p>
                </div>
              ) : (
                <div className="prose prose-sm text-gray-700 whitespace-pre-line">
                  {aiExplanation}
                </div>
              )}
            </div>
            <div className="p-4 border-t bg-gray-50 text-right">
              <button 
                onClick={closeAiModal}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
