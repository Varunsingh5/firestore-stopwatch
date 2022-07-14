import {Navigate} from 'react-router-dom';

const PublicRoute = ({ children }) => {
  return !localStorage.getItem('token') ? children : <Navigate to="/dashboard" />;
};
export default PublicRoute;