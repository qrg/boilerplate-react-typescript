import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './app'

const rootElement = document.querySelector('#root')

if (!rootElement) {
  throw new Error('Root element not found')
}

const root = createRoot(rootElement)

root.render(
  <StrictMode>
    <App />
  </StrictMode>
)
