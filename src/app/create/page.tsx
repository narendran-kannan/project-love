"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { themes, encodeProposal, getTheme } from "@/lib/themes";
import type { ProposalData } from "@/lib/themes";
import Link from "next/link";
import ProposalPreview from "@/components/ProposalPreview";

export default function CreatePage() {
  const [data, setData] = useState<ProposalData>({
    from: "",
    to: "",
    message: "",
    theme: "rose",
  });
  const [showPreview, setShowPreview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const previewRef = useRef<HTMLDivElement>(null);

  const currentTheme = getTheme(data.theme);

  function generateLink() {
    const params = encodeProposal(data);
    const base =
      typeof window !== "undefined" ? window.location.origin : "";
    const url = `${base}/propose${params ? `?${params}` : ""}`;
    setShareUrl(url);
    return url;
  }

  useEffect(() => {
    if (showPreview && previewRef.current) {
      setTimeout(() => {
        previewRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }, 100);
    }
  }, [showPreview]);

  async function handleCopy() {
    const url = generateLink();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
    }
  }

  async function handleShare() {
    const url = generateLink();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.from ? data.from + " has" : "Someone has"} a question for ${data.to || "you"}!`,
          text: "Open this link... it's important 💍",
          url,
        });
      } catch {
        /* user cancelled */
      }
    } else {
      await handleCopy();
    }
  }

  const isReady = data.to.trim().length > 0;

  return (
    <div
      style={{
        background: currentTheme.gradient,
        minHeight: "100dvh",
      }}
    >
      <div className="mx-auto max-w-2xl px-4 py-8 pb-20 sm:px-6">
        <div className="flex flex-col gap-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between"
          >
            <Link
              href="/"
              className="text-sm font-medium text-white/70 transition-colors hover:text-white"
            >
              &larr; Back
            </Link>
            <h1 className="text-lg font-bold text-white drop-shadow-sm">
              Create Your Proposal 💍
            </h1>
            <div className="w-12" />
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 rounded-3xl bg-white/20 p-6 shadow-xl backdrop-blur-md sm:p-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">
                Their name *
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah"
                maxLength={30}
                value={data.to}
                onChange={(e) => setData({ ...data, to: e.target.value })}
                className="rounded-xl border-2 border-white/30 bg-white/40 px-4 py-3 text-base font-medium text-gray-800 placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-white focus:bg-white/60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">
                Your name
              </label>
              <input
                type="text"
                placeholder="e.g. John"
                maxLength={30}
                value={data.from}
                onChange={(e) => setData({ ...data, from: e.target.value })}
                className="rounded-xl border-2 border-white/30 bg-white/40 px-4 py-3 text-base font-medium text-gray-800 placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-white focus:bg-white/60"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-white">
                Personal message{" "}
                <span className="font-normal text-white/60">(optional)</span>
              </label>
              <textarea
                placeholder="Write something from your heart..."
                maxLength={150}
                rows={3}
                value={data.message}
                onChange={(e) => setData({ ...data, message: e.target.value })}
                className="resize-none rounded-xl border-2 border-white/30 bg-white/40 px-4 py-3 text-base font-medium text-gray-800 placeholder-gray-500 outline-none backdrop-blur-sm transition-all focus:border-white focus:bg-white/60"
              />
              <span className="text-right text-xs text-white/50">
                {data.message.length}/150
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-sm font-semibold text-white">
                Color theme
              </label>
              <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
                {themes.map((theme) => (
                  <motion.button
                    key={theme.id}
                    onClick={() => setData({ ...data, theme: theme.id })}
                    className={`flex cursor-pointer flex-col items-center gap-1 rounded-xl p-3 transition-all ${
                      data.theme === theme.id
                        ? "bg-white/40 ring-2 ring-white"
                        : "bg-white/10 hover:bg-white/20"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="text-2xl">{theme.emoji}</span>
                    <span className="text-xs font-medium text-white">
                      {theme.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.button
            disabled={!isReady}
            onClick={() => {
              generateLink();
              setShowPreview(true);
            }}
            className={`w-full cursor-pointer rounded-full px-8 py-4 text-lg font-bold shadow-xl transition-all ${
              isReady
                ? "bg-white text-gray-800 hover:shadow-2xl"
                : "cursor-not-allowed bg-white/30 text-white/50"
            }`}
            whileHover={isReady ? { scale: 1.02 } : {}}
            whileTap={isReady ? { scale: 0.98 } : {}}
          >
            Preview & Get Link
          </motion.button>

          {showPreview && shareUrl && (
            <motion.div
              ref={previewRef}
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div className="overflow-hidden rounded-2xl border-2 border-white/30 shadow-2xl">
                <div className="relative h-[400px]">
                  <ProposalPreview data={data} />
                </div>
              </div>

              <div className="flex flex-col gap-3 rounded-2xl bg-white/20 p-5 backdrop-blur-md">
                <p className="text-center text-sm font-medium text-white">
                  Your link is ready! Share it with {data.to || "your love"} 💌
                </p>
                <div className="flex items-center gap-2 rounded-xl bg-white/30 px-4 py-3">
                  <input
                    type="text"
                    readOnly
                    value={shareUrl}
                    className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none"
                  />
                </div>
                <div className="flex gap-3">
                  <motion.button
                    onClick={handleCopy}
                    className="flex-1 cursor-pointer rounded-full bg-white px-6 py-3 text-sm font-bold text-gray-800 shadow-lg"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {copied ? "Copied! ✅" : "Copy Link 📋"}
                  </motion.button>
                  <motion.button
                    onClick={handleShare}
                    className="flex-1 cursor-pointer rounded-full bg-white/30 px-6 py-3 text-sm font-bold text-white shadow-lg backdrop-blur-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Share 🔗
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
