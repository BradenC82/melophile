import React from 'react';
import './styles/app.css';
import { SpotifyProvider } from './services/SpotifyContext';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';

export default function App() {
  return (
    <SpotifyProvider>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route path="/dashboard">
              <Dashboard />
            </Route>
          </Switch>
        </div>
      </Router>
    </SpotifyProvider>
  );
}



