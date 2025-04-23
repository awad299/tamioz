import React from 'react';
import './RankPage.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Student {
  'اسم الطالب': string;
  'النقاط': number;
  'الترتيب': string;
}

interface Props {
  students: Student[];
}

const RankPage: React.FC<Props> = ({ students }) => {
  const navigate = useNavigate();

  return (
    <div className="rank-container">
      <button className="back-button" onClick={() => navigate('/')}>الرجوع للصفحة الرئيسية</button>
      <h2 className="rank-title">الترتيب العام</h2>
      <div className="rank-list">
        {students.map((student, index) => (
          <motion.div
            key={index}
            className={`rank-card ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
          >
            <div className="rank-number">{student['الترتيب']}</div>
            <div className="rank-info">
              <h3>{student['اسم الطالب']}</h3>
              <p>{student['النقاط']} نقطة</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RankPage;
