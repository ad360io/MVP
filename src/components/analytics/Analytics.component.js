/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './Analytics.component.css';

/*
React Bootstrap Components
*/
import { Alert } from 'react-bootstrap';

/*
Material UI
*/
import CircularProgress from '@material-ui/core/CircularProgress'

/*
Networking
*/
import axios from 'axios';

/*
Actions
*/
import { fetch_DashboardData_Fulfilled, fetch_DashboardData_Pending, fetch_DashboardData_Rejected } from '../../actions/DatabaseRequestActions';

/*
Custom Components
*/
import ErrorPage from '../ErrorPage/ErrorPage.component';
import AnalyticsDetail from './AnalyticsDetail/AnalyticsDetail.component';
import Footer from '../footer/Footer.component';

/**
 * Analytics container manages the layout of each children components
 */
class Analytics extends Component {

    constructor(props) {
        super(props);
        props.onStartLoadData();
    }

    componentDidMount() {
        document.title = "Qchain - Analytics";
        window.scrollTo(0, 0)

        // Register data loading every 10 minutes.
        const tenMinutes = 1000 * 60 * 10;
        this.loadDataInterval = setInterval(this.props.onStartLoadData, tenMinutes);
    }

    componentWillUnmount() {
        // Tidy up
        clearInterval(this.loadDataInterval);
        this.loadDataInterval = 0;
    }

    render() {
        if (this.props.hasError) {
            return <ErrorPage />
        }
        else if (this.props.fetched) {
            return <DashboardRenderer
                modeFilter={this.props.modeFilter}
                currencyFilter={this.props.currencyFilter}
            />
        } else {
            return <ProgressRenderer />
        }
    }
}

const DashboardRenderer = ({ modeFilter, currencyFilter }) => (
    <div className='dashboard-container'>
        <AnalyticsDetail />
    </div>
)

const ProgressRenderer = () => (
    <div className="progress-renderer">
        <CircularProgress size={70}/>
    </div>
)

const mapStateToProps = (state) => {
    return {
        modeFilter: state.MenuBarFilterReducer.modeFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter,
        fetched: state.DashboardDataReducer.fetched,
        hasError: state.DashboardDataReducer.hasError,
        profile: state.ProfileReducer.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    const TestServerURL = "https://marketplacedb.qchain.co/active_contract_view";
    return {
        onStartLoadData: () => {
            const config = {
                headers: { Authorization: "Bearer " + localStorage.getItem('id_token') }
            };
            dispatch((dispatch) => {
                dispatch(fetch_DashboardData_Pending())
                axios.get(TestServerURL, config)
                    .then((response) => {
                        dispatch(fetch_DashboardData_Fulfilled(response.data))
                    })
                    .catch((err) => {
                        console.log(err)
                        dispatch(fetch_DashboardData_Rejected(err))
                    })
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Analytics);
