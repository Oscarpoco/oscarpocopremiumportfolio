import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './styles/themes.css'
import { loadPreferences, applyPreferences } from './config/themePreferences'

applyPreferences(loadPreferences())

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
