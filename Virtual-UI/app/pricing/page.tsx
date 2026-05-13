'use client'
import { Iuser } from '@/models/user.model';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FiArrowLeft, FiCheck, FiLock, FiZap } from 'react-icons/fi';

interface planProps {
  name: string;
  amount: number;
  aiCredits: number;
  tag: string;
  description: string;
  features: string[];
  cta: string;
  disabled: boolean;
  highlight: boolean;
}

const plan: planProps[] = [
  {
    name: "Free",
    amount: 0,
    aiCredits: 200,

    tag: "Current Plan",
    description: "Get started with AI powered component generation.",
    features: [
      "200 AI Credits included",
      "Save Component",
      "Preview and export code",
      "Community support"
    ],
    cta: "Active",
    disabled: true,
    highlight: false
  },
  {
    name: "Pro",
    amount: 99,
    aiCredits: 200,

    tag: "Most Popular",
    description: "More credits to build faster with no interuptions",
    features: [
      "200 AI Credits added",
      "Save Component",
      "Preview and export code",
      "Community support"
    ],
    cta: "Buy for $99",
    disabled: false,
    highlight: true
  },
]

const Pricing = () => {

  const [user, setUser] = useState<Iuser | null>(null);
  const [userId, setUserId] = useState<string>("");
  const [buyingAmount, setBuyingAmount] = useState<number | null>(null);

  const router = useRouter();


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/api/get-current-user', { withCredentials: true });
        console.log("res in admin portal : ", response);

        setUser(response.data.user);
        setUserId(String(response.data.user?._id || ""));
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
    fetchUser();
  }, [])
  
  console.log("usrid: ", userId);
  console.log("user id; ", user?._id);
  
  

  const handleBuying = async (amount: number) => {
    try {
      setBuyingAmount(amount);
      const response = await axios.post('/api/stripe', {userId, amount }, { withCredentials: true });

      console.log("response from api stripe: ", response);
      

      if (response.data.url) {
        window.location.href = response.data.url;
      }
    } catch (error: any) {
      console.log('Error occurred while processing payment:', error.message);
    }
    finally {
      setBuyingAmount(null);
    }
  }
  return (
    <div
      className="min-h-screen text-white relative overflow-hidden flex flex-col"
      style={{
        background: "linear-gradient(135deg, #0a0a1a 0%, #0d0d28 60%, #0a1628 100%)",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>
       {` @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
       @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Syne:wght@400..800&display=swap');
       `}
      </style>
      <div className='absolute inset-0 pointer-events-none opacity-[0.07]'
        style={{
          backgroundImage: 'linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)'
          , backgroundSize: "44px 44px"
        }} />

      {/* dots */}
      <div
        className="absolute top-[-8%] left-[10%] w-80 h-80 rounded-full pointer-events-none opacity-20"
        style={{ background: "radial-gradient(circle, #6366f1 0%, transparent 70%)", filter: "blur(70px)" }}
      />

      <div
        className="absolute bottom-[-6%] right-[5%] w-72 h-72 rounded-full pointer-events-none opacity-15"
        style={{ background: "radial-gradient(circle, #06b6d4 0%, transparent 70%)", filter: "blur(60px)" }}
      />


      <div className='mx-auto relative z-10 max-w-3xl px-4 py-14 w-full'>
        <motion.button onClick={() => router.push('/')}
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className='flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-all mb-10  cursor-pointer bg-transparent border-none'>
          <FiArrowLeft size={14} />
          Back</motion.button>


        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className='text-center mb-12'
        >

          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.25)" }}
          >
            <FiZap size={13} className="text-indigo-400" />
            <span>AI Credits</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3"
            style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.03em" }}>
            Simple{" "}
            <span style={{
              background: "linear-gradient(135deg, #818cf8 0%, #06b6d4 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Pricing
            </span>
          </h1>

          <p className='text-white/35 text-sm max-w-sm mx-auto'>
            Choose a plan that fits your workflow. Credits are used each time you generate a component.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 sm:grid-cols-2  gap-5'>
          {
            plan.map((item, indedx) => (
              <motion.div
                key={indedx}
                className="relative rounded-2xl p-6 flex flex-col"
                style={{
                  background: item.highlight
                    ? "linear-gradient(145deg, rgba(99,102,241,0.12) 0%, rgba(6,182,212,0.06) 100%)"
                    : "rgba(255,255,255,0.03)",
                  border: item.highlight
                    ? "1px solid rgba(99,102,241,0.35)"
                    : "1px solid rgba(255,255,255,0.07)",
                  boxShadow: item.highlight ? "0 0 40px rgba(99,102,241,0.12)" : "none",
                }}
              >
                <div className='flex items-center justify-between mb-5'>
                  <span>{item.tag}</span>
                  <span
                    className="text-xs font-semibold px-2.5 py-1 rounded-full"
                    style={{
                      background: item.highlight ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)",
                      color: item.highlight ? "#818cf8" : "rgba(255,255,255,0.4)",
                      border: item.highlight ? "1px solid rgba(99,102,241,0.3)" : "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {item.tag}
                  </span>

                  {item.disabled && (
                    <FiLock size={13} className='text-white/20' />
                  )}
                </div>

                <h2 className='text-xl font-bold mb-1' style={{ fontFamily : "'Syne', sans-serif"}}>
                  {item.name}
                </h2>
                <p className='text-white/35 text-xs mb-'>
                  {item.description}
                  </p>

                  <div className='mb-6'>
                    {item.amount ? (
                        <div className='flex items-end gap-1'>
                          <span className='text-4xl font-extrabold' style={{fontFamily : "'Syne', sans-serif"}}>
                           $ {item.amount}
                          </span>
                        </div>
                    ) : (
                      <div className='flex items-end gap-1'>
                        <span className='text-4xl font-extrabold' style={{ fontFamily: "'Syne', sans-serif" }}>
                          Free
                        </span>
                      </div>
                    )}

                    <div
                      className='mt-2 inline-flex items-center gap-1.5 py-1 px-2.5 rounded-lg'
                      style={{
                        background: item.highlight ? "rgba(6,182,212,0.1)" : "rgba(255,255,255,0.05)",
                        border: item.highlight ? "1px solid rgba(6,182,212,0.2)" : "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <FiZap size={11} style={{ color: item.highlight ? "#06b6d4" : "rgba(255,255,255,0.4)" }} />
                      <span className='text-xs font-semibold' style={{ color: item.highlight ? "#06b6d4" : "rgba(255,255,255,0.4)" }}>{item.aiCredits} Credits</span>
                    </div>
                  </div>

                  <ul className='space-y-2.5 mb-8 flex-1'>
                    {item.features.map((feature) => (
                      <li key={feature} className='flex items-center gap-2.5 text-sm text-white/60'>
                        <FiCheck size={13} style={{ color: item.highlight ? "#818cf8" : "rgba(255,255,255,0.3)" }} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    className="w-full py-3 rounded-xl text-sm font-semibold transition-all"
                    onClick={() => !item.disabled && handleBuying(item.amount)}
                    disabled={item.disabled}
                    style={{
                      cursor: item.disabled ? "not-allowed" : "pointer",
                      background: item.disabled
                        ? "rgba(255,255,255,0.04)"
                        : "linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)",
                      color: item.disabled ? "rgba(255,255,255,0.25)" : "#fff",
                      border: item.disabled ? "1px solid rgba(255,255,255,0.07)" : "none",
                      boxShadow: item.disabled ? "none" : "0 0 24px rgba(99,102,241,0.35)",
                    }}
                  >
                    {item.disabled ? (
                      <div className=' flex items-center justify-center gap-2'>
                        <FiCheck size={14} />{item.cta}
                      </div>
                    ) : (
                      item.cta
                    )}
                  </button>
              </motion.div>
            ))
          }


        </div>
          <motion.p
          initial={{opacity : 0}}
          animate={{opacity : 1}}
          transition={{duration : 0.4}}
          className='text-center text-white/20 text-xs mt-8'
          >
            Credits are added to your account instantly after paymeent
          </motion.p>
      </div>

    </div>
  )
}

export default Pricing
