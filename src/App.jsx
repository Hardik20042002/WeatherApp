import { useState } from 'react';

// Storing key and base url of openWeather api
const api = {
  key: process.env.REACT_APP_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/"
};

function App() {
  // Declaration of state variables and functions using the useState hook from the React library.
  const [search, setSearch] = useState("");
  const [weather, setWeather] = useState({"cod":200});
  // This function used to fetch weather data for the searched city using openWeather api
  const searchPressed = () => {
    fetch(`${api.base}weather?q=${search}&units=metric&appid=${api.key}`)
      .then((res) => res.json())
      .then((result) => {
        setWeather(result);
      });
  };
  // This is a map that is used to store images for corresponding weather type
  const WeatherTypes = new Map([
    ["Clear","https://github.com/Hardik20042002/WeatherApp/assets/102477681/c9c99ebf-a213-4582-a70d-a40853973678"],
    ["Clouds","https://github.com/Hardik20042002/WeatherApp/assets/102477681/03b39efa-c70f-43a9-973e-a4819371414d"],
    ["Rain","https://github.com/Hardik20042002/WeatherApp/assets/102477681/d6e25abe-c5eb-4f52-b57e-b9451bb7be59"],
    ["Drizzle","https://github.com/Hardik20042002/WeatherApp/assets/102477681/cb72f540-6167-4e47-9e78-2af73d05defc"],
    ["Thunderstorm","https://github.com/Hardik20042002/WeatherApp/assets/102477681/a7eb011f-11b8-44cb-b7ad-de7a5b50b8f0"],
    ["Snow","https://github.com/Hardik20042002/WeatherApp/assets/102477681/3a72dbba-d6b4-4ac0-9281-3f08811fc9a3"],
    ["Mist","https://github.com/Hardik20042002/WeatherApp/assets/102477681/4df5e751-f2e9-4325-b101-ec57b83022fc"],
    ["Smoke","https://github.com/Hardik20042002/WeatherApp/assets/102477681/f909d413-c3c4-4e0a-8110-79ecb2231be8"],
    ["Haze","https://github.com/Hardik20042002/WeatherApp/assets/102477681/986d5fd2-339c-4374-9334-9ce6eb976392"],
    ["Dust","https://github.com/Hardik20042002/WeatherApp/assets/102477681/1af80b15-b3c8-4462-9b71-d43d7894d0b0"],
    ["Fog","https://github.com/Hardik20042002/WeatherApp/assets/102477681/f31969ff-7f70-4e74-859f-0090a202ebda"],
    ["Sand","https://github.com/Hardik20042002/WeatherApp/assets/102477681/ead90c59-4dc3-4f6e-9199-4d1d8b803a2d"],
    ["Ash","https://github.com/Hardik20042002/WeatherApp/assets/102477681/a68817d8-065b-4cf8-8c76-74b959fd7d7b"],
    ["Squall","https://github.com/Hardik20042002/WeatherApp/assets/102477681/d98f412f-cdc0-4a17-91bc-0ebce92b0334"],
    ["Tornado","https://github.com/Hardik20042002/WeatherApp/assets/102477681/23182f95-42c9-45e5-bd6c-5731caf3c917"],
    ["General","https://github.com/Hardik20042002/WeatherApp/assets/102477681/4a870929-5401-4ba6-81bd-9fe5253ed2a7"]
  ])
  // This function is used to get the image for a given weather type
  function getWeatherImage(typ){
    const value=WeatherTypes.get(typ)
    if(value){
      return value
    }
    else{
      return WeatherTypes.get("General")
    }
  }
  return (
    <div className="flex justify-center items-center grid h-screen w-screen bg-gray-800">
      <div className="bg-white w-90 p-3 shadow-md rounded-md">
        <h1 className="text-2xl font-bold mt-2 mb-4 text-center">Weather App</h1>
        {/* Input field for city/pincode */}
        <div className="mb-4 flex justify-center mt-1">
          <input type="text"
            placeholder="Enter city/pincode"
            onChange={(e) => setSearch(e.target.value)}
            className="text-xl border-b p-1 border border-gray-800 font-semibold uppercase flex-1 rounded-md"
          />
          <button onClick={searchPressed} className="text-white ml-5 w-20 h-9 bg-blue-500 rounded-md">SEARCH</button>
        </div>
        {/* If the input is a valid city then show its weather details */}
        {typeof weather.main !== 'undefined' ? (
          <div className="text-center">
            {/* Name of city */}
            <p className="mt-5 mb-1 text-2xl">{weather.name}, {weather.sys.country}</p>
            {/* Weather type image */}
            <div className="flex justify-center mt-1">
              <img
                src={getWeatherImage(weather.weather[0].main)}
                alt="..."
                className="w-20"
              />
            </div>
            {/* Weather type */}
            <p className="mt-1 mb-5 text-2xl">{weather.weather[0].main}</p>
            {/* Temperature details */}
            <div className="flex justify-center mt-1">
              <img
                src="https://github.com/Hardik20042002/WeatherApp/assets/102477681/e35b9f09-eb63-493c-bf0d-7181053d8a76"
                alt="..."
                className="h-9 mt-2"
              />
              <h2 className="text-4xl font-bold">{weather.main.temp}&#176;C</h2>
            </div>
            {/* Humidity details */}
            <div className="flex justify-center mt-1">
              <img
                src="https://github.com/Hardik20042002/WeatherApp/assets/102477681/6ad75a2f-32c2-456e-9eba-d8651bdbeadc"
                alt="..."
                className="h-9 mt-2"
              />
              <h2 className="text-4xl font-bold">{weather.main.humidity} %</h2>
            </div>
            {/* Windspeed details */}
            <div className="flex justify-center mt-1">
              <img
                src="https://github.com/Hardik20042002/WeatherApp/assets/102477681/3665ef3c-0254-4bfe-a76f-5452637f5835"
                alt="..."
                className="h-9 mt-2"
              />
              <h2 className="text-4xl font-bold">{weather.wind.speed} m/s</h2>
            </div>
          </div>
        ) : (
          ""
        )}
        {/* If error in fetching weather details then show that data not found */}
        {weather.cod !== 200 ? (
          <p className="text-center text-2xl mt-5 mb-5">Data Not Found</p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default App;