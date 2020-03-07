import React from 'react'
import './styles.styl'
import { IoIosMailOpen } from 'react-icons/io';

export const NoMails = () => {
    return (
        <div className="NoMails">
                <div className="icon">
                    <IoIosMailOpen size={35} />
                </div>

                <div className="legend">
                    <span>Waitting mails...</span>
                </div>



            <div className="loading">
                <div className="boxLoading">
                </div>
            </div>


        </div>
    )
}