import './App.css';
import Navbar from "./components/Navbar/Navbar";
import {Switch, Route} from 'react-router-dom'
import RegistrationForm from "./components/RegistrationForm/RegistrationForm";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
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
