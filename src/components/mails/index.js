import React, { useState } from 'react'
import './styles.styl'
import {  Query } from 'react-apollo'
import { gql } from 'apollo-boost'
import Mail from './components/mail'

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
const MailWithQuery = ({ id }) =>{
    const [count, setCount] = useState(0) 
    if (count == 0) setInterval(() => {
        setCount(count+1)

    }, 10*1000);
    console.log(count)

    
}




export default class Mails extends React.Component{
    constructor(props){
        super(props)
        this.interval = null;
        this.state = {
            count:0,
            mails:[]
        }
    }
    render(){
        let context = this

        let id = this.props.id
        return <Query key={this.state.count} query={GET_ALL_MAILS} variables={{ id }} fetchPolicy='no-cache'>
            {
                ({ data = { getEmail: { mails: [] } } }) => {
                    //if length changed
                    if (data.getEmail.mails.length > context.state.mails.length){
                        //update
                        context.setState({
                            mails: data.getEmail.mails
                        })
                    }
                    return context.state.mails.map((mail, index) => {
                        return <Mail key={index} mail={mail}/>
                    })
                }
            }
        </Query>
    }

    componentDidMount(){
        let context = this
        this.interval = setInterval(() => {
            context.setState({
                count: context.state.count + 1
            })
        }, 5000);
    }

    componentWillUnmount(){
        //clear interval
        clearInterval(this.interval)
    }
}

