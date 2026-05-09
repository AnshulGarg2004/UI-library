
import {motion} from 'framer-motion';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FiRefreshCw } from 'react-icons/fi';
import { LiveError, LivePreview, LiveProvider } from 'react-live';

type LivePreviewProps = {
  code: string ;
}

const LiveComponentPreview = ({ code }: LivePreviewProps) => {
    const [refreshKey, setRefreshKey] = useState(0);
  let sanitized = code
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, "")
    .replace(/export\s+/g, "");

  sanitized = sanitized
    .replace(/position\s*:\s*["']fixed["']/g, 'position: "absolute"')
    .replace(/position\s*:\s*fixed/g, 'position: "absolute"')
    .replace(/\bfixed\b/g, "absolute");

    const match = sanitized.match(/const\s+([A-Z]\w+)/);
    const componentName = match ? match[1] : null;

    const wrappedCode = componentName
      ? `${sanitized}\n\nrender(<${componentName} />)`
      : sanitized;

    const refreshPreview = () => {
        setRefreshKey((prev) => prev + 1);
    }

  return (
    <div style={{
        position : "relative",
        width : "100%",
        maxWidth : "100%"
    }}>
        <motion.button
        whileTap={{scale : 0.9, rotate : 90}}
        transition={{ type : "spring", stiffness : 400, damping : 10 }}
        onClick={refreshPreview}
        style={{
          position: "absolute",
          right: "8px",
          top: "8px",
          background: "#1e293b",
          border: "none",
          color: "#94a3b8",
          padding: "6px",
          borderRadius: "8px",
          cursor: "pointer",
          zIndex: 10,
        }}>
          <FiRefreshCw size={16} />
        </motion.button>

      
          <LiveProvider
            noInline
            key={refreshKey}
            scope={{React, useEffect , useState, useRef, useMemo, useCallback}}
            code={wrappedCode}
>
          <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{duration : 0.4 }}
              style={{
                  width: "100%",
                  minHeight: "300px",
                  maxWidth: "100%",
                  border: "1px solid #1e293b",
                  borderRadius: "12px",
                  background: "#020617",
                  position: "relative",
                  overflow: "hidden",
                  padding: "clamp(10px, 2vw, 20px)",
                }}
          >

            <motion.div
            className='relative w-full h-full overflow-auto'
            >

                <LivePreview/>

            </motion.div>
        </motion.div>

        <LiveError
          style={{
              marginTop: "10px",
            padding: "10px",
            background: "#450a0a",
            color: "#f87171",
            borderRadius: "6px",
            fontSize: "clamp(12px, 1.5vw, 14px)",
            overflowX: "auto",
          }}
        />
      </LiveProvider>
        {!componentName && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: "10px",
              padding: "10px",
              background: "#1e293b",
              borderRadius: "6px",
              color: "#94a3b8",
              fontSize: "clamp(12px, 1.5vw, 14px)",
            }}
          >
            Preview is not available. Copy the code and paste it into your project.
          </motion.div>
        )}
    </div>
  )
}

export default LiveComponentPreview
