import { useEffect, useState } from "react";
import axios from "axios";

export function Homepage() {
  const apiKey = "0598ea6e3fd2652ff1997748cd1b1f33";
  const [country, setCountry] = useState("Bangkok");
  const [dataWeather, setDataWeather] = useState({});

  const handleChangeCountry = (e) => {
    setCountry(e.target.value);
  };

  const tempWeather = (temp)=>{
    return Math.round(temp)
  }

  async function getWeather() {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
      );
      console.log(response.data);
      setDataWeather(response.data);
      // .name
      // response.data.main.temp , temp_min: 28.84, temp_max , humidity
      // response.data.getWeather[0].description
      // response.sys.country short name
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getWeather();
    setCountry("");
  }, []);

  return (
    <div className="flex justify-start items-center flex-col  box-border m-0 w-screen h-screen bg-gradient-to-bl from-orange-300 to-rose-300">
      <div className="input flex justify-center pt-10 mb-1">
        <input
          type="text"
          placeholder="searching.."
          className="my-10 block w-[300px] sm:w-[500px] p-4  rounded-lg bg-gray-50 sm:text-md focus:ring-black  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={handleChangeCountry}
          value={dataWeather.name}
        />
      </div>
      <div className=" flex flex-col w-auto text-center ">
        <div className="location flex justify-center flex-col sm:w-[500px] w-[300px] pb-6 pt-2 ">
          <h1 className="city text-5xl pb-3 font-semibold text-gray-900 text-center  dark:text-white ">
            {dataWeather.name}
          </h1>
          <p className="state text-center">
            {dataWeather.sys && (
              <p className="state text-center">{dataWeather.sys.country}</p>
            )}
          </p>
        </div>
        <div className="weather rounded-t-2xl bg-orange-500 py-5">
          <h1 className="average-temp text-4xl font-bold text-white ">
            {dataWeather.main && <p>{tempWeather(dataWeather.main.temp)}°C</p>}
          </h1>
          <small className="font-normal text-white">
          {dataWeather.main &&<p>สูงสุด : {tempWeather(dataWeather.main.temp_min)}°C , ต่ำสุด : {tempWeather(dataWeather.main.temp_max)}°C</p> }
          </small>
        </div>
        <div className="info h-22 rounded-b-2xl bg-white/30 py-1">
          <div className="status">HOT</div>
          <div className="humidity">ความชื้น = 100</div>
          <div className="wind">ความเร็วลม = 10</div>
        </div>
      </div>
    </div>
  );
}
