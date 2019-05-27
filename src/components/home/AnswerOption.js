import React from 'react';
import PropTypes from 'prop-types';

const AnswerOption = ({optionKey, optionText, removeOption}) => {
  const handleRemoveOption = () => {
    removeOption(optionKey);
  };

  return (
    <li>
      <span>{optionText}</span>
      <span onClick={handleRemoveOption} className="circle-minius">x</span>
    </li>
  );
};

AnswerOption.propTypes = {
  optionKey: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
};

export default AnswerOption;

