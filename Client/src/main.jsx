import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { store } from '../redux/store.js'
import { ChakraProvider } from "@chakra-ui/react";

createRoot(document.getElementById('root')).render(

  <StrictMode>
    <ChakraProvider resetCSS={false}>
      <Provider store={store}>
        <App />
      </Provider>
    </ChakraProvider>
  </StrictMode>
  ,
)
