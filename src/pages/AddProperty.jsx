import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Plus, X, Check, Upload } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const steps = ['Location', 'Details', 'Rooms', 'Pricing', 'Preview']

const AMENITIES = [
  { id: 'washer_dryer', label: 'Washer/Dryer', icon: '🧺' },
  { id: 'parking', label: 'Parking', icon: '🚗' },
  { id: 'ac', label: 'Air Conditioning', icon: '❄️' },
  { id: 'internet', label: 'High-Speed WiFi', icon: '📶' },
  { id: 'furnished_option', label: 'Furnished Option', icon: '🛋️' },
  { id: 'dishwasher', label: 'Dishwasher', icon: '🍽️' },
  { id: 'gym_access', label: 'Gym Access', icon: '💪' },
  { id: 'rooftop', label: 'Rooftop Deck', icon: '🌆' },
  { id: 'bike_storage', label: 'Bike Storage', icon: '🚲' },
  { id: 'storage', label: 'Storage Unit', icon: '📦' },
]

const TIERS = [
  {
    id: 'basic', name: 'Basic', price: 'Free', color: 'border-gray-200',
    features: ['Up to 2 listings', 'Standard placement', 'Basic analytics']
  },
  {
    id: 'pro', name: 'Pro', price: '$29/mo', color: 'border-blue-400',
    features: ['Unlimited listings', 'Enhanced placement', 'Full analytics', 'Photo gallery']
  },
  {
    id: 'premium', name: 'Premium', price: '$49/mo', color: 'border-amber-400',
    badge: 'Most Popular',
    features: ['Everything in Pro', 'Lead management', 'Priority placement', 'Verified badge', 'Student group notifications']
  }
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
}

