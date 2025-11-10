import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from "react-router/dom";
import router from './Routes/Router.jsx';
import { ThemeProvider } from './Theme/ThemeContext.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { Toaster } from 'react-hot-toast';







createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider> <ThemeProvider> <RouterProvider router={router} /> <Toaster
      position="top-center" // টোস্ট কোথায় দেখাবে (ঐচ্ছিক)
      reverseOrder={false}
    /></ThemeProvider></AuthProvider>
  </StrictMode>,


)
