import React from 'react';
import PropTypes from 'prop-types';

const Option = ({optionId, optionText, divName, selectAnswer}) => {

  const handleClick = () => {
    selectAnswer(optionId, optionText);
  };

  return (
    <div
      key={optionId}
      onClick={handleClick}
      className={divName}
    >
      <span className={'icon-selected'}>✓</span>
      {optionText}
    </div>
  );
};

Option.propTypes = {
  optionId: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired,
  divName: PropTypes.string.isRequired,
  selectAnswer: PropTypes.func.isRequired,
};

export default Option;
