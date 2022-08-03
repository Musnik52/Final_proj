import "./App.css";
import React, { useState } from "react";
import airlock_img from "./Assets/airlock1.png";
import Flights from "./components/Flights";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (username, password) => {
    // check username and password
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
  };
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App">
          <Navbar isLoggedIn={isLoggedIn} onLogout={logoutHandler} />
          <Switch className="App">
            <Route exact path="/">
              <LandingPage img={airlock_img} />
            </Route>
            <Route exact path="/Flights">
              <Flights />
            </Route>
            <Route exact path="/login">
              <Login onLogin={loginHandler} />
            </Route>
            <Route exact path="/signup">
              <Signup />
            </Route>
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
