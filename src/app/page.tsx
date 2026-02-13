"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import FloatingHearts from "@/components/FloatingHearts";

export default function Home() {
  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #f48fb1 50%, #f06292 75%, #ec407a 100%)",
      }}
    >
      <FloatingHearts />

      <motion.div
        className="absolute top-0 left-0 h-full w-full"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="relative z-10 flex max-w-lg flex-col items-center gap-8 px-6 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="text-7xl sm:text-8xl"
          animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
        >
          💍
        </motion.div>

        <motion.h1
          className="text-4xl font-bold text-white drop-shadow-lg sm:text-6xl"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
            delay: 0.3,
          }}
        >
          Will You Marry Me?
        </motion.h1>

        <motion.p
          className="text-lg text-white/90 sm:text-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          Create a personalized proposal page and share it with the love of your
          life. The &quot;No&quot; button runs away — they can only say Yes!
        </motion.p>

        <motion.div
          className="flex flex-col gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          <Link href="/create">
            <motion.div
              className="cursor-pointer rounded-full bg-white px-10 py-4 text-xl font-bold text-pink-600 shadow-2xl"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 40px rgba(255,255,255,0.6)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Create Yours Now
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          className="mt-8 grid grid-cols-3 gap-6 text-white/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {[
            { emoji: "✨", label: "Personalize" },
            { emoji: "🎨", label: "Pick a theme" },
            { emoji: "🔗", label: "Share the link" },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="flex flex-col items-center gap-2"
              whileHover={{ scale: 1.1, y: -4 }}
            >
              <span className="text-3xl">{item.emoji}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
