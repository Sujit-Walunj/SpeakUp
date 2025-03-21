import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import Navbar from './Components/Navbar/Navbar'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { rootReducer } from './Reducers'

const store  = configureStore({
  reducer:rootReducer,
});


ReactDOM.createRoot(document.getElementById('root')).render(
  
  
  <React.StrictMode>
   <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
