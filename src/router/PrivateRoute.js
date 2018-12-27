/*
Core Libs
*/
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*
Other Components
*/
import Header from '../components/header/Header.component';
import {createAsyncHandling} from "../common/api/async-handling";
import Footer from "../components/footer/Footer.component";
import {Layout} from "../common/components/Layout";


/**
 * Private Route
 *      first check if user is authenticated,
 *      if not, send back to Login component.
 */
const PrivateRoute = ({ component: Component, auth: Auth, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            const { isAuthenticated } = Auth;
            return isAuthenticated()
                ? PrivateContent(props, Component, Auth)
                : <Redirect to={{ pathname: '/' }} />
        }}
    />
);

/**
 * All authenticated components will display header,
 * Therefore abstracting the header to serve only to the private contents
 * @param { object } props     Passed from Route component
 * @param { Component } Component Passed from Route component
 */
const PrivateContent = (props, Component, Auth) => (
    <Loader {...{auth: Auth}}>
        {({allApis}) => (
            <Layout
                {...{auth: Auth, allApis}}
                header={ <Header {...{auth: Auth, allApis}}/> }
                content={ <Component auth={Auth} {...{...props, allApis}} /> }
                footer={ <Footer/> }
            />
        )}
    </Loader>
);

class Loader extends React.Component {
    allApis = null;

    constructor(props) {
        super(props);
        this.loader();
    }

    loader = () => {
        const {auth} = this.props;
        let token = auth && auth.getAuthorizationToken ? auth.getAuthorizationToken() : null;
        this.allApis = createAsyncHandling(token, () => console.log('error+++'))
    };

    render() {
        const { children } = this.props;
        return children({ allApis: this.allApis });
    }
}


export default PrivateRoute;
