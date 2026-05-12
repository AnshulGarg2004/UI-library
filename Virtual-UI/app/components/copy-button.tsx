import { useState } from "react";
import { TbCheck, TbCopy } from "react-icons/tb";

const CopyButton = ({ text }: { text: string }) => {
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

export default CopyButton;