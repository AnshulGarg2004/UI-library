'use client'
import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheckCircle } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const PageSuccess = () => {

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
                <div className="absolute -inset-1 -z-10 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 blur-xl" />

                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', stiffness: 300 }}
                >
                    <FiCheckCircle className="mx-auto text-6xl text-emerald-500 drop-shadow-[0_0_12px_rgba(16,185,129,0.4)]" />
                </motion.div>

                <h1 className="mt-6 text-2xl font-bold text-slate-800">Payment Successful!</h1>
                <p className="mt-2 text-sm text-slate-500">
                    Thank you for your purchase. Your credits have been added to your account.
                </p>
                <p className="mt-4 text-xs text-slate-400">Redirecting to home in 5 seconds...</p>
            </motion.div>
        </div>
    )
}

export default PageSuccess
