"use client";

import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getTheme, decodeProposal } from "@/lib/themes";
import type { ProposalData } from "@/lib/themes";
import Celebration from "@/components/Celebration";
import FloatingHearts from "@/components/FloatingHearts";
import NoButton from "@/components/NoButton";
import { Suspense } from "react";

const defaultMessages = [
  "You are my everything 💕",
  "My heart beats for you 💓",
  "You make every day magical ✨",
  "Together is my favorite place 🥰",
  "You are the love of my life 💖",
  "Forever wouldn't be long enough 💞",
];

function ProposalContent() {
  const searchParams = useSearchParams();
  const params: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    params[key] = value;
  });

  const proposal: ProposalData = decodeProposal(params) || {
    from: "",
    to: "",
    message: "",
    theme: "rose",
  };

  const theme = getTheme(proposal.theme);

  const loveMessages = proposal.message
    ? [proposal.message, ...defaultMessages]
    : defaultMessages;

  const [said, setSaid] = useState(false);
  const [noAttempts, setNoAttempts] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);
  const [showIntro, setShowIntro] = useState(!!proposal.to);

  const noTexts = [
    "No",
    "Are you sure? 🥺",
    "Really sure? 😢",
    "Think again! 💔",
    "Please? 🥹",
    "Don't do this 😭",
    "I'll be sad 😿",
    "Give me a chance 💘",
    "Pretty please? 🌹",
    "Last chance! 💝",
  ];

  useEffect(() => {
    if (showIntro) {
      const timer = setTimeout(() => setShowIntro(false), 3500);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  useEffect(() => {
    if (!said && !showIntro) {
      const interval = setInterval(() => {
        setMessageIndex((prev) => (prev + 1) % loveMessages.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [said, showIntro, loveMessages.length]);

  const handleNo = useCallback(() => {
    setNoAttempts((prev) => Math.min(prev + 1, noTexts.length - 1));
  }, [noTexts.length]);

  const yesScale = 1 + noAttempts * 0.15;

  if (said) {
    return <Celebration proposal={proposal} />;
  }

  if (showIntro) {
    return (
      <div
        className="flex min-h-screen flex-col items-center justify-center overflow-hidden"
        style={{ background: theme.gradient }}
      >
        <motion.div
          className="flex flex-col items-center gap-6 px-6 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="text-6xl"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            💌
          </motion.div>
          <motion.h2
            className="text-3xl font-bold text-white drop-shadow-lg sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Hey {proposal.to}...
          </motion.h2>
          <motion.p
            className="text-lg text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {proposal.from
              ? `${proposal.from} has something very important to ask you`
              : "Someone has something very important to ask you"}
          </motion.p>
          <motion.div
            className="flex gap-1 text-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0.5] }}
            transition={{ delay: 1.5, duration: 2 }}
          >
            {["💖", "💖", "💖"].map((h, i) => (
              <motion.span
                key={i}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ delay: 1.8 + i * 0.2, duration: 0.5 }}
              >
                {h}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden"
      style={{ background: theme.gradient }}
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
        className="relative z-10 flex flex-col items-center gap-6 px-6"
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

        {proposal.to && (
          <motion.p
            className="text-lg font-medium text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {proposal.to},
          </motion.p>
        )}

        <motion.h1
          className="text-center text-4xl font-bold text-white drop-shadow-lg sm:text-6xl"
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

        {proposal.from && (
          <motion.p
            className="text-base text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            — {proposal.from}
          </motion.p>
        )}

        <AnimatePresence mode="wait">
          <motion.p
            key={messageIndex}
            className="h-8 text-center text-lg text-white/90 sm:text-xl"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
          >
            {loveMessages[messageIndex]}
          </motion.p>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-6">
          <motion.button
            className="cursor-pointer rounded-full bg-white px-10 py-4 text-xl font-bold shadow-2xl sm:text-2xl"
            style={{ color: theme.buttonTextColor }}
            whileHover={{
              scale: 1.1,
              boxShadow: "0 0 40px rgba(255,255,255,0.6)",
            }}
            whileTap={{ scale: 0.95 }}
            animate={{ scale: yesScale }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => setSaid(true)}
          >
            Yes! 💖
          </motion.button>

          <NoButton
            text={noTexts[noAttempts]}
            onCatch={handleNo}
          />
        </div>

        {noAttempts > 0 && (
          <motion.p
            className="mt-4 text-sm text-white/70"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {noAttempts >= 5
              ? "The No button is scared of you! Just say Yes! 😄"
              : `The No button ran away ${noAttempts} time${noAttempts > 1 ? "s" : ""}!`}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}

export default function ProposePage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-pink-100">
          <div className="text-2xl">💍</div>
        </div>
      }
    >
      <ProposalContent />
    </Suspense>
  );
}