export default function AddProperty() {
  const navigate = useNavigate()
  const { addToast } = useApp()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [tier, setTier] = useState('premium')
  const [property, setProperty] = useState({
    title: '',
    address: '',
    university: 'Harvard Medical School',
    type: 'apartment',
    totalRooms: 4,
    totalBaths: 2,
    description: '',
    amenities: [],
    leaseOptions: ['annual'],
    furnished: false,
    subletAllowed: false,
    availableFrom: '',
    rooms: Array.from({ length: 4 }, (_, i) => ({
      id: `R${i + 1}`,
      name: `Room ${i + 1}`,
      size: 180,
      price: 1500,
      furnished: false,
      privateBath: false,
      availableFrom: '',
    }))
  })

  const updateRoom = (idx, field, val) => {
    setProperty(prev => ({
      ...prev,
      rooms: prev.rooms.map((r, i) => i === idx ? { ...r, [field]: val } : r)
    }))
  }

  const toggleAmenity = (id) => {
    setProperty(prev => ({
      ...prev,
      amenities: prev.amenities.includes(id)
        ? prev.amenities.filter(a => a !== id)
        : [...prev.amenities, id]
    }))
  }

  const goNext = () => { setDir(1); setStep(s => Math.min(s + 1, steps.length - 1)) }
  const goBack = () => { setDir(-1); setStep(s => Math.max(s - 1, 0)) }

  const publish = () => {
    addToast('Property published successfully! 🎉')
    navigate('/landlord/dashboard')
  }

  const UpdateRooms = (newCount) => {
    const count = Math.max(1, Math.min(8, newCount))
    setProperty(prev => {
      const rooms = Array.from({ length: count }, (_, i) =>
        prev.rooms[i] || {
          id: `R${i + 1}`,
          name: `Room ${i + 1}`,
          size: 180,
          price: 1500,
          furnished: false,
          privateBath: false,
          availableFrom: '',
        }
      )
      return { ...prev, totalRooms: count, rooms }
    })
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="bg-white rounded-2xl p-5 mb-5 card-shadow">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl">🏠</span>
          <span className="font-bold text-navy">Add New Property</span>
          <span className="ml-auto text-sm text-gray-400">Step {step + 1} of {steps.length}</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-coral rounded-full"
            animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="flex mt-2">
          {steps.map((s, i) => (
            <span key={s} className={`flex-1 text-center text-xs transition-colors ${
              i < step ? 'text-coral' : i === step ? 'text-navy font-semibold' : 'text-gray-300'
            }`}>
              {i < step ? '✓' : s}
            </span>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="overflow-hidden">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'tween', duration: 0.25 }}
          >
            {/* Step 0: Location */}
            {step === 0 && (
              <div className="bg-white rounded-2xl p-6 card-shadow space-y-4">
                <h2 className="text-2xl font-black text-navy">Property Location</h2>
                <input className="input-field" placeholder="Property title (e.g. Modern 4BR Near Harvard Medical)" value={property.title} onChange={e => setProperty(p => ({ ...p, title: e.target.value }))} />
                <input className="input-field" placeholder="Full address" value={property.address} onChange={e => setProperty(p => ({ ...p, address: e.target.value }))} />
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Nearest University</label>
                  <select className="input-field" value={property.university} onChange={e => setProperty(p => ({ ...p, university: e.target.value }))}>
                    {["Harvard Medical School", "Harvard Law School", "MIT", "Boston University", "Northeastern University"].map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                  <p className="text-xs text-mint mt-1">Auto-detected: 0.3 miles</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Property Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[{ val: 'apartment', icon: '🏢' }, { val: 'house', icon: '🏠' }, { val: 'condo', icon: '🏙️' }].map(t => (
                      <button key={t.val} onClick={() => setProperty(p => ({ ...p, type: t.val }))}
                        className={`p-3 rounded-xl border-2 text-sm font-medium capitalize transition-all ${property.type === t.val ? 'border-coral bg-red-50 text-coral' : 'border-gray-200 text-gray-600'}`}>
                        <div className="text-2xl mb-1">{t.icon}</div>
                        {t.val}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 1: Details */}
            {step === 1 && (
              <div className="bg-white rounded-2xl p-6 card-shadow space-y-5">
                <h2 className="text-2xl font-black text-navy">Property Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Total Bedrooms</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => UpdateRooms(property.totalRooms - 1)} className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-coral">-</button>
                      <span className="font-bold text-navy text-lg w-8 text-center">{property.totalRooms}</span>
                      <button onClick={() => UpdateRooms(property.totalRooms + 1)} className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-coral">+</button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Bathrooms</label>
                    <div className="flex items-center gap-3">
                      <button onClick={() => setProperty(p => ({ ...p, totalBaths: Math.max(1, p.totalBaths - 1) }))} className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-coral">-</button>
                      <span className="font-bold text-navy text-lg w-8 text-center">{property.totalBaths}</span>
                      <button onClick={() => setProperty(p => ({ ...p, totalBaths: p.totalBaths + 1 }))} className="w-9 h-9 rounded-lg border-2 border-gray-200 flex items-center justify-center font-bold text-gray-600 hover:border-coral">+</button>
                    </div>
                  </div>
                </div>
                <textarea className="input-field resize-none" rows={4} placeholder="Property description..." value={property.description} onChange={e => setProperty(p => ({ ...p, description: e.target.value }))} />
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-3 block">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {AMENITIES.map(a => (
                      <button key={a.id} onClick={() => toggleAmenity(a.id)}
                        className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-sm transition-all ${property.amenities.includes(a.id) ? 'border-coral bg-red-50 text-coral' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                        <span>{a.icon}</span>
                        <span className="font-medium">{a.label}</span>
                        {property.amenities.includes(a.id) && <Check size={14} className="ml-auto" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Lease Options</label>
                  <div className="flex gap-2">
                    {['semester', 'annual', 'month'].map(opt => (
                      <button key={opt} onClick={() => setProperty(p => ({ ...p, leaseOptions: p.leaseOptions.includes(opt) ? p.leaseOptions.filter(l => l !== opt) : [...p.leaseOptions, opt] }))}
                        className={`px-4 py-2 rounded-xl border-2 text-sm font-medium capitalize transition-all ${property.leaseOptions.includes(opt) ? 'border-coral bg-red-50 text-coral' : 'border-gray-200 text-gray-600'}`}>
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                {/* Photos upload area (placeholder) */}
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Property Photos</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-coral transition-all cursor-pointer group">
                    <Upload size={28} className="text-gray-300 mx-auto mb-2 group-hover:text-coral transition-colors" />
                    <p className="text-sm text-gray-500">Drop photos here or click to upload</p>
                    <p className="text-xs text-gray-400 mt-1">Supports JPG, PNG, WebP up to 10MB each</p>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Rooms */}
            {step === 2 && (
              <div className="bg-white rounded-2xl p-6 card-shadow space-y-4">
                <h2 className="text-2xl font-black text-navy">Configure Rooms ({property.totalRooms})</h2>
                <div className="space-y-4">
                  {property.rooms.map((room, idx) => (
                    <div key={room.id} className="border-2 border-gray-100 rounded-xl p-4 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-navy">Room {idx + 1}</h4>
                        <span className="badge bg-gray-100 text-gray-600 text-xs">{room.id}</span>
                      </div>
                      <input className="input-field text-sm" placeholder="Room name (e.g. Master Suite)" value={room.name} onChange={e => updateRoom(idx, 'name', e.target.value)} />
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Size (sq ft)</label>
                          <input type="number" className="input-field text-sm" value={room.size} onChange={e => updateRoom(idx, 'size', +e.target.value)} />
                        </div>
                        <div>
                          <label className="text-xs text-gray-500 mb-1 block">Monthly Rent ($)</label>
                          <input type="number" className="input-field text-sm" value={room.price} onChange={e => updateRoom(idx, 'price', +e.target.value)} />
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={room.furnished} onChange={e => updateRoom(idx, 'furnished', e.target.checked)} className="accent-coral" />
                          <span className="text-sm text-gray-700">Furnished</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={room.privateBath} onChange={e => updateRoom(idx, 'privateBath', e.target.checked)} className="accent-coral" />
                          <span className="text-sm text-gray-700">Private Bath</span>
                        </label>
                      </div>
                      <div className="border-2 border-dashed border-gray-200 rounded-lg p-3 text-center cursor-pointer hover:border-coral transition-all">
                        <p className="text-xs text-gray-400">+ Add room photos</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Pricing */}
            {step === 3 && (
              <div className="bg-white rounded-2xl p-6 card-shadow space-y-5">
                <h2 className="text-2xl font-black text-navy">Pricing & Terms</h2>
                <div>
                  <label className="text-sm font-semibold text-gray-600 mb-2 block">Available From</label>
                  <input type="text" className="input-field" placeholder="e.g. Aug 1, 2024" value={property.availableFrom} onChange={e => setProperty(p => ({ ...p, availableFrom: e.target.value }))} />
                </div>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={property.subletAllowed} onChange={e => setProperty(p => ({ ...p, subletAllowed: e.target.checked }))} className="accent-coral" />
                    <span className="text-sm font-medium text-gray-700">Allow subletting</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" checked={property.furnished} onChange={e => setProperty(p => ({ ...p, furnished: e.target.checked }))} className="accent-coral" />
                    <span className="text-sm font-medium text-gray-700">Fully furnished</span>
                  </label>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-navy text-sm mb-3">Room Price Summary</h3>
                  <div className="space-y-2">
                    {property.rooms.map(room => (
                      <div key={room.id} className="flex justify-between text-sm">
                        <span className="text-gray-600">{room.name}</span>
                        <span className="font-medium text-navy">${room.price.toLocaleString()}/mo</span>
                      </div>
                    ))}
                    <div className="pt-2 border-t border-gray-200 flex justify-between text-sm font-bold">
                      <span>Total if fully occupied</span>
                      <span className="text-coral">${property.rooms.reduce((acc, r) => acc + r.price, 0).toLocaleString()}/mo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Preview & Publish */}
            {step === 4 && (
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-6 card-shadow">
                  <h2 className="text-2xl font-black text-navy mb-4">Preview & Publish</h2>
                  <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm mb-5">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Title</span>
                      <span className="font-medium text-navy">{property.title || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Address</span>
                      <span className="font-medium text-navy truncate max-w-[60%] text-right">{property.address || '—'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Rooms</span>
                      <span className="font-medium text-navy">{property.totalRooms} bedrooms, {property.totalBaths} baths</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Price range</span>
                      <span className="font-medium text-coral">
                        ${Math.min(...property.rooms.map(r => r.price)).toLocaleString()} – ${Math.max(...property.rooms.map(r => r.price)).toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Amenities</span>
                      <span className="font-medium text-navy">{property.amenities.length} selected</span>
                    </div>
                  </div>
                </div>

                {/* Tier selector */}
                <div>
                  <h3 className="font-bold text-navy text-lg mb-3">Choose Your Plan</h3>
                  <div className="space-y-3">
                    {TIERS.map(t => (
                      <button
                        key={t.id}
                        onClick={() => setTier(t.id)}
                        className={`w-full text-left border-2 rounded-xl p-4 transition-all ${tier === t.id ? t.color : 'border-gray-200'}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy">{t.name}</span>
                            {t.badge && <span className="badge bg-amber-100 text-amber-700 text-xs">{t.badge}</span>}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-black text-coral">{t.price}</span>
                            {tier === t.id && <Check size={18} className="text-coral" />}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {t.features.map(f => (
                            <span key={f} className="text-xs text-gray-500">✓ {f}</span>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={publish} className="w-full btn-primary py-4 text-base">
                  Publish Property →
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-5">
        <button
          onClick={goBack}
          disabled={step === 0}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 transition-all disabled:opacity-30"
        >
          <ChevronLeft size={18} /> Back
        </button>
        {step < steps.length - 1 && (
          <button onClick={goNext} className="flex items-center gap-2 btn-primary">
            Continue <ChevronRight size={18} />
          </button>
        )}
      </div>
    </div>
  )
}
