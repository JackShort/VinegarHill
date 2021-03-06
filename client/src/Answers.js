import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import {Helmet} from 'react-helmet';
import Particles from 'react-particles-js';

class Answers extends Component {
  constructor(props) {
    super(props)
    this.state = {answers: [{'answer':''}]};
    this.tick = this.tick.bind(this);
  }

  tick() {
    axios.get('http://localhost:3001/answers')
      .then(res => this.setState({ answers: res.data }));
  }

  componentDidMount() {
    this.interval = setInterval(this.tick, 1000);

    axios.get('http://localhost:3001/answers')
      .then(res => this.setState({ answers: res.data }));
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var pageHeader = 
      <div className="page-header">
        <h1>Responses</h1>      
      </div>
    var answerList = this.state.answers.map(function(answer) {
      var shouldShowImage = answer.hasPicture;
      return <div className="row fixed-height" key={Math.random()}>
        <div className="col-md-4 inline-row picture" key={Math.random()}>
          <img key={Math.random()} src={ answer.mediaUrl } alt="Smiley face" height="250" width="200" hidden={ !shouldShowImage }/>
        </div>
        <div className="col-md-8 inline-row response-div" key={Math.random()}>
          <p className="response" key={Math.random()}>"{ answer.answer }"</p>
        </div>
      </div>;
    });

    return (
      <div className="container"> 
        <div className="background">
          <Particles
            params={
              {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}},"color":{"value":"#68efad"},"shape":{"type":"circle","stroke":{"width":0,"color":"#9b26af"},"polygon":{"nb_sides":5}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#9b26af","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":70,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
            }
          />
        </div>
      <Helmet>
              <style>{'body { background-color: #f5f5f5; }'}</style>
      </Helmet>
      { pageHeader } { answerList } 
      </div>
    );
  }
}

export default Answers;
