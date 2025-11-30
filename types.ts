export enum Subject {
  COMPUTER_GENERAL = "1과목: 컴퓨터 일반",
  SPREADSHEET_GENERAL = "2과목: 스프레드시트 일반"
}

export interface KeyConcept {
  id: string;
  title: string;
  content: string[];
  tags?: string[];
}

export interface Chapter {
  id: string;
  title: string;
  subject: Subject;
  concepts: KeyConcept[];
}

export interface Question {
  id: string;
  chapterId: string;
  question: string;
  options: string[];
  correctAnswer: number; // 0-indexed
  explanation: string;
}

export interface ExamResult {
  id: string;
  date: string;
  score: number;
  totalQuestions: number;
  correctCount: number;
  timeSpentSeconds: number;
}
