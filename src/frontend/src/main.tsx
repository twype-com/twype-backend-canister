import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { App } from '@/app'
import '@radix-ui/themes/styles.css'
import './styles/main.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
