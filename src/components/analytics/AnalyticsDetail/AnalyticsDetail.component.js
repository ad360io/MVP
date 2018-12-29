import React from 'react';
import SearchInput from 'react-search-input';
import { connect } from 'react-redux';
import { Divider } from '@material-ui/core';
import { createFilter } from 'react-search-input';

import DashboardLineChart from '../DashboardCharts/DashboardLineChart/DashboardLineChart.component';
import PirateBird from '../../../assets/images/pirate-bird-vector-clipart.png';

import './AnalyticsDetail.component.css';


class AnalyticsDetail extends React.Component {

    render() {
        const KEYS_TO_FILTER = ['name', 'publisher_name', 'advertiser_name'];
        const filteredContracts = this.props.db.filter(createFilter(this.props.keywordFilter, KEYS_TO_FILTER));

        this.num_matching_current_user = 0;

        return <div className='dashboard-detail-container'>
            {/* <p className='search-input-label'>Filter Through Contracts: </p> */}
            <SearchInput className='dashboard-detail-search-input' onChange={this.props.onKeywordChange} />

            {
                (filteredContracts.length === 0
                    ? <NoData />
                    : <DetailStat stat={this.props.activeStat} contracts={filteredContracts} this_={this} />
                )
            }
        </div>
    }
}

const NoData = () => (
    <div className='empty-stat-container'>
        <img className='dashboard-detail-empty' src={PirateBird} width='200' alt='dashboard empty state' />
        <p>You do not have any active contracts that match the filter.</p>
    </div>
)

const DetailStat = ({ stat, contracts, this_ }) => (
    <div className='detail-stat'>

        {
            contracts.map((contract, i) => {
                if (this_.props.profile.name === contract.advertiser_name || this_.props.profile.name === contract.publisher_name || this_.props.profile.nickname === contract.advertiser_name || this_.props.profile.nickname === contract.publisher_name) {

                    this_.num_matching_current_user += 1;

                    console.log(contract);

                    return (
                        <div key={'dashboard-detail' + i}>
                            <div className='detail-stat-flex-container' >
                                <div className='detail-stat-info'>
                                    <h4 className='detail-stat-title'>{contract.name}</h4>

                                    <h5 className='today-label'>Start Date</h5>
                                    <h2 className='today-number'>{contract.start_date.split('T')[0]}</h2>
                                    <h6 className='today-stat-label'>&nbsp;</h6>

                                    <h5 className='week-label'>End Date</h5>
                                    <h2 className='week-number'>{contract.end_date.split('T')[0]}</h2>
                                    <h6 className='week-stat-label'>&nbsp;</h6>

                                    <h5 className='advertiser-label'>Advertiser</h5>
                                    <h5 className='advertiser-name'>{contract.advertiser_name}</h5>

                                    <h5 className='publisher-label'>Publisher</h5>
                                    <h5 className='publisher-name'>{contract.publisher_name}</h5>
                                </div>

                                {/* <div className='detail-stat-chart'>
                                    <DashboardLineChart contractTitle={`${contract.name} ${stat}s`} dataset={getRandomDataset(100, 230)} />
                                </div> */}

                                <div className='detail-stat-info'>
                                    <h4 className='detail-stat-title'>&nbsp;</h4>

                                    <h5 className='today-label'>Revenue</h5>
                                    <h2 className='today-number'>{contract.payout_cap}</h2>
                                    <h6 className='today-stat-label'>&nbsp;</h6>

                                    <h5 className='week-label'>&nbsp;</h5>
                                    <h2 className='week-number'>&nbsp;</h2>
                                    <h6 className='week-stat-label'>&nbsp;</h6>

                                    <h5 className='advertiser-label'>&nbsp;</h5>
                                    <h5 className='advertiser-name'>&nbsp;</h5>

                                    <h5 className='publisher-label'>&nbsp;</h5>
                                    <h5 className='publisher-name'>&nbsp;</h5>
                                </div>
                            </div>
                        </div>
                    )
                }
            })
        }

        {this_.num_matching_current_user === 0 && (
            <div className='empty-stat-container'>
                <img className='dashboard-detail-empty' src={PirateBird} width='200' alt='dashboard empty state' />
                <p>You don't have any contracts yet.</p>
            </div>
        )}

    </div>
)

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDataset(min, max) {
    const dataset = [];
    for (let i = 0; i < 10; i++) {
        dataset.push(getRandomInt(min, max));
    }
    return dataset;
}

const mapStateToProps = (state) => {
    return {
        activeStat: state.DashboardFilterReducer.activeStat,
        db: state.DashboardDataReducer.db,
        keywordFilter: state.DashboardFilterReducer.keyword,
        profile: state.ProfileReducer.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onKeywordChange: (keyword) => {
            dispatch({
                type: 'SET_KEYWORD',
                value: keyword
            })
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AnalyticsDetail);
