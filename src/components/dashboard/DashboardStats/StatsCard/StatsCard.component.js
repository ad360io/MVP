/*
Core Libs and Children Components
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/*
Local CSS
*/
import './StatsCard.component.css'


/**
 * Stats Card singleton
 *      requires props of 'trend', 'title', and 'value'
 */
class StatsCard extends Component {

    constructor(props) {
        super(props);
        this.getTrendingHrStyle = this.getTrendingHrStyle.bind(this);
        this.getTrendingLabelStyle = this.getTrendingLabelStyle.bind(this);
    }

    getTrendingHrStyle() {
        let trendInNumber = Number.parseInt(this.props.trend, 10);
        if (trendInNumber > 0) {
            return 'green-hr';
        } else if (trendInNumber < 0) {
            return 'red-hr';
        } else {
            return 'neutral-hr';
        }
    }

    getTrendingLabelStyle() {
        let trendInNumber = Number.parseInt(this.props.trend, 10);
        if (trendInNumber > 0) {
            return 'green-label';
        } else if (trendInNumber < 0) {
            return 'red-label';
        } else {
            return '';
        }
    }

    sanitizeTitle(title) {
        return title.replace(new RegExp('_', 'g'), ' ');
    }

    render() {
        return <div className='stats-card-container'>
            <div className='stats-card'>
                <div>
                    <span className='stats-card-title'> {this.sanitizeTitle(this.props.title)} </span>
                    <span className={this.getTrendingLabelStyle() + ' stats-card-trend'}> {this.props.trend} </span>
                </div>
                <hr className={this.getTrendingHrStyle()} />
                <span className='stats-card-value'> {this.props.value} </span>
            </div>
        </div>
    }
}

StatsCard.propTypes = {
    trend: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
}


export default StatsCard;