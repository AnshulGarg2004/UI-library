import connectDb from "@/lib/connectDB";
import User from "@/models/user.model";
import { NextResponse } from "next/server";
import getCurrentUser from "./getCurrentUser.controller";
import { fetchAi } from "@/utils/openRouter";

export const generateComponent = async (prompt: string) => {
  try {
    if (!prompt) {
      return NextResponse.json({ success: false, message: "Prompt is required" }, { status: 400 });
    }

    await connectDb();

    const currentUserResponse = await getCurrentUser();
    const currentUserData = await currentUserResponse.json();
    const users = currentUserData.user;
    const userId = users._id;

    const user = await User.findById(userId);

    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 });
    }

    if (user.role === "user" && user.aiCredits < 50) {
      return NextResponse.json({ success: false, message: "Insifficient credits" }, { status: 402 });
    }

    const messages = [
      {
        role: "system",
        content: `You are a React component generator. Output ONLY a valid JSON object. No markdown, no backticks, no explanation.

CRITICAL: Your entire response must be parseable by JSON.parse(). Start with { and end with }.

OUTPUT FORMAT:
{
  "name": "ComponentName",
  "code_jsx": "<full JSX component code as single escaped string>",
  "code_tsx": "<full TSX component code as single escaped string>",
  "props": ["prop1", "prop2"]
}

--- CODE RULES ---
- Import hooks like this:
  import React, { useState, useEffect, useRef, useCallback } from "react";

- Named export only:
  export const ComponentName = ({ ...props }) => { ... }

- For TSX:
  type Props = { ... };
  export const ComponentName: React.FC<Props> = ({ ...props }) => { ... }

- Inline styles ONLY. No CSS classes, no Tailwind, no styled-components.
- No external libraries. No framer-motion. No icon libraries.

- All props must have default values.
- Component must look great with zero props passed.

- NEVER use template literals inside JSX style objects.
  BAD: style={{ border: \`1px solid \${accent}\` }}
  GOOD: style={{ border: "1px solid " + accent }}

- Always use string concatenation for dynamic styles

- NEVER use position "fixed". Only "relative" or "absolute"

- Hex to rgba helper (use when needed):
  const alpha = (hex, op) => { const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16); return "rgba("+r+","+g+","+b+","+op+")"; };

- Escape rules:
  - Escape all double quotes → \\"
  - Escape all newlines → \\n
  - Do NOT use single quotes inside JSX

--- DESIGN RULES ---
- Dark backgrounds: #0f172a, #020617, #0d1117, #1e293b
- Accent colors: #6366f1, #7c3aed, #059669, #e11d48, #0ea5e9

- Border radius:
  Cards: 16px–22px
  Buttons: 10px–12px

- Borders:
  1px solid rgba(255,255,255,0.08)

- Shadows:
  0 10px 40px rgba(0,0,0,0.4)

- Font:
  system-ui, -apple-system, sans-serif

--- ANIMATION & UI ENHANCEMENT RULES (NEW) ---
- Add hover animations:
  transform: translateY(-4px) scale(1.01)

- Add smooth transitions:
  transition: "all 0.25s ease"

- Add depth:
  - hover shadow increase
  - subtle glow using rgba

- Add micro interactions:
  - hover states
  - active states if relevant

- UI must look like premium SaaS / dashboard component

--- LIVE PREVIEW RULES ---
- Container: dark (#020617), 800px width, 400px min height
- Avoid layouts that overflow badly

- Width range:
  280px – 720px

- Everything must be self-contained

--- TYPESCRIPT RULES (NEW) ---
- TSX must include a Props type
- Keep types simple (string, number, boolean, function)
- All props optional with defaults

--- FINAL RULE ---
Return ONLY JSON.
Do NOT add explanation.`
      },
      {
        role: "user",
        content: prompt,
      }

    ];

    const aiResponse = await fetchAi(messages);
    const aiData = await aiResponse.json();
    const aiContent = aiData.content;

    let parsed;

    try {
      const clean = aiContent.replace(/```json/g, "").replace(/```/g, "").trim();
      parsed = JSON.parse(clean);
    } catch (error) {
      console.log("Ai response: ", aiContent);

      return NextResponse.json({ success: false, message: "Failed to parse AI response" }, { status: 500 });
    }

    if (user.role === "user") {
      user.aiCredits -= 50;
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Component generated successfully", parsed, remainingCredits: user.role === "user" ? user.aiCredits : null }, { status: 200 });

  } catch (error: any) {
    console.log("Error in catch of generate component: ", error.message);
    return NextResponse.json({ success: false, message: "Error occured in generating component" }, { status: 500 });
  }
}

