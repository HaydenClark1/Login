import React from 'react';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import {Route, Routes} from "react-router-dom";
import '../src/App.css';
function App() {
  return(
    <Routes>
  <Route path = '/' element = {<HomePage/>}/>
  <Route path = '/signup' element = {<Signup/>}/>
</Routes>
  )
}

export default App;
