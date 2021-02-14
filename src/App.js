import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import axios from 'axios';

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Home from "./Pages/Home";
import Alumni from "./Pages/Alumni";
import Facstaff from "./Pages/Facstaff";
import Students from "./Pages/Students";


function App() {

  function propsSubmit(newUser) {
    console.log(newUser);
    axios.post("https://localhost:5000/register", newUser
    ).then(res => {
      console.log(res);
      res.redirect("/login")
    }).catch(err => console.log(err));
}

  return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={() => <Register propsSubmit={propsSubmit} />} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/alumni" component={Alumni} />
          <Route exact path="/facstaff" component={Facstaff} />
          <Route exact path="/students" component={Students} />
        </div>
      </Router>
  );
}

export default App;
