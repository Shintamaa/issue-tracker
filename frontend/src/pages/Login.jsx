
import { useState } from 'react';
import '../styles/Login.css';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoading(true);

    try {
      // Mengirim email dan password ke Laravel
      const response = await fetch(
        'http://127.0.0.1:8000/api/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            email: email.trim(),
            password: password,
          }),
        }
      );

      const data = await response.json();

      // Memeriksa respons dari Laravel
      if (!response.ok) {
        const pesanError = data.errors
          ? Object.values(data.errors).flat()[0]
          : data.message || 'Email atau password salah';

        throw new Error(pesanError);
      }

      // Memastikan token tersedia
      if (!data.token) {
        throw new Error('Token login tidak ditemukan');
      }

      // Menyimpan token autentikasi
      sessionStorage.setItem('auth_token', data.token);

      // Menyimpan informasi pengguna
      sessionStorage.setItem(
        'user',
        JSON.stringify(data.user)
      );

      // Notifikasi berhasil
      toast.success('Login berhasil! Selamat datang di ProjectHub.');

      // Masuk ke Project Board
      navigate('/board');

    } catch (error) {
      setLoginError(
        error.message || 'Terjadi kesalahan saat login'
      );

      toast.error('Login gagal');
    } finally {
      setLoading(false);
    }
  };

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

              <label htmlFor="email">Your Email</label>
              <input
                id="email"
                type="email"
                placeholder="your_email@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setLoginError('');
                }}
                required
              />

              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLoginError('');
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

              {loginError && (
                <p className="login-error" role="alert">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
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
