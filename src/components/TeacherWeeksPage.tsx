import React from 'react';

interface TeacherWeeksPageProps {
  isTeacher: boolean;
}

const TeacherWeeksPage: React.FC<TeacherWeeksPageProps> = ({ isTeacher }) => {
  return (
    <div>
      <h1>{isTeacher ? 'عرض المعلم' : 'عرض ولي الأمر'}</h1>
      {/* محتوى الصفحة حسب isTeacher */}
    </div>
  );
};

export default TeacherWeeksPage;
