import React, { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, MessageSquare, User, Search, LayoutDashboard, Plus, Bell, Menu, X, ChevronDown, LogOut, Settings, Heart, Building2 } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

export default function Navbar() {
  const { user, userRole, logout, matches, messages } = useApp()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const unreadCount = Object.values(messages || {}).reduce((acc, thread) => {
    return acc + thread.filter(m => m.senderId !== (user?.id || 100) && !m.read).length
  }, 0)

  const studentLinks = [
    { to: '/match', label: 'Discover', icon: <Heart size={18} /> },
    { to: '/properties', label: 'Browse Rooms', icon: <Building2 size={18} /> },
    { to: '/messages', label: 'Messages', icon: <MessageSquare size={18} />, badge: unreadCount },
    { to: '/profile', label: 'Profile', icon: <User size={18} /> },
  ]

  const landlordLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { to: '/properties', label: 'Properties', icon: <Building2 size={18} /> },
    { to: '/landlord/add-property', label: 'Add Property', icon: <Plus size={18} /> },
    { to: '/profile', label: 'Profile', icon: <User size={18} /> },
  ]

  const links = userRole === 'landlord' ? landlordLinks : studentLinks

  const handleLogout = () => {
    logout()
    setProfileOpen(false)
    navigate('/')
  }

  return (
    <nav className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/dashboard" className="flex items-center gap-2 font-bold text-xl text-navy">
            <span className="text-2xl">🏠</span>
            <span>NestMate</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'text-coral bg-red-50'
                    : 'text-gray-600 hover:text-navy hover:bg-gray-50'
                }`}
              >
                {link.icon}
                {link.label}
                {link.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Notification bell */}
            <button className="relative p-2 text-gray-500 hover:text-navy hover:bg-gray-50 rounded-lg transition-all">
              <Bell size={20} />
              {matches.length > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-coral rounded-full"></span>
              )}
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-50 transition-all"
              >
                <img
                  src={user?.photo || "https://api.dicebear.com/7.x/avataaars/svg?seed=default"}
                  alt={user?.name}
                  className="w-8 h-8 rounded-full bg-gray-100"
                />
                <ChevronDown size={16} className="text-gray-400 hidden md:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 overflow-hidden"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="font-semibold text-navy text-sm">{user?.name}</p>
                      <p className="text-xs text-gray-500">{user?.university || user?.company}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      <User size={16} className="text-gray-400" />
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors w-full text-left"
                    >
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-navy rounded-lg hover:bg-gray-50 transition-all"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-gray-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {links.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    location.pathname === link.to
                      ? 'text-coral bg-red-50'
                      : 'text-gray-600 hover:text-navy hover:bg-gray-50'
                  }`}
                >
                  {link.icon}
                  {link.label}
                  {link.badge > 0 && (
                    <span className="ml-auto bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {link.badge}
                    </span>
                  )}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition-all w-full"
              >
                <LogOut size={18} />
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay */}
      {profileOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setProfileOpen(false)} />
      )}
    </nav>
  )
}
