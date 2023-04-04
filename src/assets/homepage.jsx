import { useEffect, useState } from "react";
import axios from "axios";
import { SlArrowLeft, SlArrowRight } from "react-icons/sl";
import { TbToggleLeft, TbToggleRight } from "react-icons/tb";
import { CitySearch } from "./CitySearch.jsx";
import WeatherContext from "./WeatherContext.js";

const apiKey = "0598ea6e3fd2652ff1997748cd1b1f33";
export { apiKey };

export function Homepage() {
  const [country, setCountry] = useState("bangkok");
  const [shortName, setShortName] = useState("");
  const [temp, setTemp] = useState({
    temp: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
  });
  const [wind, setWind] = useState(0);
  const [status, setStatus] = useState("");
  const [current, setCurrent] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  const dataSlideLength = 3;

  const prevSlide = () => {
    current === 0 ? setCurrent(dataSlideLength - 1) : setCurrent(current - 1);
  };

  const nextSlide = () => {
    current === dataSlideLength - 1 ? setCurrent(0) : setCurrent(current + 1);
  };
  console.log(current);
  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const getInteger = (temp) => {
    return Math.round(temp);
  };

  async function getWeather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
      );
      console.log(response);
      setShortName(response.data.sys.country);
      setTemp(response.data.main);
      setStatus(response.data.weather[0].description);
      setWind(response.data.wind.speed);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeather();
  }, [country]);

  useEffect(() => {
    setCurrent(0);
  }, [status]);

  return (
    <div
      className={`flex justify-start items-center flex-col box-border m-0 w-screen h-screen ${
        darkMode
          ? "dark:bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-gray-900 to-gray-700 bg-gradient-to-b dark"
          : "bg-gradient-to-bl from-orange-300 to-rose-300"
      }`}
    >
      <WeatherContext.Provider
        value={{
          setCountry,
          setShortName,
          setTemp,
          setStatus,
          setWind,
        }}
      >
        <CitySearch />
      </WeatherContext.Provider>
      <div className=" flex flex-col w-auto text-center ">
        <div
          id="location"
          className="relative flex justify-center flex-col sm:w-[500px] w-[300px] pb-6 pt-2 "
        >
          <button className="absolute top-[-90px] right-[-50px] z-10" onClick={toggleDarkMode}>
            {darkMode ? <TbToggleLeft size={35} color="white"/> : <TbToggleRight size={35} />}
          </button>

          <h1 className="city text-5xl pb-3 font-semibold text-gray-900 text-center  dark:text-white ">
            {country}
          </h1>
          <p className="state text-center dark:text-gray-300">{shortName}</p>
        </div>

        <div
          id="temperature"
          className="weather rounded-t-2xl bg-orange-500 dark:bg-slate-900 py-5"
        >
          <h1 className="average-temp text-4xl  text-white ">
            {getInteger(temp.temp)}°C
          </h1>
          <small className="font-normal text-white">
            min : {getInteger(temp.temp_min)}°C max :{" "}
            {getInteger(temp.temp_max)}°C
          </small>
        </div>

        <div
          id="slider"
          className="relative flex justify-center items-center h-22 rounded-b-2xl bg-white/30 dark:bg-white/10 py-1"
        >
          <div className="leftArrowContainer cursor-pointer transform transition-all duration-100 hover:scale-8 absolute left-[10%] z-10">
            <SlArrowLeft
              className="leftArrow arrow text-grey"
              onClick={prevSlide}
            />
          </div>
          <div className="rightArrowContainer cursor-pointer transform transition-all duration-300 hover:scale-125 absolute right-[10%] z-10">
            <SlArrowRight
              className="rightArrow arrow text-grey"
              onClick={nextSlide}
            />
          </div>

          {[status, `💧 ${temp.humidity}%`, `🌪 ${wind} km/hr`].map(
            (data, index) => {
              return (
                <div
                  key={index}
                  className={index === current ? "slide active dark:text-white" : "slide"}
                >
                  {index === current && <div>{data}</div>}
                </div>
              );
            }
          )}
        </div>
      </div>
    </div>
  );
}
