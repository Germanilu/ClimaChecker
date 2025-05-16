
import { useState, type ChangeEvent, type FormEvent } from 'react'
import Alert from '../Alert/Alert'
import { countries } from '../../data/countries'
import type { SearchType } from '../../types'
import styles from './Form.module.css'

//TS
type FormProps = {
  fetchWeather: (search: SearchType) => Promise<void>
}

/**
 * Weather Search Form Component
 * 
 * This React component renders a form that allows users to input a city and select a country
 * to search for weather information. It handles form state, validation, and submission.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {(search: SearchType) => Promise<void>} props.fetchWeather - A function that fetches weather data based on the provided search criteria.
 * 
 * @returns <Form/> A form UI with inputs for city and country, and error handling for validation.
 * 
 * @example
 * <Form fetchWeather={fetchWeatherFunction} />
 */
export default function Form({ fetchWeather }: FormProps) {

  //Hooks
  const [alert, setAlert] = useState('')
  const [search, setSearch] = useState<SearchType>({
    city: '',
    country: ''
  })

  //Funcion to update the state
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    setSearch({
      ...search,
      [e.target.name]: e.target.value
    })
  }

  //Submit the form calling fetchWeather() search State is empty throw error Alert
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (Object.values(search).includes('')) {
      setAlert('Todos los campos son Obligatorios')
      return
    }
    fetchWeather(search)
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
    >
      {alert && <Alert>{alert}</Alert>}
      <div className={styles.field}>
        <label htmlFor="city">Ciudad</label>
        <input type="text"
          id='city'
          name='city'
          placeholder='Ciudad'
          value={search.city}
          onChange={handleChange}
        />
      </div>

      <div className={styles.field}>
        <label htmlFor="country">País</label>
        <select
          id="country"
          value={search.country}
          name='country'
          onChange={handleChange}
        >
          <option value="country">-- Seleccione un País</option>
          {countries.map(country => (
            <option
              value={country.code}
              key={country.code}
            >
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <input className={styles.submit} type="submit" value='Consultar Clima' />
    </form>
  )
}
