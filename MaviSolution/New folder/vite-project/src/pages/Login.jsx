import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate, Link } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) throw error
      navigate('/')
    } catch (err) {
      setMessage(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EBF4F6] text-[#09637E] p-6">
      <div className="w-full max-w-md bg-white rounded-xl p-8 shadow-lg">
        <h2 className="text-2xl font-black mb-6 text-center">Sign in</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold mb-1">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full p-3 border rounded" />
          </div>
          <div>
            <label className="block text-sm font-bold mb-1">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full p-3 border rounded" />
          </div>
          <button disabled={loading} className="w-full px-4 py-3 bg-[#088395] text-white font-bold rounded">
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        {message && <p className="mt-4 text-center text-sm">{message}</p>}
        <p className="mt-6 text-center text-sm">
          Don't have an account? <Link to="/register" className="text-[#088395] font-bold">Register</Link>
        </p>
      </div>
    </div>
  )
}
