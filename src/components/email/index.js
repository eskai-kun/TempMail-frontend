import React from 'react'
import './styles.styl'
// import { IoIosMailOpen } from 'react-icons/io';
import { FaCopy, FaTimes, FaExchangeAlt } from 'react-icons/fa';
import { FiType } from 'react-icons/fi';

import API from './../../lib/api.v1'
import Mails from './../mails'
import { EmailMutation } from './emailMutation'
import Countdown from './components/components/countdown'


class EmailComponent extends React.Component {
    constructor(props){
        super(props)
        console.log(props)
        //API
        this.API = new API()

        this.state = {
            status:'unload',
            Email:{
                _id:null,
                email:null,
                created_at:null,
                remove_at:null,
                mails:[]
            }
        }
        
    }

    checkCache = () => {
        let email = localStorage.getItem('Email')
        if (email){
            email = JSON.parse(email)

            if ( new Date(email.remove_at).getTime() > new Date().getTime() ){
                console.log('email valido')
                this.setState({
                    status:'load',
                    Email:email
                })
                return true
            }
        }
        return false
    }

    render(){
        let context = this

        return (
            <EmailMutation>
               {
                   (email) => {

                       //get a new email from API
                       if (context.state.status == 'unload' && this.checkCache() == false){
                           context.setState({
                               status: 'loading'//prevent many requests
                           })
                           setTimeout(()=>{
                               //load email
                               email().then(data=>{
                                   context.setState({
                                       Email:data.data.createEmail
                                   })
                                   localStorage.setItem('Email', JSON.stringify(data.data.createEmail))
                               })
                           },2000)
                       }
                       //END get a new email

                       return (
                           <div className="Email">
                               <div className="address">

                                   <div className="left">
                                       <div className="left-container">

                                           <input type="text" defaultValue={this.state.Email.email} readOnly />

                                           <div className="countdown">
                                               
                                           </div>


                                           <div className="copy">
                                               <FaCopy size={20} />
                                           </div>

                                       </div>

                                       <div className="options">
                                           <ul>
                                               <li className="delete"><span><FaTimes size={13} /> Delete</span></li>
                                               <li className="change"><span><FaExchangeAlt size={13} /> Change</span></li>
                                               <li className="set"><span><FiType size={13} /> Set</span></li>
                                           </ul>
                                       </div>

                                   </div>

                                   <div className="right">
                                       { this.state.Email.remove_at != null &&
                                           <Countdown date={this.state.Email.remove_at} context={this} />
                                       }
                                   </div>
                               </div>

                               {/* mails */}
                               {this.state.Email.email != null &&
                                   <Mails id={this.state.Email._id} />
                               }
                               
                           </div>
                       )
                   }
               }
            </EmailMutation>
        )
    }



}




export default EmailComponent