import React, { Component } from "react";
import BarGroup from "./BarGroup";
import { base } from "../firebase/base";
import * as Storage from "../firebase/base";

export default class BarChart extends Component {
  state = {
    votes: {}
  };

  componentWillMount() {
    this.votesRef = Storage.base.syncState(Storage.endpoints.votes, {
      context: this,
      state: "votes"
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.votesRef);
  }

  render() {
    const barHeight = 30;
    const { votes } = this.state;
    const keys = Object.keys(this.state.votes);

    const barGroups = keys.map((key, index) => (
      <g key={votes[key].id} transform={`translate(0, ${index * barHeight})`}>
        <BarGroup barHeight={barHeight} count={keys.length} name={votes[key].name}/>
      </g>
    ));

    return (
      <div>
        <svg width="800" height="300">
          <g className="container">
            <text className="title" x="10" y="30">
              Week beginning 9th July
            </text>
            <g className="chart" transform="translate(100,60)">
              {barGroups}
            </g>
          </g>
        </svg>
        <hr />
      </div>
    );
  }
}
