/**
 * WeatherNow — Professional Real-Time Weather Application
 * Technology Stack: Vanilla JavaScript (ES6+), Open-Meteo APIs
 * No API keys required.
 */

// ============================================================================
// 1. Weather Data Mapping & Configurations
// ============================================================================

/**
 * WMO Weather Interpretation Codes (WW)
 * Maps code to description, day icon, night icon, and theme category
 */
const WMO_CODE_MAP = {
  0: {
    label: "Clear Sky",
    dayIcon: "clear-day.svg",
    nightIcon: "clear-night.svg",
    theme: "clear-day",
    summary: "Clear skies and abundant sunshine throughout the day."
  },
  1: {
    label: "Mainly Clear",
    dayIcon: "partly-cloudy-day.svg",
    nightIcon: "partly-cloudy-night.svg",
    theme: "clear-day",
    summary: "Mostly clear skies with a few passing high clouds."
  },
  2: {
    label: "Partly Cloudy",
    dayIcon: "partly-cloudy-day.svg",
    nightIcon: "partly-cloudy-night.svg",
    theme: "clear-day",
    summary: "A mix of sun and clouds with pleasant conditions."
  },
  3: {
    label: "Overcast",
    dayIcon: "overcast.svg",
    nightIcon: "overcast.svg",
    theme: "overcast",
    summary: "Dense cloud cover with limited sunshine expected."
  },
  45: {
    label: "Fog",
    dayIcon: "fog.svg",
    nightIcon: "fog.svg",
    theme: "fog",
    summary: "Patchy fog reducing horizontal visibility. Travel with caution."
  },
  48: {
    label: "Depositing Rime Fog",
    dayIcon: "fog.svg",
    nightIcon: "fog.svg",
    theme: "fog",
    summary: "Icy rime fog creating hazardous surface conditions."
  },
  51: {
    label: "Light Drizzle",
    dayIcon: "drizzle.svg",
    nightIcon: "drizzle.svg",
    theme: "drizzle",
    summary: "Intermittent light drizzle. An umbrella may be handy."
  },
  53: {
    label: "Moderate Drizzle",
    dayIcon: "drizzle.svg",
    nightIcon: "drizzle.svg",
    theme: "drizzle",
    summary: "Steady drizzle creating damp, cool atmospheric conditions."
  },
  55: {
    label: "Dense Drizzle",
    dayIcon: "drizzle.svg",
    nightIcon: "drizzle.svg",
    theme: "drizzle",
    summary: "Persistent thick drizzle with overcast skies."
  },
  56: {
    label: "Light Freezing Drizzle",
    dayIcon: "drizzle.svg",
    nightIcon: "drizzle.svg",
    theme: "snow",
    summary: "Sub-zero drizzle creating slippery conditions."
  },
  57: {
    label: "Dense Freezing Drizzle",
    dayIcon: "drizzle.svg",
    nightIcon: "drizzle.svg",
    theme: "snow",
    summary: "Freezing drizzle likely to coat surfaces with ice."
  },
  61: {
    label: "Slight Rain",
    dayIcon: "rain.svg",
    nightIcon: "rain.svg",
    theme: "rain",
    summary: "Light showers passing through the area today."
  },
  63: {
    label: "Moderate Rain",
    dayIcon: "rain.svg",
    nightIcon: "rain.svg",
    theme: "rain",
    summary: "Periods of steady moderate rainfall. Carry rain gear."
  },
  65: {
    label: "Heavy Rain",
    dayIcon: "heavy-rain.svg",
    nightIcon: "heavy-rain.svg",
    theme: "heavy-rain",
    summary: "Heavy downpours expected. Water accumulation possible."
  },
  66: {
    label: "Light Freezing Rain",
    dayIcon: "rain.svg",
    nightIcon: "rain.svg",
    theme: "snow",
    summary: "Cold rain freezing on surface contact. Hazardous roads."
  },
  67: {
    label: "Heavy Freezing Rain",
    dayIcon: "heavy-rain.svg",
    nightIcon: "heavy-rain.svg",
    theme: "snow",
    summary: "Dangerous ice accumulation expected from freezing rain."
  },
  71: {
    label: "Slight Snow Fall",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Gentle flurries and light snowfall throughout the day."
  },
  73: {
    label: "Moderate Snow Fall",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Steadier snowfall creating fresh winter accumulation."
  },
  75: {
    label: "Heavy Snow Fall",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Significant snowfall with reduced visibility and accumulation."
  },
  77: {
    label: "Snow Grains",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Fine frozen snow grains falling intermittently."
  },
  80: {
    label: "Slight Rain Showers",
    dayIcon: "rain.svg",
    nightIcon: "rain.svg",
    theme: "rain",
    summary: "Scattered brief showers with intervals of clearing."
  },
  81: {
    label: "Moderate Rain Showers",
    dayIcon: "rain.svg",
    nightIcon: "rain.svg",
    theme: "rain",
    summary: "Passing rain showers with occasional gusty breezes."
  },
  82: {
    label: "Violent Rain Showers",
    dayIcon: "heavy-rain.svg",
    nightIcon: "heavy-rain.svg",
    theme: "heavy-rain",
    summary: "Intense torrential showers with localized ponding."
  },
  85: {
    label: "Slight Snow Showers",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Passing light snow showers across the region."
  },
  86: {
    label: "Heavy Snow Showers",
    dayIcon: "snow.svg",
    nightIcon: "snow.svg",
    theme: "snow",
    summary: "Heavy bursts of snow showers causing rapid accumulation."
  },
  95: {
    label: "Thunderstorm",
    dayIcon: "thunderstorm.svg",
    nightIcon: "thunderstorm.svg",
    theme: "thunderstorm",
    summary: "Active thunderstorms with lightning and gusty winds."
  },
  96: {
    label: "Thunderstorm with Hail",
    dayIcon: "thunderstorm.svg",
    nightIcon: "thunderstorm.svg",
    theme: "thunderstorm",
    summary: "Severe thunderstorm accompanied by hail. Seek indoor shelter."
  },
  99: {
    label: "Heavy Hail Thunderstorm",
    dayIcon: "thunderstorm.svg",
    nightIcon: "thunderstorm.svg",
    theme: "thunderstorm",
    summary: "Severe storm warning: intense lightning and damaging hail."
  }
};

