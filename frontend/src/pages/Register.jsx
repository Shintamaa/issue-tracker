
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import '../styles/Login.css';

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Mengirim data registrasi ke backend Laravel
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (username.trim().length < 3) {
      setError('Username minimal 3 karakter');
      return;
    }

    if (password.length < 8) {
      setError('Password minimal 8 karakter');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const pesanError = data.errors
          ? Object.values(data.errors).flat()[0]
          : data.message || 'Registrasi gagal';

        throw new Error(pesanError);
      }

      toast.success('Akun berhasil dibuat! Silakan login.');
      navigate('/login');

    } catch (err) {
      setError(err.message || 'Terjadi kesalahan saat registrasi');
      toast.error('Registrasi gagal');
    } finally {
      setLoading(false);
    }
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

        {/* Form pendaftaran akun */}
        <div className="login-form-section">
          <div className="login-form-wrapper">

            <h1>Create an account</h1>

            <p className="login-description">
              Create your account to get started with ProjectHub.
            </p>

            <form onSubmit={handleRegister}>

              <label htmlFor="register-name">
                Full Name
              </label>
              <input
                id="register-name"
                type="text"
                placeholder="Your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />

              <label htmlFor="register-username">
                Your Username
              </label>
              <input
                id="register-username"
                type="text"
                placeholder="your_username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />

              <label htmlFor="register-email">
                Email
              </label>
              <input
                id="register-email"
                type="email"
                placeholder="your_email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <label htmlFor="register-password">
                Password
              </label>

              <div className="password-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />

                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword
                    ? <EyeOff size={19} />
                    : <Eye size={19} />}
                </button>
              </div>

              {/* Menampilkan pesan kesalahan */}
              {error && (
                <p className="login-error" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="login-button"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Get Started'}
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
