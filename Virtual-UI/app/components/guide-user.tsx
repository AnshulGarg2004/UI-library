"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TbCheck, TbCopy, TbPackage } from 'react-icons/tb'
import axios from 'axios'
import type { Iuser } from '@/models/user.model'
import { FaArrowLeft } from 'react-icons/fa'
import CodeBlock from './code-block'


const UserGuide = () => {
    const [user, setUser] = useState<Iuser | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/get-current-user', { withCredentials: true });
                console.log("res in admin portal : ", response);

                setUser(response.data.user);
            } catch (error) {
                console.log("Error fetching user data:", error);
            }
        }
        fetchUser();
    }, [])

    return (
        <div className='absolute inset-0 flex items-center justify-center px-4 py-4'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-2xl text-center flex flex-col items-center mx-auto'
            >
                <div className='w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6' style={{background: 'rgba(59,232,255,0.08)', border: '2px solid rgba(59,232,255,0.15)'}}>
                    <TbPackage size={32} className='text-[#3be8ff]' />
                </div>

                <h2 className="text-xl sm:text-2xl font-bold mb-3 text-white/95">
                    Select a component
                </h2>
                <p className="text-white/45 text-sm sm:text-base mb-6 sm:mb-8 max-w-xl mx-auto leading-relaxed">
                    Click any component from the sidebar to see its preview, code, and usage guide.
                </p>

                <p className='text-white/30 text-xs flex items-center gap-1.5'>
                    <FaArrowLeft size={12} /> Select a component from sidebar to get started
                </p>
            </motion.div>
        </div>
    )
}

export default UserGuide