// Cardinal Wind Directions
const CARDINAL_DIRECTIONS = [
  "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
  "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
];

// API Endpoints
const API = {
  GEOCODING: "https://geocoding-api.open-meteo.com/v1/search",
  FORECAST: "https://api.open-meteo.com/v1/forecast",
  REVERSE_GEO: "https://api.bigdatacloud.net/data/reverse-geocode-client"
};

// Default City
const DEFAULT_CITY = {
  name: "London",
  country: "United Kingdom",
  country_code: "GB",
  admin1: "Greater London",
  latitude: 51.5085,
  longitude: -0.1257,
  timezone: "Europe/London"
};

// ============================================================================
// 2. Application State Management
// ============================================================================

const state = {
  unit: localStorage.getItem("weathernow_unit") || "celsius", // 'celsius' | 'fahrenheit'
  currentCity: null,
  weatherData: null,
  recentSearches: JSON.parse(localStorage.getItem("weathernow_recents") || "[]"),
  searchDebounceTimer: null,
  selectedSuggestionIndex: -1
};

// ============================================================================
// 3. DOM Element References
// ============================================================================

const dom = {
  // Body & Ambient
  body: document.body,
  ambientBg: document.getElementById("ambientBg"),
  toastContainer: document.getElementById("toastContainer"),
  loadingOverlay: document.getElementById("loadingOverlay"),
  loadingText: document.getElementById("loadingText"),

  // Search
  searchForm: document.getElementById("searchForm"),
  searchInput: document.getElementById("searchInput"),
  clearSearchBtn: document.getElementById("clearSearchBtn"),
  searchSuggestions: document.getElementById("searchSuggestions"),
  recentChips: document.getElementById("recentChips"),
  locateBtn: document.getElementById("locateBtn"),

  // Units
  celsiusBtn: document.getElementById("celsiusBtn"),
  fahrenheitBtn: document.getElementById("fahrenheitBtn"),

  // Hero Card
  cityName: document.getElementById("cityName"),
  countryBadge: document.getElementById("countryBadge"),
  regionInfo: document.getElementById("regionInfo"),
  localTime: document.getElementById("localTime"),
  currentWeatherIcon: document.getElementById("currentWeatherIcon"),
  currentTemp: document.getElementById("currentTemp"),
  currentUnitSymbol: document.getElementById("currentUnitSymbol"),
  conditionText: document.getElementById("conditionText"),
  tempMax: document.getElementById("tempMax"),
  tempMin: document.getElementById("tempMin"),
  feelsLikeTemp: document.getElementById("feelsLikeTemp"),
  smartSummary: document.getElementById("smartSummary"),

  // Hourly
  hourlyTrack: document.getElementById("hourlyTrack"),
  hourlyScrollLeft: document.getElementById("hourlyScrollLeft"),
  hourlyScrollRight: document.getElementById("hourlyScrollRight"),
  hourlyTrackContainer: document.getElementById("hourlyTrackContainer"),

  // Metrics
  humidityValue: document.getElementById("humidityValue"),
  humidityBar: document.getElementById("humidityBar"),
  humidityStatus: document.getElementById("humidityStatus"),
  windSpeed: document.getElementById("windSpeed"),
  windUnit: document.getElementById("windUnit"),
  windDirBadge: document.getElementById("windDirBadge"),
  windDirText: document.getElementById("windDirText"),
  compassNeedle: document.getElementById("compassNeedle"),
  uvValue: document.getElementById("uvValue"),
  uvBadge: document.getElementById("uvBadge"),
  uvIndicator: document.getElementById("uvIndicator"),
  uvStatus: document.getElementById("uvStatus"),
  pressureValue: document.getElementById("pressureValue"),
  pressureStatus: document.getElementById("pressureStatus"),
  pressureDesc: document.getElementById("pressureDesc"),
  visibilityValue: document.getElementById("visibilityValue"),
  visibilityUnit: document.getElementById("visibilityUnit"),
  visibilityBar: document.getElementById("visibilityBar"),
  visibilityStatus: document.getElementById("visibilityStatus"),
  sunriseTime: document.getElementById("sunriseTime"),
  sunsetTime: document.getElementById("sunsetTime"),
  daylightLength: document.getElementById("daylightLength"),

  // Daily Forecast
  dailyForecastList: document.getElementById("dailyForecastList"),

  // Footer
  lastUpdatedTime: document.getElementById("lastUpdatedTime")
};

// ============================================================================
// 4. Unit Conversion Utilities
// ============================================================================

