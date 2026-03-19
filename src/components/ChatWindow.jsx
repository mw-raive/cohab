import React, { useState, useRef, useEffect } from 'react'
import { Send } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useApp } from '../contexts/AppContext'
import CompatibilityBadge from './CompatibilityBadge'

export default function ChatWindow({ threadId, contact }) {
  const { messages, sendMessage, user } = useApp()
  const [input, setInput] = useState('')
  const bottomRef = useRef(null)
  const thread = messages[threadId] || []
  const myId = user?.id || 100

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [thread])

  const handleSend = () => {
    if (!input.trim()) return
    sendMessage(threadId, input.trim())
    setInput('')
  }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white">
        <img
          src={contact?.photo || "https://api.dicebear.com/9.x/personas/svg?seed=default"}
          alt={contact?.name}
          className="w-10 h-10 rounded-full bg-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy">{contact?.name}</h3>
          <p className="text-xs text-gray-500 truncate">{contact?.program} · {contact?.university?.split(' ').slice(-2).join(' ')}</p>
        </div>
        <div className="flex items-center gap-3">
          {contact?.compatibilityScore && (
            <CompatibilityBadge score={contact.compatibilityScore} size="sm" showLabel={false} />
          )}
          <Link
            to={`/profile`}
            className="text-xs text-coral font-semibold hover:underline"
          >
            Profile →
          </Link>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-gray-50">
        {thread.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="text-5xl mb-3">💬</div>
            <p className="font-semibold text-navy">Start the conversation!</p>
            <p className="text-sm text-gray-500 mt-1">You matched with {contact?.name}. Say hi!</p>
          </div>
        )}
        {thread.map(msg => {
          const isMe = msg.senderId === myId
          return (
            <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'flex-row-reverse' : 'flex-row'}`}>
              {!isMe && (
                <img
                  src={contact?.photo}
                  alt={contact?.name}
                  className="w-7 h-7 rounded-full bg-gray-100 shrink-0"
                />
              )}
              <div className={`max-w-[75%] ${isMe ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    isMe
                      ? 'bg-coral text-white rounded-br-md'
                      : 'bg-white text-navy shadow-sm rounded-bl-md'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
            </div>
          )
        })}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 bg-white border-t border-gray-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder={`Message ${contact?.name?.split(' ')[0] || ''}...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-coral focus:border-transparent text-sm bg-gray-50"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2.5 bg-coral text-white rounded-xl hover:bg-opacity-90 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
