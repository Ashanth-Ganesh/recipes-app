import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Appbar from './Appbar.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Appbar />
  </StrictMode>,
)