/**
 * Convert temperature based on active unit
 * @param {number} celsius 
 * @returns {number}
 */
function convertTemp(celsius) {
  if (state.unit === "fahrenheit") {
    return Math.round((celsius * 9) / 5 + 32);
  }
  return Math.round(celsius);
}

/**
 * Convert wind speed based on active unit
 * @param {number} kmh 
 * @returns {{ value: number, unit: string }}
 */
function convertWind(kmh) {
  if (state.unit === "fahrenheit") {
    return {
      value: Math.round(kmh * 0.621371),
      unit: "mph"
    };
  }
  return {
    value: Math.round(kmh),
    unit: "km/h"
  };
}

/**
 * Convert visibility meters to km or miles
 * @param {number} meters 
 * @returns {{ value: string, unit: string }}
 */
function convertVisibility(meters) {
  if (!meters || meters < 0) {
    return { value: "10+", unit: state.unit === "fahrenheit" ? "mi" : "km" };
  }
  const km = meters / 1000;
  if (state.unit === "fahrenheit") {
    const miles = km * 0.621371;
    return {
      value: miles >= 10 ? Math.round(miles).toString() : miles.toFixed(1),
      unit: "mi"
    };
  }
  return {
    value: km >= 10 ? Math.round(km).toString() : km.toFixed(1),
    unit: "km"
  };
}

/**
 * Calculate cardinal direction from degrees
 * @param {number} degrees 
 * @returns {string}
 */
function getWindDirectionText(degrees) {
  const index = Math.round((degrees % 360) / 22.5) % 16;
  return CARDINAL_DIRECTIONS[index];
}

// ============================================================================
// 5. Toast Notifications & Loading State
// ============================================================================

/**
 * Display toast notification
 * @param {string} message 
 * @param {'info' | 'success' | 'warning' | 'error'} type 
 */
function showToast(message, type = "info") {
  const toast = document.createElement("div");
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  dom.toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.classList.add("hiding");
    toast.addEventListener("transitionend", () => {
      if (toast.parentElement) toast.remove();
    });
  }, 4000);
}

/**
 * Toggle full-screen smooth loading spinner
 * @param {boolean} show 
 * @param {string} text 
 */
function setLoading(show, text = "Fetching live atmospheric data...") {
  if (show) {
    dom.loadingText.textContent = text;
    dom.loadingOverlay.hidden = false;
  } else {
    dom.loadingOverlay.hidden = true;
  }
}

// ============================================================================
// 6. City Geocoding & Autocomplete
// ============================================================================

/**
 * Fetch city suggestions from Open-Meteo Geocoding API
 * @param {string} query 
 */
async function fetchCitySuggestions(query) {
  if (!query || query.trim().length < 2) {
    hideSuggestions();
    return;
  }

  try {
    const url = `${API.GEOCODING}?name=${encodeURIComponent(query.trim())}&count=6&language=en&format=json`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Geocoding search failed");

    const data = await response.json();
    if (data && data.results && data.results.length > 0) {
      renderSuggestions(data.results);
    } else {
      renderEmptySuggestions();
    }
  } catch (error) {
    console.warn("Geocoding lookup error:", error);
  }
}

/**
 * Render suggestions in dropdown list
 * @param {Array} results 
 */
function renderSuggestions(results) {
  dom.searchSuggestions.innerHTML = "";
  state.selectedSuggestionIndex = -1;

  results.forEach((item, index) => {
    const li = document.createElement("li");
    li.className = "suggestion-item";
    li.setAttribute("role", "option");
    li.setAttribute("tabindex", "0");
    li.dataset.index = index;

    const left = document.createElement("div");
    const city = document.createElement("div");
    city.className = "suggestion-city";
    city.textContent = item.name;

    const region = document.createElement("div");
    region.className = "suggestion-region";
    region.textContent = [item.admin1, item.country].filter(Boolean).join(", ");

    left.appendChild(city);
    left.appendChild(region);

    const right = document.createElement("span");
    right.className = "suggestion-country";
    right.textContent = item.country_code || item.country || "";

    li.appendChild(left);
    li.appendChild(right);

    li.addEventListener("click", () => {
      selectCity(item);
    });

    dom.searchSuggestions.appendChild(li);
  });

  dom.searchSuggestions.hidden = false;
}

/**
 * Render empty state for suggestions
 */
function renderEmptySuggestions() {
  dom.searchSuggestions.innerHTML = `
    <li class="suggestion-empty">No matching cities found</li>
  `;
  dom.searchSuggestions.hidden = false;
}

/**
 * Hide suggestion list
 */
function hideSuggestions() {
  dom.searchSuggestions.hidden = true;
  dom.searchSuggestions.innerHTML = "";
  state.selectedSuggestionIndex = -1;
}

/**
 * Select a city from suggestions or recents
 * @param {Object} cityItem 
 */
function selectCity(cityItem) {
  hideSuggestions();
  dom.searchInput.value = `${cityItem.name}, ${cityItem.country || cityItem.country_code || ""}`;
  dom.clearSearchBtn.hidden = false;

  const cityData = {
    name: cityItem.name,
    country: cityItem.country || cityItem.country_code || "",
    country_code: cityItem.country_code || "",
    admin1: cityItem.admin1 || "",
    latitude: cityItem.latitude,
    longitude: cityItem.longitude,
    timezone: cityItem.timezone || "auto"
  };

  saveRecentSearch(cityData);
  loadWeatherForCity(cityData);
}

