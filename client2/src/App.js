import React from 'react'
import Main from './components/Main'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import AuthContextProvider from './contexts/AuthContext'

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Main />
        </ Router>
      </AuthContextProvider>
    </div>
  )
}

export default App
