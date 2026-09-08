import { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import CategoryProducts from './pages/CategoryProducts'
import ProtectedRoute from './components/ProtectedRoute'

// Code-split: pulls in @google/model-viewer (~1MB, bundles Three.js), so it
// should only load when someone actually visits an item page, not on every route.
const ExploreItem = lazy(() => import('./pages/ExploreItem'))

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/explore/:id"
        element={
          <ProtectedRoute>
            <Suspense fallback={null}>
              <ExploreItem />
            </Suspense>
          </ProtectedRoute>
        }
      />
      <Route
        path="/category/:slug"
        element={
          <ProtectedRoute>
            <CategoryProducts />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}

export default App
