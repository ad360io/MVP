/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
React Bootstrap
*/
import { Button, ButtonGroup } from 'react-bootstrap';

/*
Action
*/
import { setViewMode } from '../../../../actions/MarketplaceActions';

import './ViewModeSelector.component.css';


class ViewModeSelector extends Component {
    render() {
        return <div style={{ width: '240px', marginLeft: '25px', marginButtom: '5%' }}>
            <ButtonGroup
                style={{
                    display: this.props.decideHidden(),
                }}
                justified
            >
                <Button
                    href="#"
                    active={this.props.viewModeFilter === 'Listing'}
                    onClick={() => this.props.onViewModeClick('Listing')}
                >
                    <i className="fas fa-align-justify view-mode-icon"></i>Listing
                </Button>
                <Button
                    href="#"
                    active={this.props.viewModeFilter === 'Grid'}
                    onClick={() => this.props.onViewModeClick('Grid')}
                >
                    <i className="fas fa-th-large view-mode-icon"></i>Grid
                </Button>
            </ButtonGroup>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        viewModeFilter: state.MarketplaceFilterReducer.viewModeFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onViewModeClick: (viewModeFilter) => {
            dispatch(setViewMode(viewModeFilter))
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ViewModeSelector);