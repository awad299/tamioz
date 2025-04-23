import React, { useState } from 'react';
import './WeeklyPage.css';
import StudentModal from './StudentModal';

interface DayData {
  اليوم: string;
  المشاركة: number;
  الواجب: number;
  السلوك: number;
  الاختبار: number;
  المجموع: number;
}

interface WeekData {
  الترتيب: {
    "اسم الطالب": string;
    "المشاركة": number;
    "الواجب": number;
    "السلوك": number;
    "الاختبار": number;
    "المجموع": number;
  }[];
  تفاصيل: {
    [studentName: string]: DayData[];
  };
}

interface Props {
  week: WeekData;
}

const WeeklyPage: React.FC<Props> = ({ week }) => {
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  return (
    <div className="weekly-container">
      <h2 className="weekly-title">ترتيب الطلاب لهذا الأسبوع</h2>

      <div className="cards-container">
        {week.الترتيب.map((student, index) => (
          <div
            key={index}
            className={`student-card ${selectedStudent === student["اسم الطالب"] ? "selected" : ""}`}
            onClick={() => setSelectedStudent(student["اسم الطالب"])}
          >
            <div className="student-rank">#{index + 1}</div>
            <h3 className="student-name">{student["اسم الطالب"]}</h3>
            <p className="student-score">المجموع: {student["المجموع"]}</p>
          </div>
        ))}
      </div>

      {selectedStudent && (
        <StudentModal
          name={selectedStudent}
          details={week.تفاصيل[selectedStudent]}
          onClose={() => setSelectedStudent(null)}
        />
      )}
    </div>
  );
};

export default WeeklyPage;
