import React from 'react'
import { createRoot } from 'react-dom/client.js'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'

createRoot(document.querySelector('#root')).render(
  <Router>
    <App />
  </Router>
)
