import React, { useContext } from 'react';
import AuthContext from '../../context/auth/AuthContext';
import { Route, Redirect } from 'react-router-dom';

//it is the standard way of creating private route component
const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const { isAuthenticated, loading } = authContext;
  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PrivateRoute;
