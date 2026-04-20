import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './edtech.css'
import { EdtechLandingPage } from './pages/EdtechLandingPage'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EdtechLandingPage />
  </StrictMode>,
)
