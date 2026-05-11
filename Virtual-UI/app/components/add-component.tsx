import { AnimatePresence } from 'framer-motion';
import {motion } from 'framer-motion';
import React, { useEffect, useState } from 'react'
import { TbCodeDots, TbDeviceFloppy, TbEye, TbX, TbCheck, TbLoader, TbTrash } from 'react-icons/tb';
import LiveComponentPreview from './live-preview';
import axios from 'axios';
import { NextResponse } from 'next/server';
import Toast, { ToastProps } from './toast';
// Using server-side conversion endpoint for reliable TSX -> JSX conversion
const PropsInput = ({ props, setProps }: { props: string[], setProps: React.Dispatch<React.SetStateAction<string[]>> }) => {
    const [input, setInput] = useState("");

    const addProps = () => {
        const trimed = input.trim();
        if (trimed && !props.includes(trimed)) {
            setProps([...props, trimed]);
        }
        setInput("");
    }

    const removeProp = (p: string) => {
        setProps(props.filter((prop) => prop !== p));
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === ',') {
            e.preventDefault();
            addProps();
        }
    }
    return (

        <div className=''>
            <div className='flex flex-wrap gap-2 mb-2 max-h-[28px]'>
                {props.map((prop) => (
                    <span
                        key={prop}
                        className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                            background: 'rgba(167,139,250,0.15)',
                            color: '#a78bfa',
                            border: '1px solid rgba(167,139,250,0.25)',
                        }}
                    >
                        {prop}
                        <button onClick={() => removeProp(prop)}
                            type="button"
                            className="ml-0.5 opacity-60 hover:opacity-100 transition-opacity bg-transparent border-none cursor-pointer p-0 leading-none"
                            style={{ color: '#a78bfa' }}>
                            <TbX size={11} />
                        </button>
                    </span>
                ))}

                {props.length === 0 && (
                    <span className=' text-xs text-white/20 self-center'>No props added yet</span>
                )}

            </div>

            <div className='flex gap-2'>
                <input
                    value={input}
                    onKeyDown={handleKeyDown}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='e.g. "title", "onClick", "children"'
                    className='flex-1 min-w-0 bg-white/4 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-white/20 outline-none focus:border-[#a78bfa]/50 transition-colors'
                />
                <button onClick={addProps}
                    type="button"
                    className="px-3 sm:px-4 py-2 rounded-xl text-sm font-semibold border-none cursor-pointer transition-all whitespace-nowrap"
                    style={{
                        background: 'rgba(167,139,250,0.15)',
                        color: '#a78bfa',
                        border: '1px solid rgba(167,139,250,0.25)',
                    }}
                >
                    Add
                </button>
            </div>

            <p className='text-[10px] text-white/20 mt-1.5'> press { " "}
                <span className='px-1 py-0.5 rounded  bg-white/5 text-white/40 text-[9px]'>
                    Enter
                </span> or comma to add a prop
            </p>
        </div>
    )
}



