"use client";

import { useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";

interface NoButtonProps {
  text: string;
  onCatch: () => void;
}

export default function NoButton({ text, onCatch }: NoButtonProps) {
  const [isEscaped, setIsEscaped] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const runAway = useCallback(() => {
    const btn = buttonRef.current;
    if (!btn) return;

    const btnRect = btn.getBoundingClientRect();
    const padding = 20;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    let newX: number;
    let newY: number;
    let attempts = 0;

    do {
      newX = padding + Math.random() * (vw - btnRect.width - padding * 2);
      newY = padding + Math.random() * (vh - btnRect.height - padding * 2);
      attempts++;
    } while (
      attempts < 10 &&
      Math.abs(newX - btnRect.left) < 150 &&
      Math.abs(newY - btnRect.top) < 150
    );

    setPosition({ x: newX, y: newY });
    setIsEscaped(true);
    onCatch();
  }, [onCatch]);

  if (!isEscaped) {
    return (
      <motion.button
        ref={buttonRef}
        className="cursor-pointer rounded-full bg-white/30 px-10 py-4 text-xl font-bold text-white backdrop-blur-sm sm:text-2xl"
        onMouseEnter={runAway}
        onTouchStart={runAway}
        whileHover={{ scale: 0.8 }}
      >
        {text}
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      className="cursor-pointer rounded-full bg-white/30 px-10 py-4 text-xl font-bold text-white backdrop-blur-sm sm:text-2xl"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 50 }}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
      onMouseEnter={runAway}
      onTouchStart={runAway}
      whileHover={{ scale: 0.8 }}
    >
      {text}
    </motion.button>
  );
}
