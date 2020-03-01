//header https://codepen.io/mutedblues/pen/MmPNPG
import React from 'react'
import './styles.styl'

const MainContainer = (props) => {
    return (
        <div className="MainContainer">
            {props.children}
        </div>
    )
}

export default MainContainer