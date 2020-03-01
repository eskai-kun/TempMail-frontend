import React, { Component } from 'react';
import './styles.styl';

import { FaHeart, FaGooglePlay, FaHamburger, FaApple, FaDev } from 'react-icons/fa';



const Footer = () => {
        return (
            <footer className="Footer">
                <div className="container-footer">

                    <div className="apps">
                        <a href="#//play.google.com/lalala" title="Google Play" target="_blank"><FaGooglePlay size={32}/></a>
                        <a href="#//www.apple.com/lalala" title="Apple Store" target="_blank"><FaApple size={32} /></a>
                        <a href={"#//docs." + location.hostname + "/v1"} title="API" target="_blank"><FaDev size={32} /></a>
                    </div>


                    <div className="bottom">
                        <span id="footer-legend">Version 0.0.1</span>
                        <span>Hecho con <FaHeart /> & <FaHamburger /></span>
                    </div>
                </div>
            </footer>
        )
    }


export default Footer;
