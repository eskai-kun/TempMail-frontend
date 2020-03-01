import React from 'react'
import './styles.styl'
// import { IoIosMailOpen } from 'react-icons/io';
import { FaCopy } from 'react-icons/fa';
import API from './../../lib/api.v1'
import Mails from './../mails'
import { EmailMutation } from './emailMutation'



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
                                   <input type="text" defaultValue={this.state.Email.email} readOnly />
                                   <div className="copy">
                                       <FaCopy size={25} />
                                   </div>
                               </div>

                               {/* mails */}
                               <Mails id={this.state.Email._id} />
                           </div>
                       )
                   }
               }
            </EmailMutation>
        )
    }



}




export default EmailComponent