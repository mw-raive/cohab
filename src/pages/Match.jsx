import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Star, SlidersHorizontal, MessageSquare } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import SwipeCard from '../components/SwipeCard'
import CompatibilityBadge from '../components/CompatibilityBadge'

function MatchOverlay({ match, onDismiss, onMessage }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6"
    >
      {/* Confetti */}
      {Array.from({ length: 20 }).map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-${Math.random() * 20}px`,
            backgroundColor: ['#FF6B6B','#4ECDC4','#FFE66D','#A8E6CF','#FF8B94'][i % 5],
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      <div className="match-gradient rounded-3xl p-8 text-center text-white max-w-sm w-full shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="text-5xl mb-4"
          >
            🎉
          </motion.div>
          <h2 className="text-3xl font-black mb-2">It's a Match!</h2>
          <p className="text-white/80 mb-6">You and {match?.name} are compatible roommates</p>

          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="text-center">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan&backgroundColor=ffd5dc`}
                className="w-20 h-20 rounded-full border-4 border-white mx-auto"
                alt="You"
              />
              <p className="text-sm mt-2 font-semibold">You</p>
            </div>
            <div className="flex-1 flex flex-col items-center gap-2">
              <div className="flex">
                {[...Array(3)].map((_, i) => (
                  <Heart key={i} size={20} className="fill-white text-white -mx-1" style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
              <CompatibilityBadge score={match?.compatibilityScore || 90} size="sm" />
            </div>
            <div className="text-center">
              <img
                src={match?.photo}
                className="w-20 h-20 rounded-full border-4 border-white mx-auto"
                alt={match?.name}
              />
              <p className="text-sm mt-2 font-semibold">{match?.name?.split(' ')[0]}</p>
            </div>
          </div>

          {/* Compatibility details */}
          <div className="grid grid-cols-2 gap-2 mb-6 text-left">
            {[
              { label: 'Sleep', icon: '😴', match: true },
              { label: 'Study', icon: '📚', match: true },
              { label: 'Social', icon: '👥', match: true },
              { label: 'Cleanliness', icon: '✨', match: true },
            ].map(item => (
              <div key={item.label} className="bg-white/20 rounded-xl p-2 flex items-center gap-2">
                <span className="text-base">{item.icon}</span>
                <span className="text-xs font-medium">{item.label}</span>
                <span className="ml-auto text-xs">✓</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={onMessage}
              className="w-full bg-white text-coral font-bold py-3 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare size={18} />
              Send First Message
            </button>
            <button
              onClick={onDismiss}
              className="w-full bg-white/20 hover:bg-white/30 text-white font-semibold py-3 rounded-xl transition-all"
            >
              Keep Swiping
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function FilterDrawer({ onClose }) {
  const [priceRange, setPriceRange] = useState([800, 2500])
  const [minScore, setMinScore] = useState(60)

  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ type: 'tween', duration: 0.25 }}
      className="fixed right-0 top-0 bottom-0 w-80 bg-white shadow-2xl z-40 flex flex-col"
    >
      <div className="flex items-center justify-between p-5 border-b">
        <h3 className="font-bold text-navy text-lg">Filters</h3>
        <button onClick={onClose} className="p-2 hover:bg-gray-50 rounded-lg">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div>
          <p className="font-semibold text-navy mb-3">Budget Range</p>
          <p className="text-sm text-gray-500 mb-2">${priceRange[0]} – ${priceRange[1]}/mo</p>
          <input type="range" min="500" max="4000" step="100" value={priceRange[1]}
            onChange={e => setPriceRange(r => [r[0], +e.target.value])}
            className="w-full accent-coral" />
        </div>
        <div>
          <p className="font-semibold text-navy mb-3">Minimum Compatibility</p>
          <p className="text-sm text-gray-500 mb-2">{minScore}%+</p>
          <input type="range" min="50" max="95" step="5" value={minScore}
            onChange={e => setMinScore(+e.target.value)}
            className="w-full accent-coral" />
        </div>
        <div>
          <p className="font-semibold text-navy mb-3">University</p>
          {["Harvard Medical School", "Harvard Law School", "MIT", "Boston University", "Northeastern"].map(u => (
            <label key={u} className="flex items-center gap-2 py-2 cursor-pointer">
              <input type="checkbox" className="accent-coral" />
              <span className="text-sm text-gray-700">{u}</span>
            </label>
          ))}
        </div>
        <div>
          <p className="font-semibold text-navy mb-3">Program</p>
          {["Medical (MD)", "Law (JD)", "MBA", "PhD", "Undergraduate"].map(p => (
            <label key={p} className="flex items-center gap-2 py-2 cursor-pointer">
              <input type="checkbox" className="accent-coral" />
              <span className="text-sm text-gray-700">{p}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="p-5 border-t">
        <button onClick={onClose} className="w-full btn-primary">Apply Filters</button>
      </div>
    </motion.div>
  )
}

export default function Match() {
  const { getAvailableStudents, swipeAction, showMatchOverlay, newMatch, dismissMatchOverlay, students, swipeHistory, matches } = useApp()
  const [showFilters, setShowFilters] = useState(false)
  const available = getAvailableStudents()
  const matchedStudents = students.filter(s => matches.includes(s.id))

  const handleSwipe = (action) => {
    if (available.length === 0) return
    swipeAction(available[0].id, action)
  }

  const navigateToMessages = () => {
    dismissMatchOverlay()
    window.location.href = '/messages'
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 min-h-[calc(100vh-64px)]">
      <div className="flex gap-6">
        {/* Main swipe area */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-black text-navy">Discover Roommates</h1>
              <p className="text-gray-500 text-sm">{available.length} potential matches near you</p>
            </div>
            <button
              onClick={() => setShowFilters(true)}
              className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:border-navy transition-all"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>
          </div>

          {/* Card stack */}
          {available.length > 0 ? (
            <div className="flex flex-col items-center gap-8">
              <div className="relative w-full max-w-sm h-[520px]">
                {available.slice(0, 3).map((student, idx) => (
                  <SwipeCard
                    key={student.id}
                    student={student}
                    onSwipe={handleSwipe}
                    isTop={idx === 0}
                    stackIndex={idx}
                  />
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-5">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('pass')}
                  className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:border-red-200 hover:bg-red-50 transition-all group"
                >
                  <X size={28} className="text-red-400 group-hover:text-red-500" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('superlike')}
                  className="w-14 h-14 bg-white rounded-full shadow-lg flex items-center justify-center border-2 border-gray-100 hover:border-amber-200 hover:bg-amber-50 transition-all group"
                >
                  <Star size={22} className="text-amber-400 group-hover:text-amber-500" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleSwipe('like')}
                  className="w-16 h-16 bg-coral rounded-full shadow-lg flex items-center justify-center hover:bg-red-500 transition-all group"
                >
                  <Heart size={28} className="text-white fill-white" />
                </motion.button>
              </div>

              {/* Keyboard hints */}
              <p className="text-xs text-gray-400">
                Drag cards or use buttons · Star = Super Like
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h3 className="text-xl font-bold text-navy mb-2">You've seen everyone!</h3>
              <p className="text-gray-500 mb-6">Check back soon for new matches, or browse properties now.</p>
              <div className="flex gap-3">
                <Link to="/properties" className="btn-primary">Browse Properties</Link>
                <Link to="/messages" className="btn-outline">View Matches</Link>
              </div>
            </div>
          )}
        </div>

        {/* Matches sidebar - desktop */}
        <div className="hidden lg:block w-72">
          <div className="bg-white rounded-2xl p-5 card-shadow sticky top-24">
            <h2 className="font-bold text-navy mb-4">Your Matches ({matchedStudents.length})</h2>
            {matchedStudents.length === 0 ? (
              <div className="text-center py-6 text-gray-400">
                <Heart size={32} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Swipe right to match!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {matchedStudents.map(s => (
                  <Link
                    key={s.id}
                    to="/messages"
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <img src={s.photo} className="w-10 h-10 rounded-full bg-gray-100" alt={s.name} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy text-sm">{s.name}</p>
                      <p className="text-xs text-gray-400 truncate">{s.program}</p>
                    </div>
                    <span className="text-xs font-bold text-coral">{s.compatibilityScore}%</span>
                  </Link>
                ))}
                <Link
                  to="/messages"
                  className="block text-center text-sm text-coral font-semibold hover:underline mt-2"
                >
                  Open Messages →
                </Link>
              </div>
            )}

            {/* Swipe stats */}
            <div className="mt-5 pt-5 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Your Stats</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                <div className="bg-red-50 rounded-xl p-2">
                  <p className="font-bold text-red-400">{(swipeHistory.passed || []).length}</p>
                  <p className="text-xs text-gray-400">Passed</p>
                </div>
                <div className="bg-green-50 rounded-xl p-2">
                  <p className="font-bold text-mint">{(swipeHistory.liked || []).length}</p>
                  <p className="text-xs text-gray-400">Liked</p>
                </div>
                <div className="bg-amber-50 rounded-xl p-2">
                  <p className="font-bold text-amber-400">{(swipeHistory.superliked || []).length}</p>
                  <p className="text-xs text-gray-400">Super</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Match overlay */}
      <AnimatePresence>
        {showMatchOverlay && newMatch && (
          <MatchOverlay
            match={newMatch}
            onDismiss={dismissMatchOverlay}
            onMessage={navigateToMessages}
          />
        )}
      </AnimatePresence>

      {/* Filter drawer */}
      <AnimatePresence>
        {showFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-30"
              onClick={() => setShowFilters(false)}
            />
            <FilterDrawer onClose={() => setShowFilters(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
