import { useMemo, useState } from "react";
import type { SearchType } from "../types";
import axios from "axios";
import { z } from 'zod'
// import * as v from 'valibot'

// //TYPE GUARD O ASSERTION 
// function isWeatherResponse(weather: unknown): weather is Weather{
//     return(
//         Boolean(weather) &&
//         typeof weather == 'object' && 
//         typeof (weather as Weather).name === 'string'&&
//         typeof(weather as Weather).main.temp === 'number'&&
//         typeof(weather as Weather).main.temp_max === 'number'&&
//         typeof(weather as Weather).main.temp_min === 'number'
//     )
// }

// //VALIBOT
// const WeatherSchema = v.object({
//     name: v.string(),
//     main: v.object({
//         temp: v.number(),
//         temp_max:v.number(),
//         temp_min:v.number(),
//     })
// })
// type Weather = v.InferOutput<typeof WeatherSchema>



export type Weather = z.infer<typeof Weather>


//  ZOD
const Weather = z.object({
  name: z.string(),
  main: z.object({
    temp: z.number(),
    temp_max: z.number(),
    temp_min: z.number()
  })
})


const initialState = {
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0
  }
}



/**
* useWeather - Custom React hook for fetching weather data.
* 
* This hook allows components to interact with weather-related logic,
* including initiating API calls, managing loading and error states,
* and storing the fetched weather data.
*
* @returns  Hook return values and functions:
* - weather: The weather data returned from the API.
* - hasWeatherData: Boolean indicating whether weather data exists.
* - loading: Boolean indicating whether a request is in progress.
* - error: String containing an error message, if any.
* - fetchWeather: Function to trigger the weather fetch based on user input.
* 
* @example
* const { weather, fetchWeather, loading, error } = useWeather();
* 
* useEffect(() => {
*   fetchWeather({ city: 'Madrid', country: 'ES' });
* }, []);
*/
export default function useWeather() {

  const [weather, setWeather] = useState<Weather>(initialState)
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false)

  const hasWeatherData = useMemo(() => weather.name, [weather]);

  const fetchWeather = async (search: SearchType) => {

    const appId = import.meta.env.VITE_API_KEY
    setLoading(true)
    setWeather(initialState)
    setNotFound(false)

    try {
      //Get the Lat & Lon from external API
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search.city},${search.country}&appid=${appId}`;
      const { data } = await axios(geoUrl);

      //Check if data exist, otherwise setNotFound message
      if (!data[0]) {
        setNotFound(true)
      }

      //Assign values
      const lat = (data[0].lat);
      const lon = (data[0].lon);

      //Castear el Type
      // const {data: weatherResult} = await axios<Weather>(weatherUrl)
      // console.log(weatherResult.main.temp_max)

      //TYPE GUARDS
      // const {data: weatherResult} = await axios(weatherUrl)
      // const result = isWeatherResponse(weatherResult)
      // console.log(result)
      // if(result){
      //     console.log(weatherResult.main.temp_max)
      // }

      // //VALIBOT
      // const {data: weatherResult} = await axios(weatherUrl)
      // const result = v.parse(WeatherSchema, weatherResult)
      // if(result){
      //     console.log(result)
      // }else{
      //     console.log('respuesta mala')
      // }


      //Get the weather from external API using ZOD
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appId}`;

      // ZOD
      const { data: weatherResult } = await axios(weatherUrl)
      const result = Weather.safeParse(weatherResult)
      if (result.success) {
        setWeather(result.data)
      }

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)

    }
  }

  return {
    weather,
    loading,
    notFound,
    hasWeatherData,
    fetchWeather
  }
}