// ============================================================================
// 7. Recent Searches Management
// ============================================================================

/**
 * Save selected city to recent searches list in LocalStorage
 * @param {Object} city 
 */
function saveRecentSearch(city) {
  if (!city || !city.name) return;

  // Filter out duplicates
  const filtered = state.recentSearches.filter(
    (c) => c.name.toLowerCase() !== city.name.toLowerCase() ||
           Math.abs(c.latitude - city.latitude) > 0.05
  );

  filtered.unshift(city);

  // Keep top 6
  state.recentSearches = filtered.slice(0, 6);
  localStorage.setItem("weathernow_recents", JSON.stringify(state.recentSearches));
  localStorage.setItem("weathernow_last_city", JSON.stringify(city));

  renderRecentChips();
}

/**
 * Render recent cities chips
 */
function renderRecentChips() {
  dom.recentChips.innerHTML = "";

  if (state.recentSearches.length === 0) {
    const emptySpan = document.createElement("span");
    emptySpan.className = "recent-label";
    emptySpan.textContent = "No recent searches";
    dom.recentChips.appendChild(emptySpan);
    return;
  }

  state.recentSearches.forEach((city) => {
    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = "recent-chip";
    chip.textContent = `${city.name} (${city.country_code || city.country || ""})`;
    chip.addEventListener("click", () => {
      loadWeatherForCity(city);
    });
    dom.recentChips.appendChild(chip);
  });

  // Clear recents button
  const clearBtn = document.createElement("button");
  clearBtn.type = "button";
  clearBtn.className = "clear-recent-btn";
  clearBtn.textContent = "Clear history";
  clearBtn.addEventListener("click", () => {
    state.recentSearches = [];
    localStorage.removeItem("weathernow_recents");
    renderRecentChips();
    showToast("Search history cleared", "info");
  });
  dom.recentChips.appendChild(clearBtn);
}

// ============================================================================
// 8. Open-Meteo Weather Fetching
// ============================================================================

/**
 * Load complete weather dataset for a target city
 * @param {Object} city 
 */
async function loadWeatherForCity(city) {
  setLoading(true, `Connecting to atmospheric radar for ${city.name}...`);
  state.currentCity = city;

  try {
    const params = new URLSearchParams({
      latitude: city.latitude,
      longitude: city.longitude,
      timezone: city.timezone && city.timezone !== "auto" ? city.timezone : "auto",
      current: [
        "temperature_2m",
        "relative_humidity_2m",
        "apparent_temperature",
        "is_day",
        "precipitation",
        "weather_code",
        "surface_pressure",
        "wind_speed_10m",
        "wind_direction_10m"
      ].join(","),
      hourly: [
        "temperature_2m",
        "relative_humidity_2m",
        "weather_code",
        "precipitation_probability",
        "visibility",
        "uv_index",
        "wind_speed_10m"
      ].join(","),
      daily: [
        "weather_code",
        "temperature_2m_max",
        "temperature_2m_min",
        "apparent_temperature_max",
        "apparent_temperature_min",
        "sunrise",
        "sunset",
        "uv_index_max",
        "precipitation_probability_max",
        "wind_speed_10m_max"
      ].join(",")
    });

    const response = await fetch(`${API.FORECAST}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Open-Meteo API returned HTTP status ${response.status}`);
    }

    const data = await response.json();
    state.weatherData = data;

    // Update real timezone if returned
    if (data.timezone) {
      state.currentCity.timezone = data.timezone;
    }

    renderCompleteDashboard();
    showToast(`Updated weather for ${city.name}`, "success");
  } catch (error) {
    console.error("Failed to load weather data:", error);
    showToast(`Unable to fetch weather: ${error.message}`, "error");
  } finally {
    setLoading(false);
  }
}

// ============================================================================
// 9. Dashboard Rendering
// ============================================================================

/**
 * Primary render function triggering all dashboard modules
 */
function renderCompleteDashboard() {
  if (!state.weatherData || !state.currentCity) return;

  renderHeroCurrent();
  renderHourlyForecast();
  renderMetricsGrid();
  renderDailyForecast();
  updateBackgroundTheme();
  updateLastUpdatedTimestamp();
}

/**
 * 1. Render Hero Current Weather
 */
function renderHeroCurrent() {
  const current = state.weatherData.current;
  const daily = state.weatherData.daily;
  const city = state.currentCity;

  // City & Location Meta
  dom.cityName.textContent = city.name;
  dom.countryBadge.textContent = city.country_code || (city.country ? city.country.substring(0, 3).toUpperCase() : "LIVE");
  dom.regionInfo.textContent = [city.admin1, city.country].filter(Boolean).join(", ") || "Real-Time Station";

  // Local Time
  dom.localTime.textContent = formatCityLocalTime(current.time, city.timezone);

  // Weather Condition & Icon
  const wmoInfo = WMO_CODE_MAP[current.weather_code] || {
    label: "Atmospheric Activity",
    dayIcon: "clear-day.svg",
    nightIcon: "clear-night.svg",
    summary: "Standard meteorological conditions observed."
  };

  const isDay = current.is_day === 1;
  const iconFilename = isDay ? wmoInfo.dayIcon : wmoInfo.nightIcon;
  dom.currentWeatherIcon.src = `assets/icons/${iconFilename}`;
  dom.currentWeatherIcon.alt = wmoInfo.label;
  dom.conditionText.textContent = wmoInfo.label;

  // Temperatures
  dom.currentTemp.textContent = convertTemp(current.temperature_2m);
  dom.currentUnitSymbol.textContent = state.unit === "fahrenheit" ? "°F" : "°C";

  if (daily && daily.temperature_2m_max && daily.temperature_2m_max[0] !== undefined) {
    dom.tempMax.textContent = `${convertTemp(daily.temperature_2m_max[0])}°`;
    dom.tempMin.textContent = `${convertTemp(daily.temperature_2m_min[0])}°`;
  }

  dom.feelsLikeTemp.textContent = `${convertTemp(current.apparent_temperature)}°`;

  // Dynamic Natural Language Summary
  dom.smartSummary.textContent = generateNaturalSummary(current, daily, wmoInfo);
}

