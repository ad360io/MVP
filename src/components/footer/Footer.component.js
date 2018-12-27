/*
Core Libs
*/
import React from 'react';

/*
Local CSS
*/
import './Footer.component.css';


/**
 * Simple footer for Qchain
 */
const Footer = () =>
    <div className='footer-container'>
        <footer className='footer' >
            <div className='footer-content-container'>
                <p>Copyright &copy; 2017 Qchain Co.</p>
                <p>Irvine, CA</p>
                <span><a href='/termsofservice.pdf'>Terms of Service</a></span> &nbsp;&nbsp;&nbsp;
                <span><a href='/privacypolicy.pdf'>Privacy Policy</a></span>
            </div>
        </footer>
    </div>


export default Footer;
