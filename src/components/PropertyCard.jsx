import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, MapPin, Star, Shield, ChevronLeft, ChevronRight, Wifi, Car, Wind } from 'lucide-react'
import { motion } from 'framer-motion'
import { useApp } from '../contexts/AppContext'

const amenityIcons = {
  washer_dryer: { icon: '🧺', label: 'W/D' },
  parking: { icon: <Car size={14} />, label: 'Parking' },
  ac: { icon: <Wind size={14} />, label: 'A/C' },
  internet: { icon: <Wifi size={14} />, label: 'WiFi' },
  furnished_option: { icon: '🛋️', label: 'Furnishable' },
  dishwasher: { icon: '🍽️', label: 'Dishwasher' },
  gym_access: { icon: '💪', label: 'Gym' },
  rooftop: { icon: '🌆', label: 'Rooftop' },
  bike_storage: { icon: '🚲', label: 'Bikes' },
}

const tierColors = {
  basic: 'bg-gray-100 text-gray-600',
  pro: 'bg-blue-100 text-blue-700',
  premium: 'bg-amber-100 text-amber-700',
}

export default function PropertyCard({ property }) {
  const { savedProperties, saveProperty } = useApp()
  const [photoIndex, setPhotoIndex] = useState(0)
  const isSaved = savedProperties.includes(property.id)

  const availableRooms = property.rooms.filter(r => r.status === 'available').length
  const totalRooms = property.rooms.length

  const availabilityColor = availableRooms === 0 ? 'text-red-500 bg-red-50' :
    availableRooms <= Math.floor(totalRooms / 2) ? 'text-amber-600 bg-amber-50' : 'text-mint bg-teal-50'

  const prevPhoto = (e) => {
    e.preventDefault()
    setPhotoIndex(i => (i - 1 + property.photos.length) % property.photos.length)
  }

  const nextPhoto = (e) => {
    e.preventDefault()
    setPhotoIndex(i => (i + 1) % property.photos.length)
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="bg-white rounded-2xl overflow-hidden card-shadow hover:card-shadow-lg transition-shadow duration-200"
    >
      {/* Photo */}
      <div className="relative h-52 bg-gray-100 overflow-hidden">
        {property.photos.length > 0 ? (
          <img
            src={property.photos[photoIndex]}
            alt={property.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-5xl">🏠</div>
        )}

        {/* Nav arrows */}
        {property.photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-1.5 shadow transition-all"
            >
              <ChevronRight size={14} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {property.photos.map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 rounded-full transition-all ${i === photoIndex ? 'bg-white w-3' : 'bg-white/60'}`}
                />
              ))}
            </div>
          </>
        )}

        {/* Save button */}
        <button
          onClick={(e) => { e.preventDefault(); saveProperty(property.id) }}
          className="absolute top-3 right-3 bg-white/90 hover:bg-white rounded-full p-2 shadow transition-all"
        >
          <Heart size={16} className={isSaved ? 'fill-coral text-coral' : 'text-gray-400'} />
        </button>

        {/* Verified badge */}
        {property.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/90 rounded-full px-2 py-1 text-xs font-semibold text-mint">
            <Shield size={12} />
            Verified
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title row */}
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-navy text-sm leading-tight line-clamp-1">{property.title}</h3>
          <span className={`badge text-xs shrink-0 capitalize ${tierColors[property.landlordTier]}`}>
            {property.landlordTier}
          </span>
        </div>

        {/* Address */}
        <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
          <MapPin size={12} />
          <span className="line-clamp-1">{property.address}</span>
          <span className="text-mint font-medium shrink-0 ml-1">{property.distanceToSchool} mi</span>
        </div>

        {/* Price & Availability */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-navy font-bold">${property.priceRange.min.toLocaleString()}</span>
            <span className="text-gray-400 text-xs"> – ${property.priceRange.max.toLocaleString()}/mo</span>
          </div>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${availabilityColor}`}>
            {availableRooms}/{totalRooms} rooms open
          </span>
        </div>

        {/* Amenities */}
        <div className="flex flex-wrap gap-1 mb-3">
          {property.amenities.slice(0, 3).map(a => (
            amenityIcons[a] && (
              <span key={a} className="inline-flex items-center gap-1 text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-0.5">
                {amenityIcons[a].icon}
                {amenityIcons[a].label}
              </span>
            )
          ))}
          {property.amenities.length > 3 && (
            <span className="text-xs text-gray-400 px-1">+{property.amenities.length - 3}</span>
          )}
        </div>

        {/* Landlord */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1">
            <Star size={13} className="fill-amber-400 text-amber-400" />
            <span className="text-xs font-semibold text-gray-700">{property.landlordRating}</span>
            <span className="text-xs text-gray-400">· {property.landlordName}</span>
          </div>
          <Link
            to={`/properties/${property.id}`}
            className="text-xs font-semibold text-coral hover:underline"
          >
            View Rooms →
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
