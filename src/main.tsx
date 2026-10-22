import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { installPhoneClickTracking } from './lib/analytics'
import { installChunkReload } from './lib/chunk-reload'
import './styles/index.css'

installPhoneClickTracking()
installChunkReload()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
