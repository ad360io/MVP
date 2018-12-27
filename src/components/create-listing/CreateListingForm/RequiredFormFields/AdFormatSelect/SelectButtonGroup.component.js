/*
Core Libs
*/
import React, { Component } from 'react';
import { withWindowWidthListener } from '../../../../ResponsiveComponent/ResponsiveComponent';
//import PropTypes from 'prop-types';

/*
React Bootstrap
*/
//import { ButtonGroup } from 'react-bootstrap';


class SelectButtonGroup extends Component {

    render() {
        console.log(this.props.items);
        return <div className='select-btn-group-container'>
        </div>
    }
}

// SelectButtonGroup.propTypes = {
//     stringList: PropTypes.arrayOf(PropTypes.string).isRequired
// }

export default withWindowWidthListener(SelectButtonGroup);