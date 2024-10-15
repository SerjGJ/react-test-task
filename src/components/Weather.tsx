import React, { useEffect, useState } from 'react'

interface Props {
  lat: number
  long: number
  variables: string[]
}

const Weather: React.FC<Props> = (props) => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${
            props.lat
          }&longitude=${props.long}&daily=${props.variables.join(
            ','
          )}&timezone=Europe/Moscow&past_days=7`
        )
        const data = await response.json()
        setWeather(data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch weather data')
        setLoading(false)
      }
    }

    fetchWeatherData()
  }, [props.lat, props.long, props.variables])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <table style={{ width: '100%' }}>
      <thead>
        <tr>
          <td>Date</td>
          {props.variables.map((variable, index) => (
            <td key={index}>{variable}</td>
          ))}
        </tr>
      </thead>
      <tbody>
        {weather?.daily?.time?.map((time: string, index: number) => (
          <tr key={index}>
            <td>{time}</td>
            {props.variables.map((variable, varIndex) => (
              <td key={varIndex}>
                {weather.daily[variable]?.[index] || 'N/A'}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Weather
