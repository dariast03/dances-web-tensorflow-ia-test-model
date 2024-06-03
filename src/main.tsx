import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import HackMode from './components/hack-mode.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider
      router={createBrowserRouter([
        {
          path: '/',
          element: <App />,
        },
        {
          path: '/hack',
          element: <HackMode />,
        }

      ], {
        basename: "/ia"
      })}
    />
  </React.StrictMode>,
)
