import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherComponent() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const API_KEY = "abb1d639bb4fa436d2eeb7ea78c55c95";

  const fetchWeather = () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(response => {
        setWeather(response.data);
      })
      .catch(error => {
        console.error("Error fetching weather data:", error);
        setWeather(null);
      });
  };

  // Function to determine background based on weather condition
  const getBackgroundStyle = () => {
    if (!weather) return 'linear-gradient(to right, #2193b0, #6dd5ed)'; // Default blue gradient

    const mainWeather = weather.weather[0].main.toLowerCase();
    if (mainWeather.includes("clear")) return 'linear-gradient(to right, #ffb347, #ffcc33)';
    if (mainWeather.includes("cloud")) return 'linear-gradient(to right, #bdc3c7, #2c3e50)';
    if (mainWeather.includes("rain")) return 'linear-gradient(to right, #3a6186, #89253e)';
    return 'linear-gradient(to right, #2193b0, #6dd5ed)';
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: getBackgroundStyle(),
      color: "#fff",
      fontFamily: "Arial, sans-serif",
    }}>
      <div style={{
        background: "rgba(255, 255, 255, 0.2)",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        textAlign: "center",
        width: "350px",
        backdropFilter: "blur(10px)"
      }}>
        <h1 style={{ marginBottom: "20px" }}>🌦️ Weather App</h1>
        <input
          type='text'
          placeholder='Enter City'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            width: "80%",
            fontSize: "16px",
            marginBottom: "15px",
            textAlign: "center"
          }}
        />
        <br />
        <button onClick={fetchWeather} style={{
          background: "#ff9800",
          color: "#fff",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          transition: "0.3s"
        }}>
          Get Weather
        </button>

        {weather && (
          <div style={{ marginTop: "20px" }}>
            <h2>{weather.name}, {weather.sys.country}</h2>
            <p style={{
              fontSize: "40px",
              fontWeight: "bold",
              background: "rgba(255, 255, 255, 0.3)",
              display: "inline-block",
              padding: "10px 20px",
              borderRadius: "10px",
            }}>
              🌡 {weather.main.temp}°C
            </p>
            <p style={{ fontSize: "18px", textTransform: "capitalize" }}>🌤 {weather.weather[0].description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
