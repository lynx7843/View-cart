import { useEffect, useRef } from 'react'
import './CursorRing.css'

// Wraps its children in a container that tracks the mouse position and
// renders a glowing ring that follows the cursor around inside it.
export default function CursorRing({ children }) {
  const containerRef = useRef(null)

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (containerRef.current) {
        containerRef.current.style.setProperty('--mouse-x', `${event.clientX}px`)
        containerRef.current.style.setProperty('--mouse-y', `${event.clientY}px`)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="cursor-ring-wrapper" ref={containerRef}>
      <div className="cursor-ring" />
      {children}
    </div>
  )
}
