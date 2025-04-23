import React from 'react';
import './StudentModal.css';

interface StudentModalProps {
  studentName: string;
  details: {
    [day: string]: {
      المشاركة: number;
      الواجب: number;
      السلوك: number;
      الاختبار: number;
    };
  };
  isOpen: boolean;
  onClose: () => void;
}

const StudentModal: React.FC<StudentModalProps> = ({ studentName, details, isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>{studentName}</h2>
        <table>
          <thead>
            <tr>
              <th>اليوم</th>
              <th>المشاركة</th>
              <th>الواجب</th>
              <th>السلوك</th>
              <th>الاختبار</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(details).map(([day, scores]) => (
              <tr key={day}>
                <td>{day}</td>
                <td>{scores.المشاركة}</td>
                <td>{scores.الواجب}</td>
                <td>{scores.السلوك}</td>
                <td>{scores.الاختبار}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentModal;
