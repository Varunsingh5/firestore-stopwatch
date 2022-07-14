import { Route, Redirect, Navigate } from "react-router-dom";
import React from "react";

// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route
//     {...rest}
//     element={ocalStorage.token ? <Component {...props} /> : <Navigate to="/login" />
//     }
//   />
// );

// export default PrivateRoute;

const PrivateRoute = ({children }) => {
  return localStorage.getItem('isAuth') ? children : <Navigate to="/login" />;
};
export default PrivateRoute;