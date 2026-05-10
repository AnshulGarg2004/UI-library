'use client'
import React, { useEffect, useState } from 'react'
import { SiValorant } from "react-icons/si";
import { HiSparkles } from "react-icons/hi2";
import {
  TbArrowRight,
  TbBrandNpm,
  TbCode,
  TbLayout,
  TbAdjustments,
  TbPlayerPlay,
  TbCopy,
  TbCheck,
  TbMenu2,
  TbX,
  TbLogout,
  TbComponents,
} from "react-icons/tb";
import Auth from './components/auth'
import axios from 'axios';
import { AnimatePresence, motion } from 'framer-motion'
import { Iuser } from '@/models/user.model';
import { useRouter } from 'next/navigation';
import { Icomponent } from '@/models/component.model';

const getLetter = (name: string) => {
  if (!name) {
    return 'U';
  }

  return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)

}

interface Feature {
  icon: React.ComponentType<{ size: number; className?: string }>;
  title: string;
  text: string;
}

const features: Feature[] = [
  {
    icon: TbLayout,
    title: "Prebuilt UI Components",
    text: "Install VirtualUI; and use ready-made, production-grade components instantly."
  },
  {
    icon: HiSparkles,
    title: "AI Component Generator",
    text: "Describe your UI in plain English and generate React components in seconds."
  },
  {
    icon: TbAdjustments,
    title: "Customizable Props",
    text: "Modify component props and preview changes in real-time without rebuilding."
  },
  {
    icon: TbCode,
    title: "Clean JSX Code",
    text: "Copy production-ready JSX directly into your project – zero boilerplate."
  },
  {
    icon: TbBrandNpm,
    title: "NPM Library",
    text: "Import VirtualUI components with a simple npm install command."
  },
  {
    icon: TbPlayerPlay,
    title: "Live Preview",
    text: "Instantly preview AI-generated components before exporting your code."
  }
];

interface Step {
  n: string;
  title: string;
  text: string;
}

const steps: Step[] = [
  {
    n: "01",
    title: "Install Library",
    text: "npm install virtual-ui-lib to access all prebuilt UI components."
  },
  {
    n: "02",
    title: "Use Components",
    text: "Import and customize with props for any design requirement."
  },
  {
    n: "03",
    title: "Generate with AI",
    text: "Describe your UI and let AI build the component for you."
  },
  {
    n: "04",
    title: "Copy & Use",
    text: "Paste the clean JSX code straight into your project."
  }
];

