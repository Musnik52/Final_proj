import "./App.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import airlock_img from "./Assets/airlock1.png";
import customer_bg from "./Assets/abs_bg.jpg";
import airline_bg from "./Assets/abs_bg.jpg";
import admin_bg from "./Assets/abs_bg.jpg";
import Flights from "./components/Flights/Flights";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Navbar from "./components/Navbar";
import About from "./components/Miscellaneous/About";
import Contact from "./components/Miscellaneous/Contact";
import Reviews from "./components/Miscellaneous/Reviews";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import CustomerProfile from "./components/Profiles/Customer/CustomerProfile";
import AirlineProfile from "./components/Profiles/Airline/AirlineProfile";
import AdminProfile from "./components/Profiles/Admin/AdminProfile";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState("");
  const [userType, setUserType] = useState("");

  useEffect(() => {
    axios.defaults.withCredentials = true;
    axios.get(`http://localhost:8080/login`,{},
    {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      setIsLoggedIn(res.data.LoggedIn);
      setLoggedUser(res.data.user.username);
      setUserType(res.data.user.user_role);
    });
  }, []);

  const loginHandler = (username, role) => {
    setLoggedUser(username);
    setIsLoggedIn(true);
    setUserType(role);
  };

  const logoutHandler = () => {
    axios.defaults.withCredentials = true;
    axios
      .get(
        "http://localhost:8080/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data)
        setIsLoggedIn(false);
      });
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App">
          <Navbar
            isLoggedIn={isLoggedIn}
            onLogout={logoutHandler}
            login_name={loggedUser}
          />
          <Switch className="App">
            <Route exact path="/">
              <LandingPage img={airlock_img} />
            </Route>
            <Route exact path="/Flights">
              <Flights />
            </Route>
            <Route exact path="/login">
              {!isLoggedIn && <Login onLogin={loginHandler} />}
              {isLoggedIn && userType === "customer" && (
                <CustomerProfile
                  onLogout={logoutHandler}
                  img={customer_bg}
                  login_name={loggedUser}
                />
              )}
              {isLoggedIn && userType === "airline" && (
                <AirlineProfile
                  onLogout={logoutHandler}
                  img={airline_bg}
                  login_name={loggedUser}
                />
              )}
              {isLoggedIn && userType === "admin" && (
                <AdminProfile
                  onLogout={logoutHandler}
                  img={admin_bg}
                  login_name={loggedUser}
                />
              )}
            </Route>
            {!isLoggedIn && (
              <Route exact path="/signup">
                <Signup />
              </Route>
            )}
            <Route exact path="/contact">
              <Contact />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/Reviews">
              <Reviews />
            </Route>
          </Switch>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
