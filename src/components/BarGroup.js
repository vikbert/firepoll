import React from "react";

const BarGroup = (props) => {
  let barPadding = 2;
  let barColour = "#d86817";
  let widthScale = (d) => d * 10;

  let width = widthScale(props.d.value);
  let yMid = props.barHeight * 0.5;

  return (
    <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle">
        {props.d.name}
      </text>
      <rect
        y={barPadding * 0.5}
        width={width * 5}
        height={props.barHeight - barPadding}
        fill={barColour}
      />
      <text className="value-label" x={12} y={yMid} alignmentBaseline="middle">
        {props.d.value}
      </text>
    </g>
  );
};

export default BarGroup;
