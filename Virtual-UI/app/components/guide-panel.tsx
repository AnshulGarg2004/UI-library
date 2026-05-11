"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TbPackage } from 'react-icons/tb'
import axios from 'axios'
import type { Iuser } from '@/models/user.model'

const GuidedPanel = () => {
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
        <div className='absolute inset-0 flex items-center justify-center px-4 py-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='w-full max-w-2xl text-center flex flex-col items-center mx-auto'
            >
                <div className='w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#3be8ff]/[0.07] border border-[#3be8ff]/15 flex items-center justify-center mx-auto mb-5 sm:mb-6'>
                    <TbPackage size={24} className='text-[#3be8ff]/60' />
                </div>

                {user ? (
                    <>
                        <h2 className="text-base sm:text-lg font-bold mb-2 text-white/80">
                            Select a component
                        </h2>
                        <p className="text-white/35 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
                            Click any component from the sidebar to see its preview, code, and usage guide.
                        </p>
                    </>
                ) : (
                    <>
                        <h2 className="text-base sm:text-lg font-bold mb-2 text-white/80">
                            Sign in to explore components
                        </h2>
                        <p className="text-white/35 text-xs sm:text-sm mb-8 sm:mb-10 max-w-sm mx-auto leading-relaxed">
                            Sign in first to browse prebuilt components, live previews,
                            and usage guides.
                        </p>
                    </>
                )}


            </motion.div>
        </div>
    )
}

export default GuidedPanel
