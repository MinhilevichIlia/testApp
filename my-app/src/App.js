import logo from './logo.svg';
import './App.css';
import React from 'react'; 
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import {Profile} from './components/Profile';
import Header from './components/Header';
import News from './components/News';


function App() { 
  return (
    <BrowserRouter>
          <div className='headerWrapper'>
              <Header/>
          </div>
          <Routes>
              <Route path='/profile' element={
                <Profile
                />} 
              />
              <Route path='/News' element={
                <News
                />} 
              />
              <Route path="*" element={
                <Navigate to="/profile" replace/>                    
              }
              />
          </Routes>
        </BrowserRouter>
  );
}

export default App;
