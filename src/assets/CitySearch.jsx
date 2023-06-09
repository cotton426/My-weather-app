import React, { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import WeatherContext from "./WeatherContext";
import { apiKey } from "./Homepage";


export const CitySearch = () => {
  const { setCountry, setShortName, setTemp, setStatus, setWind } = useContext(
    WeatherContext
  );

  // Add the missing state variables here
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleChangeCountry = async (e) => {
    setSearchTerm(e.target.value);

    if (e.target.value.length >= 1) {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&units=metric&appid=${apiKey}`
        );
        setSearchResults([response.data]);
        
      } catch (error) {
        console.error(error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSelectCity = (cityData) => {
    setSearchTerm("");
    setSearchResults([]);
    setCountry(cityData.name);
    setShortName(cityData.sys.country);
    setTemp(cityData.main);
    setStatus(cityData.weather[0].description);
    setWind(cityData.wind.speed);
  };
  

  return (
    <div className="input flex justify-center pt-10 mb-1">
      <div className="relative w-[300px] sm:w-[500px]">
        <input
          type="text"
          placeholder="searching.."
          className="my-10 block w-full p-4 rounded-lg bg-gray-50 sm:text-md focus:ring-black dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          onChange={handleChangeCountry}
          value={searchTerm}
        />
        <div className="search-results absolute w-full top-[96px] shadow-md z-10">
          {searchResults.map((result, index) => (
            <div
              key={index}
              className="search-result-item p-2 hover:bg-gray-50 dark:hover:text-black dark:text-slate-200 cursor-pointer"
              onClick={() => handleSelectCity(result)}
            >
              {result.name}, {result.sys.country}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
