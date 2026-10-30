import { useState } from 'react';
import '../styles/Login.css';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  
      
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'admin' && password === 'admin123') {
      setLoginError('');
      navigate('/board');
    } else {
      setLoginError('Username atau password salah');
    }
  };


    //doksli
//   const handleLogin = (e) => {
//     e.preventDefault();
//     alert('Login diklik! Integrasi login belum dibuat.');
//   };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Bagian gambar kiri */}
        <div className="login-banner">
          <div className="banner-text">
            <p>"Lorem ipsum"</p>
            <h1>
              "Lorem ipsum" is a standard
              placeholder text used in
              publishing and design
            </h1>
          </div>
        </div>

        {/* Bagian form kanan */}
        <div className="login-form-section">
          <div className="login-form-wrapper">
            <h1>Login</h1>
            <p className="login-description">
              "Lorem ipsum" is a standard placeholder
              text used in publishing and design
            </p>

            <form onSubmit={handleLogin}>
              <label htmlFor="username">Your Username</label>
              <input
                id="username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {loginError && (
                    <p className="login-error" role="alert">
                        {loginError}
                    </p>
                )}
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                </button>
              </div>

              <button type="submit" className="login-button">
                Login
              </button>
            </form>

            <div className="register-link">
              <p>Don't have an account?</p>
              <Link to="/register">Create account</Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;
