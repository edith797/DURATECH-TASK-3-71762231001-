import React, { useState, useContext, useEffect } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import anime from 'animejs/lib/anime.es.js';
import '../styles/Login.css';

export default function Login() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) navigate('/dashboard');
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Invalid email or password');
      anime({
        targets: '.error-msg',
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad',
      });
    }
  };

  return (
    <div className="auth-page">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <div className="error-msg">{error}</div>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/register">Register Here</Link>
        </p>
      </form>
    </div>
  );
}
