import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Gameboard} from "./components/Gameboard.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Gameboard />
  </StrictMode>,
)
