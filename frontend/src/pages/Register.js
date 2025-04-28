import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.password.trim()) {
      setError('Please fill in all fields: First Name, Last Name, Email, and Password.');
      return false;
    }
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email.trim())) {
      setError('Invalid email format.');
      return false;
    }
    if (form.password.trim().length < 6) {
      setError('Password must be at least 6 characters long.');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSuccess('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/auth/register', {
        ...form,
        email: form.email.trim(),
        password: form.password.trim(),
      });

      console.log('Registered:', res.data);
      setSuccess('Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      console.error('Registration error:', err.response?.data || err.message);
      if (!err.response) {
        setError('Server not reachable. Please try again later.');
      } else if (err.response.status === 409) {
        setError('User already exists. Try logging in.');
      } else if (err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: 'url("/background.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        className="card p-4 shadow"
        style={{
          width: '100%',
          maxWidth: '400px',
          borderRadius: '12px',
          backgroundColor: 'white',
        }}
      >
        <h2 className="text-center mb-4">Register</h2>

        <form onSubmit={handleRegister}>
          <div className="mb-3">
            <input
              type="text"
              name="firstName"
              className="form-control p-3"
              placeholder="First Name"
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              name="lastName"
              className="form-control p-3"
              placeholder="Last Name"
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control p-3"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control p-3"
              placeholder="Password (min 6 characters)"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          {success && <p className="text-success text-center">{success}</p>}

          <button
            type="submit"
            className="btn btn-success w-100 p-2"
            style={{ borderRadius: '8px' }}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        <div className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
