import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = ({ setIsTeacher }: { setIsTeacher: (value: boolean) => void }) => {
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (username === 'teacher' && password === '1234') {
      localStorage.setItem("isTeacher", "true");
      setIsTeacher(true); // ✅ تحديث فوري للحالة
      navigate('/home');
    } else {
      setError('❌ البيانات غير صحيحة');
    }
  };

  const handleVisitor = () => {
    localStorage.setItem("isTeacher", "false");
    setIsTeacher(false); // ✅ تحديث فوري للحالة
    navigate('/home');
  };

  return (
    <div className="login-bg">
      <div className="login-card">
        <h1>🎓 بوابة الدخول</h1>

        {!showLogin ? (
          <>
            <button className="entry-button visitor" onClick={handleVisitor}>
              <i className="ri-user-line"></i> دخول كـ زائر / ولي أمر
            </button>

            <button className="entry-button teacher" onClick={() => setShowLogin(true)}>
              <i className="ri-shield-user-line"></i> دخول المعلم
            </button>
          </>
        ) : (
          <div className="login-form">
            <input
              type="text"
              placeholder="اسم المستخدم"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="entry-button go" onClick={handleLogin}>
              دخول
            </button>
            {error && <p className="error">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
