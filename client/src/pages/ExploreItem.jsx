import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '@google/model-viewer'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import placeholder from '../assets/img/placeholder.jpg'
import { fetchProduct } from '../api/products'
import { formatPrice } from '../utils/formatPrice'
import './ExploreItem.css'

const VIEWS = ['image', 'model']

export default function ExploreItem() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [view, setView] = useState(0)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')

    fetchProduct(id)
      .then((data) => {
        if (!cancelled) setProduct(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err.message || 'Unable to load this item.')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [id])

  const goTo = (idx) => setView((idx + VIEWS.length) % VIEWS.length)
  const prevView = () => goTo(view - 1)
  const nextView = () => goTo(view + 1)

  return (
    <div className="explore-page">
      <Navbar />
      <div className="page-content">
        <div className="explore-content">
          <BackButton to="/dashboard" />

          {loading && <p className="explore-status">Loading item…</p>}
          {!loading && error && <p className="explore-status explore-status-error">{error}</p>}

          {!loading && !error && product && (
            <>
              <h1 className="explore-name">{product.name}</h1>
              {formatPrice(product.price) && (
                <p className="explore-price">{formatPrice(product.price)}</p>
              )}
              <p className="explore-desc">{product.desc}</p>

              <div className="explore-viewer-wrap">
                <button className="explore-viewer-arrow" onClick={prevView} aria-label="Previous view">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="explore-viewer">
                  <div
                    className="explore-viewer-track"
                    style={{ transform: `translateX(-${view * (100 / VIEWS.length)}%)` }}
                  >
                    <div className="explore-viewer-slide">
                      <img
                        src={product.modelimg || placeholder}
                        alt={product.name}
                        className="explore-viewer-image"
                      />
                    </div>
                    <div className="explore-viewer-slide">
                      {product.modelUrl ? (
                        <model-viewer
                          src={product.modelUrl}
                          camera-controls="true"
                          auto-rotate="true"
                          shadow-intensity="1"
                          className="explore-viewer-model"
                        />
                      ) : (
                        <div className="explore-viewer-model-missing">3D model unavailable</div>
                      )}
                    </div>
                  </div>
                </div>

                <button className="explore-viewer-arrow" onClick={nextView} aria-label="Next view">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className="explore-viewer-dots">
                {VIEWS.map((label, i) => (
                  <div
                    key={label}
                    className={`explore-viewer-dot${i === view ? ' active-dot' : ''}`}
                    onClick={() => goTo(i)}
                  />
                ))}
              </div>

              <div className="explore-actions">
                <button className="explore-btn-cart">Add to Cart</button>
                <button className="explore-btn-buy">Buy Now</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
