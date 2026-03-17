import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Search, Grid, Map, SlidersHorizontal, MapPin, Star } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import PropertyCard from '../components/PropertyCard'

const amenityOptions = ['washer_dryer', 'parking', 'ac', 'internet', 'furnished_option', 'gym_access', 'dishwasher']
const amenityLabels = {
  washer_dryer: 'W/D', parking: 'Parking', ac: 'A/C',
  internet: 'WiFi', furnished_option: 'Furnished', gym_access: 'Gym', dishwasher: 'Dishwasher'
}

export default function Properties() {
  const { properties } = useApp()
  const [view, setView] = useState('grid')
  const [search, setSearch] = useState('')
  const [sort, setSort] = useState('match')
  const [priceMax, setPriceMax] = useState(3000)
  const [amenityFilter, setAmenityFilter] = useState([])
  const [availableOnly, setAvailableOnly] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const toggleAmenity = (a) => {
    setAmenityFilter(prev =>
      prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]
    )
  }

  const filtered = useMemo(() => {
    let list = [...properties]
    if (search.trim()) {
      const s = search.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(s) ||
        p.address.toLowerCase().includes(s) ||
        p.nearestSchool.toLowerCase().includes(s)
      )
    }
    list = list.filter(p => p.priceRange.min <= priceMax)
    if (amenityFilter.length > 0) {
      list = list.filter(p => amenityFilter.every(a => p.amenities.includes(a)))
    }
    if (availableOnly) {
      list = list.filter(p => p.rooms.some(r => r.status === 'available'))
    }
    if (sort === 'price_asc') list.sort((a, b) => a.priceRange.min - b.priceRange.min)
    else if (sort === 'price_desc') list.sort((a, b) => b.priceRange.min - a.priceRange.min)
    else if (sort === 'nearest') list.sort((a, b) => a.distanceToSchool - b.distanceToSchool)
    else if (sort === 'rating') list.sort((a, b) => b.landlordRating - a.landlordRating)
    else list.sort((a, b) => (b.subscriptionTier === 'premium' ? 1 : 0) - (a.subscriptionTier === 'premium' ? 1 : 0))
    return list
  }, [properties, search, sort, priceMax, amenityFilter, availableOnly])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
        <h1 className="text-3xl font-black text-navy mb-2">Browse Properties</h1>
        <p className="text-gray-500">{filtered.length} properties near top universities</p>
      </motion.div>

      {/* Search */}
      <div className="flex gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by neighborhood, school, or title..."
            className="input-field pl-11"
          />
        </div>
        <button
          onClick={() => setSearch('Harvard')}
          className="flex items-center gap-2 px-4 py-3 border-2 border-gray-200 rounded-xl text-sm text-gray-600 hover:border-navy transition-all whitespace-nowrap font-medium"
        >
          <MapPin size={16} /> Near my school
        </button>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-3 border-2 rounded-xl text-sm font-medium transition-all ${
            showFilters ? 'border-coral bg-red-50 text-coral' : 'border-gray-200 text-gray-600 hover:border-navy'
          }`}
        >
          <SlidersHorizontal size={16} />
          {showFilters ? 'Hide' : 'Filters'}
        </button>
      </div>

      {/* Filters panel */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="bg-white rounded-2xl p-5 mb-5 card-shadow space-y-5"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div>
              <p className="font-semibold text-navy text-sm mb-2">Max Price: ${priceMax.toLocaleString()}/mo</p>
              <input type="range" min="500" max="4000" step="100" value={priceMax}
                onChange={e => setPriceMax(+e.target.value)}
                className="w-full accent-coral" />
            </div>
            <div>
              <p className="font-semibold text-navy text-sm mb-2">Availability</p>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={availableOnly} onChange={e => setAvailableOnly(e.target.checked)} className="accent-coral" />
                <span className="text-sm text-gray-700">Available rooms only</span>
              </label>
            </div>
          </div>
          <div>
            <p className="font-semibold text-navy text-sm mb-2">Amenities</p>
            <div className="flex flex-wrap gap-2">
              {amenityOptions.map(a => (
                <button
                  key={a}
                  onClick={() => toggleAmenity(a)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                    amenityFilter.includes(a)
                      ? 'bg-coral text-white border-coral'
                      : 'border-gray-200 text-gray-600 hover:border-coral'
                  }`}
                >
                  {amenityLabels[a]}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Sort & View toggle */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { val: 'match', label: 'Best Match' },
            { val: 'price_asc', label: 'Price ↑' },
            { val: 'price_desc', label: 'Price ↓' },
            { val: 'nearest', label: 'Nearest' },
            { val: 'rating', label: 'Top Rated' },
          ].map(s => (
            <button
              key={s.val}
              onClick={() => setSort(s.val)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                sort === s.val ? 'bg-navy text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div className="flex gap-1 bg-gray-100 rounded-xl p-1 shrink-0">
          <button
            onClick={() => setView('grid')}
            className={`p-2 rounded-lg transition-all ${view === 'grid' ? 'bg-white shadow-sm text-navy' : 'text-gray-400'}`}
          >
            <Grid size={16} />
          </button>
          <button
            onClick={() => setView('map')}
            className={`p-2 rounded-lg transition-all ${view === 'map' ? 'bg-white shadow-sm text-navy' : 'text-gray-400'}`}
          >
            <Map size={16} />
          </button>
        </div>
      </div>

      {view === 'grid' ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((property, i) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex gap-5">
          {/* Mock map */}
          <div className="flex-1 bg-gray-100 rounded-2xl relative overflow-hidden" style={{ minHeight: 500 }}>
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
              {/* Street lines */}
              <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 600 500">
                <line x1="0" y1="150" x2="600" y2="150" stroke="#999" strokeWidth="2"/>
                <line x1="0" y1="300" x2="600" y2="300" stroke="#999" strokeWidth="2"/>
                <line x1="0" y1="400" x2="600" y2="400" stroke="#999" strokeWidth="2"/>
                <line x1="150" y1="0" x2="150" y2="500" stroke="#999" strokeWidth="2"/>
                <line x1="300" y1="0" x2="300" y2="500" stroke="#999" strokeWidth="2"/>
                <line x1="450" y1="0" x2="450" y2="500" stroke="#999" strokeWidth="2"/>
              </svg>
              {/* School markers */}
              {[
                { x: '35%', y: '35%', label: 'HMS' },
                { x: '65%', y: '25%', label: 'MIT' },
                { x: '55%', y: '65%', label: 'NEU' },
              ].map(m => (
                <div key={m.label} className="absolute" style={{ left: m.x, top: m.y, transform: 'translate(-50%,-50%)' }}>
                  <div className="bg-navy text-white text-xs rounded-full px-2 py-1 font-bold">{m.label}</div>
                </div>
              ))}
              {/* Property pins */}
              {filtered.map((p, i) => {
                const positions = [
                  { x: '32%', y: '45%' }, { x: '60%', y: '35%' }, { x: '40%', y: '30%' },
                  { x: '70%', y: '55%' }, { x: '45%', y: '65%' }, { x: '25%', y: '60%' },
                  { x: '55%', y: '75%' }, { x: '75%', y: '40%' },
                ]
                const pos = positions[i] || { x: '50%', y: '50%' }
                return (
                  <button
                    key={p.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl px-2 py-1.5 shadow-md text-xs font-bold text-navy border-2 border-coral hover:scale-110 transition-transform"
                    style={{ left: pos.x, top: pos.y }}
                  >
                    ${p.priceRange.min.toLocaleString()}
                  </button>
                )
              })}
              <div className="absolute bottom-3 right-3 text-xs text-gray-400 bg-white/80 rounded px-2 py-1">
                Powered by Mapbox
              </div>
            </div>
          </div>

          {/* Property list */}
          <div className="w-80 space-y-3 overflow-y-auto" style={{ maxHeight: 500 }}>
            {filtered.map(p => (
              <div key={p.id} className="bg-white rounded-xl p-4 card-shadow">
                <div className="flex gap-3">
                  <img src={p.photos[0] || ''} className="w-20 h-16 rounded-lg object-cover bg-gray-100" alt="" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-navy text-sm line-clamp-1">{p.title}</p>
                    <p className="text-xs text-gray-500">{p.distanceToSchool} mi · {p.nearestSchool.split(' ')[0]}</p>
                    <p className="font-bold text-coral text-sm mt-1">${p.priceRange.min.toLocaleString()}/mo</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <div className="text-5xl mb-4">🏠</div>
          <h3 className="text-xl font-bold text-navy mb-2">No properties found</h3>
          <p className="text-gray-500">Try adjusting your filters</p>
          <button onClick={() => { setSearch(''); setAmenityFilter([]); setPriceMax(3000) }} className="mt-4 btn-outline">
            Clear Filters
          </button>
        </div>
      )}
    </div>
  )
}
