import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { isAuthenticated, logout } from '../auth/auth'
import './Navbar.css'

const links = [
  { label: 'Best Selling', href: '#best-selling' },
  { label: 'Categories', href: '#categories' },
  { label: 'About Us', href: '#about-us' },
]

export default function Navbar() {
  const [active, setActive] = useState('Best Selling')
  const navigate = useNavigate()
  const authed = isAuthenticated()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo (plain text, not a link/button) */}
        <span className="nav-logo">View Cart</span>

        {/* Center nav */}
        <div className="nav-center">
          {links.map((link) => (
            <a
              key={link.label}
              className={`nav-link ${active === link.label ? 'active' : ''}`}
              onClick={() => setActive(link.label)}
              href={link.href}
            >
              {link.label}
            </a>
          ))}
          <div className="nav-search">
            <svg className="search-icon" viewBox="0 0 16 16">
              <circle cx="6.5" cy="6.5" r="5" />
              <line x1="10.5" y1="10.5" x2="14" y2="14" />
            </svg>
            Search
          </div>
        </div>

        {/* Right side */}
        <div className="nav-right">
          {authed ? (
            <>
              <Link to="/dashboard" className="nav-account">
                <svg className="account-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21a8 8 0 0 0-16 0" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                Account
              </Link>
              <button className="btn-nav-logout" onClick={handleLogout}>
                Sign out
              </button>
            </>
          ) : (
            <Link to="/login" className="btn-nav-login">
              <svg className="account-icon" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Account
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
