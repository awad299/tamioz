import React from 'react';
import './WeeksPage.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Props {
  data: { [key: string]: any };
  isTeacher?: boolean;
}

const TeacherDashboard: React.FC<Props> = ({ data, isTeacher = true }) => {
  const navigate = useNavigate();
  const weekNames = Object.keys(data).filter((key) => !key.includes("ترتيب"));

  const handleClick = (weekName: string) => {
    const encoded = encodeURIComponent(weekName);
    navigate(`/teacher/week/${encoded}`);
  };

  return (
    <div className="weeks-container">
      <div className="weeks-header">
        <h2>اختر الأسبوع للتعديل</h2>
      </div>
      <div className="weeks-grid">
        {weekNames.map((week, i) => (
          <motion.div
            className="week-card"
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            onClick={() => handleClick(week)}
          >
            <span>✏️</span>
            <p>{week}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TeacherDashboard;
