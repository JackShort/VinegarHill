import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Particles from 'react-particles-js';
import {Helmet} from 'react-helmet';

class VoteQuestion extends Component {
  constructor(props) {
    super(props)
    this.state = {question: ""};
  }


  componentWillUnmount() {
  }


  componentDidMount() {
    axios.get('http://localhost:3001/voteQuestion')
      .then(res => this.setState({ question: res.data }));
  }

  render() {
    return (
      <div className="question">
      <Helmet>
              <style>{'body { background-color: black; }'}</style>
      </Helmet>
        <div className="thequestion">
          <p>
            { this.state.question }
          </p>
          <div className="phoneNumber">
            <ol>
              <li>Foundations in Design Thinking</li>
              <li>Design, Thinking, and Making</li>
              <li>Designing & Thinking</li>
            </ol>
          </div>
          <span className="phoneNumber">
            Text "1", "2", or "3" to (240) 823-4215 to answer.
          </span>
          <br />
          <span className="phoneNumber">
            Or goto jackshort.github.io to vote.
          </span>
        </div>
        <div className="background">
          <Particles
            params={
              {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}},"color":{"value":"#68efad"},"shape":{"type":"circle","stroke":{"width":0,"color":"#000000"},"polygon":{"nb_sides":5}},"opacity":{"value":0.5,"random":false,"anim":{"enable":false,"speed":1,"opacity_min":0.1,"sync":false}},"size":{"value":3,"random":true,"anim":{"enable":false,"speed":40,"size_min":0.1,"sync":false}},"line_linked":{"enable":true,"distance":150,"color":"#ffffff","opacity":0.4,"width":1},"move":{"enable":true,"speed":6,"direction":"none","random":false,"straight":false,"out_mode":"out","bounce":false,"attract":{"enable":false,"rotateX":600,"rotateY":1200}}},"interactivity":{"detect_on":"canvas","events":{"onhover":{"enable":true,"mode":"repulse"},},"modes":{"grab":{"distance":400,"line_linked":{"opacity":1}},"bubble":{"distance":400,"size":40,"duration":2,"opacity":8,"speed":3},"repulse":{"distance":70,"duration":0.4},"push":{"particles_nb":4},"remove":{"particles_nb":2}}},"retina_detect":true}
            }
          />
        </div>
      </div>
    );
  }
}

export default VoteQuestion;