/**
 * 2. Render 24-Hour Hourly Forecast
 */
function renderHourlyForecast() {
  const hourly = state.weatherData.hourly;
  if (!hourly || !hourly.time) return;

  dom.hourlyTrack.innerHTML = "";

  const currentTimeStr = state.weatherData.current.time;
  let startIndex = 0;

  // Find index closest to current hour
  if (currentTimeStr) {
    const currentPrefix = currentTimeStr.slice(0, 13); // "YYYY-MM-DDTHH"
    const foundIdx = hourly.time.findIndex(t => t.startsWith(currentPrefix));
    if (foundIdx !== -1) startIndex = foundIdx;
  }

  const next24Hours = hourly.time.slice(startIndex, startIndex + 24);

  next24Hours.forEach((timeStr, offset) => {
    const index = startIndex + offset;
    const temp = hourly.temperature_2m[index];
    const code = hourly.weather_code[index];
    const pop = hourly.precipitation_probability ? hourly.precipitation_probability[index] : 0;
    const windKmh = hourly.wind_speed_10m ? hourly.wind_speed_10m[index] : 0;

    // Parse hour from time string directly without timezone conversion issues
    const parts = timeStr.split("T");
    const timePart = parts[1] || "00:00";
    const hourInt = parseInt(timePart.split(":")[0], 10);
    const isHourDay = hourInt >= 6 && hourInt < 20;

    const wmo = WMO_CODE_MAP[code] || WMO_CODE_MAP[0];
    const icon = isHourDay ? wmo.dayIcon : wmo.nightIcon;

    const card = document.createElement("div");
    card.className = `hourly-card ${offset === 0 ? "now" : ""}`;

    // Format hour label
    let timeLabel;
    if (offset === 0) {
      timeLabel = "Now";
    } else {
      const ampm = hourInt >= 12 ? "PM" : "AM";
      const hour12 = hourInt % 12 || 12;
      timeLabel = `${hour12} ${ampm}`;
    }

    const convertedWind = convertWind(windKmh);

    card.innerHTML = `
      <span class="hourly-time">${timeLabel}</span>
      <img src="assets/icons/${icon}" alt="${wmo.label}" class="hourly-icon" />
      <span class="hourly-temp">${convertTemp(temp)}°</span>
      <div class="hourly-rain-pop" title="Precipitation Probability">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
        </svg>
        <span>${pop}%</span>
      </div>
      <span class="hourly-wind">${convertedWind.value} ${convertedWind.unit}</span>
    `;

    dom.hourlyTrack.appendChild(card);
  });
}

/**
 * 3. Render Metric Highlights (Humidity, Wind, UV, Pressure, Visibility, Sun)
 */
function renderMetricsGrid() {
  const current = state.weatherData.current;
  const daily = state.weatherData.daily;

  // A. Humidity
  const humidity = current.relative_humidity_2m;
  dom.humidityValue.textContent = humidity;
  dom.humidityBar.style.width = `${Math.min(100, Math.max(0, humidity))}%`;
  dom.humidityStatus.textContent = getHumidityDescription(humidity);

  // B. Wind Speed & Direction
  const wind = convertWind(current.wind_speed_10m);
  dom.windSpeed.textContent = wind.value;
  dom.windUnit.textContent = wind.unit;

  const windDir = current.wind_direction_10m || 0;
  const cardinal = getWindDirectionText(windDir);
  dom.windDirText.textContent = `${cardinal} (${windDir}°)`;
  dom.compassNeedle.style.transform = `rotate(${windDir}deg)`;

  // C. UV Index
  let uvVal = 0;
  if (daily && daily.uv_index_max && daily.uv_index_max[0] !== undefined) {
    uvVal = daily.uv_index_max[0];
  }
  dom.uvValue.textContent = uvVal.toFixed(1);
  const uvInfo = getUVDetails(uvVal);
  dom.uvBadge.textContent = uvInfo.level;
  dom.uvBadge.className = `uv-badge ${uvInfo.className}`;
  dom.uvIndicator.style.left = `${Math.min(100, (uvVal / 12) * 100)}%`;
  dom.uvStatus.textContent = uvInfo.advice;

  // D. Atmospheric Pressure
  const pressure = Math.round(current.surface_pressure);
  dom.pressureValue.textContent = pressure;
  const pressureInfo = getPressureDetails(pressure);
  dom.pressureStatus.textContent = pressureInfo.label;
  dom.pressureDesc.textContent = pressureInfo.desc;

  // E. Visibility
  let visibilityMeters = 10000;
  if (state.weatherData.hourly && state.weatherData.hourly.visibility) {
    visibilityMeters = state.weatherData.hourly.visibility[0] || 10000;
  }
  const vis = convertVisibility(visibilityMeters);
  dom.visibilityValue.textContent = vis.value;
  dom.visibilityUnit.textContent = vis.unit;
  const visPercent = Math.min(100, Math.round((visibilityMeters / 10000) * 100));
  dom.visibilityBar.style.width = `${visPercent}%`;
  dom.visibilityStatus.textContent = visibilityMeters >= 9000 ? "Clear horizon" : "Reduced visibility";

  // F. Sunrise & Sunset
  if (daily && daily.sunrise && daily.sunset && daily.sunrise[0] && daily.sunset[0]) {
    const sunriseStr = daily.sunrise[0];
    const sunsetStr = daily.sunset[0];

    dom.sunriseTime.textContent = formatIsoTimeTo12h(sunriseStr);
    dom.sunsetTime.textContent = formatIsoTimeTo12h(sunsetStr);

    // Daylight difference calculated from time strings
    const duration = calculateDaylightDuration(sunriseStr, sunsetStr);
    if (duration) {
      dom.daylightLength.textContent = `Daylight: ~${duration.hours}h ${duration.minutes}m`;
    }
  }
}

