'use client'
import React, { useEffect, useState } from 'react'
import {AnimatePresence, motion} from 'framer-motion';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { TbBoxOff, TbMenu2, TbPlus, TbSearch, TbWorld } from 'react-icons/tb';

import { Iuser } from '@/models/user.model';
import type { IconType } from 'react-icons';
import { SiValorant } from 'react-icons/si'
import { TbChevronLeft, TbLayoutDashboard, TbLogout, TbPackage, TbUsers, TbCode } from 'react-icons/tb';
import { Icomponent } from '@/models/component.model';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

type navItemsProps = {
    id: string;
    label: string;
    icon: IconType;
}

type statsProps = {
    label: string;
    value: number;
    icon: IconType;
    color: string;
}

const navItems: navItemsProps[] = [
    {
        id: "dashboard",
        label: "Dashboard",
        icon: TbLayoutDashboard
    },
    {
        id: "add",
        label: "Add Component",
        icon: TbPackage
    }
]


const stats : statsProps[] = [
    { label: "Total Users", value: 0, icon: TbUsers, color: "#3be8ff" },
    { label: "Components Made", value: 0, icon: TbCode, color: "#a78bfa" },
];


interface TooltipProps {
    active? : boolean;
    label? : string | number;
    payload? : ReadonlyArray<{value: number; name: string}>;
}




