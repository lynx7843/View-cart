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
  const [focusedView, setFocusedView] = useState('image')

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

  const changeView = (offset) => {
    const currentIndex = VIEWS.indexOf(focusedView)
    setFocusedView(VIEWS[(currentIndex + offset + VIEWS.length) % VIEWS.length])
  }

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

              <div className="explore-carousel">
                <button
                  type="button"
                  className="explore-carousel-arrow"
                  onClick={() => changeView(-1)}
                  aria-label="Show previous view"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <div className="explore-viewer-grid">
                  <section
                    className={`explore-viewer-card${focusedView === 'image' ? ' focused' : ''}`}
                    onClick={() => setFocusedView('image')}
                  >
                    <button
                      type="button"
                      className="explore-viewer-focus"
                      aria-pressed={focusedView === 'image'}
                      onClick={() => setFocusedView('image')}
                    >
                      <span>Image view</span>
                    </button>
                    <div className="explore-viewer">
                      <img
                        src={product.modelimg || placeholder}
                        alt={product.name}
                        className="explore-viewer-image"
                      />
                    </div>
                  </section>
                  <section
                    className={`explore-viewer-card${focusedView === 'model' ? ' focused' : ''}`}
                    onClick={() => setFocusedView('model')}
                  >
                    <button
                      type="button"
                      className="explore-viewer-focus"
                      aria-pressed={focusedView === 'model'}
                      onClick={() => setFocusedView('model')}
                    >
                      <span>3D view</span>
                    </button>
                    <div className="explore-viewer">
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
                  </section>
                </div>

                <button
                  type="button"
                  className="explore-carousel-arrow"
                  onClick={() => changeView(1)}
                  aria-label="Show next view"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>

              <div className="explore-carousel-dots" aria-label="Choose a view">
                {VIEWS.map((view) => (
                  <button
                    key={view}
                    type="button"
                    className={`explore-carousel-dot${view === focusedView ? ' active' : ''}`}
                    onClick={() => setFocusedView(view)}
                    aria-label={`Show ${view === 'image' ? 'image' : '3D'} view`}
                    aria-pressed={view === focusedView}
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
