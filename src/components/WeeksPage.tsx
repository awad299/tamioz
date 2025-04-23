import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WeeksPage.css';
import { motion } from 'framer-motion';
import { PiNotebookBold } from 'react-icons/pi';
import { FiArrowRightCircle } from 'react-icons/fi';

interface Props {
  data: { [key: string]: any };
  isTeacher?: boolean;
}

const WeeksPage: React.FC<Props> = ({ data, isTeacher = false }) => {
  const navigate = useNavigate();
  const weekNames = Object.keys(data).filter((key) => !key.includes("ترتيب"));

  const handleClick = (weekName: string) => {
    const encoded = encodeURIComponent(weekName);
    const path = isTeacher ? `/teacher/week/${encoded}` : `/week/${encoded}`;
    navigate(path);
  };

  const goBack = () => {
    navigate('/home');
  };

  return (
    <div className="weeks-container">
      <div className="weeks-header">
        <h2>{isTeacher ? "اختر الأسبوع للتعديل" : "اختر الأسبوع لعرض النتائج"}</h2>
        <button className="back-home-btn" onClick={goBack}>
          <FiArrowRightCircle size={20} />
          <span>الرجوع للرئيسية</span>
        </button>
      </div>
      <div className="weeks-grid">
        {weekNames.map((week, i) => (
          <motion.div
            className="week-card"
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => handleClick(week)}
          >
            <span className="week-icon">
              <PiNotebookBold size={28} />
            </span>
            <p>{week}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default WeeksPage;
