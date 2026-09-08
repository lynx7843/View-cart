const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export async function fetchProducts() {
  let res
  try {
    res = await fetch(`${API_BASE_URL}/products`)
  } catch {
    throw new Error('Could not reach the server. Is the backend running?')
  }

  if (!res.ok) {
    throw new Error('Unable to load products.')
  }

  return res.json()
}

export async function fetchProduct(id) {
  let res
  try {
    res = await fetch(`${API_BASE_URL}/products/${id}`)
  } catch {
    throw new Error('Could not reach the server. Is the backend running?')
  }

  if (!res.ok) {
    throw new Error(res.status === 404 ? 'Item not found.' : 'Unable to load this item.')
  }

  return res.json()
}
