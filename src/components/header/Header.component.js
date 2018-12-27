/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withWindowWidthListener } from '../ResponsiveComponent/ResponsiveComponent';

/*
Local CSS
*/
import './Header.component.css';

/*
Children Components
*/
import InAppNavBar from './InAppNavBar/InAppNavBar.component';
import ProfileAccessor from './ProfileAccessor/ProfileAccessor.component';
import BottomNavOnSmScreen from './InAppNavBar/BottomNavOnSmScreen.component';
import TinyWallet from './TinyWallet/TinyWallet.component';


/**
 * The bar that is at the very top of each component
 */
class Header extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        const { logout } = this.props.auth;
        logout();
    }

    componentWillMount() {
        if (this.props.profile.name === 'User Name') {
            const { handleProfileOnAuthenticated, getAuthorizationToken } = this.props.auth;
            handleProfileOnAuthenticated(getAuthorizationToken());
        }
    }

    render() {
        return (
            <div className='header-container'>
                <a href='/dashboard' className='logo-redirect'>
                    <img src='https://qchain.co/img/core/qchain_logo2018_icon.png' style={{ width: '45px', float: 'left', marginTop: '13px' }} alt='logo' />
                    <img src='https://qchain.co/img/core/qchainText2018UNBOLD.png' style={{ width: '90px', marginTop: '23px' }} alt='logo text' />
                </a>
                <InAppNavBar {...this.props} />
                <div className='menu-flex-for-profile-accessor'>
                    <ProfileAccessor history={this.props.history} profile={this.props.profile} onLogout={this.handleLogout} auth={this.props.auth} />
                </div>
                <TinyWallet {...this.props} />
                {/* <TinyWallet auth={this.props.auth} /> */}
                <BottomNavOnSmScreen {...this.props} />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        profile: state.ProfileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default withWindowWidthListener(withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Header)));
