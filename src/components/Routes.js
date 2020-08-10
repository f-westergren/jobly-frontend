import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import CompanyList from './CompanyList';
import Company from './Company';
import JobList from './JobList';
import Login from './Login';
import Profile from './Profile';
import NotFound from './NotFound';
import NavBar from './NavBar';
import Home from './Home'
import PrivateRoute from './PrivateRoute';
import { AuthContext } from './context/auth';

const Routes = () => {
  const existingToken = localStorage.getItem('token')
  const [authToken, setAuthToken] = useState(existingToken)

  const setToken = (token) => {
    if (!token) {
      localStorage.removeItem('token')
    } else {
      localStorage.setItem('token', token);
    }
    setAuthToken(token)
  }

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken: setToken }}>
      <BrowserRouter>
        <NavBar />
          <main className="container mt-5">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <PrivateRoute exact path="/companies" component={CompanyList} />
              <PrivateRoute exact path="/companies/:handle" component={Company} />
              <PrivateRoute exact path="/jobs" component={JobList} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route component={NotFound} />
            </Switch>
          </main>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}

export default Routes;