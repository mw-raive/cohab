import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useApp } from './contexts/AppContext'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Onboarding from './pages/Onboarding'
import StudentDashboard from './pages/StudentDashboard'
import Match from './pages/Match'
import Properties from './pages/Properties'
import PropertyDetail from './pages/PropertyDetail'
import Messages from './pages/Messages'
import Profile from './pages/Profile'
import LandlordDashboard from './pages/LandlordDashboard'
import AddProperty from './pages/AddProperty'

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedIn, userRole } = useApp()
  if (!isLoggedIn) return <Navigate to="/auth" replace />
  if (requiredRole && userRole !== requiredRole) return <Navigate to="/dashboard" replace />
  return children
}

const ToastContainer = () => {
  const { toasts } = useApp()
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none">
      <AnimatePresence>
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className={`px-5 py-3 rounded-xl shadow-xl text-white font-medium text-sm pointer-events-auto ${
              toast.type === 'info' ? 'bg-navy' :
              toast.type === 'error' ? 'bg-red-500' : 'bg-coral'
            }`}
          >
            {toast.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

const AppLayout = ({ children, showNav = true }) => (
  <div className="min-h-screen bg-cream">
    {showNav && <Navbar />}
    <main>{children}</main>
  </div>
)

export default function App() {
  const { isLoggedIn, userRole, onboardingComplete } = useApp()

  return (
    <>
      <Routes>
        <Route path="/" element={<AppLayout showNav={false}><Landing /></AppLayout>} />
        <Route path="/auth" element={<AppLayout showNav={false}><Auth /></AppLayout>} />
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <AppLayout showNav={false}><Onboarding /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              {userRole === 'landlord' ? <LandlordDashboard /> : <StudentDashboard />}
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/match" element={
          <ProtectedRoute requiredRole="student">
            <AppLayout><Match /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/properties" element={
          <ProtectedRoute>
            <AppLayout><Properties /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/properties/:id" element={
          <ProtectedRoute>
            <AppLayout><PropertyDetail /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/messages" element={
          <ProtectedRoute>
            <AppLayout><Messages /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/profile" element={
          <ProtectedRoute>
            <AppLayout><Profile /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/landlord/dashboard" element={
          <ProtectedRoute requiredRole="landlord">
            <AppLayout><LandlordDashboard /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/landlord/add-property" element={
          <ProtectedRoute requiredRole="landlord">
            <AppLayout><AddProperty /></AppLayout>
          </ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <ToastContainer />
    </>
  )
}
