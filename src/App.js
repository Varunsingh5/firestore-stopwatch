import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import Login from "./screens/login/Login";
import Register from "./screens/register/Register";
import Reset from "./screens/reset/Reset";
import Dashboard from "./screens/dashboard/Dashboard";
import Cardss from "./screens/cards/Cardss"
import PrivateRoute from './components/Routing/ProtectedRoutes';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          {/* <Route exact path="/" element={user?.accessToken ? <Dashboard/> : <Login />} /> */}
          {/* <Route exact path="/dashboard" element={user?.accessToken ? <Dashboard /> : <Navigate to="/login" />} /> */}
          <Route
            exact
            path="/"
            element={localStorage.getItem('isAuth') ? (
              <Navigate to="/dashboard" />
            ) : (
              <Navigate to="/login" />
            )
            }
          />
          <Route
            path="/login"
            exact
            element={
              localStorage.getItem('isAuth') ? <Navigate to="/dashboard" /> : <Login />
            }
          />
          <Route
            path="/register" exact
            element={
              localStorage.getItem('isAuth') ? <Navigate to="/dashboard" /> : <Register />
            }
          />
          <Route
            path="/reset"
            exact
            element={
              localStorage.getItem('isAuth') ? <Navigate to="/dashboard" /> : <Reset />
            }
          />
          <Route
            exact
            path='/dashboard'
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            exact
            path='/cardss'
            element={
              <PrivateRoute>
                <Cardss />
              </PrivateRoute>
            }
          />

          {/* <Route path="/" element={user?.accessToken ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
          <Route exact path="/reset" element={!user?.accessToken ? <Reset /> : <Navigate to="/dashboard" />} />
          <Route exact path="/dashboard" element={user?.accessToken ? <Dashboard /> : <Navigate to="/login" />} />
          <Route exact path="/login" element={user?.accessToken ? <Navigate to="/dashboard" /> : <Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/dashboard2" element={<Dashboard2 />} /> */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;   
