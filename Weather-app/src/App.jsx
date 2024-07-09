import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from './components/Login';
import Register from "./components/Register"
import Home from "./components/Home"
import { StateContextProvider } from './context';
import History from './components/History';
import PrivateRoute from './PrivateRoute';


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="register" element={<Register/>} />
        <Route
          path="weather"
          element={
            <PrivateRoute>
              <StateContextProvider>
                <Home />
              </StateContextProvider>
            </PrivateRoute>
          }
        />
        <Route
          path="history"
          element={
            <PrivateRoute>
              <StateContextProvider>
                <History />
              </StateContextProvider>
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>

    </div>
    
    


    
  )
}

export default App
