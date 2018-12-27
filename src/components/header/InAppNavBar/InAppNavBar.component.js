/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

/*
Local CSS
*/
import './InAppNavBar.component.css';

/**
 * Navigation bar that is directly under MenuBar component
 * Main purpose is to navigate between main components
 */
const InAppNavBarII = ({ modeFilter, width }) => (
    (width > 768)
        ? <div className='navbar-container' style={{ marginRight: '-10px' }}>
            <div className='in-app-nav-item-flex'>
                <NavLink exact activeClassName='selected-nav-item' className='in-app-nav-item noselect' to='/dashboard'>
                    <i className='nav-item-icon fas fa-home fa-sm'></i>
                    <span className='nav-label'>Dashboard</span>
                </NavLink>
            </div>
            <div className='in-app-nav-item-flex'>
                <NavLink exact activeClassName='selected-nav-item' className='in-app-nav-item noselect' to='/marketplace'>
                    <i className='nav-item-icon fas fa-suitcase fa-sm'></i>
                    <span className='nav-label'>Marketplace</span>
                </NavLink>
            </div>
            <div className='in-app-nav-item-flex'>
                <NavLink exact activeClassName='selected-nav-item' className='in-app-nav-item noselect' to='/create'>
                    <i className='nav-item-icon fas fa-file-alt fa-sm'></i>
                    <DynamicNavLabel modeFilter={modeFilter} />
                </NavLink>
            </div>
            <div className='in-app-nav-item-flex'>
                <NavLink exact activeClassName='selected-nav-item' className='in-app-nav-item noselect' to='/activities'>
                    <i className='nav-item-icon fas fa-suitcase fa-sm'></i>
                    <span className='nav-label'>Activities</span>
                </NavLink>
            </div>
        </div>
        : null
)

const DynamicNavLabel = ({ modeFilter }) => (
    modeFilter === 'Advertiser'
        ? <span className='nav-label'>Request</span>
        : <span className='nav-label'>Create</span>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps)(InAppNavBarII);
