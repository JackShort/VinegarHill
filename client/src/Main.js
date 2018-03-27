import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom'
import Question from './Question';
import Answers from './Answers';
import VoteQuestion from './VoteQuestion';
import Votes from './Votes';

class Main extends Component {
  render() {
    return (
      <Switch>
        <Route exact path='/' component={Question}/>
        <Route exact path='/question' component={Question}/>
        <Route exact path='/voteQuestion' component={VoteQuestion}/>
        <Route exact path='/answers' component={Answers}/>
        <Route exact path='/votes' component={Votes}/>
        <Route exact path='/voteMobile' component={Votes}/>
      </Switch>
    );
  }
}

export default Main;
