import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Check, Plus, X } from 'lucide-react'
import { useApp } from '../contexts/AppContext'

const UNIVERSITIES = [
  "Harvard Medical School", "Harvard Law School", "Harvard Business School",
  "MIT", "Boston University", "Northeastern University",
  "Tufts University", "Boston College", "UMass Boston",
  "Yale University", "Columbia University", "NYU",
  "Stanford University", "UC Berkeley", "UCLA",
  "University of Chicago", "Duke University", "Penn State",
  "Cornell University", "Georgetown University"
]

const PROGRAMS = ["Medical (MD)", "Law (JD)", "MBA", "Undergraduate", "PhD", "Master's", "Other"]

const steps = [
  "Basic Info",
  "About You",
  "Budget & Lease",
  "Sleep & Study",
  "Social & Lifestyle",
  "Deal-breakers",
  "Preview"
]

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -300 : 300, opacity: 0 })
}

export default function Onboarding() {
  const navigate = useNavigate()
  const { completeOnboarding, user } = useApp()
  const [step, setStep] = useState(0)
  const [dir, setDir] = useState(1)
  const [profile, setProfile] = useState({
    name: user?.name || '',
    university: user?.university || '',
    program: user?.program || '',
    year: user?.year || '',
    moveInDate: '',
    bio: '',
    funFacts: [],
    newFact: '',
    budget: { min: 1000, max: 2000 },
    leaseDuration: 'annual',
    furnished: false,
    sleepSchedule: '',
    studyHabits: '',
    guestFrequency: '',
    cookingHabits: '',
    wfhFrequency: '',
    pets: null,
    smoking: null,
    genderPreference: 'any',
  })

  const update = (key, val) => setProfile(p => ({ ...p, [key]: val }))

  const goNext = () => {
    setDir(1)
    setStep(s => Math.min(s + 1, steps.length - 1))
  }
  const goBack = () => {
    setDir(-1)
    setStep(s => Math.max(s - 1, 0))
  }

  const finish = () => {
    completeOnboarding({
      ...profile,
      lifestyle: {
        sleepSchedule: profile.sleepSchedule,
        cleanliness: 4,
        guestFrequency: profile.guestFrequency,
        studyHabits: profile.studyHabits,
        cookingHabits: profile.cookingHabits,
        pets: profile.pets,
        smoking: profile.smoking,
        wfhFrequency: profile.wfhFrequency,
        genderPreference: profile.genderPreference,
      }
    })
    navigate('/match')
  }

  const addFunFact = () => {
    if (profile.newFact.trim() && profile.funFacts.length < 3) {
      update('funFacts', [...profile.funFacts, profile.newFact.trim()])
      update('newFact', '')
    }
  }

  const SelectButton = ({ value, current, onChange, children, className = '' }) => (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`px-4 py-3 rounded-xl border-2 font-medium text-sm transition-all ${
        current === value
          ? 'border-coral bg-red-50 text-coral'
          : 'border-gray-200 text-gray-600 hover:border-gray-300 bg-white'
      } ${className}`}
    >
      {children}
    </button>
  )

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-100 px-6 py-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-xl">🏠</span>
            <span className="font-bold text-navy">CoHab</span>
            <span className="ml-auto text-sm text-gray-400">Step {step + 1} of {steps.length}</span>
          </div>
          {/* Progress */}
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-coral rounded-full"
              animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="flex mt-2 gap-1 overflow-hidden">
            {steps.map((s, i) => (
              <span key={s} className={`flex-1 text-center text-xs transition-colors truncate ${
                i < step ? 'text-coral' : i === step ? 'text-navy font-semibold' : 'text-gray-300'
              }`}>
                {i < step ? '✓' : s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8 overflow-hidden">
        <div className="w-full max-w-lg">
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
              {/* Step 0: Basic Info */}
              {step === 0 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-black text-navy">Let's build your profile</h2>
                  <p className="text-gray-500">Tell future roommates the basics</p>
                  <input
                    className="input-field"
                    placeholder="Your full name"
                    value={profile.name}
                    onChange={e => update('name', e.target.value)}
                  />
                  <select
                    className="input-field"
                    value={profile.university}
                    onChange={e => update('university', e.target.value)}
                  >
                    <option value="">Select your university</option>
                    {UNIVERSITIES.map(u => <option key={u} value={u}>{u}</option>)}
                  </select>
                  <select
                    className="input-field"
                    value={profile.program}
                    onChange={e => update('program', e.target.value)}
                  >
                    <option value="">Select your program</option>
                    {PROGRAMS.map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                  <input
                    className="input-field"
                    placeholder="Year (e.g. 1st Year, Senior)"
                    value={profile.year}
                    onChange={e => update('year', e.target.value)}
                  />
                  <input
                    className="input-field"
                    placeholder="Expected move-in (e.g. Aug 2024)"
                    value={profile.moveInDate}
                    onChange={e => update('moveInDate', e.target.value)}
                  />
                </div>
              )}

              {/* Step 1: About You */}
              {step === 1 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-black text-navy">Tell us about you</h2>
                  <p className="text-gray-500">What should potential roommates know?</p>
                  <div>
                    <textarea
                      className="input-field resize-none"
                      rows={4}
                      placeholder="Write a short bio — what you're studying, your lifestyle, what you're looking for in a roommate..."
                      value={profile.bio}
                      onChange={e => update('bio', e.target.value.slice(0, 300))}
                    />
                    <p className="text-right text-xs text-gray-400 mt-1">{profile.bio.length}/300</p>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-2">Fun facts (up to 3) ✨</p>
                    <div className="flex gap-2 mb-3">
                      <input
                        className="input-field flex-1"
                        placeholder="e.g. Can make 5 types of dumplings"
                        value={profile.newFact}
                        onChange={e => update('newFact', e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addFunFact()}
                        disabled={profile.funFacts.length >= 3}
                      />
                      <button
                        type="button"
                        onClick={addFunFact}
                        disabled={!profile.newFact.trim() || profile.funFacts.length >= 3}
                        className="p-2.5 bg-coral text-white rounded-xl disabled:opacity-40"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {profile.funFacts.map((f, i) => (
                        <span key={i} className="flex items-center gap-1 bg-purple-100 text-purple-700 rounded-full px-3 py-1.5 text-sm">
                          {f}
                          <button type="button" onClick={() => update('funFacts', profile.funFacts.filter((_, j) => j !== i))}>
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-navy">Budget & lease preferences</h2>
                  <div>
                    <div className="flex justify-between mb-3">
                      <p className="font-semibold text-navy">Monthly budget</p>
                      <p className="font-bold text-coral">${profile.budget.min.toLocaleString()} – ${profile.budget.max.toLocaleString()}</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Minimum: ${profile.budget.min.toLocaleString()}</label>
                        <input
                          type="range" min="500" max="3500" step="100"
                          value={profile.budget.min}
                          onChange={e => update('budget', { ...profile.budget, min: +e.target.value })}
                          className="w-full accent-coral"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-500 mb-1 block">Maximum: ${profile.budget.max.toLocaleString()}</label>
                        <input
                          type="range" min="500" max="4000" step="100"
                          value={profile.budget.max}
                          onChange={e => update('budget', { ...profile.budget, max: +e.target.value })}
                          className="w-full accent-coral"
                        />
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Preferred lease duration</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'month', label: 'Month-to-month', icon: '📅' },
                        { val: 'semester', label: 'Semester', icon: '🎓' },
                        { val: 'annual', label: 'Annual (12mo)', icon: '📆' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.leaseDuration} onChange={v => update('leaseDuration', v)}>
                          <div className="text-lg mb-1">{opt.icon}</div>
                          <div className="text-xs">{opt.label}</div>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Furnished preference</p>
                    <div className="grid grid-cols-2 gap-3">
                      <SelectButton value={true} current={profile.furnished} onChange={v => update('furnished', v)}>🛋️ Furnished</SelectButton>
                      <SelectButton value={false} current={profile.furnished} onChange={v => update('furnished', v)}>📦 Unfurnished</SelectButton>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Sleep & Study */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-navy">Sleep & study habits</h2>
                  <p className="text-gray-500">These matter most for day-to-day compatibility</p>
                  <div>
                    <p className="font-semibold text-navy mb-3">Sleep schedule</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'early_bird', label: 'Early Bird', icon: '🐦', sub: 'Up by 7am' },
                        { val: 'night_owl', label: 'Night Owl', icon: '🦉', sub: 'Up past midnight' },
                        { val: 'flexible', label: 'Flexible', icon: '😴', sub: 'It depends' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.sleepSchedule} onChange={v => update('sleepSchedule', v)}>
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-xs font-bold">{opt.label}</div>
                          <div className="text-xs text-gray-400">{opt.sub}</div>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Study environment</p>
                    <div className="space-y-2">
                      {[
                        { val: 'quiet_home', label: 'Need complete quiet at home', icon: '🤫' },
                        { val: 'some_noise', label: 'Some background noise is fine', icon: '🎵' },
                        { val: 'can_work_anywhere', label: 'Can work anywhere, very flexible', icon: '💻' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.studyHabits} onChange={v => update('studyHabits', v)} className="w-full text-left flex items-center gap-3">
                          <span className="text-xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Social & Lifestyle */}
              {step === 4 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-navy">Social & lifestyle</h2>
                  <div>
                    <p className="font-semibold text-navy mb-3">Guest frequency</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'never', label: 'Rarely', icon: '🏠' },
                        { val: 'occasionally', label: 'Sometimes', icon: '👋' },
                        { val: 'often', label: 'Often', icon: '🎉' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.guestFrequency} onChange={v => update('guestFrequency', v)}>
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-xs font-bold">{opt.label}</div>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Cooking habits</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'never', label: "Don't cook", icon: '🥡' },
                        { val: 'sometimes', label: 'Sometimes', icon: '🍳' },
                        { val: 'cooks_often', label: 'Cook often', icon: '👨‍🍳' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.cookingHabits} onChange={v => update('cookingHabits', v)}>
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-xs font-bold">{opt.label}</div>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Work from home</p>
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { val: 'never', label: 'Never', icon: '🏫' },
                        { val: 'sometimes', label: 'Sometimes', icon: '🔄' },
                        { val: 'often', label: 'Often', icon: '💻' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.wfhFrequency} onChange={v => update('wfhFrequency', v)}>
                          <div className="text-2xl mb-1">{opt.icon}</div>
                          <div className="text-xs font-bold">{opt.label}</div>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Dealbreakers */}
              {step === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-black text-navy">Deal-breakers</h2>
                  <p className="text-gray-500">We'll filter out incompatible matches automatically</p>
                  <div>
                    <p className="font-semibold text-navy mb-3">Pets</p>
                    <div className="grid grid-cols-2 gap-3">
                      <SelectButton value={true} current={profile.pets} onChange={v => update('pets', v)}>🐾 Fine with pets</SelectButton>
                      <SelectButton value={false} current={profile.pets} onChange={v => update('pets', v)}>🚫 No pets</SelectButton>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Smoking</p>
                    <div className="grid grid-cols-2 gap-3">
                      <SelectButton value={true} current={profile.smoking} onChange={v => update('smoking', v)}>🚬 Fine with smoking</SelectButton>
                      <SelectButton value={false} current={profile.smoking} onChange={v => update('smoking', v)}>🚭 No smoking</SelectButton>
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold text-navy mb-3">Gender preference for roommates</p>
                    <div className="space-y-2">
                      {[
                        { val: 'any', label: 'Any gender — no preference', icon: '🤝' },
                        { val: 'same_gender', label: 'Same gender preferred', icon: '👫' },
                      ].map(opt => (
                        <SelectButton key={opt.val} value={opt.val} current={profile.genderPreference} onChange={v => update('genderPreference', v)} className="w-full text-left flex items-center gap-3">
                          <span className="text-xl">{opt.icon}</span>
                          <span>{opt.label}</span>
                        </SelectButton>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Preview */}
              {step === 6 && (
                <div className="space-y-5">
                  <h2 className="text-2xl font-black text-navy">Looks great! 🎉</h2>
                  <p className="text-gray-500">Here's your roommate profile preview</p>
                  <div className="bg-white rounded-2xl overflow-hidden card-shadow">
                    <div className="bg-gradient-to-br from-navy to-coral p-6 text-white">
                      <div className="flex items-center gap-4">
                        <img
                          src={`https://api.dicebear.com/9.x/personas/svg?seed=${profile.name || 'user'}&backgroundColor=ffd5dc`}
                          className="w-16 h-16 rounded-full bg-white/20"
                          alt={profile.name}
                        />
                        <div>
                          <h3 className="font-bold text-xl">{profile.name || 'Your Name'}</h3>
                          <p className="text-white/80 text-sm">{profile.program} · {profile.year}</p>
                          <p className="text-white/60 text-xs">{profile.university}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-5 space-y-4">
                      {profile.bio && <p className="text-gray-600 text-sm">{profile.bio}</p>}
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { icon: profile.sleepSchedule === 'early_bird' ? '🐦' : profile.sleepSchedule === 'night_owl' ? '🦉' : '😴', label: profile.sleepSchedule?.replace('_', ' ') || 'Not set' },
                          { icon: '💰', label: `$${profile.budget.min}–$${profile.budget.max}/mo` },
                          { icon: '📅', label: profile.leaseDuration || 'Not set' },
                          { icon: '🎉', label: profile.guestFrequency || 'Not set' },
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-2 bg-gray-50 rounded-xl p-2">
                            <span className="text-base">{item.icon}</span>
                            <span className="text-xs font-medium text-gray-600 capitalize">{item.label}</span>
                          </div>
                        ))}
                      </div>
                      {profile.funFacts.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {profile.funFacts.map(f => (
                            <span key={f} className="badge bg-purple-100 text-purple-700 text-xs">{f}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={goBack}
              disabled={step === 0}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:border-gray-300 transition-all disabled:opacity-30"
            >
              <ChevronLeft size={18} /> Back
            </button>

            {step < steps.length - 1 ? (
              <button
                onClick={goNext}
                className="flex items-center gap-2 btn-primary"
              >
                Continue <ChevronRight size={18} />
              </button>
            ) : (
              <button
                onClick={finish}
                className="flex items-center gap-2 btn-primary"
              >
                Start Matching! <Check size={18} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
