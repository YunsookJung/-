import { GoogleGenAI } from "@google/genai";
import { Question } from '../types';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key not found in environment variables.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const askGeminiTutor = async (prompt: string): Promise<string> => {
  const ai = getClient();
  if (!ai) {
    return "API 키가 설정되지 않았습니다. 환경 변수를 확인해주세요.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "당신은 친절하고 지식이 풍부한 '컴퓨터활용능력 2급' 전문 강사입니다. 사용자가 개념이나 문제에 대해 물어보면 이해하기 쉽게 핵심 위주로 설명해주세요. 답변은 한국어로 해주세요.",
        thinkingConfig: { thinkingBudget: 0 }
      },
    });
    
    return response.text || "죄송합니다. 답변을 생성할 수 없습니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "AI 선생님 연결 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
  }
};

export const generateAiQuestions = async (topic: string, count: number = 3): Promise<Question[]> => {
  const ai = getClient();
  if (!ai) {
    console.warn("API Key missing");
    return [];
  }

  const prompt = `
    컴퓨터활용능력 2급 필기 시험 대비를 위해 '${topic}' 주제와 관련된 4지선다형 문제 ${count}개를 만들어주세요.
    실제 시험 난이도와 유사하게 만들어주세요.
    
    응답은 반드시 아래 JSON 형식의 배열(Array)만 출력하세요. 마크다운이나 다른 설명은 포함하지 마세요.
    
    [
      {
        "id": "unique_string_id",
        "question": "문제 내용",
        "options": ["보기1", "보기2", "보기3", "보기4"],
        "correctAnswer": 0, (정답 인덱스 0-3)
        "explanation": "해설 내용"
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json"
      }
    });

    const text = response.text;
    if (!text) return [];
    
    // Parse JSON
    const questions = JSON.parse(text);
    // Ensure structure matches
    return questions.map((q: any, index: number) => ({
        ...q,
        id: `ai_${Date.now()}_${index}`,
        chapterId: 'ai_generated'
    }));

  } catch (e) {
    console.error("Failed to generate questions", e);
    return [];
  }
};