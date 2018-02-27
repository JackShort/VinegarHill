import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Question from './Question';
import Answers from './Answers';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Question}/>
        <Route exact path='/question' component={Question}/>
        <Route exact path='/answers' component={Answers}/>
      </Switch>
    );
  }
}

export default Main;