/**
 * 4. Render 7-Day Forecast with dynamic range bars
 */
function renderDailyForecast() {
  const daily = state.weatherData.daily;
  if (!daily || !daily.time) return;

  dom.dailyForecastList.innerHTML = "";

  // Determine global min and max for range bar scaling
  let globalMin = Infinity;
  let globalMax = -Infinity;
  const daysCount = Math.min(7, daily.time.length);

  for (let i = 0; i < daysCount; i++) {
    if (daily.temperature_2m_min[i] < globalMin) globalMin = daily.temperature_2m_min[i];
    if (daily.temperature_2m_max[i] > globalMax) globalMax = daily.temperature_2m_max[i];
  }

  const rangeSpan = Math.max(1, globalMax - globalMin);

  for (let i = 0; i < daysCount; i++) {
    const dateStr = daily.time[i];
    const date = new Date(dateStr + "T12:00:00");
    const code = daily.weather_code[i];
    const minTemp = daily.temperature_2m_min[i];
    const maxTemp = daily.temperature_2m_max[i];

    const wmo = WMO_CODE_MAP[code] || WMO_CODE_MAP[0];
    const icon = wmo.dayIcon;

    let dayName;
    if (i === 0) dayName = "Today";
    else if (i === 1) dayName = "Tomorrow";
    else dayName = date.toLocaleDateString("en-US", { weekday: "short" });

    const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });

    // Calculate range bar percentage
    const leftPercent = ((minTemp - globalMin) / rangeSpan) * 100;
    const widthPercent = Math.max(12, ((maxTemp - minTemp) / rangeSpan) * 100);

    const row = document.createElement("div");
    row.className = "daily-row";
    row.setAttribute("role", "listitem");

    row.innerHTML = `
      <div class="daily-day-wrap">
        <span class="daily-day">${dayName}</span>
        <span class="daily-date">${formattedDate}</span>
      </div>
      <img src="assets/icons/${icon}" alt="${wmo.label}" class="daily-icon" title="${wmo.label}" />
      <div class="daily-range-container">
        <div class="daily-temp-bar-bg">
          <div class="daily-temp-bar-fill" style="left: ${leftPercent}%; width: ${widthPercent}%;"></div>
        </div>
      </div>
      <div class="daily-temps">
        <span class="daily-min">${convertTemp(minTemp)}°</span>
        <span class="daily-max">${convertTemp(maxTemp)}°</span>
      </div>
    `;

    dom.dailyForecastList.appendChild(row);
  }
}

// ============================================================================
// 10. Background Theme & Natural Language Generation
// ============================================================================

/**
 * Dynamically updates body data-weather attribute to smoothly morph ambient gradient
 */
function updateBackgroundTheme() {
  const current = state.weatherData.current;
  const code = current.weather_code;
  const isDay = current.is_day === 1;

  let theme = "clear-day";

  if (code === 0 || code === 1 || code === 2) {
    theme = isDay ? "clear-day" : "clear-night";
  } else if (code === 3) {
    theme = "overcast";
  } else if (code === 45 || code === 48) {
    theme = "fog";
  } else if ([51, 53, 55, 56, 57].includes(code)) {
    theme = "drizzle";
  } else if ([61, 63, 66, 80, 81].includes(code)) {
    theme = "rain";
  } else if ([65, 67, 82].includes(code)) {
    theme = "heavy-rain";
  } else if ([71, 73, 75, 77, 85, 86].includes(code)) {
    theme = "snow";
  } else if ([95, 96, 99].includes(code)) {
    theme = "thunderstorm";
  }

  dom.body.dataset.weather = theme;
}

/**
 * Generate human-readable weather summary
 * @param {Object} current 
 * @param {Object} daily 
 * @param {Object} wmoInfo 
 * @returns {string}
 */
function generateNaturalSummary(current, daily, wmoInfo) {
  const tempUnit = state.unit === "fahrenheit" ? "°F" : "°C";
  const max = daily && daily.temperature_2m_max ? convertTemp(daily.temperature_2m_max[0]) : null;
  const rainPop = daily && daily.precipitation_probability_max ? daily.precipitation_probability_max[0] : 0;

  let summary = wmoInfo.summary;

  if (max !== null) {
    summary += ` Expect a daytime peak near ${max}${tempUnit}.`;
  }

  if (rainPop > 40) {
    summary += ` Chance of precipitation is elevated at ${rainPop}%.`;
  } else if (rainPop < 15) {
    summary += ` Rain is very unlikely throughout the day.`;
  }

  return summary;
}

