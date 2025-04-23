import React from 'react';
import WeeksPage from './WeeksPage';

interface Props {
  data: { [key: string]: any };
  isTeacher?: boolean;
}

const TeacherDashboard: React.FC<Props> = ({ data, isTeacher = false }) => {
  return <WeeksPage data={data} isTeacher={isTeacher} />;
};

export default TeacherDashboard;
