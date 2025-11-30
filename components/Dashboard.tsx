import React from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { QUESTIONS, CHAPTERS } from '../services/data';

export const Dashboard: React.FC = () => {
  // Mock data for visualization purposes
  const progressData = [
    { name: '학습 완료', value: 35, color: '#3b82f6' },
    { name: '미학습', value: 65, color: '#e5e7eb' },
  ];

  const subjectData = [
    { name: '컴퓨터일반', score: 65 },
    { name: '스프레드시트', score: 40 },
  ];

  return (
    <div className="pb-20 pt-6 px-4 max-w-3xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">안녕하세요, 수험생님! 👋</h1>
        <p className="text-gray-500">오늘도 합격을 향해 달려볼까요?</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Total Progress Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center">
          <h3 className="text-gray-600 font-bold mb-4 w-full text-left">전체 학습 진도율</h3>
          <div className="h-48 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={progressData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                >
                  {progressData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center flex-col">
              <span className="text-3xl font-extrabold text-blue-600">35%</span>
              <span className="text-xs text-gray-400">완료</span>
            </div>
          </div>
        </div>

        {/* Weakness Analysis Card */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-gray-600 font-bold mb-4">과목별 성취도 (모의고사)</h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis type="number" domain={[0, 100]} hide />
                <YAxis dataKey="name" type="category" tick={{fontSize: 12}} width={80} />
                <Tooltip />
                <Bar dataKey="score" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-gray-500 mt-2">
            스프레드시트 과목의 보충 학습이 필요합니다.
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-blue-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-blue-600">{CHAPTERS.length}</div>
          <div className="text-xs text-blue-400 font-bold">총 단원</div>
        </div>
        <div className="bg-indigo-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-indigo-600">{QUESTIONS.length}</div>
          <div className="text-xs text-indigo-400 font-bold">보유 문제</div>
        </div>
        <div className="bg-emerald-50 p-4 rounded-xl text-center">
          <div className="text-2xl font-bold text-emerald-600">D-14</div>
          <div className="text-xs text-emerald-400 font-bold">시험 일정</div>
        </div>
      </div>

      {/* Daily Quote */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
        <p className="font-serif italic opacity-90 mb-2">"천재는 1%의 영감과 99%의 땀으로 만들어진다."</p>
        <p className="text-xs opacity-75 text-right">- 토마스 에디슨</p>
      </div>
    </div>
  );
};
