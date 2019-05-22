import React, { Component } from "react";
import BarGroup from "./BarGroup";

export default class BarChart extends Component {
  state = {
    data: [
      { name: "vue.js", value: 2 },
      { name: "react.js", value: 4 },
      { name: "angular.js", value: 9 }
    ]
  };

  render() {
    let barHeight = 30;

    let barGroups = this.state.data.map((d, i) => (
      <g transform={`translate(0, ${i * barHeight})`}>
        <BarGroup d={d} barHeight={barHeight} />
      </g>
    ));

    return (
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
    );
  }
}
