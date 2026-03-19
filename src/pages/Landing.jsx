import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Check, Star, Users, Building2, Heart, Shield, ChevronRight } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.6, delay: i * 0.15 } })
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-cream overflow-x-hidden">
      {/* Nav */}
      <nav className="absolute top-0 left-0 right-0 z-20 px-6 py-5 flex items-center justify-between">
        <div className="flex items-center gap-2 text-white font-bold text-xl">
          <span className="text-2xl">🏠</span>
          <span>CoHab</span>
        </div>
        <div className="flex items-center gap-3">
          <Link to="/auth" className="text-white/80 hover:text-white text-sm font-medium transition-colors">Sign in</Link>
          <Link to="/auth" className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all">
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero-gradient min-h-screen flex items-center justify-center px-6 pt-24 pb-16 relative overflow-hidden">
        {/* Animated circles */}
        <div className="absolute top-20 right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-coral/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-mint/10 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white/90 text-sm rounded-full px-4 py-2 mb-8 border border-white/20"
          >
            <span className="w-2 h-2 bg-mint rounded-full animate-pulse"></span>
            The #1 platform for grad student housing
          </motion.div>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-tight mb-6"
          >
            Find Your People.<br />
            <span className="text-coral">Find Your Place.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={1}
            className="text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            The only platform built for grad students — match with compatible roommates
            AND browse rooms before anyone else.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={2}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              to="/auth?role=student"
              className="flex items-center gap-3 bg-coral hover:bg-red-500 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group text-lg w-full sm:w-auto justify-center"
            >
              <span>I'm a Student</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth?role=landlord"
              className="flex items-center gap-3 bg-white/15 hover:bg-white/25 backdrop-blur-sm border border-white/30 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-200 hover:shadow-lg hover:-translate-y-1 group text-lg w-full sm:w-auto justify-center"
            >
              <Building2 size={20} />
              <span>I'm a Landlord</span>
            </Link>
          </motion.div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
            className="mt-6 text-white/50 text-sm"
          >
            <button
              onClick={() => navigate('/auth?demo=true')}
              className="underline hover:text-white/80 transition-colors"
            >
              Try Demo Mode — no signup required
            </button>
          </motion.p>

          {/* Hero cards preview */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={4}
            className="mt-12 flex justify-center gap-3 px-4"
          >
            {[
              { name: "Sarah Chen", score: 94, school: "HMS", color: "b6e3f4", seed: "Sarah" },
              { name: "Marcus J.", score: 89, school: "HMS", color: "ffd5dc", seed: "Marcus" },
              { name: "Lily Zhang", score: 96, school: "HMS", color: "d1f4cc", seed: "Lily" },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + i * 0.15 }}
                className={`glass rounded-2xl p-3 w-28 sm:w-36 text-center shrink-0 ${i === 2 ? 'hidden sm:block' : ''}`}
              >
                <img
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${card.seed}&backgroundColor=${card.color}`}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full mx-auto mb-2 bg-white"
                  alt={card.name}
                />
                <p className="text-white text-xs font-bold truncate">{card.name}</p>
                <p className="text-white/60 text-xs">{card.school}</p>
                <div className="mt-2 bg-white/20 rounded-full px-2 py-1">
                  <span className="text-coral font-bold text-xs">{card.score}%</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="bg-navy py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "2,400+", label: "Students Matched" },
              { value: "180+", label: "Properties Listed" },
              { value: "94%", label: "Would Recommend" },
              { value: "42", label: "Universities" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <p className="text-3xl font-black text-coral">{stat.value}</p>
                <p className="text-white/60 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-navy mb-4">How CoHab Works</h2>
            <p className="text-gray-500 text-lg">From profile to lease in 3 simple steps</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                icon: "✏️",
                title: "Complete Your Profile",
                desc: "Answer our lifestyle questionnaire — sleep schedule, cleanliness, study habits. We'll compute your compatibility score.",
                color: "bg-purple-50 border-purple-200"
              },
              {
                step: "02",
                icon: "❤️",
                title: "Match With Roommates",
                desc: "Swipe to find compatible housemates. When it's mutual, you match! Form a group of 2–4 students.",
                color: "bg-red-50 border-red-200"
              },
              {
                step: "03",
                icon: "🏠",
                title: "Pick Your Room",
                desc: "Browse properties and claim your room on the interactive floor plan. Hold it for 48 hours while your group decides.",
                color: "bg-teal-50 border-teal-200"
              }
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className={`relative border-2 rounded-2xl p-7 ${item.color}`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <span className="absolute top-5 right-5 text-5xl font-black text-black/5">{item.step}</span>
                <h3 className="font-bold text-navy text-xl mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                {i < 2 && (
                  <ChevronRight size={24} className="absolute -right-5 top-1/2 -translate-y-1/2 text-gray-300 hidden md:block" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-warm">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-navy mb-4">Built Different</h2>
            <p className="text-gray-500 text-lg">Features designed specifically for grad student life</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Heart size={28} className="text-coral" />,
                title: "Compatibility Matching",
                desc: "Our algorithm analyzes 12 lifestyle factors to compute your true compatibility score. Not just demographics — real day-to-day fit.",
                preview: (
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-gray-200 mx-auto mb-1 flex items-center justify-center text-xl">👤</div>
                      <p className="text-xs text-gray-500">You</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="bg-coral/10 border-2 border-coral rounded-full px-4 py-2">
                        <span className="font-black text-coral text-xl">94%</span>
                      </div>
                      <p className="text-xs text-gray-400 mt-1">Great Match</p>
                    </div>
                    <div className="text-center">
                      <div className="w-14 h-14 rounded-full bg-gray-200 mx-auto mb-1 flex items-center justify-center text-xl">👤</div>
                      <p className="text-xs text-gray-500">Sarah</p>
                    </div>
                  </div>
                )
              },
              {
                icon: <Building2 size={28} className="text-mint" />,
                title: "Visual Room Selection",
                desc: "See the exact floor plan, claim a specific room, and hold it for 48 hours. Like Ticketmaster, but for your bedroom.",
                preview: (
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {['available', 'reserved', 'available', 'taken'].map((s, i) => (
                      <div key={i} className={`rounded-lg p-2 text-center text-xs font-semibold border-2 ${
                        s === 'available' ? 'border-mint bg-teal-50 text-mint' :
                        s === 'reserved' ? 'border-amber-400 bg-amber-50 text-amber-600' :
                        'border-red-300 bg-red-50 text-red-400'
                      }`}>
                        {s === 'available' ? '🟢' : s === 'reserved' ? '🟡' : '🔴'} {s}
                      </div>
                    ))}
                  </div>
                )
              },
              {
                icon: <Shield size={28} className="text-navy" />,
                title: "Verified Landlords",
                desc: "All premium landlords are ID-verified with response time guarantees and public reviews from past tenants.",
                preview: (
                  <div className="mt-4 space-y-2">
                    {[4.9, 4.8, 4.7].map((r, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs">🏢</div>
                        <div className="flex-1">
                          <div className="flex gap-0.5">
                            {[1,2,3,4,5].map(s => (
                              <Star key={s} size={12} className="fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{r} · Premium Verified</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )
              }
            ].map((feat, i) => (
              <motion.div
                key={feat.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <div className="mb-3">{feat.icon}</div>
                <h3 className="font-bold text-navy text-lg mb-2">{feat.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feat.desc}</p>
                {feat.preview}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-cream">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-black text-navy mb-4">Students Love CoHab</h2>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-amber-400 text-amber-400" />)}
            </div>
            <p className="text-gray-500">4.9 average from 2,400+ reviews</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rachel Kim",
                program: "MD, Harvard Medical",
                avatar: "Rachel",
                color: "b6e3f4",
                text: "I found my three roommates and our apartment in the same week. The compatibility scores were spot on — we haven't had a single conflict about cleanliness or noise.",
                score: 96
              },
              {
                name: "Daniel Okonkwo",
                program: "JD, Harvard Law",
                avatar: "Daniel",
                color: "ffd5dc",
                text: "The room selection feature is genius. Being able to see the actual floor plan and hold a specific room before committing saved us so much back-and-forth.",
                score: 91
              },
              {
                name: "Ananya Gupta",
                program: "MBA, Harvard Business",
                avatar: "Ananya",
                color: "d1f4cc",
                text: "As an international student, I was terrified of the housing process. CoHab made it so easy — I matched with great people and found a verified place before I even landed.",
                score: 88
              }
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 card-shadow"
              >
                <div className="flex gap-0.5 mb-4">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${t.avatar}&backgroundColor=${t.color}`}
                      className="w-10 h-10 rounded-full bg-gray-100"
                      alt={t.name}
                    />
                    <div>
                      <p className="font-semibold text-navy text-sm">{t.name}</p>
                      <p className="text-xs text-gray-400">{t.program}</p>
                    </div>
                  </div>
                  <span className="badge bg-coral/10 text-coral text-xs font-bold">{t.score}% match</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* For Landlords */}
      <section className="py-20 px-6 bg-navy">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="badge bg-coral text-white mb-4">For Property Owners</span>
              <h2 className="text-4xl font-black text-white mb-6">Fill Rooms Faster.</h2>
              <p className="text-white/70 text-lg mb-8 leading-relaxed">
                Stop dealing with unqualified leads. CoHab connects you directly with verified
                grad students who are pre-matched with compatible roommates and ready to sign.
              </p>
              <div className="space-y-3 mb-8">
                {[
                  "Reach 2,400+ pre-vetted grad students",
                  "Visual room listings that drive 3x more inquiries",
                  "Leads who arrive as groups — fill multiple rooms at once",
                  "Analytics on views, saves, and inquiry rates",
                ].map(benefit => (
                  <div key={benefit} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-mint/20 rounded-full flex items-center justify-center shrink-0">
                      <Check size={14} className="text-mint" />
                    </div>
                    <span className="text-white/80 text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/auth?role=landlord"
                className="inline-flex items-center gap-2 bg-coral hover:bg-red-500 text-white font-bold px-7 py-3.5 rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5"
              >
                List Your Property Free
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { label: "Avg Days to Fill", value: "12 days", icon: "⚡", sub: "vs 45 day market avg" },
                { label: "Qualified Leads", value: "94%", icon: "✅", sub: "ready to sign" },
                { label: "Multi-Room Fills", value: "3.2x", icon: "🏠", sub: "rooms per group" },
                { label: "Landlord Rating", value: "4.9★", icon: "⭐", sub: "avg platform rating" },
              ].map(stat => (
                <div key={stat.label} className="glass rounded-2xl p-5">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <p className="font-black text-white text-2xl">{stat.value}</p>
                  <p className="text-white/60 text-xs mt-1">{stat.label}</p>
                  <p className="text-mint text-xs mt-1">{stat.sub}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-warm text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-4xl font-black text-navy mb-4">Ready to find your place?</h2>
          <p className="text-gray-500 text-lg mb-8">Join 2,400+ grad students who found their perfect roommate match.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/auth?role=student"
              className="btn-primary flex items-center justify-center gap-2"
            >
              Get Started Free <ArrowRight size={18} />
            </Link>
            <button
              onClick={() => navigate('/auth?demo=true')}
              className="btn-outline flex items-center justify-center gap-2"
            >
              Try Demo
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-navy py-10 px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-2xl">🏠</span>
            CoHab
          </div>
          <div className="flex gap-6 text-white/50 text-sm">
            <a href="#" className="hover:text-white/80 transition-colors">About</a>
            <a href="#" className="hover:text-white/80 transition-colors">Privacy</a>
            <a href="#" className="hover:text-white/80 transition-colors">Terms</a>
            <a href="#" className="hover:text-white/80 transition-colors">Contact</a>
          </div>
          <p className="text-white/30 text-sm">© 2024 CoHab. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
