//header https://codepen.io/mutedblues/pen/MmPNPG
import React from 'react'
import './styles.styl'
import { IoIosMailOpen } from 'react-icons/io';
import { FaGithubAlt, FaPlus } from 'react-icons/fa';
import { TiContacts } from 'react-icons/ti';

const Header = () => {
    return (
        <header className="header">
        <a href="" className="logo"><IoIosMailOpen/> TempMail</a>
          <input className="menu-btn" type="checkbox" id="menu-btn" />
          <label className="menu-icon" htmlFor="menu-btn"><span className="navicon"></span></label>
          <ul className="menu">
          <li><a href="#add"><FaPlus /> Add domain</a></li>
          <li><a href="#about"><FaGithubAlt /> Github</a></li>
          <li><a href="#contact"><TiContacts /> Contact</a></li>
          </ul>
        </header>
    )
}

export default Header