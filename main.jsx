import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Gate from './logic_gates.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Gate type="AND" label="AND Gate" />
    
  </StrictMode>,
)
