import React from 'react';
import PropTypes from 'prop-types';

import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteIcon from '@material-ui/icons/DeleteOutlined';

import {withStyles} from '@material-ui/styles';

const styles = () => ({
  optionItem: {
    paddingTop: 5,
    paddingBottom: 5,
    color: 'grey',
    cursor: 'pointer'
  },
});

const AnswerOption = ({optionKey, optionText, removeOption, classes}) => {
  const handleRemoveOption = () => {
    removeOption(optionKey);
  };

  return (
    <ListItem disableGutters className={classes.optionItem}>
      <ListItemAvatar style={{minWidth: 35}}>
        <DeleteIcon onClick={handleRemoveOption}/>
      </ListItemAvatar>
      <ListItemText primary={optionText}/>
    </ListItem>
  );
};

AnswerOption.propTypes = {
  optionKey: PropTypes.string.isRequired,
  optionText: PropTypes.string.isRequired,
  removeOption: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnswerOption);

