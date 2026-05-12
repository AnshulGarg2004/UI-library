"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { TbCheck, TbCopy, TbPackage } from 'react-icons/tb'
import axios from 'axios'
import type { Iuser } from '@/models/user.model'
import { FaArrowLeft } from 'react-icons/fa'

const CopyButon = ({ text }: { text: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1500);
        } catch (error) {
            console.log('Failed to copy text:', error);
        }
    }
    return (
        <div
            onClick={handleCopy}
            className='flex items-center gap-1.5 text-[11px] text-white/30 hover:text-white/60 transition-colors bg-transparent border-none cursor-pointer px-2 py-1 rounded-lg hover:bg-white/4'
        >
            {copied ? <TbCheck size={13} className='text-[#3be8ff]' /> : <TbCopy size={13} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
        </div>
    )
}

function CodeBlock({ code, lang = "jsx" }: { code: string, lang?: string }) {
    return (
        <div
            className='rounded-xl overflow-hidden'
            style={{
                background: '#060f11',
                border: '1px solid rgba(255,255,255,0.06)'
            }}
        >
            <div className='flex items-center justify-between px-4 py-2 border-b border-white/5'>
                <span className='text-[10px] text-white/25 font-mono uppercase tracking-widest'>
                    {lang}
                </span>
                <CopyButon text={code} />
            </div>

            <pre className='max-h-105 overflow-auto px-4 py-4 text-left text-xs leading-6 text-white/75 font-mono'>
                <code>{code}</code>
            </pre>
        </div>
    )
}

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

                <div className='w-full max-w-md mx-auto text-left space-y-4 mb-8'>
                    <p className='text-[#3be8ff]/30 font-bold text-[10px] uppercase tracking-[3px] mb-4'>Quick Start Guide</p>
                        <div >
                            <p className='text-xs text-white/40 mb-2 flex items-center gap-1.5'>
                                <span className='text-[#3be8ff]/60 font-bold'>01</span>Install the package
                            </p>

                            <CodeBlock code={`npm install zoup-ui`} lang='bash' />
                        </div>

                        <div >
                            <p className='text-xs text-white/40 mb-2 flex items-center gap-1.5'>
                                <span className='text-[#3be8ff]/60 font-bold'>02</span>Import your component
                            </p>

                            <CodeBlock code={`import {componentName} from 'zoup-ui'`} lang='jsx' />
                        </div>

                        <div >
                            <p className='text-xs text-white/40 mb-2 flex items-center gap-1.5'>
                                <span className='text-[#3be8ff]/60 font-bold'>03</span>Use in your App.jsx
                            </p>



                            <CodeBlock code={`import { UserAvatar, PricingCard } from "virtual-ui-library";\n\nexport default function App() {\nreturn (
                             \n<div>\n<UserAvatar src="/user.png" />\n<PricingCard title="Pro" price={99} />\n</div>\n);\n);
                                }`} lang='jsx' />
                        </div>

                                
                </div>
                                <p className='text-white/20 text-xs'>
                                <FaArrowLeft size={12} />Select a component from sidebar to get started
                                </p>
            </motion.div>
        </div>
    )
}

export default GuidedPanel
