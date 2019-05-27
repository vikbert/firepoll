import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Fab from '@material-ui/core/Fab';
import RemoveIcon from '@material-ui/icons/Remove';

const AnswerOption = ({optionKey, optionText, removeOption}) => {
  const handleRemoveOption = () => {
    removeOption(optionKey);
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Fab size="small" aria-label="remove" color={'secondary'}>
            <RemoveIcon onClick={handleRemoveOption}/>
          </Fab>
        </ListItemAvatar>
        <ListItemText primary={optionText}/>
      </ListItem>
    </>
  );
};

AnswerOption.propTypes = {
  optionKey: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
};

export default AnswerOption;

