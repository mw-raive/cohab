import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Check, Clock, Lock } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const statusConfig = {
  available: {
    border: 'border-mint',
    bg: 'bg-teal-50',
    badge: 'bg-mint text-white',
    label: 'Available',
    dot: 'bg-mint',
    hover: 'hover:bg-teal-100 cursor-pointer',
  },
  reserved: {
    border: 'border-amber-400',
    bg: 'bg-amber-50',
    badge: 'bg-amber-400 text-white',
    label: 'Reserved',
    dot: 'bg-amber-400',
    hover: 'cursor-default',
  },
  taken: {
    border: 'border-red-300',
    bg: 'bg-red-50',
    badge: 'bg-red-400 text-white',
    label: 'Taken',
    dot: 'bg-red-400',
    hover: 'cursor-not-allowed',
  },
}

function RoomModal({ room, onClose, propertyId }) {
  const { holdRoom, user } = useApp()
  const [photoIdx, setPhotoIdx] = useState(0)
  const [groupName, setGroupName] = useState('')
  const [held, setHeld] = useState(false)
  const cfg = statusConfig[room.status]

  const handleHold = () => {
    const name = groupName.trim() || (user?.name ? `${user.name}'s Group` : 'My Group')
    holdRoom(room.id, propertyId, name)
    setHeld(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Photo carousel */}
        <div className="relative h-56 bg-gray-100">
          {room.photos && room.photos.length > 0 ? (
            <img
              src={room.photos[photoIdx]}
              alt={room.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-5xl">🛏️</div>
          )}
          {room.photos && room.photos.length > 1 && (
            <>
              <button
                onClick={() => setPhotoIdx(i => (i - 1 + room.photos.length) % room.photos.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setPhotoIdx(i => (i + 1) % room.photos.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1.5"
              >
                <ChevronRight size={16} />
              </button>
            </>
          )}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/80 hover:bg-white rounded-full p-1.5 shadow"
          >
            <X size={16} />
          </button>
          <span className={`absolute top-3 left-3 badge text-xs ${cfg.badge}`}>{cfg.label}</span>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-navy text-lg">{room.name}</h3>
              <p className="text-gray-500 text-sm">{room.size} sq ft · {room.privateBath ? 'Private Bath' : 'Shared Bath'}</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-navy text-xl">${room.price.toLocaleString()}</p>
              <p className="text-gray-400 text-xs">per month</p>
            </div>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            {room.furnished && (
              <span className="badge bg-purple-100 text-purple-700 text-xs">🛋️ Furnished</span>
            )}
            {room.features.map(f => (
              <span key={f} className="badge bg-gray-100 text-gray-600 text-xs">{f}</span>
            ))}
          </div>

          {/* Reserved info */}
          {room.status === 'reserved' && room.heldBy && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 text-amber-700 text-sm">
                <Clock size={14} />
                <span className="font-medium">Held by: {room.heldBy}</span>
              </div>
              {room.heldUntil && (
                <p className="text-amber-600 text-xs mt-1">Expires in {room.heldUntil}</p>
              )}
            </div>
          )}

          {/* Hold button */}
          {room.status === 'available' && !held && (
            <div className="space-y-3">
              <input
                type="text"
                placeholder={`Group name (e.g. "${user?.name?.split(' ')[0] || 'My'}'s Group")`}
                value={groupName}
                onChange={e => setGroupName(e.target.value)}
                className="input-field text-sm"
              />
              <button
                onClick={handleHold}
                className="w-full btn-primary text-center"
              >
                Hold This Room (48hr)
              </button>
              <p className="text-xs text-gray-400 text-center">No credit card required. Holding reserves this room for 48 hours.</p>
            </div>
          )}

          {held && (
            <div className="bg-teal-50 border border-mint rounded-xl p-4 text-center">
              <Check size={24} className="text-mint mx-auto mb-2" />
              <p className="font-semibold text-navy">Room Held Successfully!</p>
              <p className="text-sm text-gray-500 mt-1">This room is reserved for your group for 48 hours.</p>
            </div>
          )}

          {room.status === 'taken' && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
              <Lock size={24} className="text-red-400 mx-auto mb-2" />
              <p className="font-semibold text-gray-600">This room is occupied</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function RoomGrid({ rooms, propertyId }) {
  const [selectedRoom, setSelectedRoom] = useState(null)

  const handleRoomClick = (room) => {
    if (room.status === 'taken') return
    setSelectedRoom(room)
  }

  return (
    <div>
      {/* Legend */}
      <div className="flex items-center gap-4 mb-4 flex-wrap">
        {Object.entries(statusConfig).map(([key, cfg]) => (
          <div key={key} className="flex items-center gap-2 text-sm text-gray-600">
            <div className={`w-3 h-3 rounded-full ${cfg.dot}`} />
            {cfg.label}
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3">
        {rooms.map(room => {
          const cfg = statusConfig[room.status]
          return (
            <motion.div
              key={room.id}
              whileHover={room.status !== 'taken' ? { scale: 1.02, y: -2 } : {}}
              onClick={() => handleRoomClick(room)}
              className={`room-tile border-2 rounded-xl p-4 ${cfg.border} ${cfg.bg} ${cfg.hover} transition-all`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-bold text-gray-500">{room.id}</span>
                <span className={`badge text-xs ${cfg.badge}`}>{cfg.label}</span>
              </div>
              <h4 className="font-semibold text-navy text-sm leading-tight mb-1">{room.name.split('—')[1]?.trim() || room.name}</h4>
              <p className="text-xs text-gray-500 mb-2">{room.size} sq ft</p>
              <p className="font-bold text-navy">${room.price.toLocaleString()}<span className="font-normal text-gray-400 text-xs">/mo</span></p>
              <div className="mt-2 flex gap-1 flex-wrap">
                {room.privateBath && <span className="text-xs bg-white/80 rounded px-1.5 py-0.5 text-gray-600">🛁 Private</span>}
                {room.furnished && <span className="text-xs bg-white/80 rounded px-1.5 py-0.5 text-gray-600">🛋️ Furnished</span>}
              </div>
              {room.status === 'reserved' && room.heldBy && (
                <p className="text-xs text-amber-600 mt-2 truncate">{room.heldBy}</p>
              )}
            </motion.div>
          )
        })}
      </div>

      {/* Common areas indicator */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Common Areas</p>
        <div className="flex gap-3 flex-wrap">
          {['🛋️ Living Room', '🍳 Kitchen', '🚿 Bathroom'].map(area => (
            <span key={area} className="text-sm bg-gray-100 rounded-lg px-3 py-2 text-gray-600">{area}</span>
          ))}
        </div>
      </div>

      {/* Room Modal */}
      <AnimatePresence>
        {selectedRoom && (
          <RoomModal
            room={selectedRoom}
            propertyId={propertyId}
            onClose={() => setSelectedRoom(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
