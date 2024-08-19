import { ShapesProvider } from '@electric-sql/react'
import { ClickToComponent } from 'click-to-react-component'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { initializeApp } from './initialize'
import { router } from './router'

import './styles/index.css'

initializeApp()
const $container = document.querySelector('#root') as HTMLElement

createRoot($container).render(
  <React.StrictMode>
    <ShapesProvider>
      <RouterProvider router={router} />
    </ShapesProvider>
    <ClickToComponent />
  </React.StrictMode>,
)
