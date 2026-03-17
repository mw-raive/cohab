import React, { createContext, useContext, useState, useEffect } from 'react'
import { currentUser, mockStudents } from '../data/mockUsers'
import { mockProperties } from '../data/mockProperties'

const AppContext = createContext(null)

export const useApp = () => {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

const DEMO_MESSAGES = {
  'match-3': [
    { id: 1, senderId: 3, text: "Hey! Looks like we matched! I saw you're also at HMS first year — I'm Priya, HBS but I know a ton of med students!", time: '10:30 AM', read: true },
    { id: 2, senderId: 100, text: "Hi Priya! Yes so excited to match! Are you looking for housing near the Longwood area?", time: '10:45 AM', read: true },
    { id: 3, senderId: 3, text: "Exactly! I've been looking at that 4BR on Francis St. Have you seen it? The room grid looked amazing", time: '10:47 AM', read: true },
    { id: 4, senderId: 100, text: "Yes! Room 1A is still available I think. Want to schedule a tour together?", time: '11:02 AM', read: true },
    { id: 5, senderId: 3, text: "100%! I could do this Saturday around noon if that works?", time: '11:05 AM', read: false },
  ],
  'match-6': [
    { id: 1, senderId: 6, text: "Hey Jordan! Marcus here. We matched — great compatibility score!", time: '9:15 AM', read: true },
    { id: 2, senderId: 100, text: "Marcus! Fellow early bird med student — feels right already 😄 What neighborhood are you looking at?", time: '9:30 AM', read: true },
    { id: 3, senderId: 6, text: "Mainly Longwood or Mission Hill. Close to hospital for when rotations start. You?", time: '9:32 AM', read: true },
    { id: 4, senderId: 100, text: "Same! I've bookmarked a couple places. Let's compare notes!", time: '9:45 AM', read: true },
    { id: 5, senderId: 6, text: "Sounds good. Maybe we should form a roommate group and start looking at the 4-bed places together?", time: '9:50 AM', read: false },
  ]
}

export const AppProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userRole, setUserRole] = useState(null)
  const [user, setUser] = useState(null)
  const [onboardingComplete, setOnboardingComplete] = useState(false)
  const [swipeHistory, setSwipeHistory] = useState({ liked: [], passed: [], superliked: [] })
  const [matches, setMatches] = useState([])
  const [messages, setMessages] = useState({})
  const [savedProperties, setSavedProperties] = useState([])
  const [heldRooms, setHeldRooms] = useState({})
  const [toasts, setToasts] = useState([])
  const [showMatchOverlay, setShowMatchOverlay] = useState(false)
  const [newMatch, setNewMatch] = useState(null)
  const [students, setStudents] = useState(mockStudents)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('nestmate_state')
      if (saved) {
        const state = JSON.parse(saved)
        if (state.isLoggedIn) {
          setIsLoggedIn(state.isLoggedIn || false)
          setUserRole(state.userRole || null)
          setUser(state.user || null)
          setOnboardingComplete(state.onboardingComplete || false)
          setSwipeHistory(state.swipeHistory || { liked: [], passed: [], superliked: [] })
          setMatches(state.matches || [])
          setMessages(state.messages || {})
          setSavedProperties(state.savedProperties || [])
          setHeldRooms(state.heldRooms || {})
        }
      }
    } catch (e) {
      // ignore
    }
  }, [])

  // Save to localStorage
  useEffect(() => {
    if (isLoggedIn) {
      try {
        localStorage.setItem('nestmate_state', JSON.stringify({
          isLoggedIn, userRole, user, onboardingComplete,
          swipeHistory, matches, messages, savedProperties, heldRooms
        }))
      } catch (e) {
        // ignore
      }
    }
  }, [isLoggedIn, userRole, user, onboardingComplete, swipeHistory, matches, messages, savedProperties, heldRooms])

  const addToast = (message, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3500)
  }

  const login = (role, userData = null) => {
    const newUser = userData || (role === 'student' ? { ...currentUser, role: 'student' } : {
      id: 300,
      name: "Alex Landlord",
      email: "landlord@example.com",
      role: "landlord",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=Landlord&backgroundColor=b6e3f4",
      company: "Boston Properties LLC",
      tier: "premium"
    })
    setUser(newUser)
    setUserRole(role)
    setIsLoggedIn(true)

    if (role === 'student' && !userData) {
      // Demo student with pre-seeded data
      const demoMatches = [3, 6]
      setMatches(demoMatches)
      setMessages(DEMO_MESSAGES)
      setSavedProperties([1, 3])
      setSwipeHistory({ liked: [3, 6], passed: [2, 11], superliked: [10] })
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setUserRole(null)
    setUser(null)
    setOnboardingComplete(false)
    setSwipeHistory({ liked: [], passed: [], superliked: [] })
    setMatches([])
    setMessages({})
    setSavedProperties([])
    setHeldRooms({})
    localStorage.removeItem('nestmate_state')
  }

  const completeOnboarding = (profileData) => {
    setUser(prev => ({ ...prev, ...profileData }))
    setOnboardingComplete(true)
    addToast('Profile created! Time to find your roommates 🎉')
  }

  const swipeAction = (studentId, action) => {
    setSwipeHistory(prev => {
      const newHistory = { ...prev }
      if (action === 'like') {
        newHistory.liked = [...(prev.liked || []), studentId]
        // Simulate match: students with compatibilityScore >= 80 match back
        const student = students.find(s => s.id === studentId)
        if (student && student.compatibilityScore >= 80 && !matches.includes(studentId)) {
          setTimeout(() => {
            setMatches(prev => [...prev, studentId])
            setNewMatch(student)
            setShowMatchOverlay(true)
            // Initialize messages for this match
            setMessages(prev => ({
              ...prev,
              [`match-${studentId}`]: []
            }))
          }, 600)
        }
      } else if (action === 'pass') {
        newHistory.passed = [...(prev.passed || []), studentId]
      } else if (action === 'superlike') {
        newHistory.superliked = [...(prev.superliked || []), studentId]
        const student = students.find(s => s.id === studentId)
        if (student && !matches.includes(studentId)) {
          setTimeout(() => {
            setMatches(prev => [...prev, studentId])
            setNewMatch(student)
            setShowMatchOverlay(true)
            setMessages(prev => ({
              ...prev,
              [`match-${studentId}`]: []
            }))
          }, 600)
        }
      }
      return newHistory
    })
  }

  const dismissMatchOverlay = () => {
    setShowMatchOverlay(false)
    setNewMatch(null)
  }

  const sendMessage = (threadId, text) => {
    const msg = {
      id: Date.now(),
      senderId: user?.id || 100,
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      read: true
    }
    setMessages(prev => ({
      ...prev,
      [threadId]: [...(prev[threadId] || []), msg]
    }))
  }

  const saveProperty = (propertyId) => {
    setSavedProperties(prev => {
      if (prev.includes(propertyId)) {
        addToast('Property removed from saved', 'info')
        return prev.filter(id => id !== propertyId)
      } else {
        addToast('Property saved!')
        return [...prev, propertyId]
      }
    })
  }

  const holdRoom = (roomId, propertyId, groupName) => {
    const key = `${propertyId}-${roomId}`
    setHeldRooms(prev => ({
      ...prev,
      [key]: {
        roomId,
        propertyId,
        groupName,
        heldAt: Date.now(),
        expiresAt: Date.now() + 48 * 60 * 60 * 1000
      }
    }))
    addToast(`Room held for 48 hours as "${groupName}"!`)
  }

  const getAvailableStudents = () => {
    const all = [...(swipeHistory.liked || []), ...(swipeHistory.passed || []), ...(swipeHistory.superliked || [])]
    return students.filter(s => !all.includes(s.id))
  }

  const getMatchedStudents = () => {
    return students.filter(s => matches.includes(s.id))
  }

  const value = {
    isLoggedIn,
    userRole,
    user,
    onboardingComplete,
    swipeHistory,
    matches,
    messages,
    savedProperties,
    heldRooms,
    toasts,
    showMatchOverlay,
    newMatch,
    students,
    properties: mockProperties,
    login,
    logout,
    completeOnboarding,
    swipeAction,
    sendMessage,
    saveProperty,
    holdRoom,
    dismissMatchOverlay,
    getAvailableStudents,
    getMatchedStudents,
    addToast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}
