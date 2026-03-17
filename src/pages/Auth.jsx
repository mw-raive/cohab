import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Building2 } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

export default function Auth() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { login, isLoggedIn, userRole } = useApp()
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState(searchParams.get('role') || 'student')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  // Auto-demo
  useEffect(() => {
    if (searchParams.get('demo') === 'true') {
      handleDemo('student')
    }
  }, [])

  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'landlord') navigate('/dashboard')
      else navigate('/onboarding')
    }
  }, [isLoggedIn])

  const handleDemo = (demoRole) => {
    setLoading(true)
    setTimeout(() => {
      login(demoRole)
      setLoading(false)
      if (demoRole === 'landlord') navigate('/dashboard')
      else navigate('/dashboard')
    }, 800)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(role, {
        id: 100,
        name: form.name || 'Jordan Taylor',
        email: form.email,
        role,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${form.name || 'Jordan'}&backgroundColor=ffd5dc`,
        university: role === 'student' ? 'Harvard Medical School' : null,
        company: role === 'landlord' ? 'My Properties LLC' : null,
      })
      setLoading(false)
      if (role === 'landlord') navigate('/dashboard')
      else navigate('/onboarding')
    }, 1000)
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-gradient flex-col items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-20 right-20 w-48 h-48 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-coral/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center">
          <div className="text-6xl mb-6">🏠</div>
          <h1 className="text-4xl font-black text-white mb-4">CoHab</h1>
          <p className="text-xl text-white/80 mb-8">Find Your People.<br />Find Your Place.</p>
          <div className="space-y-3 text-left max-w-xs">
            {[
              "94% compatibility accuracy",
              "Visual room selection",
              "Verified landlords only",
              "Form groups before you look"
            ].map(f => (
              <div key={f} className="flex items-center gap-3 text-white/80">
                <div className="w-5 h-5 bg-mint/20 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-mint text-xs">✓</span>
                </div>
                <span className="text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-cream">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 mb-8 font-bold text-xl text-navy">
            <span className="text-2xl">🏠</span>
            CoHab
          </div>

          {/* Tab toggle */}
          <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-8">
            {[['login', 'Sign In'], ['register', 'Create Account']].map(([m, label]) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  mode === m ? 'bg-white text-navy shadow-sm' : 'text-gray-500'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Role selector */}
          <div className="flex gap-3 mb-6">
            {[
              { id: 'student', label: 'Student', icon: '🎓' },
              { id: 'landlord', label: 'Landlord', icon: '🏢' }
            ].map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${
                  role === r.id
                    ? 'border-coral bg-red-50 text-coral'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'
                }`}
              >
                {r.icon} {r.label}
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 mb-6">
            {mode === 'register' && (
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  className="input-field pl-11"
                  required
                />
              </div>
            )}
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                placeholder="Email address"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className="input-field pl-11"
                required
              />
            </div>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                className="input-field pl-11 pr-11"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {mode === 'register' ? 'Create Account' : 'Sign In'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or try demo</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Demo buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => handleDemo('student')}
              disabled={loading}
              className="py-3 rounded-xl border-2 border-navy text-navy text-sm font-semibold hover:bg-navy hover:text-white transition-all disabled:opacity-60"
            >
              🎓 Demo Student
            </button>
            <button
              onClick={() => handleDemo('landlord')}
              disabled={loading}
              className="py-3 rounded-xl border-2 border-mint text-mint text-sm font-semibold hover:bg-mint hover:text-white transition-all disabled:opacity-60"
            >
              🏢 Demo Landlord
            </button>
          </div>

          <p className="text-center text-xs text-gray-400 mt-6">
            By continuing, you agree to our{' '}
            <a href="#" className="text-coral hover:underline">Terms</a> and{' '}
            <a href="#" className="text-coral hover:underline">Privacy Policy</a>
          </p>

          <div className="mt-4 text-center">
            <Link to="/" className="text-sm text-gray-400 hover:text-gray-600 transition-colors">
              ← Back to home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
