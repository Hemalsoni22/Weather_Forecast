import { useEffect, useState } from "react";
import "./Ui.css";

const Ui = () => {
  const [weatherData, setWeatherData] = useState(false);
  const [city, setCity] = useState(null);
  const allIcons = {
    "01d": "clear.png",
    "02d": "cloud.png",
    "03d": "cloud.png",
    "04d": "cloud.png",
    "09d": "rain.png",
    "10d": "rain.png",
    "11d": "drizzle.png",
    "13d": "snow.png",
    "50d": "cloud.png",
    "01n": "clear.png",
    "02n": "cloud.png",
    "03n": "cloud.png",
    "04n": "cloud.png",
    "09n": "rain.png",
    "10n": "rain.png",
    "11n": "drizzle.png",
    "13n": "snow.png",
    "50n": "cloud.png",
  };
  const search = async (city) => {
    if (city.trim() === "") {
      alert("please enter city name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const icon = allIcons[data.weather[0].icon];
      console.log(data);
      setWeatherData({
        humidity: data.main.humidity,
        tempreature: Math.floor(data.main.temp),
        windSpeed: data.wind.speed,
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.log("something went wrong");
    }
  };

  useEffect(() => {
    search("ahmedabad");
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
  };

  const handleOnClick = (e) => {
    e.preventDefault();
    search(city);
    setCity("");
  };
  return (
    <>
      <div className="box">
        <div>
          <h2
            style={{ color: "white", textAlign: "center" }}
            className="header"
          >
            Weather Forecast
          </h2>
        </div>
        <div className="mainContainer">
          <form class="d-flex mySearch" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Enter Your City Name"
              value={city}
              aria-label="Search"
              onChange={(e) => handleInputChange(e)}
            />
            <button
              class="btn btn-outline-primary"
              type="submit"
              onClick={handleOnClick}
            >
              🔍
            </button>
          </form>

          <div>
            <div classNameName="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <img
                  src={weatherData.icon}
                  alt=""
                  className="mainImage"
                  width={"120px"}
                />

                <p className="card-text">
                  <div>
                    <h3>{weatherData.location}</h3>
                    <h3>{weatherData.tempreature}°C</h3>
                  </div>
                </p>
                <div className="d-flex justify-content-between info">
                  <div>
                    <h5>{weatherData.humidity}%</h5>
                    <p>Humidity</p>
                  </div>
                  <div>
                    <h5>{weatherData.windSpeed} km/h</h5>
                    <p>Wind Speed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const first = () => {
  return (
    <>
      <h1>This is arrow method</h1>
      <h2>good</h2>
    </>
  );
};

export default Ui;