const Home = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<Iuser | null>(null);
  const [profileOpen, setProfileOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const [users, setUsers] = useState<Iuser[]>([]);
  const [components, setComponents] = useState<Icomponent[]>([]);
  const [authChecked, setAuthChecked] = useState<boolean>(false);

  const router = useRouter();

  const handleCopy = () => {
    navigator.clipboard.writeText("npm install virtual-ui-lib");
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  useEffect(() => {
    if(user?.role === "admin") {
      router.push('/admin');
    }
  }, [user]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userResponse = await axios.get('/api/get-all-users', {withCredentials : true});
        setUsers(userResponse.data.users);
        console.log("Users : ", users);
        
      } catch (error) {
        console.log("Error in fetching all users  : " ,error);
        
      }
    }

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchComponents = async () => {
      try {

        const componentResponse = await axios.get('/api/get-all-components', {withCredentials : true});
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

  const handlegenerateClick = () => {
    if (user) {
      router.push('/generate');
    }
    else {
      setShowAuth(true);
    }
  }
  return (

    <>
    {
      !authChecked && (
        <div className='fixed top-0 left-0 w-full h-1 bg-[#197b86] animate-pulse z-50'></div>
      )
    }
      <div className='min-h-screen bg-[#030b0d] text-white overflow-x-hidden' style={{ fontFamily: " 'DM sans', ;sans-serif" }}>
        <nav className='sticky top-0 z-40 flex items-center justify-between px-4 sm:px-8 lg:px-10 py-4 border-b border-white/5 bg-[#030b0d]/85 backdrop-blur-md'>
          <div className='flex items-center gap-2.5'>
            <div className='w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
              <SiValorant size={15} color="#051c20" />
            </div>
            <span className='text-lg font-bold tracking-tight' style={{ fontFamily: "'Syne',sans-serif" }}>VirtualUI</span>
          </div>

          <div className=' hidden md:flex items-center gap-6 lg:gap-8 text-sm text-white/50'>
            <button className='duration-200 px-6 py-2.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-all cursor-pointer bg-transparent'>Components</button>
            {user ? (
              <div className='relative'>
                <motion.button onClick={() => setProfileOpen(!profileOpen)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className='flex items-center gap-2.5 bg-white/6 border border-white/10 hover:border-[#3be8ff]/30 px-3 py-1.5 rounded-xl transition-all cursor-pointer'>
                  <div className='w-7 h-7 rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                    {getLetter(user.name)}
                  </div>

                  <span className='text-white/80 text-sm font-medium max-w-25 truncate'>{user.name}</span>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className='absolute right-0 top-12 w-52 bg-[#0a1a1e] border border-white/9 rounded-2xl shadow-[0_16px_40px_rgba(0,0,0,0.5)] overflow-hidden z-50'
                      >
                        <div className='px-4 py-3.5 border-b border-white/[0.07]'>
                          <p className='text-white/90 text-sm truncate'>{user.name}</p>
                          <p className=' text-white/40 text-xs truncate mt-0.5'>{user.email}</p>
                        </div>

                        <div className='py-1.5'>
                          <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/4 transition-colors cursor-pointer bg-transparent border-none text-left'>
                            <TbComponents size={16} className='text-[#3be8ff]/70 ' /> My Components
                          </button>
                        </div>

                        <div className='border-t border-white/[0.07] py-1.5'>
                          <button onClick={handleLogOut} className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/6 transition-colors cursor-pointer bg-transparent border-none text-left'>
                            <TbLayout size={16} /> logout
                          </button>
                        </div>



                      </motion.div>
                    )}
                  </AnimatePresence>

                </motion.button>
              </div>
            ) : (
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAuth(true)}
                className='flex items-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2 rounded-lg text-sm font-semibold cursor-pointer border-none shadow-[0_0_20px_rgba(59,232,255,0.25)] hover:shadow-[0_0_30px_rgba(59,232,255,0.4)] transition-shadow text-nowrap'>
                <HiSparkles size={14} /> Generate AI Component
              </motion.button>
            )}
          </div>

          <button className='md:hidden text-white/60 hover:text-white transition-colors bg-transparent border-none cursor-pointer' onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <TbX size={22} />
            ) : (
              <TbMenu2 size={22} />
            )}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className='md:hidden sticky top-16.25 z-30 bg-[#030b0d]/95 backdrop-blur-md border-b border-white/5 px-4 py-4 flex flex-col gap-3'
            >
              <button className='w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/4 transition-colors cursor-pointer bg-transparent border-none text-left'>
                <TbComponents size={16} className='text-[#3be8ff]/70' />
                Components
              </button>

              {user ? (
                <div className='mt-1 overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0a1a1e]'>
                  <div className='flex items-center gap-2.5 px-4 py-3 border-b border-white/[0.07]'>
                    <div className='w-7 h-7 rounded-lg bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center text-[#030b0d] text-[11px] font-bold'>
                      {getLetter(user.name)}
                    </div>

                    <div className='min-w-0'>
                      <p className='text-white/90 text-sm font-medium truncate'>{user.name}</p>
                      <p className='text-white/40 text-xs truncate mt-0.5'>{user.email}</p>
                    </div>
                  </div>

                  <div className='py-1.5'>
                    <button className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-white/60 hover:text-white hover:bg-white/4 transition-colors cursor-pointer bg-transparent border-none text-left'>
                      <TbComponents size={16} className='text-[#3be8ff]/70' />
                      My Components
                    </button>

                    <button onClick={() => {
                      handleLogOut();
                      setMenuOpen(false);
                    }} className='w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-400/80 hover:text-red-400 hover:bg-red-500/6 transition-colors cursor-pointer bg-transparent border-none text-left'>
                      <TbLayout size={16} />
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <button className='flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-4 py-2.5 rounded-lg text-sm font-semibold cursor-pointer border-none mt-1'>
                  <HiSparkles size={14} /> Generate AI Component
                </button>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className='fixed inset-0 z-0 bg-[radial-gradient(circle,rgba(59,232,255,0.05)_1px,transparent_1px)] bg-size-[26px_26px] pointer-events-none' />
        <div className='fixed top-0 left-1/2 -translate-x-1/2 w-[min(700px,100vw)] h-64 bg-[radial-gradient(ellipse,rgba(59,232,255,0.06)_0%,transparent_70%)] pointer-events-none' />


        <section className='relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-12 sm:pb-20 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className='inline-flex items-center gap-2 text-[10px] font-semibold tracking-[2.5px] uppercase text-[#3be8ff]/70 border border-[#3be8ff]/20 bg-[#3be8ff]/5 rounded-full px-4 py-1.5 mb-5 sm:mb-7'>
            <span className='w-1.5 h-1.5 rounded-full bg-[#3be8ff] animate-pulse' />
            AI powered UI Library
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            style={{ fontFamily: "'Syne', sans-serif" }} className='text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.08] tracking-tight mb-5 sm:mb-6'>
            Build UI Components <br />

            <span className='text-transparent bg-clip-text bg-linear-to-r from-[#3be8ff] to-[#0ab5d4]'>
              Faster with AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className='text-white/50 text-base sm:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10 font-light px-2'
          >
            Use prebuilt VirtualUI components or generate custom ones with AI.
            <br />
            Copy clean JSX directly into your project in seconds.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className='flex justify-center px-2 mb-7 sm:mb-8'
          >
            <div className='flex justify-center gap-2 sm:gap-3 bg-white/4 border border-white/10 rounded-xl px-4 py-3 sm:px-5 text-xs sm:text-sm font-mono w-full max-w-xs sm:max-w-fit'>
              <span className='text-[#3be8ff]/60'>$</span>
              <span className='text-white/80 truncate'>npm install zoup-ui </span>
              <button onClick={handleCopy} className='ml-1 text-white/30 hover:text-[#3be8ff] transition-colors cursor-pointer bg-transparent border-none shrink-0'>
                {copied ? <TbCheck size={16} className='text-[#3be8ff]' /> : <TbCopy size={16} />}
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.33, duration: 0.6 }}
            className='flex flex-col sm:flex-row justify-center gap-3 px-4 sm:px-0'
          >
            <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.95 }}
              className='flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 bg-white text-[#030b0d] rounded-xl font-semibold text-sm cursor-pointer border-none shadow-[0_4px_24px_rgba(255,255,255,0.1)] hover:shadow-[0_6px_32px_rgba(255,255,255,0.18)] transition-shadow w-full sm:w-auto'
            >
              Get Started
              <TbArrowRight size={16} />
            </motion.button>

            <motion.button onClick={handlegenerateClick}
              className='flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 border border-white/15 rounded-xl text-sm text-white/70 hover:text-white hover:border-white/25 transition-colors cursor-pointer bg-transparent w-full sm:w-auto'
            >
              <HiSparkles size={16} />
              Generate AI Component
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05, duration: 0.7 }}
            className='mt-12 sm:mt-16 mx-auto max-w-2xl bg-[#0a1a1e]/80 border border-white/[0.07] rounded-2xl p-4 sm:p-5 text-left shadow-[0_30px_60px_rgba(0,0,0,0.4)] backdrop-blur-sm overflow-x-auto'
          >
            <div className='flex items-center gap-1.5 mb-4'>
              <div className='w-2.5 h-2.5 rounded-full bg-[#ff5f57]'></div>
              <div className='w-2.5 h-2.5 rounded-full bg-[#ffbd2e]'></div>
              <div className='w-2.5 h-2.5 rounded-full bg-[#28c840]'></div>
              <span>App.jsx</span>
            </div>

            <div className='font-mono text-[11px] sm:text-[12.5px] leading-6 min-w-70 space-y-0.5'>
              <p>
                <span className='text-[#3be8ff]/60'>import </span>
                <span className='text-white/80'>{"{ Button, card }"}</span>
                <span className='text-[#3be8ff]/60'> from </span>
                <span className='text-[#aaff80]'>'virtual-ui-lib'</span>
                <span className='text-white/30'>;</span>
              </p>
              <p>{" "}</p>
              <p>
                <span className='text-[#3be8ff]/60'>export default App</span>
                <span className='text-[#ffd580]/80'>() </span>
                <span className='text-white/50'>{"{"}</span>
              </p>

              <p><span className='text-white/30'> return {"("} </span></p>

              <p>
                <span className='text-white/30'>{"         <"}</span>
                <span className='text-[#3be8ff]/70'>Card </span>
                <span className='text-[#aaff80]/60'>title </span>
                <span className='text-white/30'>= </span>
                <span className='text-[#aaff80]/70 '>"Dashboard" </span>
                <span className='text-white/30'>{">"}</span>

              </p>

              <p>
                <span className='text-white/30'>{"         <"}</span>
                <span className='text-[#3be8ff]/70'>Button </span>
                <span className='text-[#aaff80]/60'>text </span>
                <span className='text-white/30'>= </span>
                <span className='text-[#aaff80]/70 '>"Hello" </span>
                <span className='text-white/30'>{"/>"}</span>

              </p>

              <p>
                <span className='text-white/30'>{"         </"}</span>
                <span className='text-[#3be8ff]/70'>Card </span>
                <span className='text-white/30'>{">"}</span>
              </p>

              <p><span className='text-white/30'>{");"}</span></p>
              <p><span className='text-white/50'>{"}"}</span></p>
            </div>
          </motion.div>
        </section>


        <section className='max-w-6xl mx-auto px-4 py-16 sm:px-6 sm:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className='text-center mb-10 sm:mb-14'>

            <p className='text-[#3be8ff]/70 text-sm font-semibold tracking-[1px] uppercase mb-3'>What's Inside</p>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>Everything you need</h2>
            <p className='text-white/50 text-base sm:text-lg max-w-2xl mx-auto'>Powerful features designed to help you create, customize, and deploy UI components with ease.</p>
          </motion.div>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
            {features.map((item, index) => (
              <motion.div key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.07, duration: 0.55 }}
                className='group p-5 sm:p-6 rounded-2xl border border-white/[0.07] bg-white/2 hover:bg-[#3be8ff]/4 hover:border-[#3be8ff]/20 transition-all duration-300'>
                <div className='w-10 h-10 rounded-xl bg-[#3be8ff]/8 border border-[#3be8ff]/15 flex items-center justify-center mb-4 group-hover:bg-[#3be8ff]/15 transition-colors'>
                  <item.icon size={18} className="text-[#3be8ff]" />
                </div>
                <h3 className='font-semibold text-white/90 mb-2 text-[15px]'>{item.title}</h3>
                <p className='text-white/45 font-semibold mb-2 text-sm] leading-relaxed'>{item.text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className='max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-24'>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className='text-center mb-10 sm:mb-14'>

            <p className='text-[#3be8ff]/70 text-sm font-semibold tracking-[1px] uppercase mb-3'>Simple Process</p>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4'>How it Works</h2>
          </motion.div>

          <div className='relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6'>
            <div className='hidden lg:block absolute top-9 left-[12.5%] right-[12.5%] h-px bg-[#3be8ff]/10' />

            {steps.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.55 }}
                className='relative text-center group'
              >
                <div className='w-14 h-14 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-5 rounded-2xl bg-linear-to-br from-[#0e2528] to-[#071518] border border-[#3be8ff]/20 flex items-center justify-center group-hover:border-[#3be8ff]/40 group-hover:shadow-[0_0_20px_rgba(59,232,255,0.1)] transition-all duration-300'>
                  <span className='text-[9px] text-[#3be8ff]/60 font-bold tracking-widest'>{item.n}</span>
                </div>
                <h3 className='font-semibold text-white/90 mb-2 text-[13px] sm:text-[14px]'>{item.title}</h3>
                <p className='leading-relaxed text-[11px] sm:text-xs text-white/40 max-w-55 mx-auto'>{item.text}</p>
              </motion.div>
            ))}
          </div>

        </section>
        <section className='max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='relative rounded-2xl sm:rounded-3xl border border-[#3be8ff]/15 bg-linear-to-br from-[#071518] to-[#040f12] p-8 sm:p-14 text-center overflow-hidden'
          >
            <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(59,232,255,0.08)_0%,transparent_60%)] pointer-events-none' />

            <div className='z-10 relative'>
              <p className='text-[10px] font-semibold tracking-[3px] uppercase text-[#3be8ff]/70 mb-3 sm:mb-4'>
                Start building
              </p>
              <h3 className='text-3xl sm:text-4xl font-bold  tracking-tight mb-3 sm:mb-4'>
                Ready to generate <br /> Your new component
              </h3>

              {user ? (
                <>
                  <p className='text-white/40 mb-7 sm:mb-8 text-sm max-w-md mx-auto leading-relaxed'>Welcome Back <span className='text-[#3be8ff]/70'>{user.name}</span>! Continue building amazing components.</p>
                  <div className='flex flex-col sm:flex-row justify-center gap-3'>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow'
                    >
                      <HiSparkles size={16} /> Generate AI Component
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center justify-center gap-2 border border-white/15 text-white/70 px-7 py-3.5 rounded-xl font-semibold cursor-pointer bg-transparent hover:border-[#3be8ff]/30 hover:text-white transition-colors'
                    >
                      <TbComponents size={16} className='text-[#3be8ff]/70' /> My Components
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <p className=' text-white/40 mb-7 sm:mb-8 mx-auto text-sm max-w-md  leading-relaxed'>
                    Sign in with Google, get 200 free AI Credits and start geting production ready UI components instantly.
                  </p>
                  <div className='flex flex-col sm:flex-row justify-center gap-3'>
                    <motion.button onClick={() => setShowAuth(true)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center justify-center gap-2 bg-[#3be8ff] text-[#030b0d] px-7 py-3.5 rounded-xl font-semibold cursor-pointer border-none shadow-[0_0_30px_rgba(59,232,255,0.3)] hover:shadow-[0_0_40px_rgba(59,232,255,0.45)] transition-shadow'
                    >
                      <HiSparkles size={16} /> Get Started Free
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className='flex items-center justify-center gap-2 border border-white/15 text-white/70 px-7 py-3.5 rounded-xl font-semibold cursor-pointer bg-transparent hover:border-[#3be8ff]/30 hover:text-white transition-colors'
                    >
                      <TbComponents size={16} className='text-[#3be8ff]/70' /> Components
                    </motion.button>

                  </div>
                </>
              )}
            </div>
          </motion.div>


        </section>

        <footer className='border-t border-white/[0.05] py-8 sm:py-10'>
          <div className='max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0'>
            <div className='flex items-center gap-2.5'>
              <div className='w-8 h-8 rounded-xl bg-linear-to-br from-[#3be8ff] to-[#0ab5d4] flex items-center justify-center shadow-[0_0_14px_rgba(59,232,255,0.4)]'>
                <SiValorant size={15} color="#051c20" />
              </div>
              <span className='text-lg font-bold tracking-tight' style={{ fontFamily: "'Syne',sans-serif" }}>VirtualUI</span>
            </div>

            <div className='flex flex-wrap justify-center gap-4 sm:gap-5 text-xs text-white/30'>
              <span className='hover:text-white/60 transition-colors'>Components</span>
              <span className='hover:text-white/60 transition-colors'>admin@virtualui.com</span>
              <p className='text-xs text-white/25 order-last sm:order-none'>© {new Date().getFullYear()} VirtualUI. All rights reserved.</p>
            </div>

          </div>
        </footer>
        {showAuth && <Auth onClose={() => setShowAuth(false)} />}
      </div>
      </>
    
  
  )
}

export default Home
