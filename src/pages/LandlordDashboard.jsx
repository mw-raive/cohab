import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plus, Building2, Users, TrendingUp, Star, Lock, BarChart2, Eye, Mail } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import { mockProperties } from '../data/mockProperties'

const mockLeads = [
  { id: 1, group: "Harvard Med 2024 Group", students: 4, school: "Harvard Medical School", budget: "$1,400-1,800", score: 94, activity: "2 hours ago", status: "New" },
  { id: 2, group: "HMS First Years", students: 3, school: "Harvard Medical School", budget: "$1,500-2,000", score: 88, activity: "5 hours ago", status: "Contacted" },
  { id: 3, group: "Law Students 2026", students: 2, school: "Harvard Law School", budget: "$1,600-2,100", score: 82, activity: "1 day ago", status: "New" },
  { id: 4, group: "MIT PhD Crew", students: 4, school: "MIT", budget: "$1,000-1,600", score: 91, activity: "2 days ago", status: "Signed" },
]

const statusColors = {
  New: 'bg-blue-100 text-blue-700',
  Contacted: 'bg-amber-100 text-amber-700',
  Signed: 'bg-green-100 text-green-700',
}

export default function LandlordDashboard() {
  const { user } = useApp()
  const [activeTab, setActiveTab] = useState('overview')
  const landlordProperties = mockProperties.slice(0, 3) // Demo: 3 properties
  const tier = user?.tier || 'premium'
  const isPremium = tier === 'premium'
  const isPro = tier === 'pro' || isPremium

  const totalRooms = landlordProperties.reduce((acc, p) => acc + p.rooms.length, 0)
  const occupiedRooms = landlordProperties.reduce((acc, p) => acc + p.rooms.filter(r => r.status === 'taken').length, 0)
  const occupancyPct = Math.round((occupiedRooms / totalRooms) * 100)

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'properties', label: 'Properties' },
    { id: 'leads', label: 'Leads', locked: !isPremium },
    { id: 'reviews', label: 'Reviews' },
    { id: 'analytics', label: 'Analytics', locked: !isPro },
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-navy">Landlord Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name || 'Alex'}</p>
        </div>
        <div className="flex items-center gap-3">
          <span className={`badge capitalize text-sm px-4 py-2 ${tier === 'premium' ? 'bg-amber-100 text-amber-700' : tier === 'pro' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'}`}>
            {tier} Member
          </span>
          <Link to="/landlord/add-property" className="btn-primary flex items-center gap-2">
            <Plus size={18} /> Add Property
          </Link>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 rounded-xl p-1 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
              activeTab === tab.id ? 'bg-white text-navy shadow-sm' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab.label}
            {tab.locked && <Lock size={13} className="text-gray-400" />}
          </button>
        ))}
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Properties', value: landlordProperties.length, icon: <Building2 size={20} className="text-navy" />, bg: 'bg-blue-50' },
              { label: 'Total Rooms', value: totalRooms, icon: '🛏️', bg: 'bg-purple-50' },
              { label: 'Occupancy Rate', value: `${occupancyPct}%`, icon: <TrendingUp size={20} className="text-mint" />, bg: 'bg-teal-50' },
              { label: 'Avg Days to Fill', value: '12 days', icon: '⚡', bg: 'bg-amber-50' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`${stat.bg} rounded-2xl p-5`}
              >
                <div className="mb-3 text-2xl">{typeof stat.icon === 'string' ? stat.icon : stat.icon}</div>
                <p className="font-black text-navy text-2xl">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Activity feed */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="bg-white rounded-2xl p-5 card-shadow">
              <h3 className="font-bold text-navy text-lg mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { event: 'Room 1A viewed by Harvard Med group', time: '2h ago', icon: '👁️' },
                  { event: 'Room 3B held for 48 hours', time: '5h ago', icon: '⏳' },
                  { event: 'New message from HMS First Years', time: '1d ago', icon: '💬' },
                  { event: 'Room 2A marked as available', time: '2d ago', icon: '✅' },
                  { event: 'Property 1 received a 5-star review', time: '3d ago', icon: '⭐' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm">
                    <span className="text-lg">{item.icon}</span>
                    <div className="flex-1">
                      <p className="text-gray-700">{item.event}</p>
                      <p className="text-xs text-gray-400">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subscription upgrade */}
            {!isPremium && (
              <div className="bg-gradient-to-br from-navy to-blue-900 rounded-2xl p-6 text-white">
                <span className="badge bg-amber-400 text-navy text-xs mb-3">Upgrade Available</span>
                <h3 className="font-bold text-xl mb-2">Unlock Premium Features</h3>
                <p className="text-white/70 text-sm mb-5">Get access to lead management, advanced analytics, and priority placement.</p>
                <div className="space-y-2 mb-5">
                  {['Access all qualified lead groups', 'Advanced analytics dashboard', 'Priority search placement', 'Unlimited room listings'].map(f => (
                    <div key={f} className="flex items-center gap-2 text-sm text-white/80">
                      <span className="text-mint">✓</span> {f}
                    </div>
                  ))}
                </div>
                <button className="w-full bg-coral hover:bg-red-500 text-white font-bold py-3 rounded-xl transition-all">
                  Upgrade to Premium — $49/mo
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Properties */}
      {activeTab === 'properties' && (
        <div className="space-y-4">
          {landlordProperties.map(property => {
            const available = property.rooms.filter(r => r.status === 'available').length
            const total = property.rooms.length
            const fillPct = Math.round(((total - available) / total) * 100)

            return (
              <motion.div
                key={property.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-5 card-shadow"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={property.photos[0] || ''}
                    className="w-24 h-18 rounded-xl object-cover bg-gray-100"
                    alt={property.title}
                    style={{ height: 72 }}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-navy">{property.title}</h3>
                        <p className="text-sm text-gray-500">{property.address}</p>
                      </div>
                      <div className="flex gap-2">
                        <Link to={`/properties/${property.id}`} className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-navy transition-all">
                          View
                        </Link>
                        <button className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:border-navy transition-all">
                          Edit
                        </button>
                      </div>
                    </div>
                    <div className="mt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Room fill rate</span>
                        <span className="text-xs font-bold text-navy">{fillPct}% ({total - available}/{total} rooms)</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-coral rounded-full transition-all"
                          style={{ width: `${fillPct}%` }}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="flex items-center gap-1 text-xs text-gray-500">
                        <Star size={12} className="fill-amber-400 text-amber-400" /> {property.landlordRating}
                      </span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-500">{property.reviewCount} reviews</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-coral font-medium">{available} rooms available</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}

          <button className="w-full border-2 border-dashed border-gray-300 rounded-2xl p-8 flex flex-col items-center gap-2 text-gray-400 hover:border-coral hover:text-coral transition-all group">
            <Plus size={28} className="group-hover:scale-110 transition-transform" />
            <span className="font-semibold">Add New Property</span>
          </button>
        </div>
      )}

      {/* Leads */}
      {activeTab === 'leads' && (
        <div className="relative">
          {!isPremium && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
              <Lock size={40} className="text-gray-300 mb-4" />
              <h3 className="font-bold text-navy text-xl mb-2">Premium Feature</h3>
              <p className="text-gray-500 text-center max-w-xs mb-5">Upgrade to Premium to see student groups interested in your properties.</p>
              <button className="btn-primary">Upgrade to Premium</button>
            </div>
          )}
          <div className={!isPremium ? 'blur-sm pointer-events-none' : ''}>
            <div className="bg-white rounded-2xl overflow-hidden card-shadow">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Group</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Students</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Budget</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Score</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wide">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {mockLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4">
                        <p className="font-semibold text-navy text-sm">{lead.group}</p>
                        <p className="text-xs text-gray-400">{lead.school}</p>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <Users size={14} className="text-gray-400" />
                          <span className="text-sm text-gray-700">{lead.students}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="text-sm text-gray-700">{lead.budget}</span>
                      </td>
                      <td className="px-5 py-4 hidden md:table-cell">
                        <span className="font-bold text-coral">{lead.score}%</span>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`badge text-xs ${statusColors[lead.status]}`}>{lead.status}</span>
                      </td>
                      <td className="px-5 py-4">
                        <button className="flex items-center gap-1.5 px-3 py-1.5 bg-navy text-white text-xs font-semibold rounded-lg hover:bg-opacity-90 transition-all">
                          <Mail size={12} /> Contact
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reviews */}
      {activeTab === 'reviews' && (
        <div className="space-y-5">
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="flex items-center gap-6 mb-6">
              <div className="text-center">
                <p className="text-5xl font-black text-navy">4.8</p>
                <div className="flex gap-0.5 justify-center my-1">
                  {[1,2,3,4,5].map(s => <Star key={s} size={16} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-sm text-gray-500">Overall Rating</p>
              </div>
              <div className="flex-1 space-y-2">
                {[5, 4, 3, 2, 1].map(stars => {
                  const pct = stars === 5 ? 70 : stars === 4 ? 20 : stars === 3 ? 7 : 2
                  return (
                    <div key={stars} className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 w-4">{stars}★</span>
                      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                      <span className="text-xs text-gray-400 w-8">{pct}%</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {landlordProperties.flatMap(p => p.reviews || []).map((review, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 card-shadow">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-500 text-sm">
                    {review.author[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy text-sm">{review.author}</p>
                    <p className="text-xs text-gray-400">{review.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-600 text-sm">{review.text}</p>
            </div>
          ))}
        </div>
      )}

      {/* Analytics */}
      {activeTab === 'analytics' && (
        <div className="relative space-y-5">
          {!isPro && (
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-white/80 backdrop-blur-sm rounded-2xl">
              <Lock size={40} className="text-gray-300 mb-4" />
              <h3 className="font-bold text-navy text-xl mb-2">Pro / Premium Feature</h3>
              <p className="text-gray-500 text-center max-w-xs mb-5">Upgrade to Pro or Premium to unlock full analytics.</p>
              <button className="btn-primary">Upgrade Now</button>
            </div>
          )}
          <div className={!isPro ? 'blur-sm pointer-events-none' : ''}>
            <div className="grid md:grid-cols-2 gap-5">
              {/* Views per listing */}
              <div className="bg-white rounded-2xl p-5 card-shadow">
                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                  <Eye size={18} /> Views per Listing
                </h3>
                <div className="space-y-3">
                  {landlordProperties.map((p, i) => {
                    const views = [287, 154, 412][i] || 100
                    const max = 500
                    return (
                      <div key={p.id}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600 truncate">{p.title.split(' ').slice(0, 3).join(' ')}</span>
                          <span className="font-bold text-navy">{views}</span>
                        </div>
                        <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                          <div className="h-full bg-coral rounded-full" style={{ width: `${(views / max) * 100}%` }} />
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Room fill rate */}
              <div className="bg-white rounded-2xl p-5 card-shadow">
                <h3 className="font-bold text-navy mb-4 flex items-center gap-2">
                  <BarChart2 size={18} /> Room Fill Rate
                </h3>
                {landlordProperties.map(p => {
                  const taken = p.rooms.filter(r => r.status === 'taken').length
                  const total = p.rooms.length
                  const pct = Math.round((taken / total) * 100)
                  return (
                    <div key={p.id} className="mb-4 last:mb-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">{p.title.split(' ').slice(0, 3).join(' ')}</span>
                        <span className="font-bold text-navy">{pct}%</span>
                      </div>
                      <div className="h-5 bg-gray-100 rounded-lg overflow-hidden flex">
                        {p.rooms.map(room => (
                          <div
                            key={room.id}
                            className={`flex-1 border-r border-white last:border-0 ${
                              room.status === 'taken' ? 'bg-coral' :
                              room.status === 'reserved' ? 'bg-amber-400' : 'bg-gray-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )
                })}
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <span><span className="inline-block w-3 h-3 bg-coral rounded mr-1"></span>Taken</span>
                  <span><span className="inline-block w-3 h-3 bg-amber-400 rounded mr-1"></span>Reserved</span>
                  <span><span className="inline-block w-3 h-3 bg-gray-200 rounded mr-1"></span>Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
