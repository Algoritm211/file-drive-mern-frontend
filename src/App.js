import './App.css';
import React, {useEffect} from 'react'
import Navbar from "./components/Navbar/Navbar";
import {Switch, Route} from 'react-router-dom'
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import {useDispatch} from "react-redux";
import {authUser} from "./redux/auth-reducer";

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authUser())
  }, [])

  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path={'/registration'} component={RegistrationForm} />
        <Route path={'/login'} component={LoginForm} />
      </Switch>
    </div>
  );
}

export default App;
