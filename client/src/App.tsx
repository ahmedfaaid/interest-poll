import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Interests from './pages/Interests';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/interests'>
          <Interests />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
