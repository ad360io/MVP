/*
Core Libs
*/
import React from 'react';
import PropTypes from 'prop-types';

/*
Slick.js Component
*/
import Slider from 'react-slick';

/*
Local CSS
*/
import './LineChartSlider.component.css';


/**
 * Carousel made by slick.js library
 * Requires a props of itemList that should contain a list of elements to be rendered in the carousel.
 */
const LineChartSlider = ({ itemList }) => {
    /* Prepare the settings prop for Slider, for more options check slick.js doc*/
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    /* iterate through the itemList prop to render */
    return (
        <Slider {...settings}>
            {
                itemList.map((item, index) => {
                    return item;
                })
            }
        </Slider>
    );
}

LineChartSlider.propTypes = {
    itemList: PropTypes.array.isRequired
};


export default LineChartSlider;
