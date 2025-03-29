import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [message, setMessage] = useState('Hello, I am the Weather Frog! Where do you live?');
  const weatherRef = useRef(null);

  const apiKey = 'a5abe1448c35edd511dcd1e77f022def'; // korvaa omalla avaimellasi

  const fetchWeather = async () => {
    if (!city) return;

    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await axios.get(url);
      setWeather(response.data);
      setMessage(
        `Oh, you are from ${response.data.name}? 
         Here is the weather in your city:`
      );
    } catch (error) {
      console.error('Virhe haettaessa säätietoja:', error);
      setMessage('Could not find weather information. Check the city name!');
      setWeather(null);
    }
  };

  // Scrollataan weather-info -osioon, kun weather on asetettu
  useEffect(() => {
    if (weather && weatherRef.current) {
      weatherRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [weather]);

  return (
    <div className="container">
      <h1 className="bubble">{message}</h1>

      {/* Sammakkokuva, haetaan public-kansiosta */}
      <img src="/frog.png" alt="Weather Frog" className="frog-image" />

      <div className="input-area">
        <input
          type="text"
          placeholder="Type out your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={fetchWeather}>Tell him</button>
      </div>

      {/* Näytetään säätiedot, jos ne on haettu */}
      {weather && (
        <div className="weather-info" ref={weatherRef}>
          <p><strong>Temperature:</strong> {weather.main.temp} °C</p>
          <p><strong>Feels like:</strong> {weather.main.feels_like} °C</p>
          <p><strong>Weather:</strong> {weather.weather[0].description}</p>
          <p><strong>Humidity:</strong> {weather.main.humidity} %</p>
        </div>
      )}
    </div>
  );
}

export default App;
