import React from 'react';
import ReactDom from 'react-dom';
import './src/assets/reset.css';
import './src/assets/themes.styl';//temas
import './src/assets/fonts.styl';//fonts
// import WindowModal from '../src/windowModal/windowModal';
// import Message from '../src/template_parts/message/message';
// import {BrowserRouter, Route, Switch } from 'react-router-dom';
// import Main from './../src/pages/main';
// import API from './../src/classes/API.v1';
// import Session from './../src/classes/Session';
// import Episode from './../src/pages/episode/';
// import Simulcast from './../src/pages/simulcast/';
// import Anime from './../src/pages/anime/';
// import Directory from './../src/pages/directory/';
import Header from './src/components/header';//header universal
import Footer from './src/components/footer';//header universal
import MainContainer from './src/components/mainContainer';//header universal
import Email from './src/components/email';//header universal
// import Footer from './../src/template_parts/footer/footer';//header universal
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import API from './src/lib/api.v1'

const client = new ApolloClient({
  uri: new API().info.url
})

    //API v1
    // window.API = new API();


 //contenedor de modal
// const windowModal_container = document.getElementById('modal');
// ReactDom.render(<WindowModal/>, windowModal_container);


//contenedor de message
// const message_container = document.getElementById('message');
// ReactDom.render(<Message/>, message_container);



//contenedor de la app principal

const container = document.getElementById('app');
ReactDom.render(
  <ApolloProvider client={client}>

        <Header/>
          <MainContainer>
                <Email />
          </MainContainer>
        

         <Footer/>
  </ApolloProvider>
, container);