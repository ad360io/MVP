/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Custom Components
*/
import StatsCard from './StatsCard/StatsCard.component';
import StatsTimeRangeSelector from './StatsTimeRangeSelector/StatsTimeRangeSelector.component';

/*
Material UI Card
*/
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

/*
Local CSS
*/
import './DashboardStats.component.css';


/**
 * Dashboard Stats Component
 */
class DashboardStats extends Component {

    constructor(props) {
        super(props);
        this.getStatsCardTitles = this.getStatsCardTitles.bind(this);
        this.getStatsCardValueByTitle = this.getStatsCardValueByTitle.bind(this);
    }

    getStatsCardTitles() {
        return (this.props.modeFilter === 'Advertiser'
            ? ['Impressions', 'Shares', 'Click-throughs', 'Conversions', 'Placement_Cost', 'Balance', 'Purchased_Contract', 'Total_Invoice_Due']
            : ['Impressions', 'Shares', 'Click-throughs', 'Conversions', 'Revenue', 'Balance', 'Active_Contract', 'Total_Invoice_Due'])
    }

    getStatsCardValueByTitle(title) {
        // TODO(ahuszagh) Change to use an API call in the constructor.
        return (this.props.modeFilter === 'Advertiser'
            ? this.props.db.advertiserDailyData[title]
            : this.props.db.publisherDailyData[title])
    }

    render() {
        return <div className='stats-container'>
            <Card className='stats-container-card'>
                {/* <h2 className='stats-title'>Last 24 Hours</h2> */}
                <StatsTimeRangeSelector />
                <Divider style={{ width: '75%' }} />
                <CardText>
                    {
                        this.getStatsCardTitles().map((statsTitle, i) => {
                            return <StatsCard title={statsTitle}
                                value={"" + this.getStatsCardValueByTitle(statsTitle)}
                                trend={this.getStatsCardValueByTitle(statsTitle + '_trend') || ''}
                                key={this.props.modeFilter + statsTitle} />
                        })
                    }
                </CardText>
            </Card>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        db: state.DashboardDataReducer.db
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardStats);
