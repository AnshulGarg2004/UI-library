'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "framer-motion"
import { FiCpu, FiPlus, FiZap, FiAlertCircle, FiArrowRight, FiLoader, FiCheck } from 'react-icons/fi'
import axios from 'axios'
import { Iuser } from '@/models/user.model'
import { useRouter } from 'next/navigation'
import Toast, { ToastProps } from '../components/toast'
import LivePreview from '../components/live-preview'

interface GenerateProps {
    code_jsx : string;
    code_tsx : string;
    name : string;
    props : [string];
}

const Generate = () => {

    const [user, setUser] = useState<Iuser | null>(null);
    const lowCredits = (user?.aiCredits ?? 0) < 50;
    const [prompt, setPrompt] = useState<string>("");
    const [generated, setgenerated] = useState<GenerateProps | null>(null);
    const [generating, setGenerating] = useState(false);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const router = useRouter();

    const showToast = (message : string, type : "info" | "success" | "error") => {
        setToast({message, type});

        setTimeout(() => {
            setToast(null);
        }, 3500);
    }

    const handleGenearte = async () => {
        if(!prompt.trim() || lowCredits) return;

        setgenerated(null);
        setGenerating(true);

        try {
            const response = await axios.post('/api/generate-component', {prompt}, {withCredentials : true});
            console.log("Data from geerate: ", response);
            setgenerated(response.data.parsed);
            if (typeof response.data.remainingCredits === 'number') {
                setUser((prev) => (prev ? { ...prev, aiCredits: response.data.remainingCredits } : prev));
            }

            showToast("AI component generated successfully!", "success");
        } catch (error) {
            showToast("Failed to generate AI component.", "error");
        }
        finally {
            setGenerating(false);
        }
    }

    const handleKeyDown = (e : React.KeyboardEvent<HTMLTextAreaElement>) => {
        if((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            handleGenearte();
        }
    }

    useEffect(() => {
        const fetchUser = async () => {
            const response = await axios.get("/api/get-current-user", { withCredentials: true });
            const user = response.data.user;
            setUser(user);
        }
        fetchUser();
    }, []);
    return (
        <div
            className="text-white relative min-h-screen overflow-hidden"
            style={{
                background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
            }}
        >
            <div
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                }}
            />

            <div style={{ background: "radial-gradient(circle, #6366f1 0 %, transparent 70 %)", filter: "blur(60px)" }} className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full pointer-events-none opacity-20 bg-[radial-gradient(circle,#6366f1_0%,transparent_70%)] blur-[60px]" />
            <div style={{ filter: "blur(60px)", background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)" }} className="absolute bottom-[-10%] right-[-5%] w-80 h-80 rounded-full pointer-events-none opacity-15 bg-[radial-gradient(circle,#06b6d4_0%,transparent_70%)] blur-[60px]" />


            <div className='z-10 relative max-w-5xl mx-auto px-4 py-12'>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center"
                >

                    <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 ' style={{ background: "rgba(99, 102, 241, 0.15)", border: "1px solid rgba(99, 102, 241, 0.3)" }}>
                        <FiCpu size={14} className=' text-indigo-400' />
                        <span className='text-sm font-semibold'>AI Component Studio</span>
                    </div>
                    <h2 className='text-5xl font-bold mb-3 leading-tight' style={{ fontFamily: "\"Space Grotesk\", sans-serif", letterSpacing: "-0.03em" }}>
                        <span className='text-white'>Build with</span>
                        <span style={{ background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>AI</span>
                    </h2>
                    <p className='text-white/40 text-base mx-auto  max-w-md'>
                        Describe your React component in plain English. Preview, save and publish -all in one place.</p>
                </motion.div>

                {user && user.role === "user" && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className='flex justify-end mb-4'>
                        <div className='flex items-center gap-2 px-3 py-1.5 rounded-xl'
                            style={{
                                background: lowCredits ? "rgba(239,68,68,0.1)" : "rgba(99,102,241,0.1)",
                                border: `1px solid ${lowCredits ? "rgba(239,68,68,0.25)" : "rgba(99,102,241,0.25)"}`
                            }}
                        >
                            <FiZap size={13} style={{ color: lowCredits ? '#f87171' : '#818cf8' }} />
                            <span className='text-xs font-semibold' style={{ color: lowCredits ? '#f87171' : '#818cf8' }}>{user.aiCredits} AI Credits</span>
                            <button className='flex items-center justify-center w-5 h-5 rounded-md transition-all border-none cursor-pointer' style={{ background: lowCredits ? 'rgba(239, 68, 68, 0.2' : 'rgba(99, 102, 241, 0.2' }}
                                title='Buy More Credits' onClick={() => {
                                    router.push('/pricing')
                                }}
                            >
                                <FiPlus size={11} style={{ color: lowCredits ? '#f87171' : '#818cf8' }} />
                            </button>
                        </div>
                    </motion.div>
                )}

                {lowCredits && (
                    <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className='flex items-center gap-3 px-4 py-3 rounded-2xl mb-5'
                        style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)" }}
                    >
                        <FiAlertCircle size={16} className='text-red-400 shrink-0' />

                        <p className='text-sm text-red-300'>
                            You need at least <span className="font-bold text-red-400">50 credits</span> to generate a component.
                        </p>

                        <button
                            onClick={() => router.push("/pricing")}
                            className='ml-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer border-none whitespace-nowrap'
                            style={{ background: "rgba(239, 68, 68, 0.15)", color: "#f87171" }}
                        >
                            Buy Credits <FiArrowRight size={11} />
                        </button>

                    </motion.div>
                )}


                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, }}
                    className='rounded-2xl p-1 mb-8'
                    style={{ background: "rgba(255, 255, 255, 0.05)", border: `1px solid ${lowCredits ? "rgba(239,68,68,0.15)" : "rgba(255, 255,255,0.15)"} `, opacity: lowCredits ? 0.6 : 1 }}
                >

                    <div className='flex items-start gap-3 p-4'>
                        <FiZap className='text-indigo-400 mt-1 shrink-0' size={20} />
                        <textarea
                        onKeyDown={handleKeyDown}
                            onChange={(e) => setPrompt(e.target.value)}
                            value={prompt}
                            placeholder={lowCredits ? "Not enough credits to generate..." : "A glassmorphism pricing card with a toggle for monthly/annual billing..."}
                            disabled={lowCredits}
                            rows={3}
                            className="w-full bg-transparent text-white placeholder-white/60 text-[15px] resize-none outline-none leading-relaxed disabled:cursor-not-allowed py-3 pl-2"
                        />
                    </div>

                    <div className='flex items-center justify-between px-4 pb-3 w-full'>
                        <span className='text-xs text-white/20'>Ctrl + Enter to generate</span>
                        <motion.button
                        onClick={handleGenearte}
                            whileTap={{ scale: 0.97 }}
                            disabled={lowCredits || !prompt.trim() || generating}
                            className='flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all'
                            style={{
                                background: generating ? "rgba(99,102,241,0.3)" : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                                boxShadow: generating ? "none" : "0 0 24px rgba(99,102,241,0.4)",
                            }}
                        >
                            {generating ? (
                                <motion.span
                                    animate={{ rotate: 360 }}
                                    transition={{ repeat: Infinity, ease: 'easeIn', duration: 1 }}
                                    className=' inline-block'
                                >

                                    <FiLoader size={15} />
                                </motion.span>
                            ) : (
                                <FiZap size={15} />
                            )}

                            {generating ? "Generating..." : "Generate"}
                        </motion.button>
                    </div>

                </motion.div>
            </div>

            {generated?.code_jsx && <LivePreview code={generated.code_jsx} />}

           {!generated && !generating && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className='text-center py-16'
            >
                <div className='w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4' style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <FiCpu size={28} className='text-indigo-400' />
                </div>
                <p className='text-white/20 text-sm'>Describe your component above and hit Generate</p>
            </motion.div>
           )}

           {generating && (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='text-center py-16'
            >
                <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, ease: 'linear', duration: 1 }}
                style={{borderTopColor : "#6366f1", borderRightColor : "#06b6d4"}} className='w-14 h-14 rounded-full border-2 border-transparent mx-auto mb-4'
                />
                    
                <p className='text-white/20 text-sm'>AI is crafting your component</p>
            </motion.div>
           )}

           {toast && (
            <AnimatePresence>
                <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
            </AnimatePresence>
           )}
            
        </div>
    )
}

export default Generate
