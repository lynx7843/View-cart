import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '@google/model-viewer'
import Navbar from '../components/Navbar'
import BackButton from '../components/BackButton'
import placeholder from '../assets/img/placeholder.jpg'
import { fetchProduct } from '../api/products'
import { formatPrice } from '../utils/formatPrice'
import './ExploreItem.css'

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

              <div className="explore-viewer-grid">
                <section className={`explore-viewer-card${focusedView === 'image' ? ' focused' : ''}`}>
                  <button
                    type="button"
                    className="explore-viewer-focus"
                    aria-pressed={focusedView === 'image'}
                    onClick={() => setFocusedView('image')}
                  >
                    <span>Image view</span>
                    {focusedView === 'image' && <span className="explore-viewer-selected">Focused</span>}
                  </button>
                  <div className="explore-viewer">
                    <img
                      src={product.modelimg || placeholder}
                      alt={product.name}
                      className="explore-viewer-image"
                    />
                  </div>
                </section>
                <section className={`explore-viewer-card${focusedView === 'model' ? ' focused' : ''}`}>
                  <button
                    type="button"
                    className="explore-viewer-focus"
                    aria-pressed={focusedView === 'model'}
                    onClick={() => setFocusedView('model')}
                  >
                    <span>3D view</span>
                    {focusedView === 'model' && <span className="explore-viewer-selected">Focused</span>}
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
