import { Link } from 'react-router-dom';
import styles from '../styles/SignIn.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevents the form from reloading the page on submit

    const result = await login(email, password); // Call the login function from context

    if (result.success) {
      navigate('/dashboard'); // Redirect to the dashboard on successful login
    } else {
      alert(result.message); // Show an alert on error
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.logo}>🔲</div>
        <h2>Welcome Back</h2>
        <p>Sign in to continue</p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button> {/* Button triggers the form submission */}
        </form>
        <div className={styles.or}>or continue with</div>
        <div className={styles.socialButtons}>
          <button>Google</button>
          <button>Apple</button>
        </div>
        <p className={styles.link}>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
