# StudySync (Frontend) 📚✨

## 🧠 Overview
StudySync is a productivity web app that helps students stay consistent by combining **Tasks**, a **Study Timer**, and **Wellness tracking** in one place.  
Users can create tasks with due dates, track study sessions with a timer, and log daily wellness habits like water intake, exercise minutes, and sleep hours.

This repository contains the **front-end** portion of the MERN stack project — built with **React**, **React Router**, and connected to the StudySync API.

---

## 🖼️ Screenshot / Logo
Add your logo/screenshots here  
- `src/assets/images/logo.svg`  
- `src/assets/images/logotype.svg`

---

## 🚀 Getting Started

### ✅ Prerequisites
- Node.js
- Backend running locally (example: `http://localhost:3000`)

### 📦 Installation
```bash
npm install

⚙️ Environment Variables

Create a .env file in the project root:

VITE_BACKEND_URL=http://localhost:3000

▶️ Run the App

npm run dev

Open:

    http://localhost:5173

🔗 Live Demo & Links

    Frontend Deployment: (add link)

    Backend Repository: (add link)

    Planning Docs (ERD / User Stories / Wireframes): (add link)

✨ Key Features
✅ Tasks

    Create tasks with a title and due date

    Edit and delete tasks

    Mark tasks as completed

    Filter tasks by All / Active / Completed

⏱️ Study Timer & Sessions

    Start a study timer

    Stop and save sessions automatically

    View study history (past sessions)

    View study stats (total time + session count)

💧 Wellness Tracking

    Log daily wellness entries:

        water glasses

        exercise minutes

        sleep hours

    Set a daily water goal (frontend setting)

    View wellness history (past logs)

🎨 Dashboard

    One view summary:

        tasks overview

        study time overview

        wellness snapshot

    Easy navigation between sections

🔐 Authentication

    Secure login and registration using JWT

    Protected pages (only accessible after login)

    Token stored in localStorage and attached automatically to API requests

🧩 User Stories
🔐 Authentication (4)

    As a new user, I want to sign up so I can use the app

    As a user, I want to sign in so I can access my data

    As a user, I want to sign out so my data stays secure

    As a user, I want to view/edit my profile

✅ Tasks (6)

    As a user, I want to create a task with title and due date

    As a user, I want to view all my tasks in a list

    As a user, I want to mark a task complete

    As a user, I want to edit a task

    As a user, I want to delete a task

    As a user, I want to filter tasks (active/completed)

⏱️ Study Timer (4)

    As a user, I want to start a timer when I study

    As a user, I want to stop the timer and save my session

    As a user, I want to view study stats (hours + sessions)

    As a user, I want to view study history (past sessions)

💧 Wellness (3)

    As a user, I want to log water intake daily

    As a user, I want to set a water goal

    As a user, I want to view my water history

🎨 Dashboard (2)

    As a user, I want to see tasks/study/wellness in one place

    As a user, I want easy navigation between pages

🧱 Tech Stack

    React.js — Frontend framework

    React Router DOM — Routing

    JWT Auth Integration — Secure route protection

    CSS / CSS Modules — Styling

    Git + GitHub — Version control

🎨 UI/UX Design

    Clean layout with card-based sections

    Consistent color scheme + typography

    Simple navigation with clear actions

    Responsive-friendly structure (can be extended further)

🧭 Next Steps (Stretch Goals)

    Add charts for study + wellness trends

    Weekly/monthly statistics view

    Notifications/reminders (study sessions, water goals)

    Dark mode

    Full profile editing (requires backend PUT route)

🙌 Attributions

    React + Vite setup