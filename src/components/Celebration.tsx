"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { getTheme } from "@/lib/themes";
import type { ProposalData } from "@/lib/themes";

const confettiColors = [
  "#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#ff78ae",
  "#a78bfa", "#f472b6", "#fb923c", "#34d399", "#60a5fa",
];

function seededValue(index: number, salt: number): number {
  const x = Math.sin(index * 9301 + salt * 49297) * 49297;
  return x - Math.floor(x);
}

function createPieces() {
  return Array.from({ length: 60 }, (_, i) => ({
    id: i,
    left: `${seededValue(i, 1) * 100}%`,
    color: confettiColors[i % confettiColors.length],
    delay: seededValue(i, 2) * 2,
    duration: 2 + seededValue(i, 3) * 3,
    size: 6 + seededValue(i, 4) * 10,
    shape: seededValue(i, 5) > 0.5 ? ("circle" as const) : ("rect" as const),
  }));
}

function Confetti() {
  const [pieces] = useState(createPieces);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute top-0"
          style={{
            left: piece.left,
            width: piece.size,
            height: piece.shape === "rect" ? piece.size * 0.6 : piece.size,
            backgroundColor: piece.color,
            borderRadius: piece.shape === "circle" ? "50%" : "2px",
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: ["-5vh", "105vh"],
            rotate: [0, 720],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: piece.duration,
            delay: piece.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}

const defaultQuotes = [
  "Every love story is beautiful, but ours is my favorite.",
  "I choose you. And I'll choose you over and over.",
  "You are my today and all of my tomorrows.",
  "In all the world, there is no heart for me like yours.",
];

const rings = Array.from({ length: 6 }, (_, i) => ({
  id: i,
  size: 200 + i * 120,
  delay: i * 0.2,
}));

interface Props {
  proposal?: ProposalData;
}

export default function Celebration({ proposal }: Props) {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const theme = getTheme(proposal?.theme || "rose");

  const hasNames = proposal?.from && proposal?.to;
  const title = hasNames
    ? `${proposal.from} & ${proposal.to}`
    : "She Said Yes!";
  const subtitle = hasNames ? "Forever & Always" : "Forever & Always";

  useEffect(() => {
    const interval = setInterval(() => {
      setQuoteIndex((prev) => (prev + 1) % defaultQuotes.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: theme.celebrationGradient }}
    >
      <Confetti />

      {rings.map((ring) => (
        <motion.div
          key={ring.id}
          className="absolute rounded-full border-2 border-white/10"
          style={{ width: ring.size, height: ring.size }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 3,
            delay: ring.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <motion.div
        className="relative z-10 flex flex-col items-center gap-8 px-6"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 150, damping: 20 }}
      >
        <motion.div
          className="text-8xl sm:text-9xl"
          animate={{
            scale: [1, 1.2, 1, 1.2, 1],
            rotate: [0, -10, 0, 10, 0],
          }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 0.5 }}
        >
          💍
        </motion.div>

        <motion.h1
          className="text-center text-5xl font-bold text-white drop-shadow-lg sm:text-7xl"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {title}
        </motion.h1>

        {hasNames && (
          <motion.p
            className="text-xl text-white/80 sm:text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Said Yes! 💖
          </motion.p>
        )}

        <motion.div
          className="flex gap-2 text-4xl sm:text-5xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
        >
          {["🎉", "💖", "🥂", "💐", "🎊"].map((emoji, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -15, 0] }}
              transition={{
                duration: 0.6,
                delay: 0.8 + i * 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              {emoji}
            </motion.span>
          ))}
        </motion.div>

        <motion.div
          className="mt-4 max-w-md rounded-2xl bg-white/20 p-6 text-center backdrop-blur-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <motion.p
            key={quoteIndex}
            className="text-lg italic text-white/90 sm:text-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            &ldquo;{defaultQuotes[quoteIndex]}&rdquo;
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-4 flex items-center gap-3 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ❤️
          </motion.span>
          <span className="text-lg font-medium">{subtitle}</span>
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
          >
            ❤️
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  );
}
