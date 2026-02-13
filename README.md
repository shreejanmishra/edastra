<p align="center">
  <h1 align="center">Edastra — The Ultimate Edutainment Platform 🎓🎬</h1>
</p>

<p align="center">
  <a href="https://edastra.vercel.app/">🔗 Live Demo</a> ·
  <a href="#-key-features--usp">Features</a> ·
  <a href="#%EF%B8%8F-tech-stack">Tech Stack</a> ·
  <a href="#-getting-started">Getting Started</a>
</p>

---

Edastra is a full-stack edutainment web application that bridges the gap between education and entertainment. Students can access curriculum-aligned learning materials (Pre-school → Class 10), stream educational documentaries and movies, apply for scholarships with built-in eligibility exams, and track progress through personalised dashboards — all in one platform.

## 🌟 Key Features & USP

### 📚 Comprehensive Education Hub

- **Curriculum Aligned** — Content tailored for **Pre-school to Class 10**
- **Multi-Board Support** — CBSE, ICSE, IB, and State Boards
- **Subject-Wise Organisation** — Mathematics, Science, Social Science, and more

### 🎬 Edutainment Library

- **Netflix-Style Interface** — Browse educational movies, documentaries, and biographies
- **Genre Filtering** — Nature, History, Science, Technology, and more
- **Video Player** — In-app playback with progress tracking

### 🎓 Integrated Scholarship Portal

- **Discovery & Application** — Browse and apply for scholarships directly in-app
- **Eligibility Exams** — Built-in online examination system
- **Status Tracking** — Real-time tracking from review to disbursement

### 🕶️ Immersive VR Experience _(Upcoming)_

- Dedicated section for immersive educational VR content

### 📊 "My Corner" Dashboard

- **Progress Tracking** — Visual analytics of completed lessons and courses
- **Personalised List** — Manage your watchlist and subscriptions

### 📈 ROI Dashboard _(Admin)_

- **User Activity Log** — Server-side data ingested from CSV, stored in MongoDB
- **Visual Analytics** — D3-powered charts for user engagement and feedback
- **CSV Export** — Download user activity data with client-side filtering

### ⚡ Modern & Responsive UI

- **Dark / Light Mode** — Comfortable viewing in any environment
- **Mobile-First** — Horizontal scroll cards on mobile, grid layout on desktop
- **Performance Optimised** — Code-splitting, lazy loading, image optimisation, and Gzip/Brotli compression
- **SEO Ready** — Dynamic meta tags via a reusable `<SEO />` component

## 🛠️ Tech Stack

| Layer          | Technology                                                                         |
| -------------- | ---------------------------------------------------------------------------------- |
| **Frontend**   | [React](https://react.dev/) 19, [React Router](https://reactrouter.com/) 7         |
| **Styling**    | [Tailwind CSS](https://tailwindcss.com/) 3                                         |
| **Animations** | [Framer Motion](https://motion.dev/)                                               |
| **Charts**     | [D3.js](https://d3js.org/) 7                                                       |
| **Icons**      | [Lucide React](https://lucide.dev/)                                                |
| **Build Tool** | [Vite](https://vitejs.dev/) 6 (with compression & image optimisation plugins)      |
| **Backend**    | [Express](https://expressjs.com/) 4, [Mongoose](https://mongoosejs.com/) / MongoDB |
| **Deployment** | [Vercel](https://vercel.com/) (Serverless Functions + Static Hosting)              |
| **Linting**    | ESLint 9 with React Hooks & React Refresh plugins                                  |

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 16
- **npm** (or yarn)
- **MongoDB** instance (local or [Atlas](https://www.mongodb.com/atlas))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shreejanmishra/edastra.git
   cd edastra/edastra
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file inside `server/` with:

   ```env
   MONGO_URI=your_mongodb_connection_string
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

## 📂 Project Structure

```

edastra/
├── edastra/                  # Main application
│   ├── api/                  # Vercel serverless API handlers
│   ├── public/               # Static assets
│   ├── scripts/              # Data seeding scripts (CSV → MongoDB)
│   ├── server/               # Express backend (MongoDB, REST API)
│   │   └── server.js
│   ├── src/
│   │   ├── assets/           # Images & global styles
│   │   ├── components/       # Reusable UI (Header, MovieCard, HeroSection, SEO, …)
│   │   ├── context/          # React Contexts (Auth, Theme, CompletedVideos)
│   │   ├── data/             # Mock data & curriculum configs
│   │   ├── hooks/            # Custom hooks (useDebounce, useLocalStorage, usePagination)
│   │   ├── pages/            # Application pages
│   │   │   ├── HomePage.jsx
│   │   │   ├── Subjects.jsx
│   │   │   ├── Entertainment.jsx
│   │   │   ├── Scholarship.jsx
│   │   │   ├── ScholarshipExam.jsx
│   │   │   ├── MyCorner.jsx
│   │   │   ├── MyList.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── VR.jsx
│   │   │   ├── PreLaunch.jsx
│   │   │   ├── ROIPage/      # Admin ROI dashboard
│   │   │   └── …
│   │   ├── App.jsx           # Root component with routing
│   │   └── main.jsx          # Entry point
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── vercel.json           # Vercel deployment config
├── License
└── README.md                 # ← You are here

```

## 📄 License

Copyright © 2025 **Shreejan Mishra**. All rights reserved.

For inquiries: **shrmiswork@gmail.com**
