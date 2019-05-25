import React, {Component} from 'react';
import BarGroup from "./BarGroup";
import * as Storage from "../../firebase/base";
import {base} from "../../firebase/base";

class ChartPage extends Component {

  state = {
    questionKey: undefined,
    votes: {},
    question: {},
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.setState({questionKey: slug});

    const questionEndpoint = `${Storage.endpoints.questions}/${slug}`;
    console.log(questionEndpoint);
    base.fetch(`${Storage.endpoints.questions}/${slug}`, {
      context: this,
      asArray: false,
    }).then(data => {
      this.setState({question: data});
    }).catch(error => {
      console.error(error);
    });

    const votesEndpoint = `${Storage.endpoints.votes}/${slug}`;
    this.votesRef = Storage.base.syncState(votesEndpoint, {
      context: this,
      state: "votes",
      asArray: true,
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.votesRef);
  }

  render() {
    const barHeight = 30;
    const {votes, question} = this.state;

    const barData = {};
    if (question && question.options) {
      const optionKeys = Object.keys(question.options);
      optionKeys.map((key) => {
        barData[question.options[key]] = 0;
        return true;
      });
    }

    if (votes.length > 0) {
      votes.map((vote) => {
        barData[vote.optionText] = barData[vote.optionText] + 1;
        return true;
      });
    }

    const optionNames = Object.keys(barData);

    const barGroups = optionNames.map((name, index) => {
      const itemName = name;
      const itemCounter = barData[name];
      return (
        <g key={name} transform={`translate(0, ${index * barHeight})`}>
          <BarGroup barHeight={barHeight} count={itemCounter} name={itemName}/>
        </g>
      );
    });

    return (
      <div>
        <svg width="800" height="300">
          <g className="container">
            <text className="title" x="10" y="30">
              {this.state.question.text}
            </text>
            <g className="chart" transform="translate(100,60)">
              {barGroups}
            </g>
          </g>
        </svg>
        <hr/>
      </div>
    );
  }
}

ChartPage.propTypes = {};

export default ChartPage;
