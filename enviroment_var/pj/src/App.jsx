import React from 'react'

const App = () => {
  const appName = import.meta.env.VITE_APP_NAME
  const api = import.meta.env.VITE_APP_URL
  return (
    <div>
        <h1>App Name is {appName}</h1>
        <p>Backend url is {api}</p>
    </div>
  )
}

export default App