/**
 * Format local time of target city
 * @param {string} isoString 
 * @param {string} timezone 
 * @returns {string}
 */
function formatCityLocalTime(isoString, timezone) {
  try {
    const date = new Date();
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: timezone && timezone !== "auto" ? timezone : undefined
    };
    return new Intl.DateTimeFormat("en-US", options).format(date) + " Local Time";
  } catch (e) {
    return new Date().toLocaleString() + " Local Time";
  }
}

/**
 * Convert ISO time string "YYYY-MM-DDTHH:MM" to "H:MM AM/PM"
 * @param {string} isoStr 
 * @returns {string}
 */
function formatIsoTimeTo12h(isoStr) {
  if (!isoStr || !isoStr.includes("T")) return "--:--";
  const timePart = isoStr.split("T")[1];
  const [h, m] = timePart.split(":");
  const hour = parseInt(h, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const hour12 = hour % 12 || 12;
  return `${hour12}:${m} ${ampm}`;
}

/**
 * Calculate daylight duration from two ISO strings
 * @param {string} startIso 
 * @param {string} endIso 
 * @returns {{ hours: number, minutes: number } | null}
 */
function calculateDaylightDuration(startIso, endIso) {
  if (!startIso || !endIso || !startIso.includes("T") || !endIso.includes("T")) return null;
  const [sH, sM] = startIso.split("T")[1].split(":").map(Number);
  const [eH, eM] = endIso.split("T")[1].split(":").map(Number);

  const startMins = sH * 60 + sM;
  const endMins = eH * 60 + eM;
  const diffMins = endMins - startMins;

  if (diffMins <= 0) return null;
  return {
    hours: Math.floor(diffMins / 60),
    minutes: diffMins % 60
  };
}

/**
 * Humidity description helper
 */
function getHumidityDescription(h) {
  if (h < 30) return "Dry air conditions · Moisturizer recommended";
  if (h <= 60) return "Comfortable & pleasant moisture levels";
  if (h <= 80) return "Moderately humid · Dew point elevated";
  return "High humidity · Heavy atmospheric dampness";
}

/**
 * UV index details helper
 */
function getUVDetails(uv) {
  if (uv < 3) return { level: "Low", className: "low", advice: "Minimal sun protection required." };
  if (uv < 6) return { level: "Moderate", className: "moderate", advice: "Wear sunscreen & shades midday." };
  if (uv < 8) return { level: "High", className: "high", advice: "Protection essential: seek shade 11am-4pm." };
  if (uv < 11) return { level: "Very High", className: "very-high", advice: "Extra protection needed: cover up outdoors." };
  return { level: "Extreme", className: "extreme", advice: "Avoid outdoor sun exposure during peak hours." };
}

/**
 * Pressure details helper
 */
function getPressureDetails(p) {
  if (p > 1022) return { label: "High", desc: "Fair weather and stable airmass" };
  if (p < 1008) return { label: "Low", desc: "Unsettled weather or storm possible" };
  return { label: "Normal", desc: "Standard atmospheric baseline" };
}

/**
 * Update footer timestamp
 */
function updateLastUpdatedTimestamp() {
  const now = new Date();
  dom.lastUpdatedTime.textContent = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

// ============================================================================
// 11. Event Handlers & User Interactions
// ============================================================================

/**
 * Initialize all interactive listeners
 */
function initializeEventListeners() {
  // 1. Search Form Submission
  dom.searchForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const query = dom.searchInput.value.trim();
    if (!query) return;

    hideSuggestions();
    setLoading(true, `Searching location for "${query}"...`);

    try {
      const response = await fetch(`${API.GEOCODING}?name=${encodeURIComponent(query)}&count=1&language=en&format=json`);
      const data = await response.json();

      if (data && data.results && data.results.length > 0) {
        selectCity(data.results[0]);
      } else {
        showToast(`Could not find "${query}". Please check spelling.`, "error");
      }
    } catch (err) {
      showToast(`Search error: ${err.message}`, "error");
    } finally {
      setLoading(false);
    }
  });

  // 2. Search Input Typing with Debounce
  dom.searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    dom.clearSearchBtn.hidden = val.length === 0;

    clearTimeout(state.searchDebounceTimer);
    state.searchDebounceTimer = setTimeout(() => {
      fetchCitySuggestions(val);
    }, 320);
  });

  // 3. Clear Search Button
  dom.clearSearchBtn.addEventListener("click", () => {
    dom.searchInput.value = "";
    dom.clearSearchBtn.hidden = true;
    hideSuggestions();
    dom.searchInput.focus();
  });

  // 4. Keyboard Navigation in Suggestions Dropdown
  dom.searchInput.addEventListener("keydown", (e) => {
    const items = dom.searchSuggestions.querySelectorAll(".suggestion-item");
    if (!items || items.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      state.selectedSuggestionIndex = (state.selectedSuggestionIndex + 1) % items.length;
      updateSuggestionHighlight(items);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      state.selectedSuggestionIndex = (state.selectedSuggestionIndex - 1 + items.length) % items.length;
      updateSuggestionHighlight(items);
    } else if (e.key === "Enter" && state.selectedSuggestionIndex >= 0) {
      e.preventDefault();
      items[state.selectedSuggestionIndex].click();
    } else if (e.key === "Escape") {
      hideSuggestions();
    }
  });

  // 5. Close suggestions on click outside
  document.addEventListener("click", (e) => {
    if (!dom.searchForm.contains(e.target) && !dom.searchSuggestions.contains(e.target)) {
      hideSuggestions();
    }
  });

  // 6. Unit Toggle: Celsius
  dom.celsiusBtn.addEventListener("click", () => {
    if (state.unit === "celsius") return;
    setUnit("celsius");
  });

  // 7. Unit Toggle: Fahrenheit
  dom.fahrenheitBtn.addEventListener("click", () => {
    if (state.unit === "fahrenheit") return;
    setUnit("fahrenheit");
  });

  // 8. Geolocation Button
  dom.locateBtn.addEventListener("click", handleGeolocation);

  // 9. Hourly Scroll Controls
  dom.hourlyScrollLeft.addEventListener("click", () => {
    dom.hourlyTrackContainer.scrollBy({ left: -260, behavior: "smooth" });
  });

  dom.hourlyScrollRight.addEventListener("click", () => {
    dom.hourlyTrackContainer.scrollBy({ left: 260, behavior: "smooth" });
  });

  // 10. Online/Offline Network Status
  window.addEventListener("offline", () => {
    showToast("Internet disconnected. Displaying cached weather data.", "warning");
  });

  window.addEventListener("online", () => {
    showToast("Internet restored. Synchronizing live data...", "success");
    if (state.currentCity) loadWeatherForCity(state.currentCity);
  });
}

