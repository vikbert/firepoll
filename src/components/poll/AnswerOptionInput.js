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
    setOptionInput(e.target.value);
    setOptionIsEmpty(false);
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
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            label="Poll Options:"
            fullWidth
            error={optionIsEmpty}
            placeholder={'Your optional answer'}
            margin="normal"
            InputLabelProps={{shrink: true}}
            value={optionInput}
            onChange={handleChangeOption}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={3} container alignItems={'center'} justify={'flex-end'}>
          <Fab size={'medium'} onClick={applyAddAnswer}>
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
