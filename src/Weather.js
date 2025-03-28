import React, { useState } from 'react';
import axios from 'axios';

function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = 'a5abe1448c35edd511dcd1e77f022def'; // Korvaa omalla API-avaimellasi
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=fi`;

    try {
      const response = await axios.get(url);
      setWeather(response.data);
    } catch (error) {
      console.error('Virhe haettaessa säätietoja:', error);
      setWeather(null);
    }
  };

  return (
    <div>
      <h2>Sääsovellus</h2>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Syötä kaupungin nimi"
      />
      <button onClick={fetchWeather}>Hae sää</button>

      {weather && (
        <div>
          <h3>{weather.name}</h3>
          <p>Lämpötila: {weather.main.temp} °C</p>
          <p>Kosteus: {weather.main.humidity} %</p>
          <p>Kuvaus: {weather.weather[0].description}</p>
        </div>
      )}
    </div>
  );
}

export default Weather;
