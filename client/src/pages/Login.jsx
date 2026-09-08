import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { attemptLogin, DEMO_CREDENTIALS } from '../auth/demoAuth'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // Demo-only auth for now — no backend wired up yet.
    if (attemptLogin(email, password)) {
      setError('')
      navigate('/dashboard')
    } else {
      setError('Invalid credentials. Use the demo login below.')
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-icon-badge">
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </div>

        <h1>Welcome back</h1>
        <p className="login-subtitle">Sign in to view your cart and track orders</p>
        <p className="login-demo-hint">
          Demo mode — sign in with <strong>{DEMO_CREDENTIALS.email}</strong> /{' '}
          <strong>{DEMO_CREDENTIALS.password}</strong> to view the dashboard.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          {error && <p className="login-error">{error}</p>}

          <div className="login-field">
            <label htmlFor="email">Email address</label>
            <div className="login-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 6-10 7L2 6" />
              </svg>
              <input
                id="email"
                type="text"
                placeholder="user"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login-field">
            <div className="login-field-row">
              <label htmlFor="password">Password</label>
              <a href="#" className="login-forgot">Forgot password?</a>
            </div>
            <div className="login-input-wrap">
              <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="login-toggle-eye"
                aria-label="Toggle password visibility"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </button>
            </div>
          </div>

          <label className="login-remember">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            Remember me on this device
          </label>

          <button type="submit" className="login-btn-signin">
            Sign In
            <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
