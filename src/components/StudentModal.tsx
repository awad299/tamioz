import React, { useState, useEffect } from 'react';
import './StudentModal.css';
import { WRITE_API_URL } from '../App';

interface DayData {
  اليوم: string;
  المشاركة: number;
  الواجب: number;
  السلوك: number;
  الاختبار: number;
  المجموع: number;
}

type EditableField = 'المشاركة' | 'الواجب' | 'السلوك' | 'الاختبار';

interface Props {
  name: string;
  details: DayData[];
  onClose: () => void;
  isTeacher?: boolean;
  sheetName?: string;
  onEdit?: (newDetails: DayData[]) => void;
}

const StudentModal: React.FC<Props> = ({
  name,
  details,
  onClose,
  isTeacher = false,
  sheetName = '',
  onEdit
}) => {
  const [localDetails, setLocalDetails] = useState<DayData[]>([]);

  useEffect(() => {
    setLocalDetails(details);
  }, [details]);

  const handleChange = (index: number, field: EditableField, value: number) => {
    const updated = [...localDetails];
    updated[index][field] = value;
    updated[index].المجموع =
      updated[index].المشاركة +
      updated[index].الواجب +
      updated[index].السلوك +
      updated[index].الاختبار;

    setLocalDetails(updated);
    if (onEdit) onEdit(updated);

    if (isTeacher && sheetName) {
      const formData = new FormData();
      formData.append("sheetName", sheetName);
      formData.append("studentName", name);
      formData.append("details", JSON.stringify(updated));

      fetch(WRITE_API_URL, {
        method: 'POST',
        body: formData,
      });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h2 className="modal-title">تفاصيل الطالب</h2>
        <p className="modal-student-name">{name}</p>

        <div className="table-container">
          <table className="student-table">
            <thead>
              <tr>
                <th>اليوم</th>
                <th>المشاركة</th>
                <th>الواجب</th>
                <th>السلوك</th>
                <th>الاختبار</th>
                <th>المجموع</th>
              </tr>
            </thead>
            <tbody>
              {localDetails.map((day, idx) => (
                <tr key={idx}>
                  <td>{day.اليوم}</td>
                  {(['المشاركة', 'الواجب', 'السلوك', 'الاختبار'] as EditableField[]).map((field) => (
                    <td key={field}>
                      {isTeacher ? (
                        <input
                          type="number"
                          value={day[field]}
                          onChange={(e) =>
                            handleChange(idx, field, parseInt(e.target.value) || 0)
                          }
                        />
                      ) : (
                        <span className={day[field] === 0 ? 'zero' : ''}>
                          {day[field]}
                        </span>
                      )}
                    </td>
                  ))}
                  <td>{day.المجموع}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentModal;
