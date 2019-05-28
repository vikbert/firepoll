import React, {useState} from 'react';
import PropTypes from 'prop-types';

import {withStyles} from '@material-ui/styles';
import TextField from "@material-ui/core/TextField/TextField";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import CheckIcon from '@material-ui/icons/Check';

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

const QuestionInput = ({classes, labelText, placeholderText, handleSubmit}) => {
  const [textInput, setTextInput] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [textInputIsEmpty, setTextInputIsEmpty] = useState(false);

  const handleChangeOption = (e) => {
    const inputValue = e.target.value;
    setTextInput(inputValue);
    setTextInputIsEmpty(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      applySubmit();
    }
  };

  const applySubmit = () => {
    if (textInput.trim().length === 0) {
      setTextInputIsEmpty(true);
      setTextInput('');
      return;
    }

    handleSubmit(textInput);
    setIsSaved(true);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={9}>
          <TextField
            label={labelText}
            fullWidth
            error={textInputIsEmpty}
            placeholder={'Your question'}
            margin="normal"
            InputLabelProps={{shrink: true}}
            value={textInput}
            onChange={handleChangeOption}
            onKeyPress={handleKeyPress}
          />
        </Grid>
        <Grid item xs={3} container alignItems={'center'} justify={'flex-end'}>
          <Fab size={'medium'} onClick={applySubmit}>
            {isSaved
              ? <CheckIcon color={'primary'}/>
              : <AddIcon/>
            }
          </Fab>
        </Grid>
      </Grid>
    </div>
  );
};

QuestionInput.propTypes = {
  labelText: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(QuestionInput);
