export interface Theme {
  id: string;
  name: string;
  emoji: string;
  gradient: string;
  celebrationGradient: string;
  accentColor: string;
  buttonTextColor: string;
}

export const themes: Theme[] = [
  {
    id: "rose",
    name: "Rose",
    emoji: "🌹",
    gradient:
      "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 25%, #f48fb1 50%, #f06292 75%, #ec407a 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
    accentColor: "#ec407a",
    buttonTextColor: "#be185d",
  },
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    gradient:
      "linear-gradient(135deg, #e0f7fa 0%, #80deea 25%, #26c6da 50%, #00acc1 75%, #00838f 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #0077b6 0%, #0096c7 50%, #48cae4 100%)",
    accentColor: "#00838f",
    buttonTextColor: "#0e7490",
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    gradient:
      "linear-gradient(135deg, #fff3e0 0%, #ffcc80 25%, #ff9800 50%, #f57c00 75%, #e65100 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #f12711 0%, #f5af19 50%, #f09819 100%)",
    accentColor: "#e65100",
    buttonTextColor: "#c2410c",
  },
  {
    id: "lavender",
    name: "Lavender",
    emoji: "💜",
    gradient:
      "linear-gradient(135deg, #f3e5f5 0%, #ce93d8 25%, #ab47bc 50%, #8e24aa 75%, #6a1b9a 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #6a11cb 0%, #8e24aa 50%, #e040fb 100%)",
    accentColor: "#8e24aa",
    buttonTextColor: "#7e22ce",
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌿",
    gradient:
      "linear-gradient(135deg, #e8f5e9 0%, #a5d6a7 25%, #66bb6a 50%, #43a047 75%, #2e7d32 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #134e5e 0%, #2e7d32 50%, #71b280 100%)",
    accentColor: "#2e7d32",
    buttonTextColor: "#15803d",
  },
  {
    id: "midnight",
    name: "Midnight",
    emoji: "🌙",
    gradient:
      "linear-gradient(135deg, #1a1a2e 0%, #16213e 25%, #0f3460 50%, #533483 75%, #e94560 100%)",
    celebrationGradient:
      "linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%)",
    accentColor: "#e94560",
    buttonTextColor: "#e11d48",
  },
];

export function getTheme(id: string): Theme {
  return themes.find((t) => t.id === id) || themes[0];
}

export interface ProposalData {
  from: string;
  to: string;
  message: string;
  theme: string;
}

export function encodeProposal(data: ProposalData): string {
  const params = new URLSearchParams();
  if (data.to) params.set("to", data.to);
  if (data.from) params.set("from", data.from);
  if (data.message) params.set("msg", data.message);
  if (data.theme && data.theme !== "rose") params.set("theme", data.theme);
  return params.toString();
}

export function decodeProposal(
  searchParams: Record<string, string | string[] | undefined>
): ProposalData | null {
  const to = typeof searchParams.to === "string" ? searchParams.to : "";
  const from = typeof searchParams.from === "string" ? searchParams.from : "";
  const message = typeof searchParams.msg === "string" ? searchParams.msg : "";
  const theme =
    typeof searchParams.theme === "string" ? searchParams.theme : "rose";

  if (!to && !from) return null;

  return { to, from, message, theme };
}
