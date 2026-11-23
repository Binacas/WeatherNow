# 🌤️ WeatherNow — Modern Real-Time Weather Forecast Web Application

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Open--Meteo](https://img.shields.io/badge/Data-Open--Meteo%20API-brightgreen)](https://open-meteo.com/)

**WeatherNow** is a commercial-grade, responsive, glassmorphic weather dashboard designed with modern UI/UX principles. Built with pure vanilla HTML5, CSS3, and JavaScript, WeatherNow delivers real-time meteorological intelligence, 24-hour hourly outlooks, 7-day extended forecasts, and detailed atmospheric metrics powered entirely by free, non-commercial open APIs with **no API keys required**.

---

## ✨ Features Overview

### 📍 Current Weather Intelligence
- **Live Location Status**: City, region, country badge, and real-time local clock synchronized to the target city's timezone.
- **Dynamic Condition Visuals**: Tailored, high-definition SVG weather icons based on exact WMO weather interpretation codes and day/night cycle.
- **Thermal Metrics**: Current temperature, "Feels-Like" (apparent temperature), daytime High (↑) and nighttime Low (↓).
- **Natural Language Summary**: Smart algorithmic briefing describing expected weather trends and precipitation likelihood.

### 📊 Comprehensive Atmospheric Metrics
- **Humidity & Moisture**: Live relative humidity percentage with interactive level bar and comfort status.
- **Wind Speed & Dynamic Compass**: Wind velocity with cardinal direction indicators and an animated rotating 360° compass needle.
- **UV Radiation Index**: Color-coded segmented scale (Low, Moderate, High, Very High, Extreme) with sun protection advice.
- **Atmospheric Pressure**: Real-time barometric reading in hPa with atmospheric stability indicators.
- **Horizontal Visibility**: Visual distance in kilometers or miles with clarity analysis.
- **Sun Cycle Timings**: Precise local sunrise and sunset timings with calculated daily sunshine hours.

### 🕒 24-Hour Hourly Forecast
- Interactive, horizontally scrollable 24-hour hourly carousel.
- Distinct highlight for the current hour ("Now").
- Displays expected temperature, weather condition icon, precipitation chance (%), and wind speed.
- Left and right navigation controls with smooth touch and mouse scroll support.

### 📅 7-Day Extended Outlook
- Full week forecast with day name, calendar date, and condition icon.
- **iOS-style Temperature Range Bars**: Visual gradient bar showing the day's temperature range relative to the entire week's bounds.
- Exact minimum and maximum temperature comparisons.

### 🔍 Smart City Search & Geocoding
- Debounced live city search powered by the Open-Meteo Geocoding API.
- Instant suggestions dropdown displaying matching cities, states/provinces, and countries.
- Full keyboard navigation (Arrow Up/Down, Enter to select, Escape to close).
- Search button and Enter key support with graceful fallback handling for unknown locations.

### 🌐 Additional Modern Capabilities
- **One-Click Geolocation**: "Locate" button detects coordinates using browser `navigator.geolocation` and reverse geocodes the locality.
- **Instant Unit Toggle (°C / °F)**: Switch between Celsius and Fahrenheit seamlessly without re-fetching network data.
- **Search History**: Saves recent searches in `localStorage` for rapid one-click re-queries.
- **Dynamic Weather Ambience**: Fluid ambient background gradients that adapt based on conditions (sunny, night, cloudy, rainy, storm, snow, fog).
- **Network Resilience**: Automatic offline and online detection with floating toast notifications.

---

## 🎨 UI/UX Design System

- **Glassmorphism**: Layered semi-transparent frosted-glass cards (`backdrop-filter: blur(20px)`), glowing borders, and soft depth shadows.
- **Dark Mode Aesthetic**: Deep midnight tones (`#07090e`, `#121826`) accented with vibrant electric cyan, golden amber, and violet tones.
- **Fluid Ambient Lighting**: Animated drifting radial gradient meshes that create an organic, living atmosphere.
- **Clean Typography**: Google Fonts **Outfit** for modern numerals and titles paired with **Plus Jakarta Sans** for body readability.
- **Fully Responsive**: Optimized for ultra-wide monitors, laptops, tablets, and mobile screens.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Structure** | Semantic HTML5 with ARIA accessibility tags |
| **Styling** | Modern CSS3 (Custom properties, Flexbox, CSS Grid, Glassmorphism, Keyframe animations) |
| **Logic** | Vanilla JavaScript (ES6+, Async/Await, Fetch API, LocalStorage, Intl API) |
| **Weather API** | [Open-Meteo Forecast API](https://open-meteo.com/) (Free, no key required) |
| **Geocoding API** | [Open-Meteo Geocoding API](https://open-meteo.com/en/docs/geocoding-api) |
| **Reverse Geocoding** | [BigDataCloud Client API](https://www.bigdatacloud.net/) / Open-Meteo |
| **Icons** | Custom Crafted Vector SVGs (`assets/icons/`) |

---

## 📂 Project Architecture

```
WeatherNow/
├── index.html              # Main application markup & semantic structure
├── style.css               # Design system, glassmorphism, responsive grid, dynamic themes
├── script.js               # Application state, API integration, DOM updates, event handlers
├── README.md               # Detailed project documentation & publishing guide
└── assets/
    └── icons/              # Scalable vector graphics for conditions & metrics
        ├── clear-day.svg
        ├── clear-night.svg
        ├── partly-cloudy-day.svg
        ├── partly-cloudy-night.svg
        ├── cloudy.svg
        ├── overcast.svg
        ├── fog.svg
        ├── drizzle.svg
        ├── rain.svg
        ├── heavy-rain.svg
        ├── thunderstorm.svg
        ├── snow.svg
        ├── humidity.svg
        ├── wind.svg
        ├── pressure.svg
        ├── uv.svg
        ├── visibility.svg
        ├── sunrise.svg
        ├── sunset.svg
        └── compass.svg
```

---

## 🚀 Getting Started & Local Setup

### 1. Clone or Download the Repository
If you have cloned the project or downloaded the files:
```bash
git clone https://github.com/YOUR_USERNAME/WeatherNow.git
cd WeatherNow
```

### 2. Run Locally

Because WeatherNow uses modern `fetch()` calls to Open-Meteo APIs:
- **Option A (Direct File)**: You can simply double-click `index.html` in your file explorer to open it directly in Chrome, Firefox, Safari, or Edge.
- **Option B (VS Code Live Server)**: Right-click `index.html` inside VS Code and choose **"Open with Live Server"**.
- **Option C (Local Python Server)**:
  ```bash
  # Python 3
  python -m http.server 3000
  ```
  Then visit `http://localhost:3000` in your web browser.
- **Option D (Node.js npx serve)**:
  ```bash
  npx serve .
  ```

---

## 🌐 How to Publish to GitHub & GitHub Pages

Follow these step-by-step instructions to push **WeatherNow** to your personal GitHub account and host it live on the web for free.

### Step 1: Initialize Git Repository
Open your terminal inside the `WeatherNow` folder:
```bash
git init
git add .
git commit -m "Initial commit: WeatherNow - Real-Time Weather Application"
```

### Step 2: Create a New Repository on GitHub
1. Go to [GitHub](https://github.com/) and sign in.
2. Click the **+** (plus) icon in the top right and select **New repository**.
3. Name your repository: `WeatherNow` (or `weathernow`).
4. Set description: *Modern real-time weather forecasting web application with glassmorphism UI*.
5. Choose **Public** so anyone can see your portfolio project.
6. **Do NOT** initialize with a README, .gitignore, or license (we already created them!).
7. Click **Create repository**.

### Step 3: Link & Push Your Code
Copy the commands shown on your new GitHub page:
```bash
# Rename default branch to main
git branch -M main

# Link your local repository to GitHub (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/WeatherNow.git

# Push your code to GitHub
git push -u origin main
```

### Step 4: Enable Free Live Hosting via GitHub Pages
1. Go to your repository on GitHub.
2. Click on **Settings** (tab on the top right).
3. On the left sidebar, click on **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
5. Click **Save**.
6. Wait 1–2 minutes, then refresh the page. You will see:
   > *Your site is live at https://YOUR_USERNAME.github.io/WeatherNow/*
7. Click the link to view your live portfolio application!

---

## 📸 Screenshots Showcase

*(Add your screenshots here after deploying!)*

| Desktop Dashboard | Mobile Responsive View |
| :---: | :---: |
| ![Desktop Preview](https://via.placeholder.com/800x450/0b0f19/38bdf8?text=WeatherNow+Desktop+Dashboard) | ![Mobile Preview](https://via.placeholder.com/350x650/0b0f19/38bdf8?text=WeatherNow+Mobile+UI) |

---

## 🔮 Future Enhancements
- [ ] Interactive radar map overlay using Leaflet or Mapbox.
- [ ] Air Quality Index (AQI) card with PM2.5 and PM10 breakdown.
- [ ] Severe weather push notification alerts via Service Worker.
- [ ] Multi-language localization (Spanish, French, German, Japanese).
- [ ] Historical weather comparison ("Warmer than yesterday").

---

## 📄 License
This project is open-source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author & Acknowledgements
- Developed by **Senior Full-Stack & UI/UX Designer**.
- Atmospheric & Geocoding data provided by [Open-Meteo](https://open-meteo.com/).
- Reverse Geocoding support by [BigDataCloud](https://www.bigdatacloud.net/).
