// Real auth against the backend's /api/auth/signin endpoint.
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
const STORAGE_KEY = 'viewcart_auth'

function getSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export async function login(email, password) {
  let res
  try {
    res = await fetch(`${API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error('Could not reach the server. Is the backend running?')
  }

  const data = await res.json().catch(() => ({}))

  if (!res.ok) {
    throw new Error(data.message || 'Unable to sign in.')
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify({ token: data.token, user: data.user }))
  return data.user
}

export function logout() {
  localStorage.removeItem(STORAGE_KEY)
}

export function isAuthenticated() {
  return Boolean(getSession()?.token)
}

export function getCurrentUser() {
  return getSession()?.user ?? null
}

export function getToken() {
  return getSession()?.token ?? null
}
