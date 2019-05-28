import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import FormControl from "@material-ui/core/FormControl/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel/FormControlLabel";
import Radio from "@material-ui/core/Radio/Radio";
import Container from "@material-ui/core/Container/Container";

const PollPreview = ({pollText, pollOptions}) => {
  const keys = Object.keys(pollOptions);
  return (
    <Container className={'question-preview'} maxWidth="sm">
      <Typography variant={'h6'} gutterBottom display={'block'}>
        {pollText}
      </Typography>
      {keys.length > 0 && (
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="answer-option"
            name="answer-option"
          >
            {keys.map((key, index) => (
              <FormControlLabel key={index} value={key} control={<Radio/>} label={pollOptions[key]}/>
            ))}
          </RadioGroup>
        </FormControl>
      )}
    </Container>
  );
};

PollPreview.propTypes = {
  pollText: PropTypes.string.isRequired,
  pollOptions: PropTypes.array.isRequired,
};

export default PollPreview;
