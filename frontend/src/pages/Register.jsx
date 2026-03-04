import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import authService from '../services/authService';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (formData.password !== formData.passwordConfirm) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }

      const response = await authService.register(
        formData.name,
        formData.email,
        formData.password,
        formData.passwordConfirm
      );

      if (response.success) {
        login(response.user, response.token);
        navigate('/');
      } else {
        setError(response.message || 'Registration failed');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: 'var(--color-secondary)' }}>
      {/* Left Side - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md animate-fade-in-up">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #FF6B00, #FF8A3D)', boxShadow: '0 4px 16px rgba(255,107,0,0.35)' }}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
            </div>
            <span className="text-xl font-extrabold" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span className="text-white">Recipe</span><span style={{ color: '#FF6B00' }}>App</span>
            </span>
          </Link>

          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white mb-2" style={{ fontFamily: 'Poppins, sans-serif' }}>Create account</h1>
            <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>Join our community of food lovers</p>
          </div>

          {error && (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl mb-6 text-sm" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)', color: '#F87171' }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="input-field" placeholder="John Doe" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required className="input-field" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required className="input-field" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">Confirm Password</label>
              <input type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} required className="input-field" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" />
            </div>
            <button type="submit" disabled={loading} className="w-full btn-primary py-3.5 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg>
                  Creating account...
                </span>
              ) : 'Create Account'}
            </button>
          </form>

          <p className="text-center mt-8 text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Already have an account?{' '}
            <Link to="/login" className="font-semibold hover:underline" style={{ color: '#FF6B00' }}>Sign in</Link>
          </p>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0 z-10" style={{ background: 'linear-gradient(135deg, rgba(255,107,0,0.15) 0%, transparent 60%)' }}></div>
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&h=1200&fit=crop" alt="Delicious Food" className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 p-12 z-20" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)' }}>
          <h2 className="text-3xl font-extrabold text-white mb-3" style={{ fontFamily: 'Poppins, sans-serif' }}>Share Your Culinary Journey</h2>
          <p className="text-gray-400 text-sm">Create, share, and discover amazing recipes from around the world</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
