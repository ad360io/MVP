/*
Core Libs
*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';


/**
 * Default Route (any Route that doesn't get a match)
 *      check if user is authenticated,
 *      send user to Analytics component,
 *      else send back to Login component.
 */
const DefaultRoute = ({ component: Component, auth: Auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const { isAuthenticated } = Auth;
            return isAuthenticated()
                ? (<Redirect to={{ pathname: '/analytics' }} />)
                : (<Redirect to={{ pathname: '/' }} />)
        }
        }
    />
);


export default DefaultRoute;
