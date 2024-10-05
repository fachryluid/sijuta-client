
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

import 'react-loading-skeleton/dist/skeleton.css'
import 'react-toastify/dist/ReactToastify.css'
import { SWRConfig } from 'swr'
import App from './App'
import './index.css'
import fetcher from './utils/fetcher'

createRoot(document.getElementById('root')).render(
  <SWRConfig value={{ fetcher }}>
    <StrictMode>
      <BrowserRouter>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <App />
      </BrowserRouter>
    </StrictMode>
  </SWRConfig>
)