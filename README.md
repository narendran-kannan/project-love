# Will You Marry Me? 💍

A fun, wholesome proposal page where the "No" button runs away from the cursor — they can only say **Yes!**

> **This project was entirely vibe coded.** Contributions are welcome!

## Features

- **Personalized proposals** — Enter names, a personal message, and pick a color theme
- **Shareable links** — Generate a unique URL to send to your loved one (no backend needed!)
- **Runaway "No" button** — The No button escapes the cursor, growing more desperate with each attempt
- **Growing "Yes" button** — Gets bigger every time they try to click No
- **Intro animation** — "Hey [name]... [your name] has something very important to ask you"
- **Celebration page** — Confetti, bouncing emojis, rotating love quotes, and personalized names
- **6 color themes** — Rose, Ocean, Sunset, Lavender, Forest, Midnight
- **Framer Motion animations** — Floating hearts, heartbeat ring, smooth transitions everywhere
- **Fully client-side** — Everything is encoded in URL params, zero backend

## Tech Stack

- [Next.js](https://nextjs.org) (App Router)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://www.framer.com/motion/)
- TypeScript

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page. Click **"Create Yours Now"** to personalize and generate a shareable link.

## How It Works

1. Visit `/create` to fill in names, a message, and pick a theme
2. Hit **"Preview & Get Link"** to see a preview and get a shareable URL
3. Send the link to your loved one — it opens `/propose?to=Name&from=You&msg=...&theme=sunset`
4. They see a personalized intro, the proposal, and the runaway No button
5. When they click Yes — confetti, celebration, and "Forever & Always"

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests. Some ideas:

- More color themes
- Sound effects / background music toggle
- Custom emoji picker
- Photo upload support
- More celebration animations
- i18n / multi-language support

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vercel/next.js/tree/canary/packages/create-next-app)

Or deploy anywhere that supports Next.js.

## License

MIT
