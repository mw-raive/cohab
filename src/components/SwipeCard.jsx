import React, { useRef } from 'react'
import { motion, useMotionValue, useTransform, useAnimation } from 'framer-motion'
import { Heart, X, Star } from 'lucide-react'
import CompatibilityBadge from './CompatibilityBadge'

const lifestyleIcons = {
  sleepSchedule: { early_bird: '🐦 Early Bird', night_owl: '🦉 Night Owl', flexible: '😴 Flexible' },
  cleanliness: (v) => '✨'.repeat(Math.min(v, 5)),
  guestFrequency: { never: '🚪 Homebody', occasionally: '👥 Sometimes', often: '🎉 Social' },
}

export default function SwipeCard({ student, onSwipe, isTop, stackIndex }) {
  const x = useMotionValue(0)
  const rotate = useTransform(x, [-200, 200], [-25, 25])
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0])
  const likeOpacity = useTransform(x, [20, 100], [0, 1])
  const passOpacity = useTransform(x, [-100, -20], [1, 0])

  const handleDragEnd = (event, info) => {
    const threshold = 100
    if (info.offset.x > threshold) {
      onSwipe('like')
    } else if (info.offset.x < -threshold) {
      onSwipe('pass')
    }
  }

  const scoreBreakdown = {
    'Sleep': student.lifestyle.sleepSchedule === 'early_bird' ? 95 : 60,
    'Cleanliness': student.lifestyle.cleanliness * 20,
    'Social': student.lifestyle.guestFrequency === 'never' ? 90 : student.lifestyle.guestFrequency === 'occasionally' ? 80 : 60,
    'Study': student.lifestyle.studyHabits === 'quiet_home' ? 95 : 70,
  }

  return (
    <motion.div
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : (stackIndex === 1 ? -3 : -6),
        opacity: isTop ? opacity : 0.9,
        scale: isTop ? 1 : (stackIndex === 1 ? 0.95 : 0.9),
        zIndex: isTop ? 10 : (stackIndex === 1 ? 9 : 8),
        position: 'absolute',
        top: isTop ? 0 : (stackIndex === 1 ? 12 : 24),
        left: 0,
        right: 0,
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.8}
      onDragEnd={isTop ? handleDragEnd : undefined}
      className="w-full"
    >
      <div className="bg-white rounded-3xl overflow-hidden shadow-2xl select-none">
        {/* Photo section */}
        <div className="relative h-72 sm:h-80 bg-gray-100">
          <img
            src={student.photo}
            alt={student.name}
            className="w-full h-full object-cover"
            draggable={false}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Compatibility badge */}
          <div className="absolute top-4 right-4">
            <CompatibilityBadge score={student.compatibilityScore} size="sm" showLabel={false} breakdown={scoreBreakdown} />
          </div>

          {/* Like / Pass overlays */}
          {isTop && (
            <>
              <motion.div
                style={{ opacity: likeOpacity }}
                className="absolute top-8 left-8 border-4 border-mint rounded-xl px-4 py-2 rotate-[-15deg]"
              >
                <p className="text-mint font-black text-2xl">LIKE</p>
              </motion.div>
              <motion.div
                style={{ opacity: passOpacity }}
                className="absolute top-8 right-8 border-4 border-red-400 rounded-xl px-4 py-2 rotate-[15deg]"
              >
                <p className="text-red-400 font-black text-2xl">PASS</p>
              </motion.div>
            </>
          )}

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <div className="flex items-end justify-between">
              <div>
                <h2 className="text-2xl font-bold">{student.name}, {student.age}</h2>
                <p className="text-white/80 text-sm">{student.program} · {student.year}</p>
              </div>
              <span className="badge bg-white/20 backdrop-blur-sm text-white text-xs">
                {student.university.split(' ').slice(-2).join(' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-4">
          <p className="text-gray-600 text-sm leading-relaxed mb-3 line-clamp-2">{student.bio}</p>

          {/* Lifestyle icons */}
          <div className="flex flex-wrap gap-2 mb-3">
            <span className="badge bg-gray-100 text-gray-600 text-xs">
              {lifestyleIcons.sleepSchedule[student.lifestyle.sleepSchedule]}
            </span>
            <span className="badge bg-gray-100 text-gray-600 text-xs">
              {lifestyleIcons.guestFrequency[student.lifestyle.guestFrequency]}
            </span>
            <span className="badge bg-gray-100 text-gray-600 text-xs">
              {lifestyleIcons.cleanliness(student.lifestyle.cleanliness)} Clean
            </span>
            {student.lifestyle.pets && (
              <span className="badge bg-gray-100 text-gray-600 text-xs">🐾 Pet owner</span>
            )}
          </div>

          {/* Budget & Fun facts */}
          <div className="flex items-center justify-between">
            <span className="badge bg-navy text-white text-xs">
              💰 ${student.budget.min.toLocaleString()}–${student.budget.max.toLocaleString()}/mo
            </span>
            <span className="text-xs text-gray-400">{student.moveInDate}</span>
          </div>

          {/* Fun facts */}
          {student.funFacts && student.funFacts.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1">
              {student.funFacts.map(f => (
                <span key={f} className="text-xs bg-purple-50 text-purple-600 rounded-full px-2 py-1">{f}</span>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
