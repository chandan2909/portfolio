# 🚀 Chandan Pathak — Portfolio Website

A modern, responsive developer portfolio built with **React 18**, **Vite**, **Tailwind CSS**, and a **Node.js / MySQL** backend. Features a dynamic admin panel for managing projects & skills, dark/light mode, smooth animations, and a contact form powered by Resend.

## 🌐 Live Demo

**[www.chandanpathak.dev](https://chandanpathak.me)**

---

## ✨ Features

- **Dark / Light Mode** — system-aware theme toggle
- **Responsive Design** — mobile-first, works on all screen sizes
- **Animated UI** — scroll-triggered animations, hover effects, custom cursor & cursor glow
- **Admin Panel** — password-protected CRUD for projects & skills (backed by MySQL on Aiven)
- **Contact Form** — emails sent via the Resend API
- **SEO Optimised** — semantic HTML, Open Graph tags, JSON-LD structured data
- **Skeleton Loading** — graceful loading states with `react-loading-skeleton`
- **Fallback Data** — shows seed data when the API is unreachable

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18, React Router v7, Vite 5 |
| Styling | Tailwind CSS 3, PostCSS, Autoprefixer |
| Icons | Lucide React |
| Backend / API | Node.js (Vercel serverless functions) |
| Database | MySQL — hosted on **Aiven** |
| Auth | bcryptjs (password hashing) |
| Email | Resend |
| Analytics | Vercel Analytics |
| Deployment | Vercel |

---

## 📁 Project Structure

```
chandan2909.github.io/
├── api/                          # Vercel serverless functions (Node.js)
│   ├── auth/
│   │   ├── login.js              # Password check endpoint
│   │   └── change-password.js    # Password update endpoint
│   ├── projects/
│   │   ├── index.js              # GET all / POST new project
│   │   └── [id].js               # PUT / DELETE project by id
│   ├── skills/
│   │   ├── index.js              # GET all / POST new skill
│   │   └── [id].js               # PUT / DELETE skill by id
│   └── contact.js                # Contact form → Resend email
├── public/
│   └── assets/                   # Static images & GIFs
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── AdminPanel.jsx        # Password-protected CRUD dashboard
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   ├── Projects.jsx
│   │   ├── Contact.jsx
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── CursorGlow.jsx
│   │   ├── ScrollProgress.jsx
│   │   ├── BackToTop.jsx
│   │   ├── PageTransition.jsx
│   │   └── ThemeToggle.jsx
│   ├── pages/                    # Route-level page components
│   │   ├── HomePage.jsx
│   │   ├── AboutPage.jsx
│   │   ├── SkillsPage.jsx
│   │   ├── ProjectsPage.jsx
│   │   ├── ContactPage.jsx
│   │   └── NotFoundPage.jsx
│   ├── hooks/                    # Custom React hooks
│   ├── services/                 # API service helpers
│   ├── utils/
│   │   └── dataManager.js        # Cached API calls + fallback seed data
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env.example                  # Environment variable template
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
├── vercel.json                   # Vercel routing & API config
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+
- **npm** v9+
- A MySQL database (free tier on [Aiven](https://aiven.io) works great)
- A [Resend](https://resend.com) account for the contact form

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/chandan2909/chandan2909.github.io.git
cd chandan2909.github.io

# 2. Install dependencies
npm install

# 3. Copy and fill in environment variables
cp .env.example .env
```

### Environment Variables

Fill in your `.env` (see `.env.example` for all keys):

```env
# MySQL / Aiven
DB_HOST=your-aiven-host
DB_PORT=3306
DB_USER=your-db-user
DB_PASSWORD=your-db-password
DB_NAME=your-db-name

# Resend (contact form)
RESEND_API_KEY=re_xxxxxxxxxxxx
CONTACT_TO_EMAIL=your@email.com

# Admin panel
ADMIN_PASSWORD_HASH=bcrypt-hash-of-your-password
```

### Run Locally

```bash
npm run dev        # Vite dev server → http://localhost:5173
```

> **Tip:** When the API is unreachable, the frontend automatically falls back to built-in seed data, so you can browse the site without a local database.

### Production Build

```bash
npm run build      # Outputs to /dist
npm run preview    # Preview the production build locally
```

---

## 🔑 Admin Panel

Visit `/admin` to manage projects and skills.

- Login is protected by a **bcrypt-hashed** password stored in your environment.
- CRUD operations call the Vercel serverless API, which reads/writes MySQL on Aiven.
- Project images can be uploaded directly (stored as Base64) or referenced by URL.

---

## 🚀 Deployment (Vercel)

1. Push to `main` — Vercel auto-deploys.
2. Add all environment variables in the **Vercel project dashboard → Settings → Environment Variables**.
3. `vercel.json` handles SPA client-side routing fallback and API routes automatically.

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

- 🌐 [portfoliochandan.vercel.app](https://chandanpathak.me)
- 📧 chandanpathakssa@gmail.com
- 💼 [LinkedIn](https://linkedin.com/in/chandanpathak)
- 🐱 [GitHub @chandan2909](https://github.com/chandan2909)

---

⭐ **Star this repository** if you found it helpful!
