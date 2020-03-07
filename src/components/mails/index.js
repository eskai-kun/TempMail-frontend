import React, { useState } from 'react'
import './styles.styl'
import {  Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Mail from './components/mail'
import { FaStar } from 'react-icons/fa';
import { GiMailbox } from 'react-icons/gi';
import { MdAccessTime } from 'react-icons/md';
import { NoMails } from './components/noMails'

const GET_ALL_MAILS = (gql`
  query getMails($id: ID!) {
    getEmail(id: $id){
        mails{
            subject
            from
            received_at
            content
        }
    }
  }
`)





export default class Mails extends React.Component{
    constructor(props){
        super(props)
        this.interval = null;
        this.refetch = null;
        this.state = {
            count:0,
            mails:[]
        }
    }
    render(){
        let context = this

        let id = this.props.id

                    

                    return (
                        <div className="Mails-container">
                            <div className="refresh-email">
                                <div className="loading"></div>
                            </div>

                            <div className="description-top">
                                <span><FaStar /> Subject</span>
                                <span><GiMailbox /> From</span>
                                <span><MdAccessTime /> Received at</span>
                            </div>

                            

                            <div className="mails">

                                {/* no mails */}
                                { context.state.mails.length == 0 && 
                                    <NoMails />
                                }
                                

                                {/* query */}
                                <Query query={GET_ALL_MAILS} variables={{ id }} fetchPolicy='no-cache'>
                                    {
                                        ({ data = { getEmail: { mails: [] } },  loading, refetch }) => {
                                            //for refetch
                                            context.refetch = refetch

                                            //if length changed
                                            if (data.getEmail.mails.length > context.state.mails.length) {
                                                //update
                                                context.setState({
                                                    mails: data.getEmail.mails
                                                })
                                            }

                                            //return emails
                                            return context.state.mails.map((mail, index) => {
                                                return <Mail key={new Date(mail.received_at).getTime()} mail={mail} />
                                            })


                                        }
                                    }
                                </Query>
                            </div>
                        </div>
                    )


                

    }

    componentDidMount(){
        let context = this
        this.interval = setInterval(() => {
            context.refetch()
        }, 10000);
    }

    componentWillUnmount(){
        //clear interval
        clearInterval(this.interval)
    }
}

