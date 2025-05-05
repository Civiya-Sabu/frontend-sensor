import { Link } from 'react-router-dom';
import styles from '../styles/SignUp.module.css';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Assuming you will also have register function
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const { register, sendOtp } = useAuth();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const result = await register(name, email, password, otp);

        if (result.success) {
            navigate('/'); // Redirect after successful signup
        } else {
            alert(result.message);
        }
    };
    const handleSendOtp = async () => {
        if (!email) {
            alert('Please enter your email first.');
            return;
        }

        const result = await sendOtp(email);

        if (result.success) {
            alert('OTP sent to your email.');
        } else {
            alert(result.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.logo}>🔲</div>
                <h2>Create an Account</h2>
                <p>Sign up to get started</p>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <input type="text" placeholder="Enter your name" value={name}
                        onChange={(e) => setName(e.target.value)} required />
                    <div className={styles.emailContainer}>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className={styles.sendOtpWrapper}>
                            <span className={styles.sendOtpLink} onClick={handleSendOtp}>
                                Send OTP
                            </span>
                        </div>
                    </div>

                    <input
                        type="text"
                        placeholder="Enter OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                    />
                    <input type="password" placeholder="Enter your password" value={password}
                        onChange={(e) => setPassword(e.target.value)} required />
                    <input type="password" placeholder="Confirm your password" value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)} required />
                    <button type="submit" onSubmit={handleSubmit}>Sign Up</button>
                </form>
                <div className={styles.or}>or continue with</div>
                <div className={styles.socialButtons}>
                    <button>Google</button>
                    <button>Apple</button>
                </div>
                <p className={styles.link}>
                    Already have an account? <Link to="/signin">Sign In</Link>
                </p>
            </div>
        </div>
    );
};

export default SignUp;
