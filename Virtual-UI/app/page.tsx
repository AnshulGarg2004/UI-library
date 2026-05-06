'use client'
import React, { useEffect, useState } from 'react'
import Auth from './components/auth'
import axios from 'axios';

const Home = () => {
    const [showAuth, setShowAuth] = useState(false);

    useEffect(() => {
      const fetchUser = async () => {
        const response = await axios.get('/api/get-current-user', { withCredentials: true });
        console.log("Response from get curr user: ", response);
      }
      fetchUser();
    }, []);
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
