# 🚀 Chandan Pathak — Portfolio Website

A modern, responsive developer portfolio built with **React 18**, **Vite** and **Tailwind CSS**. The site is fully static: projects and skills live in data files in the repo, so pages load without any database or API calls. The only server code is one small function that sends contact-form emails through Resend.

## 🌐 Live Demo

**[chandanpathak.me](https://chandanpathak.me)**

---

## ✨ Features

- **Dark / Light Mode** — system-aware theme toggle
- **Responsive Design** — mobile-first, works on all screen sizes
- **Glass UI** — Liquid Glass navbar ([Glisse](https://www.npmjs.com/package/glisse)) and an animated Three.js particle background
- **Static Content** — projects and skills come from `src/data/`, with no database or loading states
- **Contact Form** — emails sent via the Resend API
- **SEO Optimised** — semantic HTML, Open Graph tags, JSON-LD structured data

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v7, Vite |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| UI | Glisse (navbar), Three.js (background), Lucide React (icons) |
| Email | Resend, via one Vercel serverless function |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## 📁 Project Structure

```
chandan2909.github.io/
├── api/
│   └── send-email.js             # Contact form → Resend email (the only server code)
├── public/
│   └── assets/                   # Images, GIFs and project screenshots
│       └── projects/
├── src/
│   ├── data/
│   │   ├── projects.js           # Projects shown on the site — edit to add or change one
│   │   └── skills.js             # Skills, grouped by category
│   ├── components/               # Page sections and UI (Hero, About, Skills, Projects, Contact, Navbar…)
│   ├── hooks/                    # Custom React hooks
│   ├── utils/                    # Small helpers (colour contrast)
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                  # Environment variables for the contact form
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json                   # SPA routing (everything except /api → index.html)
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A [Resend](https://resend.com) account, only if you want the contact form to send email

### Installation

```bash
git clone https://github.com/chandan2909/chandan2909.github.io.git
cd chandan2909.github.io
npm install
```

### Run Locally

```bash
npm run dev        # Vite dev server → http://localhost:5173
```

Everything works locally except sending the contact form, which needs the serverless function. To test that too, run `npx vercel dev` with `RESEND_API_KEY` and `CONTACT_TO_EMAIL` set (see `.env.example`).

### Tests and Production Build

```bash
npm test           # Vitest
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## ✏️ Updating Projects and Skills

- **Projects:** edit `src/data/projects.js`. Put screenshots in `public/assets/projects/` and reference them as `/assets/projects/name.png`. A 1200×630 PNG fills the card best.
- **Skills:** edit `src/data/skills.js`. Skills are grouped by `category`, and `color` sets the chip colour (the text colour adjusts automatically to stay readable).

Commit and push, and Vercel redeploys the site.

---

## 🚀 Deployment (Vercel)

1. Push to `main` — Vercel auto-deploys.
2. Add `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in **Vercel → Project → Settings → Environment Variables**.
3. `vercel.json` sends every route except `/api` to the single-page app.

---

## 🎨 Customisation

### Colour Tokens (Tailwind config)

| Token | Value | Usage |
|---|---|---|
| `dark-100` | `#0a0a0a` | Page background (dark mode) |
| `dark-200` | `#111111` | Card background |
| `dark-300` | `#1a1a1a` | Input background |
| Accent | `#ffffff / #000000` | Buttons, highlights |

### Typography

Google Fonts loaded in `index.html`; font family configured in `tailwind.config.js`.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

Licensed under the **MIT License** — see [LICENSE](LICENSE) for details.

---

## 👤 Author

**Chandan Pathak**

- 🌐 [chandanpathak.me](https://chandanpathak.me)
- 📧 chandanpathakssa@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/chandanpathak)
- 🐱 [GitHub @chandan2909](https://github.com/chandan2909)

---

⭐ **Star this repository** if you found it helpful!
