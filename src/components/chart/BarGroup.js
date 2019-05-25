import React from "react";
import PropTypes from 'prop-types';

const BarGroup = ({count, barHeight, name}) => {
  let barPadding = 2;
  let barColour = "#d86817";
  let widthScale = (m) => m * 10;

  let width = widthScale(count);
  let yMid = barHeight * 0.5;

  return (
    <g className="bar-group">
      <text className="name-label" x="-6" y={yMid} alignmentBaseline="middle">
        {name}
      </text>
      <rect
        y={barPadding * 0.5}
        width={width * 5}
        height={barHeight - barPadding}
        fill={barColour}
      />
      <text className="value-label" x={12} y={yMid} alignmentBaseline="middle">
        {count}
      </text>
    </g>
  );
};

BarGroup.prototype = {
  count: PropTypes.number.isRequired,
  barHeight: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

export default BarGroup;
