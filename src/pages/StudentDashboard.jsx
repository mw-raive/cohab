import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Building2, MessageSquare, User, ArrowRight, Star } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import CompatibilityBadge from '../components/CompatibilityBadge'
import PropertyCard from '../components/PropertyCard'

export default function StudentDashboard() {
  const { user, matches, messages, students, properties, savedProperties } = useApp()

  const matchedStudents = students.filter(s => matches.includes(s.id))
  const unreadCount = Object.values(messages || {}).reduce((acc, thread) => {
    return acc + thread.filter(m => m.senderId !== (user?.id || 100) && !m.read).length
  }, 0)
  const savedProps = properties.filter(p => savedProperties.includes(p.id))
  const topProperties = properties.filter(p => p.subscriptionTier === 'premium').slice(0, 3)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Welcome */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-black text-navy">
          Welcome back, {user?.name?.split(' ')[0] || 'Jordan'} 👋
        </h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your housing search.</p>
      </motion.div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          {
            icon: <Heart size={22} className="text-coral" />,
            label: "Matches",
            value: matches.length,
            to: "/match",
            color: "bg-red-50"
          },
          {
            icon: <MessageSquare size={22} className="text-mint" />,
            label: "Unread Messages",
            value: unreadCount,
            to: "/messages",
            color: "bg-teal-50"
          },
          {
            icon: <Building2 size={22} className="text-navy" />,
            label: "Saved Properties",
            value: savedProps.length,
            to: "/properties",
            color: "bg-blue-50"
          },
          {
            icon: <Star size={22} className="text-amber-500" />,
            label: "Top Score",
            value: `${Math.max(...students.map(s => s.compatibilityScore))}%`,
            to: "/match",
            color: "bg-amber-50"
          }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link to={stat.to} className={`block ${stat.color} rounded-2xl p-5 hover:shadow-md transition-all group`}>
              <div className="mb-3">{stat.icon}</div>
              <p className="font-black text-navy text-2xl">{stat.value}</p>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {/* Matches section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-1 bg-white rounded-2xl p-5 card-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-navy text-lg">Your Matches</h2>
            <Link to="/match" className="text-sm text-coral font-semibold hover:underline">See all →</Link>
          </div>

          {matchedStudents.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-5xl mb-3">🔍</div>
              <p className="font-semibold text-navy">No matches yet</p>
              <p className="text-sm text-gray-500 mt-1">Start swiping to find roommates</p>
              <Link to="/match" className="inline-block mt-4 btn-primary text-sm px-4 py-2">
                Start Matching
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {matchedStudents.map(student => {
                const threadId = `match-${student.id}`
                const thread = messages[threadId] || []
                const lastMsg = thread[thread.length - 1]
                const unread = thread.filter(m => m.senderId !== (user?.id || 100) && !m.read).length

                return (
                  <Link
                    key={student.id}
                    to="/messages"
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative">
                      <img
                        src={student.photo}
                        className="w-11 h-11 rounded-full bg-gray-100"
                        alt={student.name}
                      />
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-mint rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-navy text-sm">{student.name}</p>
                        {unread > 0 && (
                          <span className="bg-coral text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{unread}</span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 truncate">{lastMsg?.text || 'Start a conversation!'}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </motion.div>

        {/* Next steps & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-2 space-y-4"
        >
          {/* Profile completion */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h2 className="font-bold text-navy text-lg mb-4">Your Profile</h2>
            <div className="flex items-center gap-4">
              <img
                src={user?.photo || `https://api.dicebear.com/9.x/personas/svg?seed=Jordan&backgroundColor=ffd5dc`}
                className="w-16 h-16 rounded-full bg-gray-100"
                alt={user?.name}
              />
              <div className="flex-1">
                <p className="font-bold text-navy">{user?.name}</p>
                <p className="text-sm text-gray-500">{user?.program} · {user?.year}</p>
                <p className="text-xs text-gray-400">{user?.university}</p>
              </div>
              <CompatibilityBadge score={85} size="sm" />
            </div>
            <div className="mt-4 flex gap-3">
              <Link to="/match" className="flex-1 btn-primary text-center text-sm py-2.5">
                Find Roommates
              </Link>
              <Link to="/profile" className="flex-1 btn-outline text-center text-sm py-2.5">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* Next steps */}
          <div className="bg-gradient-to-br from-navy to-blue-900 rounded-2xl p-5 text-white">
            <h2 className="font-bold text-lg mb-4">Your Next Steps</h2>
            <div className="space-y-3">
              {[
                {
                  done: matches.length > 0,
                  step: "Match with 2+ roommates",
                  desc: matches.length > 0 ? `You have ${matches.length} match${matches.length > 1 ? 'es' : ''}!` : "Start swiping →",
                  to: "/match"
                },
                {
                  done: savedProps.length > 0,
                  step: "Save a property",
                  desc: savedProps.length > 0 ? `${savedProps.length} saved` : "Browse properties →",
                  to: "/properties"
                },
                {
                  done: false,
                  step: "Schedule a tour",
                  desc: "Contact a landlord through Messages",
                  to: "/messages"
                }
              ].map((item, i) => (
                <Link key={i} to={item.to} className="flex items-center gap-3 group">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${
                    item.done ? 'bg-mint' : 'bg-white/10 group-hover:bg-white/20'
                  }`}>
                    {item.done ? <span className="text-sm">✓</span> : <span className="text-white/50 text-sm">{i + 1}</span>}
                  </div>
                  <div className="flex-1">
                    <p className={`text-sm font-medium ${item.done ? 'line-through text-white/50' : 'text-white'}`}>
                      {item.step}
                    </p>
                    <p className="text-xs text-white/50">{item.desc}</p>
                  </div>
                  <ArrowRight size={16} className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Featured Properties */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black text-navy">Featured Properties Near You</h2>
          <Link to="/properties" className="text-sm text-coral font-semibold hover:underline flex items-center gap-1">
            Browse all <ArrowRight size={16} />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {topProperties.map(property => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </motion.div>
    </div>
  )
}
