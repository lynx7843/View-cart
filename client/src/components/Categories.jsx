import { useState } from 'react'
import placeholder from '../assets/img/placeholder.jpg'
import './Categories.css'

const defaultCategories = [
  { id: 1, title: 'Furniture & Home', count: '128 Listings', image: placeholder },
  { id: 2, title: 'Electronics', count: '94 Listings', image: placeholder },
  { id: 3, title: 'Fashion & Apparel', count: '210 Listings', image: placeholder },
  { id: 4, title: 'Watches & Jewelry', count: '67 Listings', image: placeholder },
  { id: 5, title: 'Collectibles', count: '145 Listings', image: placeholder },
  { id: 6, title: 'Sporting Goods', count: '58 Listings', image: placeholder },
]

function CategoryCard({ category, onExplore }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className={`cat-card${hovered ? ' hovered' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="cat-card-bg">
        {category.image ? (
          <img src={category.image} alt={category.title} className="cat-card-img" />
        ) : (
          <div className="cat-card-placeholder">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#1e7a34" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="18" height="18" rx="4" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <span className="cat-placeholder-text">No image yet</span>
          </div>
        )}
        <div className={`cat-card-gradient${hovered ? ' hovered' : ''}`} />
      </div>

      <div className="cat-card-content">
        <div className="cat-card-meta">
          <span className="cat-card-count">{category.count}</span>
          <h3 className="cat-card-title">{category.title}</h3>
        </div>

        <div className={`cat-card-actions${hovered ? ' visible' : ''}`}>
          <button className="cat-explore-btn" onClick={() => onExplore && onExplore(category)}>
            Explore
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Categories() {
  const [categories] = useState(defaultCategories)

  return (
    <section className="categories-page">
      <div className="categories-container">
        <div className="categories-header">
          <div>
            <p className="categories-tag">Shop by Category</p>
            <h2 className="categories-title">Categories</h2>
            <p className="categories-sub">Discover everything we have to offer</p>
          </div>
          <button className="categories-view-all-btn">View All Products →</button>
        </div>

        <div className="cat-grid">
          {categories.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </div>
      </div>
    </section>
  )
}