const Admin = () => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); 
    const [activeView, setActiveView] = useState<"dashboard" | "add">("dashboard");
    const [user, setUser] = useState<Iuser | null>(null);
    const [profileOpen, setProfileOpen] = useState<boolean>(false);
    const [authChecked, setAuthChecked] = useState<boolean>(false);
    const [users, setUsers] = useState<Iuser[]>([]);
    const [components, setComponents] = useState<Icomponent[]>([]);
    const [componentSearch, setComponentSearch] = useState<string>('');
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
        const fetchUsers = async () => {
            try {
                const usersResponse = await axios.get('/api/get-all-users', { withCredentials: true });
                console.log("res from get all user: ", usersResponse);
                
                setUsers(usersResponse.data.data.users || []);
            } catch (error) {
                console.log("Error in fetching users: ", error);
            }
        }
        fetchUsers();
    }, [])

    useEffect(() => {
        const fetchComponents = async () => {
            try {

                const componentResponse = await axios.get('/api/get-all-components', { withCredentials: true });
                setComponents(componentResponse.data.components);
                console.log("Components: ", components);


            } catch (error) {
                console.log("Error in fetching components: ", error);

            }
        }
        fetchComponents();
    }, [])


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get('/api/get-current-user', { withCredentials: true });
                setUser(response.data.user);
            }
            catch (error: any) {
                console.log("Error in fetching current user: ", error.message);
            }
            finally {
                setAuthChecked(true);
            }
        }
        fetchUser();
    }, []);

    const publicComponents = components?.filter((compo) => compo.visibility === "public") || [];

    const filteredPublicComponents = componentSearch.trim() ? publicComponents.filter((c) => 
        c.name?.toLowerCase().includes(componentSearch.toLowerCase()) || 
    c.props?.some((p) => p.toLowerCase().includes(componentSearch.toLowerCase()))
    ) : publicComponents

    const dynamicStats : statsProps[] = [
        { label: "Total Users", value: users.length, icon: TbUsers, color: "#3be8ff" },
        { label: "Components Made", value: publicComponents.length, icon: TbCode, color: "#a78bfa" },
    ];
    

    const chartData = (() => {
        if (!publicComponents.length) return [];

        const map: Record<string, number> = {};

        publicComponents.forEach((c) => {
            const raw = c.createdAt;

            if (!raw) {
                return;
            }

            const label = new Date(raw).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });

            map[label] = (map[label] || 0) + 1;
        });

        return Object.entries(map)
            .map(([date, count]) => ({ date, components: count }))
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            .slice(-12);
    })();

    const customTooltip = (props: any) => {
        const {active, payload, label} = props;
        if(!active || !payload?.length) return null;
        return (
            <div className='bg-[#0a1f24]/95 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs shadow-lg backdrop-blur-sm'>
                <p className='text-white/40 text-xs mb-1'>
                {label}
                </p>
                <p className='text-[#a78bfa] font-semibold text-sm'>
                {payload[0].value} components
                </p>
            </div>
        )
    }
    
    const SidebarAdmin = () => {
        const handleLogOut = async () => {
            try {
                const resp = await axios.get('/api/logout', { withCredentials: true });
                setUser(null);
                router.push('/');
            } catch (error: any) {
                console.log("error in logging out");
            }
            setProfileOpen(false);
        }
        return (
            <div className='flex flex-col h-screen'>
                <div className='flex items-center gap-2.5 px-5 py-5 border-b border-white/5'>
                    <div className='w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)] shrink-0'>
                        <SiValorant size={15} color="#051c20" />
                    </div>
                    <div>
                        <span className='text-base font-bold block'>Zoup UI</span>
                        <span className='text-[10px] text-[#3be8ff]/60 font-semibold tracking-[2px] uppercase'>Admin</span>
                    </div>

                    <button onClick={() => setProfileOpen(false)} className='ml-auto bg-transparent md:hidden border-none cursor-pointer p-1.5 rounded-lg text-white/40 hover:text-white/70 transition-colors'>
                        <TbChevronLeft size={18} />
                    </button>
                </div>

                <nav className='flex-1 px-3 py-4 space-y-1'>
                    {navItems.map((item) => {
                        const isActive = activeView === item.id;
                        return (
                            <button

                                key={item.id}
                                type="button"
                                onClick={() => setActiveView(item.id as "dashboard" | "add")}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all bg-transparent border-none text-left cursor-pointer `}
                                style={{ background: isActive ? 'rgba(59, 232, 255, 0.08)' : 'transparent', color: isActive ? '#3be8ff' : 'rgba(255, 255, 255, 0.6)', borderLeft: isActive ? '2px solid #3be8ff' : '2px solid transparent' }}
                            >
                                <item.icon size={16} style={{ opacity: isActive ? 1 : 0.7 }} /> {item.label}
                            </button>
                        )
                    })}
                </nav>

                <div className='p-3 border-t border-white/5'>
                    <button onClick={handleLogOut} className='w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400/70 hover:text-red-400 hover:bg-red-500/6 transition-all cursor-pointer bg-transparent border-none text-left'>
                        <TbLogout size={16} /> LogOut
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-[#030b0d] text-white flex overflow-hidden">
            <AnimatePresence>
                <aside className='hidden md:flex flex-col w-60 min-h-screen bg-[#040e11] border-r border-white/6 fixed top-0 left-0 z-20'>
                    <SidebarAdmin />

                </aside>

                {sidebarOpen && (
                    <>
                        <motion.div onClick={() => setSidebarOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className='fixed inset-0 bg-black/50 z-30 md:hidden backdrop:blur-2xl'
                        />
                        <motion.aside
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 28, stiffness: 300 }}
                            className='fixed top-0 left-0 z-40 flex flex-col w-64 min-h-screen bg-[#040e11] border-r border-white/6 md:hidden'>
                            <SidebarAdmin />
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            <main className='flex-1 md:ml-60 min-h-screen overflow-y-auto'>
                <div className='sticky top-0 z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-[#030b0d]/90 backdrop-blur-md border-b border-white/5 flex items-center justify-between gap-2'>
                    <div className='flex items-center gap-3 min-w-0'>
                        <button onClick={()=>setSidebarOpen(true)} className='md:hidden bg-transparent border-none cursor-pointer p-1.5 rounded-lg text-white/50 hover:text-white/80 hover:bg-white/5 transition-all shrink-0'>
                            <TbMenu2 size={20}/>
                        </button>
                        <div className='min-w-0'>
                            <h1 className='text-base sm:text-lg  truncate font-bold'>
                            {activeView === "dashboard" ? "Dashboard" : "Add Component"}
                            </h1>
                            <p className='text-white/35 text-xs truncate'>
                            Welcome back, {" "}{user?.name || "Admin"}  
                            </p>
                        </div>
                    </div>
                    <motion.button
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={()=>router.push("/generate")}
                        className='flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#030b0d] bg-linear-to-r from-[#3be8ff] to-[#0ab5d4] hover:opacity-90 transition-all shadow-[0_0_20px_rgba(59,232,255,0.2)] cursor-pointer border-none shrink-0'>
                        <TbPlus size={18}/>
                        <span className='hidden sm:inline'>AI component</span>
               
                    </motion.button>
                </div>
                <AnimatePresence mode='wait'>
                    {activeView === "dashboard" && (
                        <motion.div
                            key="dashboard"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.25 }}
                            className='px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-4 sm:space-y-6'>

                                <div className='flex items-start gap-3 sm:gap-4'>
                                    {dynamicStats.map((item, ind) => (
                                        <motion.div
                                        initial={{opacity : 0, y : 16}}
                                        animate={{y : 0, opacity : 1}}
                                        transition={{delay : ind * 0.1, duration: 0.4}}
                                        key={ind}
                                        className='flex-1 p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/2 hover:bg-white/12 transition-all flex items-center gap-3'
                                        >
                                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                                            style={{ background: `${item.color}15`, border: `1px solid ${item.color}25` }}>
                                              <item.icon size={15} style={{ color: item.color }} />
                                            </div>
                                            <div>
                                                <p className='text-lg sm:text-xl font-bold'>{item.value.toLocaleString()}</p>
                                                <p className='text-white/40 text-xs'>{item.label}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className='p-4 sm:p-5 rounded-2xl border border-white/[0.07] bg-white/[0.02]'>
                                    <div className='flex items-start sm:items-center justify-between mb-4 sm:mb-5 gap-2'>
                                        <div className='min-w-0'>
                                            <p className='font-semibold text-sm truncate'>
                                                Public Component Published
                                            </p>
                                            <p className=' text-white/35 text-xs mt-0.5'>
                                            Date-wise Breakdown</p>
                                        </div>
                                        <span className='text-[10px] font-semibold px-2 sm:px-3 py-1 rounded-full bg-[#a78bfa]/10 text-[#a78bfa] border border-[#a78bfa]/20 flex-shrink-0'>
                                        Last 12 days
                                        </span>
                                    </div>
                                    {chartData?.length === 0 ? (
                                        <div className='h-[180px] sm:h-[200px] flex items-center justify-center text-sm text-white/20'>
                                            No public components yet.
                                        </div>
                                    ) : (
                                        <ResponsiveContainer width='100%' height={200}>
                                            <AreaChart data={chartData} margin={{top : 5, right : 5, bottom : 0, left : -25 }}>
                                            <defs>
                                                <linearGradient id='componentGradient' x1={0} y1={0} x2={0} y2={1}>
                                                    <stop offset='0%' stopColor='#a78bfa' stopOpacity={0.4}/>
                                                    <stop offset='50%' stopColor='#a78bfa' stopOpacity={0.15}/>
                                                    <stop offset='100%' stopColor='#a78bfa' stopOpacity={0}/>
                                                </linearGradient>
                                            </defs>

                                            <CartesianGrid strokeDasharray="3 3" stroke='rgba(255,255,255,0.04)' />
                                            <XAxis dataKey="date"
                                            tick={{fill: 'rgba(255,255,255,0.4)', fontSize : 12}}
                                            axisLine={false}
                                            tickLine={false}
                                            interval='preserveStartEnd'
                                            />

                                            <YAxis 
                                                    axisLine={false}
                                                    tickLine={false}
                                                    allowDecimals={false}
                                                    tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 12 }}
                                                    width={30}
                                            />
                                            <Tooltip content={customTooltip} cursor ={{stroke : 'rgba(255,255,255,0.06)'}}/>
                                            
                                            <Area 
                                                type='monotone' 
                                                dataKey='components' 
                                                stroke='#a78bfa' 
                                                strokeWidth={2.5}
                                                fill='url(#componentGradient)'
                                                dot={false}
                                                activeDot={{r : 6 , fill : '#a78bfa', strokeWidth : 0, stroke: 'rgba(167, 139, 250, 0.5)' }}
                                                isAnimationActive={true}
                                            />
                                            </AreaChart>
                                        </ResponsiveContainer>
                                    )}
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className='rounded-2xl border border-white/[0.07] bg-white/[0.02] overflow-hidden'
                                >
                                    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-white/[0.05]'>
                                        <div className='flex items-center gap-2.5'>
                                            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,232,255,0.1)", border: "1px solid rgba(59,232,255,0.2)" }}>
                                                <TbWorld size={14} color="#3be8ff" />
                                            </div>
                                            <div>
                                                <p className=' font-semibold text-sm'>Public Components</p>
                                                <p className='text-white/35 text-[11px]'>components visible to all users</p>
                                            </div>
                                        </div>

                                        <div className='relative w-full sm:w-56'>
                                            <TbSearch size={13} className='absolute left-3 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none' />
                                            <input
                                            value={componentSearch}
                                            onChange={(e) => setComponentSearch(e.target.value)}
                                                placeholder="Search components..."
                                                className="w-full bg-white/[0.04] border border-white/[0.06] rounded-xl pl-8 pr-3 py-2 text-xs text-white placeholder-white/25 outline-none focus:border-[#3be8ff]/40 transition-colors"
                                            />
                                        </div>
                                    </div>
                                    {filteredPublicComponents.length === 0 ? (
                                        <div className='flex flex-col items-center justify-center py-14 gap-3  text-white/20'>
                                            <TbBoxOff size={32} />
                                            <p className='text-sm'>
                                                {componentSearch ? "No component matches your search" : "No public component Search"}
                                            </p>
                                        </div>
                                    ) : (
                                        <div className='divide-y divide-white/[0.04]'>
                                            {filteredPublicComponents.map((compo, ind) => (
                                                <motion.div key={ind} className='flex items-start sm:items-center justify-between gap-3 px-4 sm:px-5 py-5 hover:bg-white/[0.02] transition-colors'>
                                                    <div className='flex items-start sm:items-center gap-3 min-w-0'>
                                                        <div className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 sm:mt-0" style={{ background: "rgba(167,139,250,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}>
                                                            <TbCode size={14} color='#a78bfa' />
                                                        </div>
                                                        <div className='min-w-0'>
                                                            <p className=' text-sm font-semibold text-white truncate'>{compo.name}</p>
                                                            {compo.props.length > 0 && (<div className='flex flex-wrap items-center gap-1 mt-1'>{compo.props.slice(0,4).map((prop, ind) => (
                                                                <span className='px-1.5 py-0.5 rounded-md text-[10px] font-medium' style={{ background: 'rgba(167,139,250,0.1)', color: 'rgba(167,139,250,0.7)'}} key={ind}>{prop}</span>
                                                            ))}
                                                            {compo.props.length > 4 && (<span className='px-1.5 py-0.5 rounded-md text-[10px] font-medium text-white/25 whitespace-nowrap'>
                                                                + {compo.props.length - 4} more
                                                            </span>)}
                                                            </div>)}
                                                        </div>
                                                    </div>

                                                    <div className='flex-shrink-0 flex flex-col sm:flex-row items-end sm:items-center gap-2'>
                                                        <span className='text-[11px] text-white/25 whitespace-nowrap'>
                                                            {new Date(compo.createdAt!).toLocaleDateString("en-US", {
                                                                month: 'short', day: 'numeric',
                                                            })}
                                                        </span>
                                                        <span className=' flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold' style={{background: 'rgba(59, 232, 255, 0.08)', color : "#3be8ff" , border : "1px solid rgba(59, 232, 255, 0.2)"}}>
                                                            <TbWorld size={9} /> Public
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            ))}
                                        </div>
                                    ) } 
                                </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>


    )
}

export default Admin
