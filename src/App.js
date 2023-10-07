import React from 'react';
import './App.css';
import Login from './login/Login';
import {Route, Routes} from "react-router";
import Home from "./home/Home";
import Space from "./space/Space";



function App() {
  return (
      <div className="App">
          <ul>
              <li><a href={`/`}>Home</a></li>
              <li><a href={`/login`}>Login</a></li>
          </ul>
        <Routes>
            <Route path={"/"} element={<Home/>}></Route>
            <Route path={"/login"} element={<Login/>}></Route>
            <Route path={"/space"} element={<Space/>}></Route>
        </Routes>
      </div>
  );
}

export default App;
