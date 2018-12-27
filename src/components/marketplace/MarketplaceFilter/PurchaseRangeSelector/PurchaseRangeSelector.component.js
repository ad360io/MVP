/*
Core Libs
*/
import React from 'react';
import { connect } from 'react-redux';

/*
Material UI
*/
import Slider from '@material-ui/lab/Slider';

/*
Actions
*/
import { setBudget } from '../../../../actions/MarketplaceActions';

/*
Local CSS
*/
import './PurchaseRangeSelector.component.css';

class PurchaseRangeSelector extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.filters.budget
        }
    }


    render() {
        let { filters, onChange, currencyFilter } = this.props;
        let { value } = this.state;

        return (
            <div className='range-selector'>
                <Slider className='range-slider'
                        onChange={(e, value) => this.setState({value : +value.toFixed(2)})}
                        onDragEnd={() => onChange(value)}
                        value={value}
                        min={0.1}
                        max={10}
                        step={0.1}/>
                <div className='budget-value'> {value} k {currencyFilter}</div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        budgetFilter: state.MarketplaceFilterReducer.budgetFilter,
        currencyFilter: state.MenuBarFilterReducer.currencyFilter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSliderChange: (event, budgetFilter) => {
            dispatch(setBudget(budgetFilter))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PurchaseRangeSelector);
