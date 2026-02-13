"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const heartEmojis = ["💕", "💖", "💗", "💓", "💞", "💘", "❤️", "🩷", "🌸", "✨"];

function seededValue(index: number, salt: number): number {
  const x = Math.sin(index * 9301 + salt * 49297) * 49297;
  return x - Math.floor(x);
}

function createHearts() {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    emoji: heartEmojis[i % heartEmojis.length],
    left: `${seededValue(i, 1) * 100}%`,
    size: 16 + seededValue(i, 2) * 24,
    duration: 4 + seededValue(i, 3) * 6,
    delay: seededValue(i, 4) * 5,
  }));
}

export default function FloatingHearts() {
  const [hearts] = useState(createHearts);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute"
          style={{
            left: heart.left,
            fontSize: heart.size,
            bottom: -50,
          }}
          animate={{
            y: [0, -1200],
            x: [0, Math.sin(heart.id) * 50],
            opacity: [0, 1, 1, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {heart.emoji}
        </motion.div>
      ))}
    </div>
  );
}
