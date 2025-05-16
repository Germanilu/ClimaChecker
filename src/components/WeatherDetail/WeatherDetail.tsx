import type { Weather } from "../../hooks/useWeather";
import { formatTemperature } from "../../utils";
import styles from './WeatherDetail.module.css'

type WeatherDetailProps = {
    weather: Weather
}


/**
 * WeatherDetail Component
 * 
 * This component displays detailed weather information for a specific city,
 * including the current temperature, as well as the minimum and maximum temperatures.
 * 
 * @component
 * @param {Object} props - Component properties.
 * @param {Weather} props.weather - The weather data object retrieved from the API.
 * 
 * @returns A styled container showing the formatted temperature data in Celsius.
 * 
 * @example
 * <WeatherDetail weather={weatherData} />
 */

export default function WeatherDetail({weather}: WeatherDetailProps) {
  return (
    <div className={styles.container}>
        <h2>Clima de: {weather.name}</h2>
        <p className={styles.current}>{formatTemperature(weather.main.temp)} &deg;C</p>
        <div className={styles.temperatures}>
            <p>Min: <span>{formatTemperature(weather.main.temp_min)} &deg;C</span></p>
            <p>Min: <span>{formatTemperature(weather.main.temp_max)} &deg;C</span></p>
        </div>
    </div>
  )
}
