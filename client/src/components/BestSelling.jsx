import { useState, useEffect, useRef } from 'react'
import CursorRing from './CursorRing'
import placeholder from '../assets/img/placeholder.jpg'
import { fetchProducts } from '../api/products'
import './BestSelling.css'

const AUTO_DELAY = 3000

function formatPrice(price) {
  if (typeof price !== 'number') return null
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price / 100)
}

export default function BestSelling() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    let cancelled = false

    fetchProducts()
      .then((products) => {
        if (cancelled) return
        const mapped = products.map((product) => ({
          id: product._id,
          title: product.name,
          description: product.desc,
          price: formatPrice(product.price),
          condition: product.condition,
          image: product.modelimg || placeholder,
        }))
        setItems(mapped)
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

  const startAuto = () => {
    clearInterval(intervalRef.current)
    if (items.length === 0) return
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % items.length)
    }, AUTO_DELAY)
  }

  useEffect(() => {
    startAuto()
    return () => clearInterval(intervalRef.current)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.length])

  const goTo = (idx) => {
    if (items.length === 0) return
    setActive((idx + items.length) % items.length)
    startAuto()
  }

  const prev = () => goTo(active - 1)
  const next = () => goTo(active + 1)

  // Compute visible indices: active-1, active, active+1, active+2
  const getVisibleItems = () =>
    [-1, 0, 1, 2].map((offset) => ({
      index: (active + offset + items.length) % items.length,
      offset,
    }))

  const visibleItems = items.length > 0 ? getVisibleItems() : []

  return (
    <CursorRing>
      <section className="best-selling" id="best-selling">
        <h2 className="best-selling-title">Best selling</h2>

        {loading && <p className="best-selling-status">Loading listings…</p>}
        {!loading && error && <p className="best-selling-status best-selling-status-error">{error}</p>}
        {!loading && !error && items.length === 0 && (
          <p className="best-selling-status">No listings yet.</p>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="best-selling-wrapper">
            <button className="best-selling-arrow" onClick={prev} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            <div className="best-selling-track">
              {visibleItems.map(({ index, offset }) => {
                const item = items[index]
                const isFeatured = offset === 0
                const isHovered = hovered === offset

                const cardW = isFeatured ? 300 : 245
                const cardH = isFeatured ? 330 : 270

                const leftMap = { '-1': -15, 0: 272, 1: 625, 2: 925 }
                const topMap = { '-1': 20, 0: 0, 1: 20, 2: 20 }
                const opacityMap = { '-1': 0.35, 0: 1, 1: 0.85, 2: 0.55 }
                const zMap = { '-1': 0, 0: 10, 1: 5, 2: 2 }

                return (
                  <div key={`${item.id}-${offset}`} style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}>
                    <div
                      className="best-selling-card"
                      style={{
                        width: cardW,
                        height: cardH,
                        left: leftMap[offset],
                        top: topMap[offset],
                        opacity: opacityMap[offset],
                        zIndex: zMap[offset],
                        boxShadow: isFeatured
                          ? '0 0 60px 20px rgba(30,122,52,0.18), 0 8px 32px rgba(20,20,30,0.12)'
                          : '0 4px 20px rgba(20,20,30,0.08)',
                        backgroundImage: `url(${item.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                      onMouseEnter={() => setHovered(offset)}
                      onMouseLeave={() => setHovered(null)}
                      onClick={() => {
                        if (!isFeatured) goTo(index)
                      }}
                    >
                      {isFeatured && (
                        <div className="best-selling-card-inner">
                          <span className="best-selling-card-title">{item.title}</span>
                          {item.price && <span className="best-selling-card-price">{item.price}</span>}
                        </div>
                      )}
                      {isFeatured && (
                        <div className={`best-selling-card-overlay${isHovered ? ' visible' : ''}`}>
                          <button className="best-selling-card-btn">Explore Item</button>
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}

              <div className="best-selling-description">
                <p className="best-selling-desc-text">{items[active].description}</p>
                {items[active].condition && (
                  <p className="best-selling-desc-condition">Condition: {items[active].condition}</p>
                )}
              </div>
            </div>

            <button className="best-selling-arrow" onClick={next} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1a1a1a" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        )}

        {!loading && !error && items.length > 0 && (
          <div className="best-selling-dots">
            {items.map((item, i) => (
              <div
                key={item.id}
                className={`best-selling-dot${i === active ? ' active-dot' : ''}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        )}
      </section>
    </CursorRing>
  )
}
