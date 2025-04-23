import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import StudentModal from './StudentModal';
import './WeekView.css';

interface DayData {
  اليوم: string;
  المشاركة: number;
  الواجب: number;
  السلوك: number;
  الاختبار: number;
  المجموع: number;
}

interface WeekViewProps {
  data: { [key: string]: any };
  isTeacher?: boolean;
}

const WeekView: React.FC<WeekViewProps> = ({ data, isTeacher = false }) => {
  const { weekName } = useParams();
  const navigate = useNavigate();

  const decodedWeekName = decodeURIComponent(weekName || '');
  const week = data[decodedWeekName];

  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [studentDetails, setStudentDetails] = useState<DayData[]>([]);

  const openDetails = (studentName: string) => {
    const details = week?.تفاصيل?.[studentName];
    if (details && Array.isArray(details)) {
      setStudentDetails(details);
      setSelectedStudent(studentName);
    } else {
      console.warn("❌ لا توجد تفاصيل للطالب:", studentName);
    }
  };

  const closeModal = () => {
    setSelectedStudent(null);
    setStudentDetails([]);
  };

  const handleEdit = (newDetails: DayData[]) => {
    setStudentDetails(newDetails);

    if (selectedStudent && week) {
      const total = newDetails.reduce((sum, d) => sum + d.المجموع, 0);
      const studentIndex = week["الترتيب"].findIndex(
        (s: any) => s["اسم الطالب"] === selectedStudent
      );
      if (studentIndex !== -1) {
        week["الترتيب"][studentIndex]["المجموع"] = total;
      }
    }
  };

  if (!decodedWeekName || !week || !week["الترتيب"]) {
    return <p className="no-data">لا توجد بيانات لعرضها</p>;
  }

  return (
    <div className="week-view-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate(isTeacher ? "/teacher" : "/weeks")}>
          ← رجوع
        </button>
        <h2>{decodedWeekName}</h2>
      </div>

      <div className="students-grid">
        {week["الترتيب"].map((student: any, index: number) => (
          <div key={index} className="student-card">
            <div className="student-header">
              <span className="student-name">{student["اسم الطالب"]}</span>
              <span className="student-rank">🏅 {student["المجموع"]} نقطة</span>
            </div>

            <div className="student-details">
              <div className="detail-box">🗣️ مشاركة: {student["المشاركة"]}</div>
              <div className="detail-box">📘 واجب: {student["الواجب"]}</div>
              <div className="detail-box">🎯 سلوك: {student["السلوك"]}</div>
              <div className="detail-box">📝 اختبار: {student["الاختبار"]}</div>
            </div>

            <div className="student-actions">
              <button className="view-button" onClick={() => openDetails(student["اسم الطالب"])}>
                👁️ عرض التفاصيل
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedStudent && studentDetails.length > 0 && (
        <StudentModal
          name={selectedStudent}
          details={studentDetails}
          onClose={closeModal}
          isTeacher={isTeacher}
          sheetName={decodedWeekName}
          onEdit={handleEdit}
        />
      )}
    </div>
  );
};

export default WeekView;
