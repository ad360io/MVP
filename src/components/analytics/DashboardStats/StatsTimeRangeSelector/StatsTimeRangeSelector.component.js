/*
Core Libs
*/
import React, { Component } from 'react';

/*
React Bootstrap
*/
import { SplitButton, MenuItem } from 'react-bootstrap';

/*
Material UI 
*/
import Divider from 'material-ui/Divider';

/*
Local CSS
*/
import './StatsTimeRangeSelector.component.css';


class StatsTimeRangeSelector extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTimeRange: 'Last 24 Hours'
        }
        this.handleTimeRangeItemClick = this.handleTimeRangeItemClick.bind(this);
    }

    handleTimeRangeItemClick(value) {
        this.setState({ selectedTimeRange: value });
    }

    render() {
        return <div>
            <SplitButton id='time-range-selector' bsSize='large' className='time-range-selector' title={this.state.selectedTimeRange}>
                <MenuItem
                    onClick={() => this.handleTimeRangeItemClick('Last 24 Hours')}
                    className='stats-time-range-item'
                >
                    Last 24 Hours
                </MenuItem>
                <Divider />
                <MenuItem
                    onClick={() => this.handleTimeRangeItemClick('Last Week')}
                    className='stats-time-range-item'
                >
                    Last Week
                </MenuItem>
                <Divider />
                <MenuItem
                    className='stats-time-range-item'
                    onClick={() => this.handleTimeRangeItemClick('Last Month')}
                >
                    Last Month
                </MenuItem>
                <Divider />
                <MenuItem
                    className='stats-time-range-item'
                    onClick={() => this.handleTimeRangeItemClick('Last Year')}
                >
                    Last Year
                </MenuItem>
            </SplitButton>
        </div>
    }
}


export default StatsTimeRangeSelector;