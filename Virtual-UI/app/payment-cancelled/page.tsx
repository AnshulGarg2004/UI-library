'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTimesCircle } from "react-icons/fa";
import { useRouter } from 'next/navigation';

const PageCancelled = () => {

    const router = useRouter();

    useEffect(() => {
        const t = setTimeout(() => {
            router.push('/');
        }, 5000);

        return () => clearTimeout(t);
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center px-6">
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
                className="relative w-full max-w-md rounded-2xl border border-white/40 bg-white/80 p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] backdrop-blur-xl"
            >
                {/* Glow ring */}
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-red-500/15 to-orange-500/15 blur-xl" />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                >
                    <FaTimesCircle className="mx-auto text-6xl text-red-400 drop-shadow-[0_0_12px_rgba(239,68,68,0.3)]" />
                </motion.div>

                <h1 className="mt-6 text-2xl font-bold text-slate-800">Payment Cancelled</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Your payment was cancelled. No charges were applied.
                </p>
                <p className="mt-4 text-xs text-slate-400">Redirecting to home in 5 seconds...</p>
            </motion.div>
        </div>
    )
}

export default PageCancelled
