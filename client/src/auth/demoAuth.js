// Demo-only auth for local testing. No backend involved.
// Credentials are intentionally hardcoded for reviewers to try the dashboard.
const DEMO_EMAIL = 'user'
const DEMO_PASSWORD = 'password'
const STORAGE_KEY = 'viewcart_demo_auth'

export function attemptLogin(email, password) {
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    localStorage.setItem(STORAGE_KEY, email)
    return true
  }
  return false
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated() {
  return Boolean(localStorage.getItem(STORAGE_KEY))
}

export function getCurrentUser() {
  return localStorage.getItem(STORAGE_KEY)
}

export const DEMO_CREDENTIALS = {
  email: DEMO_EMAIL,
  password: DEMO_PASSWORD,
}
