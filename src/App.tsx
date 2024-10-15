import React, { useState } from 'react'
import './App.css'
import Weather from './components/Weather'

function App() {
  const [variables, setVariables] = useState<string[]>([
    'rain_sum',
    'snowfall_sum',
  ])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value && !variables.includes(value)) {
      setVariables((prevVariables) => [...prevVariables, value])
    }
  }

  return (
    <div className="main">
      <div>
        <label>
          Add Weather Variable:
          <input type="text" onChange={handleInputChange} />
        </label>
      </div>
      <Weather lat={55.751244} long={37.618423} variables={variables} />
    </div>
  )
}

export default App
