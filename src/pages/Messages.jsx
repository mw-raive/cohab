import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Heart, MessageSquare } from 'lucide-react'
import { useApp } from '../contexts/AppContext'
import ChatWindow from '../components/ChatWindow'

export default function Messages() {
  const { matches, students, messages, user } = useApp()
  const matchedStudents = students.filter(s => matches.includes(s.id))
  const [selected, setSelected] = useState(matchedStudents[0]?.id || null)
  const [search, setSearch] = useState('')

  const selectedStudent = students.find(s => s.id === selected)
  const myId = user?.id || 100

  const filtered = matchedStudents.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase())
  )

  const getLastMessage = (studentId) => {
    const thread = messages[`match-${studentId}`] || []
    return thread[thread.length - 1] || null
  }

  const getUnreadCount = (studentId) => {
    const thread = messages[`match-${studentId}`] || []
    return thread.filter(m => m.senderId !== myId && !m.read).length
  }

  const formatTime = (msg) => {
    if (!msg) return ''
    return msg.time || ''
  }

  return (
    <div className="max-w-7xl mx-auto h-[calc(100vh-64px)] flex overflow-hidden">
      {/* Sidebar */}
      <div className={`${selected ? 'hidden md:flex' : 'flex'} w-full md:w-80 flex-col border-r border-gray-100 bg-white`}>
        <div className="p-5 border-b border-gray-100">
          <h2 className="font-bold text-navy text-xl mb-4">Messages</h2>
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search conversations..."
              className="input-field pl-9 text-sm py-2.5"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full p-6 text-center">
              <div className="text-5xl mb-3">💬</div>
              <h3 className="font-bold text-navy mb-1">No matches yet</h3>
              <p className="text-sm text-gray-500 mb-4">Start swiping to find your future roommates!</p>
              <Link to="/match" className="btn-primary text-sm px-4 py-2">
                Find Roommates
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {filtered.map(student => {
                const lastMsg = getLastMessage(student.id)
                const unread = getUnreadCount(student.id)
                const isSelected = selected === student.id

                return (
                  <motion.button
                    key={student.id}
                    onClick={() => setSelected(student.id)}
                    className={`w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors text-left ${
                      isSelected ? 'bg-red-50' : ''
                    }`}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={student.photo}
                        className="w-12 h-12 rounded-full bg-gray-100"
                        alt={student.name}
                      />
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-mint rounded-full border-2 border-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <p className={`font-semibold text-sm ${isSelected ? 'text-coral' : 'text-navy'}`}>
                          {student.name}
                        </p>
                        <span className="text-xs text-gray-400">{formatTime(lastMsg)}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate">
                        {lastMsg ? lastMsg.text : 'Match! Say hi 👋'}
                      </p>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="text-xs text-coral font-medium">{student.compatibilityScore}% match</span>
                      </div>
                    </div>
                    {unread > 0 && (
                      <span className="w-5 h-5 bg-coral text-white text-xs rounded-full flex items-center justify-center font-bold shrink-0">
                        {unread}
                      </span>
                    )}
                  </motion.button>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className={`${selected ? 'flex' : 'hidden md:flex'} flex-1 flex-col bg-white`}>
        {selected && selectedStudent ? (
          <>
            <div className="md:hidden px-4 py-3 border-b border-gray-100">
              <button
                onClick={() => setSelected(null)}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-navy"
              >
                ← Back to messages
              </button>
            </div>
            <ChatWindow
              threadId={`match-${selected}`}
              contact={selectedStudent}
            />
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-6xl mb-4">💬</div>
              <h3 className="text-xl font-bold text-navy mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a match to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
