import React, { StrictMode, Suspense  } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserContextProvider } from "./components/contexts/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "@fortawesome/fontawesome-free/css/all.min.css";

createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <Suspense fallback={<div>Loading...</div>}>
     <UserContextProvider>
       <ToastContainer />
      <App />
      </UserContextProvider>
       </Suspense>
   </BrowserRouter>,
     
 
);
