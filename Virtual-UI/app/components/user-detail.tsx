'use client'
import { Icomponent } from '@/models/component.model';
import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import type { IconType } from 'react-icons';
import { TbBox, TbBrandNpm, TbCode, TbEye, TbX } from 'react-icons/tb';
import { LivePreview } from 'react-live';
import CodeBlock from './code-block';
import { HiSparkles } from 'react-icons/hi2';
import LiveComponentPreview from './live-preview';

interface DetailPanelProps {
    component: Icomponent | null;
    onBack: () => void;
}

interface PreviewProps {
    id: string;
    icon: IconType
    label: string
}

const previewData: PreviewProps[] = [{
    id: 'preview',
    icon: TbEye,
    label: 'Preview'
}, {
    id: 'code',
    icon: TbCode,
    label: 'Code'
}, {
    id: 'guide',
    icon: TbBox,
    label: 'Guide'
}]
const UserDetail = ({ component, onBack }: DetailPanelProps) => {
    const [activeTab, setActiveTab] = useState("preview");
    const importCode = `import { ${component?.name} } from 'zoup-ui';`;
    const usageCode = `import { ${component?.name} } from 'zoup-ui';\n\nexport default function App() {\n  return (\n    <div>\n      <${component?.name} ${component?.props.length ? component?.props.map((p) => `${p}={/* value */}`).join(' ') : ''} />\n    </div>\n  );\n}`;
    const propsList = component?.props ?? [];


    return (
        <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            className='flex flex-col h-full'
        >
            <div className='flex items-start sm:items-center justify-between px-4 sm:px-6 py-4 sm:py-5 border-b border-white/6 gap-3 flex-wrap'>
                <div className='flex items-center gap-3 min-w-0'>
                    {onBack && (
                        <button onClick={onBack}
                            className='flex items-center sm:hidden bg-white/5 border border-white/8 h-8 rounded-xl w-8 text-white/50 hover:text-white/80 transition-colors cursor-pointer shrink-0'>

                            <TbX size={14} />
                        </button>
                    )}

                    <div className='min-w-0'>
                        <h2 className='text-sm sm:text-base font-bold text-white truncate'>
                            {component?.name}
                        </h2>
                        <p className='text-white/35 text-[11px] sm:text-xs mt-0.5 truncate'>
                            {propsList.length > 0
                                ? `Props: ${propsList.join(', ')}`
                                : 'No props'}
                        </p>
                    </div>
                </div>

                <div className='flex items-center gap-1 p-1 rounded-xl overflow-x-auto shrink-0 ml-4' style={{ background: 'rgba(0,0,0,0.3)' }}>
                    {previewData.map((item) => (
                        <button onClick={() => setActiveTab(item.id)} key={item.id} className='flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium transition-all capitalize cursor-pointer border-none whitespace-nowrap' style={{ background: activeTab === item.id ? 'rgba(59,232,255,0.15)' : 'transparent', color: activeTab === item.id ? '#3be8ff' : 'rgba(255,255,255,0.35)' }}>
                            <item.icon size={11} /> {item.label}
                        </button>
                    ))}
                </div>
            </div>


            <div className='p-6 flex-1 overflow-y-auto'>
                <AnimatePresence mode='wait' >
                    {activeTab === 'preview' && (
                        <motion.div key={"preview"}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}>
                            {component && <LiveComponentPreview code={component.code_tsx} />}
                        </motion.div>
                    )}
                    {activeTab === 'code' && (
                        <motion.div key={"code"}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            exit={{ opacity: 0, }}>
                            {component?.code_tsx && <CodeBlock code={component.code_tsx} lang='tsx' />}
                        </motion.div>
                    )}
                    {activeTab === 'guide' && (
                        <motion.div key={"guide"}
                            initial={{ opacity: 0, }}
                            animate={{ opacity: 1, }}
                            className='space-y-6'
                            exit={{ opacity: 0, }}>
                            <p className='text-[10px] font-bold tracking-[3px] uppercase text-[#3be8ff]/50'>Usage Guide</p>

                            <div>
                                <p className='text-xs font-semibold text-white/50 mb-3 flex items-center gap-2'>
                                    <span className='text-[#3be8ff] font-bold'>01</span>
                                    Copy the component code
                                </p>
                                {component?.code_tsx && <CodeBlock code={component.code_tsx} lang='tsx' />}
                            </div>

                            <div>
                                <p className='text-xs font-semibold text-white/50 mb-3 flex items-center gap-2'>
                                    <TbCode size={13} />
                                    <span className='text-[#3be8ff]/70 font-bold'>02</span>
                                    Create a new File
                                </p>
                                {component?.code_tsx && <CodeBlock code={`${component.name}.tsx`} lang='FileName' />}
                            </div>


                            <div>
                                <p className='text-xs font-semibold text-white/50 mb-3 flex items-center gap-2'>
                                    <HiSparkles size={13} />
                                    <span className='text-[#3be8ff]/70 font-bold'>03</span>
                                    Import and use in App.tsx 
                                </p>
                                <CodeBlock code={usageCode} lang='tsx' />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    )
}

export default UserDetail;
