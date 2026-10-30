import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/Login.css';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    if (username.trim().length < 3) {
      setError('Username minimal 3 karakter');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setError('');
    alert('Form registrasi valid! Penyimpanan akun belum tersedia.');
  };

  return (
    <div className="login-page">
      <div className="login-container">

        {/* Gambar sebelah kiri */}
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

        {/* Form Create Account */}
        <div className="login-form-section">
          <div className="login-form-wrapper">

            <h1>Create an account</h1>

            <p className="login-description">
              "Lorem ipsum" "Lorem ipsum" is a standard
              placeholder text used in publishing and design
            </p>

            <form onSubmit={handleRegister}>
              <label htmlFor="register-username">
                Your Username
              </label>

              <input
                id="register-username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError('');
                }}
                required
              />

              <label htmlFor="register-password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? 'Hide password' : 'Show password'
                  }
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </div>

              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="login-button">
                Get Started
              </button>
            </form>

            <div className="register-link">
              <p>Have an account?</p>
              <Link to="/login">Login</Link>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;
