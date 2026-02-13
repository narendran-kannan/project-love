"use client";

import { motion } from "framer-motion";
import { getTheme } from "@/lib/themes";
import type { ProposalData } from "@/lib/themes";

interface Props {
  data: ProposalData;
}

export default function ProposalPreview({ data }: Props) {
  const theme = getTheme(data.theme);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-3 p-6"
      style={{ background: theme.gradient }}
    >
      <motion.div
        className="text-4xl"
        animate={{ scale: [1, 1.15, 1, 1.15, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 1 }}
      >
        💍
      </motion.div>

      {data.to && (
        <p className="text-sm font-medium text-white/80">
          Hey {data.to},{" "}
          {data.from ? `${data.from} has` : "someone has"} a question...
        </p>
      )}

      <h2 className="text-center text-2xl font-bold text-white drop-shadow-md sm:text-3xl">
        Will You Marry Me?
      </h2>

      {data.message && (
        <p className="mt-1 max-w-xs text-center text-sm italic text-white/80">
          &ldquo;{data.message}&rdquo;
        </p>
      )}

      <div className="mt-3 flex items-center gap-3">
        <div
          className="rounded-full bg-white px-5 py-2 text-sm font-bold shadow-lg"
          style={{ color: theme.buttonTextColor }}
        >
          Yes! 💖
        </div>
        <div className="rounded-full bg-white/30 px-5 py-2 text-sm font-bold text-white backdrop-blur-sm">
          No
        </div>
      </div>
    </div>
  );
}
