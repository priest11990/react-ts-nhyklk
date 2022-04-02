import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Welcome from './routes/welcome-page/welcome'
import Register from './routes/register-page/register'
import Login from './routes/login-page/login'

const App: React.FC<{}> = ({}) => {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={Welcome}/>
        <Route path='/register' component={Register}/>
        <Route path='/login' component={Login}/>
      </Switch>
    </Router>
  );
}

export default App;