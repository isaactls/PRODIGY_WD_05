import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import "./weather.css";

function Weather() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [searchInput, setSearchInput] = useState("");
  useEffect(() => {
    fetch(
      "https://api.geoapify.com/v1/ipinfo?&apiKey=a45e68cd633e4ef8a3277ea322dc3ddf"
    )
      .then((response) => response.json())
      .then((data) => setCity(data.city.name));
  }, []);
  useEffect(() => {
    if (city) {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=afec16a3b495ec02928cf94f84e382d3`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => setWeatherData(data));
    }
  }, [city]);
  const temperature = weatherData.main
    ? (weatherData.main.temp - 273.15).toFixed(2)
    : null;
  const humidity = weatherData.main ? weatherData.main.humidity : null;
  const windSpeed = weatherData.wind ? weatherData.wind.speed : null;
  const country = weatherData.sys ? weatherData.sys.country : null;
  const sunrise = weatherData.sys ? weatherData.sys.sunrise : null;
  const sunset = weatherData.sys ? weatherData.sys.sunset : null;
  const currentTime = weatherData.dt ? weatherData.dt : null;
  const iconCode = weatherData.weather ? weatherData.weather[0].icon : null;
  const weatherIcon =
    iconCode != null
      ? require(`../assets/images/openweathermap/${iconCode}.svg`)
      : null;

  const isDayTime = () => {
    return currentTime >= sunrise && currentTime <= sunset;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setCity(searchInput);
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };
  console.log(weatherIcon);
  return (
    <div className="container">
      <form className="search" onSubmit={handleSubmit}>
        <FaSearch />
        <input
          type="text"
          placeholder="Enter The City Here"
          onChange={handleChange}
        />
        <button type="submit">search</button>
      </form>
      <div className="results">
        <figure>
          <img
            src={weatherIcon}
            alt=""
            style={{ width: "150px", height: "auto", margin : "0 auto" }}
          />
        </figure>

        <div className="temperature">{temperature} °C</div>
        <div className="city">{city} </div>
        <div className="country">{country}</div>
        <div className="additional">
          <div className="humidity additional-container">
            <WiHumidity className="extra-icons" />
            <div>
              <span className="value">{humidity}</span>
              <span className="title">humidity</span>
            </div>
          </div>
          <div className="windspeed additional-container">
            <FaWind className="extra-icons" />
            <div>
              <span className="value">{windSpeed}</span>
              <span className="title">wind speed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Weather;
