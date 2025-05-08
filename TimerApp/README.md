# ⏱️ React Native Timer App

A customizable multi-timer app built with React Native using Expo. Users can create timers grouped by categories, visualize progress, manage multiple timers simultaneously, and review completed history — all with persistent local storage.

---

## 📦 Features

### ✅ Core Features

- Add new timers with name, duration, and category
- Timers grouped by category with expandable/collapsible sections
- Start, pause, and reset individual timers
- Start/Pause/Reset all timers in a category (bulk actions)
- Progress bar visualization for each timer
- Local storage using AsyncStorage
- Congratulatory modal when timers complete
- Optional halfway alert notification
- Two screens: Home (timers) & History (completed timers)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended, avoid experimental v22)
- Expo CLI (`npm install -g expo-cli`)

### Setup

1. Clone the repo:

   ```bash
   git clone https://github.com/your-username/timer-app.git
   cd TimerApp

   ```

2. Install Dependencies:
   npm install

3. Start development server:
   npx expo start
   on web enter : w
   on android enter : a

⚙️ Tech Stack
React Native (via Expo)

    React Navigation

    useReducer for state management

    AsyncStorage for persistence

    StyleSheet API for UI

    setInterval for timer logic

📝 Assumptions
Timers reset when app is killed or reloaded mid-countdown (no background services)

    Halfway alert is an in-app alert, not a system notification

    Timestamps use device local time

    Minimal third-party libraries used to align with assignment requirements

🚧 Possible Improvements
Export history as JSON

    Light/Dark mode theme switch

    Category filtering dropdown

    Background countdown using expo-background-tasks

📚 License
This project was built as part of a React Native assignment.
