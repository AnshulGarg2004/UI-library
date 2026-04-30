'use client'
import React, { useState } from 'react'
import Auth from './components/auth'

const Home = () => {
    const [showAuth, setShowAuth] = useState(false);
  return (
    <div>
      <button className='px-4 py-2 text-white bg-black' onClick={() => setShowAuth(true)}>
        Open
      </button>

      {showAuth && <Auth onClose={() => setShowAuth(false)} />}
    </div>
  )
}

export default Home
