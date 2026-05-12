import CopyButton from "./copy-button";

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
                <CopyButton text={code} />
            </div>

            <pre className='max-h-105 overflow-auto px-4 py-4 text-left text-xs leading-6 text-white/75 font-mono'>
                <code>{code}</code>
            </pre>
        </div>
    )
}

export default CodeBlock;