import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'

ReactDOM.render(
  <StrictMode>
    <App></App>
  </StrictMode>,
  document.querySelector('.root')
)
