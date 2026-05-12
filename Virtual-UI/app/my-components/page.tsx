'use client'
import { Icomponent } from '@/models/component.model';
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SiValorant } from 'react-icons/si'
import { TbLayoutSidebarLeftExpand, TbMenu2, TbSearch, TbX } from 'react-icons/tb';
import SidebarComponent from '../components/sidebar';
import DetailPanel from '../components/detail-panel';

import { Iuser } from '@/models/user.model';
import UserGuide from '../components/guide-user';
import UserDetail from '../components/user-detail';



const MyComponents = () => {

    const [selected, setSelected] = useState<Icomponent | null>(null);
    const [search, setSearch] = useState("");
    const [user, setUser] = useState<Iuser | null>(null);
    const [components, setComponents] = useState<Icomponent[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const router = useRouter();
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

    useEffect(() => {
        const fetchComponents = async () => {
            try {

                const componentResponse = await axios.get('/api/get-all-components', { withCredentials: true });
                setComponents(componentResponse.data.components);

            } catch (error) {
                console.log("Error in fetching components: ", error);

            }
        }
        fetchComponents();
    }, [])

    const handleSelect = (c: Icomponent) => {
        setSelected(c);
        setSidebarOpen(false)

    }

    const myComponents = components.filter((compo) =>
        compo.visibility === "private").filter((compo) => compo.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()));

    console.log("components all : ", components);
    console.log("my compo : ", myComponents);
    
    

    return (
        <div className="min-h-screen bg-[#030b0d] text-white flex flex-col overflow-hidden"
            style={{ fontFamily: "'DM Sans', sans-serif" }}>


            <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 py-3.5 sm:py-4 border-b border-white/[0.05] bg-[#030b0d] backdrop-blur-md shrink-0'>
                <button onClick={() => router.push('/')} className='flex items-center gap-2 sm:gap-2.5 bg-transparent border-none cursor-pointer'>

                    <div className='w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.35)]'>
                        <SiValorant size={13} color="#051c20" />
                    </div>
                    <span className="text-sm sm:text-base font-bold text-white"
                        style={{ fontFamily: "'Syne',sans-serif" }}>Zoup UI</span>
                </button>

                <div className='flex items-center gap-2'>
                    <div className='hidden sm:flex items-center gap-2 text-xs text-white/30'>
                        <TbLayoutSidebarLeftExpand size={14} />
                        <span>Component Explorer</span>
                    </div>

                    <button onClick={() => setSidebarOpen(true)} className='sm:hidden flex items-center justify-center w-8 h-8 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/50 hover:text-white/80 transition-colors cursor-pointer'>
                        <TbMenu2 size={16} />
                    </button>
                </div>
            </nav>

            <div className='flex flex-1 min-h-0'>
                <aside className='hidden sm:block w-72'>
                    <SidebarComponent selected={selected} search={search} publicComponents={myComponents} onSelect={handleSelect} setSearch={setSearch} />
                </aside>

                <AnimatePresence >

                    {sidebarOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                onClick={() => setSidebarOpen(false)}
                                className='sm:hidden fixed inset-0 z-50 bg-black/60 backdrop:blur-sm'
                            />


                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: 0 }}
                                exit={{ x: "-100%" }}
                                transition={{ type: "spring", stiffness: 320, damping: 32 }}
                                className='sm:hidden fixed top-0 left-0 z-60 h-full w-56 flex flex-col bg-[#040e11] border-r border-white/[0.08]'
                            >
                                <div className='flex items-center justify-between px-4 py-4 border-b border-white/[0.06]'>
                                    <span className='font-bold text-white/40 text-xs'>
                                        Components</span>

                                    <button
                                        onClick={() => setSidebarOpen(false)}
                                    ><TbX size={16} /></button>
                                </div>

                                <SidebarComponent selected={selected} search={search} setSearch={setSearch} publicComponents={myComponents} onSelect={handleSelect} />
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <main className='relative flex-1 min-h-0 overflow-hidden'>
                    {selected ? (
                        <UserDetail component={selected} onBack={() => setSelected(null)} />
                    ) : (
                        <UserGuide />
                    )}
                </main>
            </div>



        </div>
    )
}

export default MyComponents
