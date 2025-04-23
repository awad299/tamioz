import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import RankPage from './components/RankPage';
import WeeksPage from './components/WeeksPage';
import WeekView from './components/WeekView';
import TeacherDashboard from './components/TeacherDashboard';

import './App.css';

export const READ_API_URL = 'https://script.google.com/macros/s/AKfycbzIvYTOfNbWzxhl2HpVlflfaMxYJVxLgkSF8r-OKp3mLcMYh2NBRQES3jO1R3F5Hnr6/exec';
export const WRITE_API_URL = 'https://script.google.com/macros/s/AKfycbwwyhVpXJnAG2Et-LnuSm5vMVfghH4AkyjBuTEwETbMlM1WVf9PCKaSVQxpZIW1p7YK/exec';

function App() {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [isTeacher, setIsTeacher] = useState<boolean>(() => {
    return localStorage.getItem("isTeacher") === "true";
  });

  useEffect(() => {
    fetch(READ_API_URL)
      .then((res) => res.json())
      .then((json) => {
        const sheets = json['النتائج'];
        setData(sheets);
      })
      .catch((err) => console.error('فشل في تحميل البيانات:', err));
  }, []);

  // استخدمنا props لإرسال setIsTeacher للصفحات
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage setIsTeacher={setIsTeacher} />} />
        <Route path="/home" element={<HomePage setIsTeacher={setIsTeacher} />} />
        <Route path="/rank" element={<RankPage students={data['الترتيب العام للصف السادس'] || []} />} />
        <Route path="/weeks" element={<WeeksPage data={data} isTeacher={isTeacher} />} />
        <Route path="/week/:weekName" element={<WeekView data={data} isTeacher={isTeacher} />} />
        <Route path="/teacher" element={<TeacherDashboard data={data} />} />
        <Route path="/teacher/week/:weekName" element={<WeekView data={data} isTeacher={isTeacher} />} />
      </Routes>
    </Router>
  );
}

export default App;
