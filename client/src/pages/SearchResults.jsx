import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import placeholder from '../assets/img/placeholder.jpg'
import { fetchProducts } from '../api/products'
import { formatPrice } from '../utils/formatPrice'
import './SearchResults.css'

export default function SearchResults() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() || ''
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

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
  }, [])

  const results = useMemo(() => {
    const normalizedQuery = query.toLocaleLowerCase()
    if (!normalizedQuery) return []

    return products.filter((product) =>
      [product.name, product.desc, product.condition, product.price]
        .filter(Boolean)
        .some((value) => String(value).toLocaleLowerCase().includes(normalizedQuery))
    )
  }, [products, query])

  return (
    <div className="search-results-page">
      <Navbar />
      <main className="page-content">
        <div className="search-results-content">
          <BackButton to="/dashboard" />
          <h1 className="search-results-title">Search results</h1>
          {query && <p className="search-results-query">Results for “{query}”</p>}

          {loading && <p className="search-results-status">Searching items…</p>}
          {!loading && error && (
            <p className="search-results-status search-results-error">{error}</p>
          )}
          {!loading && !error && !query && (
            <p className="search-results-status">Enter a search term to find items.</p>
          )}
          {!loading && !error && query && results.length === 0 && (
            <p className="search-results-status">No items matched your search.</p>
          )}

          {!loading && !error && results.length > 0 && (
            <div className="search-results-grid">
              {results.map((product) => (
                <article className="search-result-card" key={product._id}>
                  <img
                    src={product.modelimg || placeholder}
                    alt={product.name}
                    className="search-result-image"
                  />
                  <div className="search-result-details">
                    <h2 className="search-result-name">{product.name}</h2>
                    {formatPrice(product.price) && (
                      <p className="search-result-price">{formatPrice(product.price)}</p>
                    )}
                    {product.condition && (
                      <p className="search-result-condition">Condition: {product.condition}</p>
                    )}
                    <button
                      type="button"
                      className="search-result-button"
                      onClick={() => navigate(`/explore/${product._id}`)}
                    >
                      Explore item
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
