# Edastra - The Ultimate Edutainment Platform 🎓🎬

Edastra is a cutting-edge web application that bridges the gap between education and entertainment. It provides a seamless experience for students to access curriculum-based learning materials, documentaries, and educational movies, while also offering opportunities for scholarships and immersive VR experiences.

## 🌟 Key Features & USP

### 📚 Comprehensive Education Hub

- **Curriculum Aligned:** Content tailored for **Pre-school to Class 12**.
- **Multi-Board Support:** Select from **CBSE, ICSE, IB, and State Boards** to get relevant content.
- **Subject-Wise Organization:** Deep dive into specific subjects like Mathematics, Science, Social Science, and more.

### 🎬 Edutainment Library

- **Engaging Content:** A Netflix-style interface for educational movies, documentaries, and biographies.
- **Genre Filtering:** Browse by genres like Nature, History, Science, and Technology.

### 🎓 Integrated Scholarship Portal

- **Discovery & Application:** Browse available scholarships and apply directly within the platform.
- **Eligibility Exams:** Built-in online examination system to test eligibility instantly.
- **Status Tracking:** Real-time tracking of application status, from review to disbursement.

### 🕶️ Immersive VR Experience

- **Virtual Reality:** Dedicated section for immersive educational content to visualize complex concepts.

### 📊 "My Corner" Dashboard

- **Progress Tracking:** Visual analytics of completed lessons and courses.
- **Personalized List:** Manage your watchlist and subscriptions.

### ⚡ Modern & Responsive UI

- **Dark/Light Mode:** Toggle between themes for comfortable viewing.
- **Performance Optimized:** Built with code-splitting and lazy loading for lightning-fast performance.

## 🛠️ Tech Stack

- **Frontend:** [React.js](https://reactjs.org/) (v18+)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Routing:** [React Router DOM](https://reactrouter.com/)
- **Icons:** [Lucide React](https://lucide.dev/)

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone https://github.com/yourusername/edastra.git
    cd edastra
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Start the development server**

    ```bash
    npm run dev
    ```

4.  **Build for production**
    ```bash
    npm run build
    ```

## 📂 Project Structure

```
edastra/
├── public/              # Static assets
├── src/
│   ├── assets/          # Images and global styles
│   ├── components/      # Reusable UI components (Header, MovieCard, etc.)
│   ├── context/         # React Context (ThemeContext)
│   ├── data/            # Mock data and curriculum configurations
│   ├── pages/           # Main application pages
│   │   ├── HomePage.jsx
│   │   ├── Subjects.jsx
│   │   ├── Scholarship.jsx
│   │   ├── Entertainment.jsx
│   │   └── ...
│   ├── App.jsx          # Main App component with Routing
│   └── main.jsx         # Entry point
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
