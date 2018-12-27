import React from 'react';
import PropTypes from 'prop-types'

import Slider from 'react-slick';

import './DetailedImageSlider.component.css';


const DetailedImageSlider = ({ imageSrc }) => {
    /* Prepare the settings prop for Slider, for more options check slick.js doc*/
    let settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipe: true
    }

    /* iterate through the imageList prop to render */
    return (
        <Slider {...settings}>
            <div><img className='detailed-image' src={imageSrc} alt='detailed-listing'></img></div>
            <div><img className='detailed-image' src={imageSrc} alt='detailed-listing'></img></div>
        </Slider>
    );
}

DetailedImageSlider.propTypes = {
    imageSrc: PropTypes.string.isRequired
};


export default DetailedImageSlider;
