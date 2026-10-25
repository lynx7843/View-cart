import { useState } from 'react'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import profilePicture from '../assets/img/profile-avatar.svg'
import './Account.css'

export default function Account() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Passwords do not match.')
      return
    }

    setMessage('Demo only: account details are not saved.')
  }

  return (
    <div className="account-page">
      <Navbar />
      <main className="page-content">
        <div className="account-content">
          <BackButton to="/dashboard" />

          <section className="account-card">
            <header className="account-header">
              <img className="account-avatar" src={profilePicture} alt="Static profile avatar" />
              <div>
                <h1 className="account-title">My Account</h1>
                <p className="account-subtitle">Manage your profile details</p>
              </div>
            </header>

            <form className="account-form" onSubmit={handleSubmit}>
              <div className="account-field">
                <label htmlFor="account-full-name">Full name</label>
                <input
                  id="account-full-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-email">Email</label>
                <input
                  id="account-email"
                  type="email"
                  autoComplete="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-password">Password</label>
                <input
                  id="account-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter a new password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <div className="account-field">
                <label htmlFor="account-confirm-password">Confirm password</label>
                <input
                  id="account-confirm-password"
                  type="password"
                  autoComplete="new-password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                />
              </div>

              {message && (
                <p className={`account-message${message.startsWith('Passwords') ? ' account-message-error' : ''}`} role="status">
                  {message}
                </p>
              )}

              <button className="account-submit" type="submit">Save changes</button>
            </form>
          </section>
        </div>
      </main>
    </div>
  )
}
