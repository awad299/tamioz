import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ setIsTeacher }: { setIsTeacher: (value: boolean) => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isTeacher");
    setIsTeacher(false); // ✅ إعادة الحالة
    navigate("/");
  };

  return (
    <div className="home-container">
      <button className="logout-button" onClick={handleLogout}>
        <i className="ri-logout-circle-r-line"></i> تسجيل خروج
      </button>

      <h2 className="home-title">مسابقة التميز في الرياضيات</h2>

      <div className="home-buttons">
        <button onClick={() => navigate('/rank')} className="home-button">
          <i className="ri-bar-chart-box-line"></i>
          الترتيب العام للطلاب
        </button>

        <button onClick={() => navigate('/weeks')} className="home-button">
          <i className="ri-calendar-todo-line"></i>
          ترتيب الطلاب حسب الأسابيع
        </button>
      </div>
    </div>
  );
};

export default HomePage;
