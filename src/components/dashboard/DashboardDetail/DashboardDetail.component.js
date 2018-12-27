import React from 'react';
import './DashboardDetail.component.css';
import { connect } from 'react-redux';
import SearchInput from 'react-search-input';
import { Divider } from '@material-ui/core';
import { createFilter } from 'react-search-input';
import DashboardLineChart from '../DashboardCharts/DashboardLineChart/DashboardLineChart.component';
import PirateBird from '../../../assets/images/pirate-bird-vector-clipart.png';

class DashboardDetail extends React.Component {

    render() {
        const KEYS_TO_FILTER = ['name', 'publisher_name', 'advertiser_name'];
        const filteredContracts = this.props.db.filter(createFilter(this.props.keywordFilter, KEYS_TO_FILTER));

        return <div className='dashboard-detail-container'>
            {/* <p className='search-input-label'>Filter Through Contracts: </p> */}
            <p className='search-input-label'></p>
            <SearchInput className='dashboard-detail-search-input' onChange={this.props.onKeywordChange} />

            {
                (filteredContracts.length === 0
                    ? <NoData />
                    : <DetailStat stat={this.props.activeStat} contracts={filteredContracts} />
                )
            }
        </div>
    }
}

const NoData = () => (
    <div className='empty-stat-container'>
        <p>You do not have any active contracts that match the filter.</p>
        <img className='dashboard-detail-empty' src={PirateBird} width='200' alt='dashboard empty state' />
        <p>Where's your contracts?<br /> Move your fingertip and start working!</p>
    </div>
)

const DetailStat = ({ stat, contracts }) => (
    <div className='detail-stat'>

        <Divider />
        {
            contracts.map((contract, i) => {
                return (<div key={'dashboard-detail' + i}>
                    <div className='detail-stat-flex-container' >
                        <div className='detail-stat-info'>
                            <h4 className='detail-stat-title'>{contract.name}</h4>
                            <h5 className='today-label'>Today</h5>
                            <h2 className='today-number'>{getRandomInt(0, 100)}</h2>
                            <h6 className='today-stat-label'>{stat.toUpperCase().slice(0, 3) + '\'s'}</h6>
                            <h5 className='week-label'>This Week</h5>
                            <h2 className='week-number'>{getRandomInt(101, 2000)}</h2>
                            <h6 className='week-stat-label'>{stat.toUpperCase().slice(0, 3) + '\'s'}</h6>
                            <h5 className='advertiser-label'>Adv.</h5>
                            <h5 className='advertiser-name'>{contract.advertiser_name}</h5>
                            <h5 className='publisher-label'>Pub.</h5>
                            <h5 className='publisher-name'>{contract.publisher_name}</h5>
                        </div>
                        <div className='detail-stat-chart'>
                            <DashboardLineChart contractTitle={`${contract.name} ${stat}s`} dataset={getRandomDataset(100, 230)} />
                        </div>
                    </div>
                    <Divider />
                </div>)
            })
        }

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
        keywordFilter: state.DashboardFilterReducer.keyword
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
)(DashboardDetail);
