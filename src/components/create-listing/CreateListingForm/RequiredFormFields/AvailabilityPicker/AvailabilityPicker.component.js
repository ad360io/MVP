/*
Core Libs
*/
import React, { Component } from 'react';
import { connect } from 'react-redux';

/*
Day Picker
*/
import DayPicker, { DateUtils } from 'react-day-picker';

/*
CSS Files
*/
import 'react-day-picker/lib/style.css'
import './AvailabilityPicker.component.css';


class AvailabilityPicker extends Component {


    static defaultProps = {
        numberOfMonths: 2
    };

    render() {
        const { from, to, onChange } = this.props;
        const modifiers = { start: from, end: to };

        return <div>
            <div className="date-range-container">
                <DayPicker
                    className='Selectable'
                    numberOfMonths={this.props.numberOfMonths}
                    selectedDays={[from, { from, to }]}
                    modifiers={modifiers}
                    onDayClick={(day) => onChange(DateUtils.addDayToRange(day, this.props))}
                />
                <p className='selected-range-label'>
                    {!from && !to && 'Please select the first day'}
                    {from && !to && 'Please select the last day'}
                    {from && to && `Selected from ${from.toLocaleDateString()}
                        to ${to.toLocaleDateString()}`}{'  '}
                    {from && to && (
                        <button className='link' onClick={() => onChange({from: null, to: null})}>
                            Reset
                        </button>
                    )}
                </p>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onDayClick: (day) => {
            dispatch({
                type: 'SET_PUB_FORM_DATE_RANGE',
                range: DateUtils.addDayToRange(day, ownProps)
            })
        },
        onResetClick: () => {
            dispatch({
                type: 'SET_PUB_FORM_DATE_RESET',
            })
        }
    }
}


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AvailabilityPicker);
