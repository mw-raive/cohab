import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Edit2, Check, Camera, Heart, MapPin } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import CompatibilityBadge from '../components/CompatibilityBadge'

const lifestyleItems = [
  { key: 'sleepSchedule', label: 'Sleep', icons: { early_bird: '🐦 Early Bird', night_owl: '🦉 Night Owl', flexible: '😴 Flexible' } },
  { key: 'studyHabits', label: 'Study', icons: { quiet_home: '🤫 Needs Quiet', some_noise: '🎵 Some Noise OK', can_work_anywhere: '💻 Flexible' } },
  { key: 'guestFrequency', label: 'Guests', icons: { never: '🏠 Homebody', occasionally: '👋 Occasionally', often: '🎉 Social' } },
  { key: 'cookingHabits', label: 'Cooking', icons: { never: '🥡 Never', sometimes: '🍳 Sometimes', cooks_often: '👨‍🍳 Often' } },
  { key: 'wfhFrequency', label: 'WFH', icons: { never: '🏫 Never', sometimes: '🔄 Sometimes', often: '💻 Often' } },
]

export default function Profile() {
  const { user, matches, students, addToast } = useApp()
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    budget: user?.budget || { min: 1200, max: 1800 },
  })

  const matchedStudents = students.filter(s => matches.includes(s.id))
  const lifestyle = user?.lifestyle || {}

  const scoreBreakdown = {
    Sleep: 95,
    Cleanliness: (lifestyle.cleanliness || 4) * 20,
    Social: lifestyle.guestFrequency === 'occasionally' ? 85 : 70,
    Study: lifestyle.studyHabits === 'quiet_home' ? 95 : 75,
  }

  const handleSave = () => {
    setEditMode(false)
    addToast('Profile updated!')
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-5"
      >
        {/* Profile header */}
        <div className="bg-white rounded-2xl overflow-hidden card-shadow">
          {/* Cover gradient */}
          <div className="h-28 bg-gradient-to-br from-navy via-blue-800 to-coral" />

          <div className="px-6 pb-6">
            <div className="flex items-end justify-between -mt-12 mb-4">
              <div className="relative">
                <img
                  src={user?.photo || `https://api.dicebear.com/9.x/personas/svg?seed=Jordan&backgroundColor=ffd5dc`}
                  className="w-24 h-24 rounded-2xl border-4 border-white bg-gray-100 shadow-lg"
                  alt={user?.name}
                />
                <button className="absolute bottom-1 right-1 w-7 h-7 bg-coral rounded-full flex items-center justify-center shadow border-2 border-white">
                  <Camera size={13} className="text-white" />
                </button>
              </div>
              <div className="mb-2">
                <CompatibilityBadge score={85} size="md" breakdown={scoreBreakdown} />
              </div>
            </div>

            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-2xl font-black text-navy">{user?.name || 'Jordan Taylor'}</h1>
                <p className="text-gray-500 text-sm">{user?.program} · {user?.year}</p>
                <div className="flex items-center gap-1 mt-1 text-sm text-gray-400">
                  <MapPin size={14} />
                  <span>{user?.university}</span>
                </div>
              </div>
              <button
                onClick={() => editMode ? handleSave() : setEditMode(true)}
                className="flex items-center gap-2 px-4 py-2 border-2 border-gray-200 rounded-xl text-sm font-semibold hover:border-coral hover:text-coral transition-all"
              >
                {editMode ? <Check size={16} /> : <Edit2 size={16} />}
                {editMode ? 'Save' : 'Edit Profile'}
              </button>
            </div>

            {/* Bio */}
            <div className="mt-4">
              {editMode ? (
                <textarea
                  className="input-field resize-none text-sm"
                  rows={3}
                  value={formData.bio}
                  onChange={e => setFormData(f => ({ ...f, bio: e.target.value }))}
                />
              ) : (
                <p className="text-gray-600 text-sm leading-relaxed">
                  {user?.bio || 'No bio yet. Click Edit Profile to add one!'}
                </p>
              )}
            </div>

            {/* Fun facts */}
            {user?.funFacts && user.funFacts.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-3">
                {user.funFacts.map(f => (
                  <span key={f} className="badge bg-purple-100 text-purple-700 text-xs">{f}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-5">
          {/* Lifestyle */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold text-navy text-lg mb-4">Lifestyle</h2>
            <div className="space-y-3">
              {lifestyleItems.map(item => {
                const val = lifestyle[item.key]
                const display = val ? item.icons[val] : 'Not set'
                return (
                  <div key={item.key} className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">{item.label}</span>
                    <span className="badge bg-gray-100 text-gray-700 text-xs">{display}</span>
                  </div>
                )
              })}
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Cleanliness</span>
                <span className="badge bg-gray-100 text-gray-700 text-xs">
                  {'✨'.repeat(lifestyle.cleanliness || 4)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Pets</span>
                <span className="badge bg-gray-100 text-gray-700 text-xs">
                  {lifestyle.pets ? '🐾 Fine with pets' : '🚫 No pets'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Smoking</span>
                <span className="badge bg-gray-100 text-gray-700 text-xs">
                  {lifestyle.smoking ? '🚬 OK' : '🚭 No smoking'}
                </span>
              </div>
            </div>
          </div>

          {/* Budget */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold text-navy text-lg mb-4">Housing Preferences</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Monthly Budget</p>
                {editMode ? (
                  <div className="space-y-2">
                    <input type="range" min="500" max="4000" step="100"
                      value={formData.budget.max}
                      onChange={e => setFormData(f => ({ ...f, budget: { ...f.budget, max: +e.target.value } }))}
                      className="w-full accent-coral" />
                    <p className="text-xs text-gray-500">${formData.budget.min.toLocaleString()} – ${formData.budget.max.toLocaleString()}</p>
                  </div>
                ) : (
                  <p className="font-bold text-navy">
                    ${(user?.budget?.min || 1200).toLocaleString()} – ${(user?.budget?.max || 1800).toLocaleString()}/mo
                  </p>
                )}
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Move-in Date</p>
                <p className="font-medium text-navy">{user?.moveInDate || 'Aug 2024'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Lease Duration</p>
                <p className="font-medium text-navy capitalize">{user?.leaseDuration || '12 months'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Furnished Preference</p>
                <p className="font-medium text-navy">{user?.furnished ? '🛋️ Furnished preferred' : '📦 Either is fine'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Matches */}
        <div className="bg-white rounded-2xl p-5 card-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy text-lg">My Matches ({matchedStudents.length})</h2>
            <Link to="/match" className="text-sm text-coral hover:underline font-semibold">Find more →</Link>
          </div>
          {matchedStudents.length === 0 ? (
            <div className="text-center py-8">
              <Heart size={32} className="text-gray-200 mx-auto mb-2" />
              <p className="text-gray-500 text-sm">No matches yet. Start swiping!</p>
              <Link to="/match" className="inline-block mt-3 btn-primary text-sm px-4 py-2">Discover Roommates</Link>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
              {matchedStudents.map(s => (
                <Link key={s.id} to="/messages" className="flex flex-col items-center gap-1.5 group">
                  <div className="relative">
                    <img src={s.photo} className="w-14 h-14 rounded-2xl bg-gray-100 group-hover:ring-2 ring-coral transition-all" alt={s.name} />
                    <span className="absolute -bottom-1 -right-1 bg-coral text-white text-xs rounded-full px-1.5 py-0.5 font-bold">
                      {s.compatibilityScore}%
                    </span>
                  </div>
                  <p className="text-xs text-center text-gray-600 font-medium line-clamp-1">{s.name.split(' ')[0]}</p>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Roommate Group */}
        {matchedStudents.length >= 2 && (
          <div className="bg-gradient-to-br from-navy to-blue-900 rounded-2xl p-6 text-white">
            <h2 className="font-bold text-xl mb-2">Your Roommate Group 🏠</h2>
            <p className="text-white/70 text-sm mb-4">
              You have {matchedStudents.length} matches. Ready to find a place together?
            </p>
            <div className="flex items-center gap-2 mb-4">
              {matchedStudents.slice(0, 3).map(s => (
                <img key={s.id} src={s.photo} className="w-10 h-10 rounded-full border-2 border-white" alt={s.name} />
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-white/40 bg-white/10 flex items-center justify-center">
                <span className="text-sm font-bold">+{Math.max(0, matchedStudents.length - 3)}</span>
              </div>
            </div>
            <Link to="/properties" className="inline-flex items-center gap-2 bg-coral hover:bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
              Browse Properties as a Group →
            </Link>
          </div>
        )}
      </motion.div>
    </div>
  )
}
