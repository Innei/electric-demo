import { ClickToComponent } from 'click-to-react-component'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { ElectricProvider } from './ElectricProvider'
import { initializeApp } from './initialize'
import { router } from './router'

import './styles/index.css'

initializeApp()
const $container = document.querySelector('#root') as HTMLElement

createRoot($container).render(
  <React.StrictMode>
    <ElectricProvider>
      <RouterProvider router={router} />
    </ElectricProvider>
    <ClickToComponent />
  </React.StrictMode>,
)
