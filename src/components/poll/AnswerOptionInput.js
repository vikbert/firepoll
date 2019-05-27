import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 20,
    backgroundColor: theme.palette.background.paper,
  },
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    gridGap: `${theme.spacing(3)}px`,
  },
  inline: {
    display: 'inline',
  },
  textField: {
    marginBottom: '10px',
  },
});

const AnswerOptionInput = ({classes, addAnswer}) => {
  const [optionInput, setOptionInput] = useState('');
  const [optionIsEmpty, setOptionIsEmpty] = useState(false);

  const handleChangeOption = (e) => {
    const inputValue = e.target.value.trim();
    if (inputValue.length > 0) {
      setOptionInput(inputValue);
      setOptionIsEmpty(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applyAddAnswer();
    }
  };

  const applyAddAnswer = () => {
    if (optionInput.length === 0) {
      setOptionIsEmpty(true);
      return;
    }

    addAnswer(optionInput);
    setOptionInput('');
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <TextField
            label="Option:"
            style={{margin: 8}}
            fullWidth
            error={optionIsEmpty}
            placeholder="the optional answer"
            helperText={optionIsEmpty ? 'Can not be empty' : 'Press <Enter> to add option'}
            margin="normal"
            InputLabelProps={{shrink: true}}
            value={optionInput}
            onChange={handleChangeOption}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={4}>
          <Fab color={'primary'} size={'medium'} onClick={applyAddAnswer}>
            <AddIcon/>
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

AnswerOptionInput.propTypes = {
  addAnswer: PropTypes.func.isRequired,
};

export default withStyles(styles)(AnswerOptionInput);