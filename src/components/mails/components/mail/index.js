import React from 'react'
import './styles.styl'

const calculateTime = (date) => {
    const received_at = new Date(date).getTime()
    let now = new Date().getTime()
    let distance = -1*parseInt((received_at - now) / 1000)

    if (distance < 60) return `${distance} seconds ago`
    if (distance >= 60 || distance < 60 * 60) return `${parseInt(distance / 60)} minutes ago`
    if (distance >= 60 * 60) return `${parseInt(distance / (60*60) )} hours ago`

    console.log(distance)
    return date
}

export default class Mail extends React.Component{
    constructor(props){
        super(props)
        this.interval = null
        this.mail = props.mail

        this.state = {
            received_at: calculateTime(this.mail.received_at)
        }
    }
    render(){
        return(
            <div className="Mail">
                <div className="subject">
                    <span>{this.mail.subject}</span>
                </div>
                <div className="from">
                    <span>{this.mail.from}</span>
                </div>
                <div className="received_at">
                    <span>{this.state.received_at}</span>
                </div>
            </div>
        )
    }

    componentDidMount(){
        //asignar intervalo para actualizar el tiempo de recibido
        this.interval = setInterval(function(){
            this.setState({
                received_at: calculateTime(this.mail.received_at)
            })
        }.bind(this), 1000 * 10)
    }

    componentWillUnmount(){
        //limpiar intervalo
        clearInterval(this.interval)
    }
}