/**
 * Update keyboard highlight state in suggestions
 */
function updateSuggestionHighlight(items) {
  items.forEach((item, idx) => {
    if (idx === state.selectedSuggestionIndex) {
      item.classList.add("active");
      item.scrollIntoView({ block: "nearest" });
    } else {
      item.classList.remove("active");
    }
  });
}

/**
 * Change temperature unit and rerender dashboard immediately
 * @param {'celsius' | 'fahrenheit'} unit 
 */
function setUnit(unit) {
  state.unit = unit;
  localStorage.setItem("weathernow_unit", unit);

  if (unit === "celsius") {
    dom.celsiusBtn.classList.add("active");
    dom.celsiusBtn.setAttribute("aria-pressed", "true");
    dom.fahrenheitBtn.classList.remove("active");
    dom.fahrenheitBtn.setAttribute("aria-pressed", "false");
  } else {
    dom.fahrenheitBtn.classList.add("active");
    dom.fahrenheitBtn.setAttribute("aria-pressed", "true");
    dom.celsiusBtn.classList.remove("active");
    dom.celsiusBtn.setAttribute("aria-pressed", "false");
  }

  // Smooth instant rerender
  if (state.weatherData) {
    renderCompleteDashboard();
  }
}

/**
 * Handle browser geolocation request
 */
function handleGeolocation() {
  if (!navigator.geolocation) {
    showToast("Geolocation is not supported by your browser.", "warning");
    return;
  }

  setLoading(true, "Detecting your current coordinates...");

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;

      try {
        // Reverse geocoding attempt
        let cityName = "Your Location";
        let country = "";
        let countryCode = "";
        let admin1 = "";

        try {
          const revRes = await fetch(`${API.REVERSE_GEO}?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
          if (revRes.ok) {
            const revData = await revRes.json();
            cityName = revData.city || revData.locality || revData.principalSubdivision || "Your Location";
            country = revData.countryName || "";
            countryCode = revData.countryCode || "";
            admin1 = revData.principalSubdivision || "";
          }
        } catch (e) {
          console.warn("Reverse geocode failed, using coordinates:", e);
        }

        const detectedCity = {
          name: cityName,
          country: country,
          country_code: countryCode,
          admin1: admin1,
          latitude: lat,
          longitude: lon,
          timezone: "auto"
        };

        selectCity(detectedCity);
      } catch (err) {
        showToast("Error locating weather station.", "error");
      } finally {
        setLoading(false);
      }
    },
    (err) => {
      setLoading(false);
      let msg = "Location request failed.";
      if (err.code === 1) msg = "Location permission denied. Please search city manually.";
      else if (err.code === 2) msg = "Position unavailable. Please search city manually.";
      else if (err.code === 3) msg = "Location request timed out.";
      showToast(msg, "warning");
    },
    { timeout: 10000, enableHighAccuracy: true }
  );
}

// ============================================================================
// 12. Application Initialization
// ============================================================================

/**
 * Bootstrap the WeatherNow application
 */
function init() {
  // Sync unit toggle button state
  if (state.unit === "fahrenheit") {
    dom.fahrenheitBtn.classList.add("active");
    dom.celsiusBtn.classList.remove("active");
  } else {
    dom.celsiusBtn.classList.add("active");
    dom.fahrenheitBtn.classList.remove("active");
  }

  // Setup event listeners
  initializeEventListeners();

  // Render recent searches
  renderRecentChips();

  // Determine initial city to load: Last searched or default
  const savedLastCity = localStorage.getItem("weathernow_last_city");
  let cityToLoad = DEFAULT_CITY;

  if (savedLastCity) {
    try {
      cityToLoad = JSON.parse(savedLastCity);
    } catch (e) {
      cityToLoad = DEFAULT_CITY;
    }
  }

  loadWeatherForCity(cityToLoad);
}

// Launch on DOM ready
document.addEventListener("DOMContentLoaded", init);
