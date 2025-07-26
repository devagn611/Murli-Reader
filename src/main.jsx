import '@radix-ui/themes/styles.css';
import './index.css'

import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {Theme} from '@radix-ui/themes'
import App from './App'

ReactDOM.createRoot(document.getElementById('root') ).render(
  <StrictMode>
    <Theme>
      <App />
    </Theme>
  </StrictMode>
)