const AddComponent = () => {
    const [name, setName] = useState('');
    const [props, setProps] = useState<string[]>([]);
    const [code_jsx, setCode_jsx] = useState('');
    const [code_tsx, setCode_tsx] = useState('');
    const [codeTab, setCodeTab] = useState<"preview" | "code">('code');
    const [saving, setSaving] = useState(false);
    const [saveId, setSaveId] = useState<string | null>(null);
    const [publishing, setPublishing] = useState(false);
    const [toast, setToast] = useState<ToastProps | null>(null);
    const [isPublished, setIsPublished] = useState(false);

    const showToast = (message: string, type: "info" | "success" | "error") => {
        setToast({ message, type });

        setTimeout(() => {
            setToast(null);
        }, 3500);
    }

    // Call server API to convert TSX -> JSX using TypeScript transpileModule
    useEffect(() => {
        const convertTsxToJsx = async (tsxCode: string) => {
            try {
                const res = await axios.post('/api/convert-tsx', {
                    code: tsxCode
                }, { withCredentials: true });
                setCode_jsx(res.data.code);
            } catch (err) {
                console.log('TSX->JSX conversion error', err);
            }
        }

    }, [code_tsx]);

    const handlePublish = async () => {
        if (!saveId) return;

        setPublishing(true);
        try {
            console.log("Publishing component with id: ", saveId);
            const response = await axios.post('/api/publish-component', {
                componentId: saveId
            }, { withCredentials: true });
            console.log("response from publish-component: ", response);

            if (!response.data?.success) {
                return NextResponse.json({ success: false, message: response.data?.message || "Failed to publish component" }, { status: 500 });
            }

            setIsPublished(true);
            showToast("Component published to npm successfully!", "success");

        } catch (error) {
            console.log("Error in publishing component: ", error);

            showToast("Failed to publish component.", "error");
        }
        finally {
            setPublishing(false);
        }
    }

    const handleSave = async () => {
        setSaving(true);

        try {
            const response = await axios.post('/api/save-component', {
                name, 
                code_jsx : code_jsx, 
                code_tsx : code_tsx, 
                props
            }, { withCredentials: true });

            console.log("Response from save component: ", response);
            setSaveId(response.data.responseData.component._id);
            showToast("Component saved successfully!", "success");

        } catch (error) {
            console.log("error in saving component: ", error);
            showToast("Failed to save component", "error");
        }
        finally {
            setSaving(false);
        }
    }
    return (
        <div className='px-4 sm:px-6 lg:px-8 py-5 sm:py-6 max-w-3xl mx-auto w-full'>
            <h2 className='text-base sm:text-lg font-bold mb-1'>
                Add Component
            </h2>

            <p className='text-white/35 text-xs mb-5 sm:mb-6'>
                Manall Add a component -give it a name, define props, paste the code and preview it</p>

            <div className='space-y-4 sm:space-y-5'>
                <div className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/2 space-y-2'>
                    <label htmlFor="name" className='text-xs font-semibold text-white/50 uppercase tracking-wider block'>Component Name</label>
                    <input
                        type="text"
                        id='name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder='e.g. "PricingCard", "HeroSection"'
                        className="w-full bg-white/4 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder-white/20 outline-none focus:border-[#3be8ff]/40 transition-colors"
                    />
                </div>

                <div className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/2 space-y-2'>
                    <label htmlFor="props" className='text-xs font-semibold text-white/50 uppercase tracking-wider block'>Props</label>
                    <PropsInput props={props} setProps={setProps} />
                </div>

                <div className=' rounded-2xl border border-white/[0.07] bg-white/[0.02]  overflow-hidden'>
                    <div className='flex items-center justify-between px-3.5 py-3 border-b border-white/[0.06]'>
                        <label className="font-semibold text-xs  text-white/50 uppercase tracking-wider">
                            Componet Code</label>
                        <div className=' flex gap-1 rounded-xl p-1' style={{background : 'rgba(0,0,0,3)'}}>
                            {['code', 'preview'].map((tab) => (
                                <button key={tab} onClick={() => setCodeTab(tab as "code" | "preview")} className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize border-none cursor-pointer" style={{
                                    background: codeTab === tab ? 'rgba(59,232,255,0.2)' : 'transparent',
                                    color: codeTab === tab ? '#3be8ff' : 'rgba(255,255,255,0.4)',
                                }}>
                                    {tab === "code" ? <TbCodeDots size={14} /> : <TbEye size={14} />}

                                    <span className=' hidden xs:inline'>
                                        {tab}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                 <div className='p-3.5 sm:p-4 rounded-2xl border border-white/[0.07] bg-white/2 space-y-2'>
                    <label className='text-xs font-semibold text-white/50 uppercase tracking-wider block'>Component Code (TypeScript)</label>
                    <AnimatePresence mode='wait'>
                        {codeTab === "code" ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                            >
                                <textarea
                                    placeholder={`export default function MyComponent({ title }: { title: string }) {\n  return (\n    <div>\n      <h1>{title}</h1>\n    </div>\n  );\n}`}
                                    value={code_tsx}
                                    onChange={(e) => setCode_tsx(e.target.value)}
                                    className="w-full bg-[#0d1117] px-4 sm:px-5 py-4 text-xs leading-relaxed text-green-300 font-mono resize-none outline-none placeholder-white/10 rounded-xl"
                                    style={{ minHeight: 220 }}
                                />
                        </motion.div>
                     ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className='p-3.5 sm:p-4'
                                >
                                    {code_tsx.trim() ? (
                                        <LiveComponentPreview code={code_tsx} />
                                    ) : (
                                        <div className='h-38 sm:h-40 flex items-center justify-center text-white/20 text-sm rounded-xl'
                                        style={{border : "1px dashed rgba(255,255,255,0.08)"}}
                                        >Paste some code first to see the preview.</div>
                                    )}
                                </motion.div>
                     )}
                 </AnimatePresence>
                </div>


            </div>

            <div className=' flex items-center gap-3 flex-wrap pt-1'>
                 <motion.button onClick={handleSave}
                 disabled={saving || !!saveId}
                 whileTap={{scale : 0.97}}
                 className='flex items-center gap-2 sm:gap-3 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all border-none cursor-pointer'
                 style={{
                     background: saveId ? "rgba(16,185,129,0.12)" : "rgba(59,232,255,0.12)",
                     color: saveId ? "#34d399" : "#3be8ff",
                     border: `1px solid ${saveId ? "rgba(16,185,129,0.3)" : "rgba(59,232,255,0.25)"}`
                 }}
                 >
                     {
                        saving ? (
                            <motion.span
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                            >
                                <TbDeviceFloppy size={14} />
                            </motion.span>
                        ) : saveId ? (
                            <TbCheck size={14} />
                        ) : (
                            <TbDeviceFloppy size={14} />
                        )
                     }

                    {saving ? 'Saving...' : saveId ? 'Saved ✓' : 'Save Component'}
                 </motion.button>

                 <AnimatePresence >

                    {
                        saveId &&  !isPublished && (
                            <motion.button onClick={handlePublish}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -8 }}
                                whileTap={{ scale: 0.97 }}
                                disabled={publishing}
                                className="flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-semibold disabled:opacity-40 transition-all border-none cursor-pointer"
                                style={{
                                    background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
                                    boxShadow: publishing ? "none" : "0 0 20px rgba(6,182,212,0.25)",
                                    color: "#fff",
                                }}
                            >
                                {publishing ? (
                                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>
                                        <TbDeviceFloppy size={14} />
                                    </motion.span>
                                ) : (
                                    <TbDeviceFloppy size={14} />
                                )}

                                {publishing ? "Publishing..." : "Publish to npm"}
                            </motion.button>
                        )
                    }

                    {isPublished && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold"
                            style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', color: '#34d399' }}
                        >
                            <TbCheck size={14} />
                            <span>Published ✓</span>
                        </motion.div>
                    )}
                 </AnimatePresence>

                 {(saveId || name || code_tsx) && (
                    <button
                        onClick={() => {
                            setName('');
                            setProps([]);
                            setCode_tsx('');
                            setSaveId(null);
                            setIsPublished(false);
                            setCodeTab('code');
                        }}
                        className="ml-auto flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/30 hover:text-white/60 transition-all bg-transparent border-none cursor-pointer"
                    >
                        <TbTrash size={13} /> Reset
                    </button>
                 )}
            </div>


            {toast && (
                <AnimatePresence>
                    <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
                </AnimatePresence>
            )}
        </div>
    )
}

export default AddComponent
