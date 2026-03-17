import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Star, Shield, ChevronLeft, ChevronRight, Heart, Share2, Wifi, Car, Wind, Check } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import RoomGrid from '../components/RoomGrid'

const amenityIcons = {
  washer_dryer: { icon: '🧺', label: 'Washer/Dryer' },
  parking: { icon: '🚗', label: 'Parking' },
  ac: { icon: '❄️', label: 'Air Conditioning' },
  internet: { icon: '📶', label: 'High-Speed WiFi' },
  furnished_option: { icon: '🛋️', label: 'Furnished Option' },
  dishwasher: { icon: '🍽️', label: 'Dishwasher' },
  gym_access: { icon: '💪', label: 'Gym Access' },
  rooftop: { icon: '🌆', label: 'Rooftop Deck' },
  bike_storage: { icon: '🚲', label: 'Bike Storage' },
}

const tierColors = {
  basic: 'bg-gray-100 text-gray-600',
  pro: 'bg-blue-100 text-blue-700',
  premium: 'bg-amber-100 text-amber-700',
}

export default function PropertyDetail() {
  const { id } = useParams()
  const { properties, savedProperties, saveProperty } = useApp()
  const property = properties.find(p => p.id === parseInt(id))
  const [photoIndex, setPhotoIndex] = useState(0)
  const [lightbox, setLightbox] = useState(false)

  if (!property) return (
    <div className="max-w-7xl mx-auto px-6 py-16 text-center">
      <div className="text-6xl mb-4">🏠</div>
      <h2 className="text-2xl font-bold text-navy mb-2">Property not found</h2>
      <Link to="/properties" className="btn-primary inline-block mt-4">Browse All Properties</Link>
    </div>
  )

  const availableRooms = property.rooms.filter(r => r.status === 'available').length
  const isSaved = savedProperties.includes(property.id)
  const similarProperties = properties.filter(p => p.id !== property.id && p.nearestSchool === property.nearestSchool).slice(0, 2)

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
      {/* Back */}
      <Link to="/properties" className="inline-flex items-center gap-2 text-gray-500 hover:text-navy text-sm font-medium mb-5 transition-colors">
        <ChevronLeft size={16} /> Back to Properties
      </Link>

      {/* Photo gallery */}
      <div className="relative mb-6">
        <div
          className="relative h-72 md:h-96 rounded-2xl overflow-hidden bg-gray-100 cursor-pointer"
          onClick={() => setLightbox(true)}
        >
          {property.photos[photoIndex] ? (
            <img
              src={property.photos[photoIndex]}
              alt={property.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">🏠</div>
          )}
          {property.photos.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); setPhotoIndex(i => (i - 1 + property.photos.length) % property.photos.length) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-all"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); setPhotoIndex(i => (i + 1) % property.photos.length) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow transition-all"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div className="absolute bottom-3 right-3 bg-black/50 text-white text-xs rounded-full px-3 py-1">
            {photoIndex + 1} / {property.photos.length}
          </div>
          {property.verified && (
            <div className="absolute top-4 left-4 flex items-center gap-1 bg-white/90 text-mint text-xs font-semibold px-3 py-1.5 rounded-full">
              <Shield size={14} /> Verified Property
            </div>
          )}
        </div>

        {/* Thumbnail strip */}
        {property.photos.length > 1 && (
          <div className="flex gap-2 mt-2">
            {property.photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setPhotoIndex(i)}
                className={`w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                  i === photoIndex ? 'border-coral' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={photo} className="w-full h-full object-cover" alt="" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={() => setLightbox(false)}
          >
            <button className="absolute top-4 right-4 text-white/70 hover:text-white">
              ✕
            </button>
            <img
              src={property.photos[photoIndex]}
              className="max-w-5xl max-h-screen p-8 object-contain"
              alt=""
              onClick={e => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & info */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <h1 className="text-2xl font-black text-navy">{property.title}</h1>
                <div className="flex items-center gap-2 mt-1 text-gray-500 text-sm">
                  <MapPin size={14} />
                  <span>{property.address}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="badge bg-mint text-white text-xs">
                    {property.distanceToSchool} mi from {property.nearestSchool.split(' ').slice(-2).join(' ')}
                  </span>
                  <span className={`badge capitalize text-xs ${tierColors[property.landlordTier]}`}>
                    {property.landlordTier}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <button
                  onClick={() => saveProperty(property.id)}
                  className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-coral transition-all"
                >
                  <Heart size={20} className={isSaved ? 'fill-coral text-coral' : 'text-gray-400'} />
                </button>
                <button className="p-2.5 border-2 border-gray-200 rounded-xl hover:border-navy transition-all">
                  <Share2 size={20} className="text-gray-400" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-100 mb-4">
              <div className="text-center">
                <p className="font-bold text-navy text-lg">{property.totalRooms}</p>
                <p className="text-xs text-gray-500">Bedrooms</p>
              </div>
              <div className="text-center border-x border-gray-100">
                <p className="font-bold text-navy text-lg">{property.totalBaths}</p>
                <p className="text-xs text-gray-500">Bathrooms</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-coral text-lg">{availableRooms}/{property.totalRooms}</p>
                <p className="text-xs text-gray-500">Available</p>
              </div>
            </div>

            <p className="text-gray-600 leading-relaxed text-sm">{property.description}</p>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="font-bold text-navy text-lg mb-4">Amenities</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {property.amenities.map(a => (
                amenityIcons[a] && (
                  <div key={a} className="flex items-center gap-2 text-gray-700 text-sm">
                    <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-navy shrink-0">
                      {amenityIcons[a].icon}
                    </div>
                    {amenityIcons[a].label}
                  </div>
                )
              ))}
            </div>
          </div>

          {/* Room Grid — THE TICKETMASTER FEATURE */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <h2 className="font-bold text-navy text-xl mb-2">Select Your Room</h2>
            <p className="text-gray-500 text-sm mb-5">Click an available room to view details and hold it for 48 hours</p>
            <RoomGrid rooms={property.rooms} propertyId={property.id} />
          </div>

          {/* Group interest */}
          <div className="bg-gradient-to-br from-navy to-blue-900 rounded-2xl p-6 text-white">
            <h2 className="font-bold text-xl mb-2">Claim rooms as a group</h2>
            <p className="text-white/70 text-sm mb-4">
              Already matched with roommates? Browse and hold multiple rooms together.
            </p>
            <Link to="/match" className="inline-flex items-center gap-2 bg-coral hover:bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl transition-all text-sm">
              Find Roommates First →
            </Link>
          </div>

          {/* Reviews */}
          <div className="bg-white rounded-2xl p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy text-lg">Reviews ({property.reviewCount})</h2>
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-amber-400 text-amber-400" />
                <span className="font-bold text-navy">{property.landlordRating}</span>
              </div>
            </div>
            <div className="space-y-4">
              {(property.reviews || []).map(review => (
                <div key={review.id} className="border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                        {review.author[0]}
                      </div>
                      <p className="font-semibold text-navy text-sm">{review.author}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={12} className="fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-xs text-gray-400 ml-1">{review.date}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4">
          {/* Price & CTA */}
          <div className="bg-white rounded-2xl p-5 card-shadow sticky top-24">
            <div className="mb-4">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-black text-navy">${property.priceRange.min.toLocaleString()}</span>
                <span className="text-gray-400 text-sm">– ${property.priceRange.max.toLocaleString()}/mo</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">{availableRooms} rooms available · Move in {property.availableFrom}</p>
            </div>

            <div className="space-y-2 mb-4">
              {[
                `${property.leaseOptions.join(' / ')} lease`,
                property.subletAllowed ? 'Subletting allowed' : 'No subletting',
                `${property.totalOccupancy} total occupants`,
              ].map(f => (
                <div key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <Check size={14} className="text-mint" />
                  <span className="capitalize">{f}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => document.querySelector('.room-tile')?.scrollIntoView({ behavior: 'smooth', block: 'center' })}
              className="w-full btn-primary mb-2"
            >
              View Available Rooms
            </button>
            <button
              onClick={() => saveProperty(property.id)}
              className="w-full btn-outline"
            >
              {isSaved ? '♥ Saved' : 'Save Property'}
            </button>
          </div>

          {/* Landlord card */}
          <div className="bg-white rounded-2xl p-5 card-shadow">
            <h3 className="font-bold text-navy mb-3">About the Landlord</h3>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-navy rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {property.landlordName[0]}
              </div>
              <div>
                <p className="font-semibold text-navy text-sm">{property.landlordName}</p>
                <div className="flex items-center gap-1">
                  <Star size={12} className="fill-amber-400 text-amber-400" />
                  <span className="text-xs font-bold">{property.landlordRating}</span>
                  <span className="text-xs text-gray-400">· {property.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`badge capitalize text-xs ${tierColors[property.landlordTier]}`}>{property.landlordTier} Member</span>
              {property.verified && <span className="badge bg-teal-100 text-teal-700 text-xs"><Shield size={10} className="mr-1" />Verified</span>}
            </div>
          </div>

          {/* Similar properties */}
          {similarProperties.length > 0 && (
            <div className="bg-white rounded-2xl p-5 card-shadow">
              <h3 className="font-bold text-navy mb-3">Similar Properties</h3>
              <div className="space-y-3">
                {similarProperties.map(sp => (
                  <Link key={sp.id} to={`/properties/${sp.id}`} className="flex gap-3 group">
                    <img
                      src={sp.photos[0] || ''}
                      className="w-16 h-12 rounded-lg object-cover bg-gray-100"
                      alt=""
                    />
                    <div>
                      <p className="font-semibold text-navy text-xs group-hover:text-coral transition-colors line-clamp-1">{sp.title}</p>
                      <p className="text-xs text-gray-500">${sp.priceRange.min.toLocaleString()}/mo</p>
                      <p className="text-xs text-mint">{sp.distanceToSchool} mi away</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
