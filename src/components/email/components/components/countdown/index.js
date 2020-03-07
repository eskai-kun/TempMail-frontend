import React from 'react';
import './styles.styl';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPlay } from '@fortawesome/free-solid-svg-icons/faPlay'

export default class Countdown extends React.Component {
    constructor(props) {
        super(props);
        this.status = true;

        //refs
        this.minutes = React.createRef();
        this.seconds = React.createRef();

    }

    render() {
        console.log(this.props.date)
        this.countDown = new Date(this.props['date']).getTime();
        let now = new Date().getTime();
        let distance = this.countDown - now;
        if (distance < 0 || this.props['date'] == null) {
            //conteo ya finalizo, regresar null
            this.status = false;
            return (
                <div></div>
            )
        }


        return (
            <div className="Email-Countdown">
                <span>Self destruction:</span>
                <ul>
                    <li><span ref={this.minutes}>0</span>Minutes</li>
                    <li><span ref={this.seconds}>0</span>Seconds</li>
                </ul>

            </div>
        )
    }

    componentDidMount() {
        //asignar cuenta regresiva
        if (this.status) this.interval = this.setCountDown(this.props['date']);
    }


    setCountDown() {
        this.renderCountDown();//render inicial
        return setInterval(this.renderCountDown, 1000);
    }

    componentWillUnmount() {
        //limpiar intervalo
        clearInterval(this.interval);
    }




    renderCountDown = () => {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60

        let now = new Date().getTime(),
            distance = this.countDown - now;

            this.minutes.current.innerText = Math.floor((distance % (hour)) / (minute)),
            this.seconds.current.innerText = Math.floor((distance % (minute)) / second);

        //do something later when date is reached
        if (distance < 0) {
            this.minutes.current.innerText = 0
            this.seconds.current.innerText = 0
            clearInterval(this.interval);

            //update the father
            localStorage.removeItem('Email')
            this.props.context.setState({
                status: 'unload',
                Email: {
                    _id: null,
                    email: null,
                    created_at: null,
                    remove_at: null,
                    mails: []
                }
            })
        }

    }


}