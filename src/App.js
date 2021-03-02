import './App.css';
import React, {useEffect} from 'react'
import Navbar from "./components/Navbar/Navbar";
import {Switch, Route, Redirect} from 'react-router-dom'
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";
import {useDispatch, useSelector} from "react-redux";
import {authUser} from "./redux/auth-reducer";
import FileContainer from "./components/FileContainer/FileContainer";
import {getAuth} from "./redux/auth-selector";
import ProfilePage from "./components/ProfilePage/ProfilePage";
import Loader from "./components/Loader/Loader";
import {isAppReady} from "./redux/app-selector";

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(getAuth)
  const isReady = useSelector(isAppReady)


  useEffect(() => {
    dispatch(authUser())
  }, [])

  if (!isReady) {
    return <Loader />
  }

  return (
    <div className="App">
      <Navbar />
      {!isAuth
        ?
        <Switch>
          <Route path={'/registration'} component={RegistrationForm} />
          <Route path={'/login'} component={LoginForm} />
          <Redirect to={'/login'} />
        </Switch>
        : <Switch>
          <Route path={'/'} exact component={FileContainer} />
          <Route path={'/profile'} component={ProfilePage} />
          <Redirect to={'/'} />
        </Switch>
      }

    </div>
  );
}

export default App;
