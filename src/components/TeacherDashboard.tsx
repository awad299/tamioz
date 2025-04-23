import React from 'react';
import WeeksPage from './WeeksPage';

interface Props {
  data: { [key: string]: any };
}

const TeacherDashboard: React.FC<Props> = ({ data }) => {
  return (
    <div className="teacher-dashboard">
      <WeeksPage data={data} isTeacher={true} />
    </div>
  );
};

export default TeacherDashboard;
