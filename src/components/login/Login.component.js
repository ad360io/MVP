/*
Core Libs
*/
import React, { Component } from 'react';

/**
 * Login Component
 */
class Login extends Component {

    componentDidMount() {
        document.title = "Qchain - Login";
        this.props.auth.login();
    }

    render() {
        return (
            <div className='cover-login'>
            </div>
        );
    }
}


export default Login;