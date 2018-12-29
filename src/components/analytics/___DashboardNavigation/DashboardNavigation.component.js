import React from 'react';
import './DashboardNavigation.component.css';
import { connect } from 'react-redux';
import VisibilityIcon from '@material-ui/icons/VisibilityRounded';
import ShareIcon from '@material-ui/icons/ShareRounded';
import PlayArrowIcon from '@material-ui/icons/PlayArrowRounded';
import MoneyIcon from '@material-ui/icons/AttachMoneyRounded';
import RevenueIcon from '@material-ui/icons/TrendingUpRounded';


class DashboardNavigation extends React.Component {

    isActiveStyle = (navItem) => {
        return (this.props.activeStat === navItem ? 'activeNav' : '');
    }

    render() {
        return <div className='dashboard-navigation-container'>

            <div className='dashboard-nav-item noselect'>
                <p
                    className={this.isActiveStyle('Impression')}
                    onClick={() => this.props.onNavItemClick('Impression')}>
                    <VisibilityIcon className='material-icon' />
                    Impression
                </p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p
                    className={this.isActiveStyle('Shares')}
                    onClick={() => this.props.onNavItemClick('Shares')}
                >
                    <ShareIcon className='material-icon' />
                    Shares
                </p>
            </div>
            <div className='dashboard-nav-item noselect'>
                <p
                    className={this.isActiveStyle('Click-throughs')}
                    onClick={() => this.props.onNavItemClick('Click-throughs')}
                >
                    <PlayArrowIcon className='material-icon' />
                    Click-throughs
                </p>
            </div>
            {
                (this.props.modeFilter === 'Advertiser')
                    ? <div className='dashboard-nav-item noselect'>
                        <p
                            className={this.isActiveStyle('PlacementCost')}
                            onClick={() => this.props.onNavItemClick('PlacementCost')}
                        >
                            <MoneyIcon className='material-icon' />
                            Placement Cost
                        </p>
                    </div>
                    : <div className='dashboard-nav-item noselect'>
                        <p
                            className={this.isActiveStyle('Revenue')}
                            onClick={() => this.props.onNavItemClick('Revenue')}
                        >
                            <RevenueIcon className='material-icon' />
                            Revenue
                        </p>
                    </div>
            }

        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        activeStat: state.DashboardFilterReducer.activeStat
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onNavItemClick: (navItem) => {
            dispatch({
                type: 'SET_ACTIVE_STAT',
                value: navItem
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardNavigation);