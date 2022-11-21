import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom'
import Home from './component/Home';
import Menu from './component/Menu';
import Pnf from './component/Pnf';
import Track from './component/Track';


import { ToastContainer } from 'react-toastify'; //package
import "react-toastify/dist/ReactToastify.css";

//insted of BrowserRouter writing as Router
function App() {
  return (
    <Router> 
      <Menu/>
      <ToastContainer autoClose={5000} position={"top-right"} />
      <Routes>
        <Route path={`/`} element={<Home/>} /> 
        <Route path={`/home`} element={<Home/>} />
        <Route path={'/tracks/:id'} element={<Track/>} />
        <Route path={`/*`} element={<Pnf/>} />
       </Routes>
    </Router>
  )
}

export default App