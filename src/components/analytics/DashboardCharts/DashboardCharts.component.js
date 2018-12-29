/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Local CSS
*/
import './DashboardCharts.component.css';

/*
Material UI Components
*/
import { Card, CardText } from 'material-ui/Card';
import Divider from 'material-ui/Divider';

/*
Children Components
*/
import DashboardLineChart from './DashboardLineChart/DashboardLineChart.component';
import LineChartSlider from './LineChartSlider/LineChartSlider.component';
// import DashboardDoughnut    from './DashboardDoughnut/DashboardDoughnut.component';
import DashboardPlaceholder from '../DashboardPlaceholder/DashboardPlaceholder.component';


/**
 *
 */
class DashboardCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            triggerPlaceholder: false
        }
        this.getLineChartTitle = this.getLineChartTitle.bind(this);
        this.chooseLineChartDisplayData = this.chooseLineChartDisplayData.bind(this);
        this.prepareLineChartSliderProps = this.prepareLineChartSliderProps.bind(this);
    }

    /**
     * Fairly dirty code here, please fix if got a better solution
     * @param {*} previousProps 
     * @param {*} previousState 
     */
    componentDidUpdate(previousProps, previousState) {

        if (this.props.modeFilter === 'Advertiser') {
            // Advertiser charts (Clicks, Impressions)
            if (this.props.currencyFilter === 'EQC') {
                let newState = {
                    triggerPlaceholder: this.props.fetched
                        && this.props.eqcContracts.length === 0
                        && this.props.eqcContracts.length === 0
                }
                if (newState.triggerPlaceholder !== previousState.triggerPlaceholder) {
                    this.setState(newState)
                }
            } else {
                let newState = {
                    triggerPlaceholder: this.props.fetched
                        && this.props.xqcContracts.length === 0
                        && this.props.xqcContracts.length === 0
                }
                if (newState.triggerPlaceholder !== previousState.triggerPlaceholder) {
                    this.setState(newState)
                }
            }
        } else {
            // Publisher charts  (Clicks, Impression, RPM, Revenue)
            // returning empty array at this time to serve as a test case and wait for actual data
            if (this.props.currencyFilter === 'EQC') {
                let newState = {
                    triggerPlaceholder: this.props.fetched
                        && this.props.eqcContracts.length === 0
                        && this.props.eqcContracts.length === 0
                }
                if (newState.triggerPlaceholder !== previousState.triggerPlaceholder) {
                    this.setState(newState)
                }
            } else {
                let newState = {
                    triggerPlaceholder: this.props.fetched
                        && this.props.xqcContracts.length === 0
                        && this.props.xqcContracts.length === 0
                }
                if (newState.triggerPlaceholder !== previousState.triggerPlaceholder) {
                    this.setState(newState)
                }
            }
        }
    }

    chooseLineChartDisplayData() {

        // *** Caution *** this is only for presentational purpose! Change when data is ready

        if (this.props.modeFilter === 'Advertiser') {
            return this.props.currencyFilter === 'EQC'
                ? this.props.eqcContracts
                : this.props.xqcContracts
        } else {
            return this.props.currencyFilter === 'EQC'
                ? this.props.xqcContracts
                : this.props.eqcContracts
        }
    }

    /**
     * Definitely Need Refactoring after database ( API ) is ready
     * @param {*} k
     */
    getLineChartTitle(k) {

        if (this.props.modeFilter === 'Advertiser') {
            switch (k) {
                case 0:
                    return 'Content Impressions Performance';
                case 1:
                    return 'Content Conversions Performance';
                default:
                    return 'Unknown Key';
            }
        } else {
            switch (k) {
                case 0:
                    return 'Content Impressions Performance';
                case 1:
                    return 'Content Revenue Performance';
                default:
                    return 'Unknown Key';
            }
        }
    }

    prepareLineChartSliderProps() {
        let impressionCharts = [];
        let referralClicksCharts = [];

        this.chooseLineChartDisplayData().map((contract, key) => {

            return impressionCharts.push(<DashboardLineChart
                legend={contract['content_topic']}
                dataset={contract['impressions_by_days']}
                key={key + 'impChart'} />)
                && referralClicksCharts.push(<DashboardLineChart
                    legend={contract['content_topic']}
                    dataset={contract['referral_clicks_by_days']}
                    key={key + 'refChart'} />)
        })

        return [impressionCharts, referralClicksCharts];
    }

    render() {
        return <div className='dashboard-charts-container'>
            {
                (this.state.triggerPlaceholder
                    ? <DashboardPlaceholder />
                    : <DashboardChartsRenderer
                        sliderProps={this.prepareLineChartSliderProps()}
                        getLineChartTitle={this.getLineChartTitle}
                    />
                )
            }
        </div>;
    }
}

const DashboardChartsRenderer = ({ sliderProps, getLineChartTitle }) => (
    <div>
        {
            sliderProps.map((itemList, i) => {
                return <Card key={'itemList' + i} className='dashboard-charts-card'>
                    <h2 className='chart-title'>{getLineChartTitle(i)}</h2>
                    <Divider style={{ width: '75%' }} />
                    <CardText>
                        <LineChartSlider itemList={itemList} />
                    </CardText>
                </Card>
            })
        }
        {/* Not using doughnut chart in MVP, save it though */}
        {/* <DashboardDoughnut/> */}
    </div>
)

const mapStateToProps = (state) => {
    return {
        eqcContracts: state.DashboardDataReducer.db.eqcContracts,
        xqcContracts: state.DashboardDataReducer.db.xqcContracts,
        fetched: state.DashboardDataReducer.fetched
    }
}

const mapDispatchToProps = (dispatch) => {
    return {}
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardCharts);
