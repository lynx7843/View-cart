import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import { defaultCategories } from '../components/Categories'
import placeholder from '../assets/img/placeholder.jpg'
import { fetchProducts } from '../api/products'
import { formatPrice } from '../utils/formatPrice'
import './CategoryProducts.css'

// Only Furniture & Home has real listings right now — every product in the
// database belongs to it. Other categories show an empty state until they
// have their own listings.
const CATEGORY_WITH_LISTINGS = 'furniture-home'

export default function CategoryProducts() {
  const { slug } = useParams()
  const navigate = useNavigate()

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const category = defaultCategories.find((cat) => cat.slug === slug)

  useEffect(() => {
    if (slug !== CATEGORY_WITH_LISTINGS) {
      setProducts([])
      setLoading(false)
      return
    }

    let cancelled = false
    setLoading(true)
    setError('')

    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Unable to load listings.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return (
    <div className="category-products-page">
      <Navbar />
      <div className="page-content">
        <div className="category-products-content">
          <BackButton to="/dashboard" />

          <h1 className="category-products-title">{category?.title || 'Category'}</h1>

          {loading && <p className="category-products-status">Loading listings…</p>}
          {!loading && error && (
            <p className="category-products-status category-products-status-error">{error}</p>
          )}
          {!loading && !error && products.length === 0 && (
            <p className="category-products-status">No listings in this category yet.</p>
          )}

          {!loading && !error && products.length > 0 && (
            <div className="category-products-grid">
              {products.map((product) => (
                <div key={product._id} className="category-product-card">
                  <img
                    src={product.modelimg || placeholder}
                    alt={product.name}
                    className="category-product-image"
                  />
                  <h3 className="category-product-name">{product.name}</h3>
                  {formatPrice(product.price) && (
                    <p className="category-product-price">{formatPrice(product.price)}</p>
                  )}
                  <button
                    className="category-product-explore-btn"
                    onClick={() => navigate(`/explore/${product._id}`)}
                  >
                    Explore Item
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
