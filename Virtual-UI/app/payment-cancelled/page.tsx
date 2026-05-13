'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiX } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const PageCancelled = () => {

    const router = useRouter();

    useEffect(() => {
        const t = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(t);
    }, [router])

    return (
        <div
          className="min-h-screen text-white relative overflow-hidden flex flex-col items-center justify-center px-4"
          style={{
            background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <style>
            {` @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Syne:wght@400..800&display=swap');
            `}
          </style>

          {/* Grid overlay */}
          <div className='absolute inset-0 pointer-events-none opacity-[0.07]'
            style={{
              backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)',
              backgroundSize: "44px 44px"
            }} />

          {/* Decorative blobs */}
          <div
            className="absolute top-[10%] right-[15%] w-96 h-96 rounded-full pointer-events-none opacity-15"
            style={{ background: "radial-gradient(circle, #f87171 0%, transparent 70%)", filter: "blur(80px)" }}
          />

          <div
            className="absolute bottom-[10%] left-[5%] w-80 h-80 rounded-full pointer-events-none opacity-20"
            style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(70px)" }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
            className="relative z-10 w-full max-w-md rounded-2xl p-8 text-center"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(99,102,241,0.2)",
              boxShadow: "0 0 60px rgba(99,102,241,0.08)",
            }}
          >
            <motion.div
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}
              className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, rgba(239,68,68,0.2) 0%, rgba(239,68,68,0.05) 100%)",
                border: "2px solid rgba(239,68,68,0.3)",
              }}
            >
              <FiX className="text-5xl text-red-400" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 text-3xl font-extrabold"
              style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.02em" }}
            >
              Payment <span style={{
                background: "linear-gradient(135deg, #f87171 0%, #fb7185 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>Cancelled</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-4 text-white/60 text-sm"
            >
              Your payment was cancelled. No charges were applied to your account.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-8"
            >
              <button
                onClick={() => router.push('/')}
                className="w-full py-3 px-4 rounded-xl font-semibold transition-all"
                style={{
                  background: "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                  border: "none",
                  boxShadow: "0 0 24px rgba(99,102,241,0.35)",
                }}
              >
                Return to Home
              </button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-6 text-xs text-white/40"
            >
              Redirecting to home in 5 seconds...
            </motion.p>
          </motion.div>
        </div>
    )
}

export default PageCancelled
