# Browser Time Machine 📑

Welcome to the **Browser Time Machine**, an immersive and educational web application that recreates the evolution of the internet from the 1990s to the present day. Step into the past to experience authentic browsing environments, featuring period-specific browsers, resolutions, network speeds, and iconic websites. This project blends nostalgia with a deep dive into web development history, making it a valuable tool for developers, designers, and enthusiasts alike!

## Event Name 🏆
- **DevX**  

## Team Members 👨‍💻👩‍💻
- **Arham Garg**
- **H Dharshan**   

## Tech Stack Used 🛠️
- **Frontend**:
  - **React**: Powers dynamic, component-based UI development.
  - **Vite**: Accelerates development with a fast build tool and dev server.
- **Backend**:
  - **Node.js**: Provides a lightweight runtime for the server.
  - **Express**: Simplifies API routing and static file serving.
- **Data Storage**:
  - **JSON Files**: Stores static data for eras, websites, and technical specifications.
- **Development Tools**:
  - **npm**: Manages project dependencies.
  - **nodemon**: Enables automatic backend restarts during development.

## Project Motivation 🌟
Inspired by the rapid evolution of the web, the Browser Time Machine aims to preserve the history of internet browsing while educating users about the technological constraints and design trends of each era. This project was born out of a passion for retro computing and a desire to bridge the gap between past innovations and modern web development.

## Setup Instructions ⚙️
To run the Browser Time Machine locally, follow these detailed steps:

### Prerequisites
- **Node.js** (version 16.x or later) and npm installed. Download from [nodejs.org](https://nodejs.org/).
- A code editor (e.g., VS Code) for development.

### Installation
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/Dharshan2208/browser-time-machine.git
   cd browser-time-machine
   ```

2. **Set Up the Backend**:
   - Navigate to the `server/` directory:
     ```bash
     cd server
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     npm run dev
     ```
   - Verify it’s running on `http://localhost:3000` by testing `http://localhost:3000/api/eras`.

3. **Set Up the Frontend**:
   - Navigate to the `client/` directory:
     ```bash
     cd client
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Launch the frontend development server:
     ```bash
     npm run dev
     ```
   - Access the app at `http://localhost:5173` (note the port may vary; check the terminal output).

4. **Verify Setup**:
   - The interface should display a timeline, browser simulation, network speed controls, and tech specs.
   - Ensure the backend is active to fetch era and website data successfully.

### Troubleshooting
- **404 Error**: Confirm both servers are running and the `client/public/index.html` file is intact.
- **CORS Issues**: Install `cors` with `npm install cors` and add it to `server/server.js`:
  ```javascript
  const cors = require('cors');
  app.use(cors());
  ```
- **Port Conflicts**: If `5173` is occupied, Vite will suggest an alternative port (e.g., `5174`).

## Features Implemented ✨
- **Era Selection Interface**:
  - Interactive horizontal timeline and quick-select buttons for eras (1993-2025).
  - Covers key periods: Early Web, Browser Wars, Web 2.0, Modern Web Beginnings, Mobile Revolution, and Contemporary Web.

- **Authentic Browser Simulations**:
  - Pixel-perfect recreations of browsers (e.g., Netscape Navigator, Internet Explorer, Firefox, Chrome).
  - Includes browser-specific features like Netscape’s throbbing "N" logo and IE’s channel bar.
  - Simulates rendering quirks and HTML extensions (e.g., `<blink>`, `<marquee>`).

- **Hardware & Environment Simulation**:
  - Customizable resolutions (640x480 to 1920x1080) and mobile views.
  - Optional device frames (CRT monitors, LCDs, mobile devices).
  - Simulated OS environments (Windows 95, Mac OS 9).

- **Network Simulation**:
  - Adjustable connection speeds (14.4k modem to 5G).
  - Replicates authentic loading behaviors (progressive image loading, dial-up sound placeholder).

- **Content Exploration**:
  - Curated recreations of historical websites (e.g., Yahoo! 1994, GeoCities 1997, MySpace 2005).
  - Supports interactive elements like early web forms and DHTML effects.

- **Educational Components**:
  - Tech specs panel with era-specific details (HTML features, screen sizes, speeds, browser shares).
  - Design pattern library showcasing trends (e.g., table-based layouts, CSS grids).

- **Performance & Accessibility**:
  - Optimized with progressive loading of era-specific content.
  - Toggleable modern accessibility features for historical comparison.

## Future Enhancements 🚀
- Add audio effects (e.g., dial-up modem sounds) for a more immersive experience.
- Expand the content library with more historical websites and interactive elements.
- Introduce a developer tools toggle to showcase the evolution of debugging tools.
