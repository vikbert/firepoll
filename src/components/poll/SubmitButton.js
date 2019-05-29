import React from 'react';
import PropTypes from 'prop-types';
import Grid from "@material-ui/core/Grid/Grid";
import Fab from "@material-ui/core/Fab/Fab";
import {withStyles} from '@material-ui/styles';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = theme => ({
  root: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
});
const SubmitButton = ({classes, handleSubmit}) => {

  const theme = useTheme();
  const matchedNormalScreen = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <div>
      <Grid container direction={'row'} justify={'flex-end'} alignItems={'center'}>
        <Fab
          size={'large'}
          variant={'extended'}
          color={"primary"}
          aria-label="save the question"
          onClick={handleSubmit}
        >
          Submit Poll
        </Fab>
      </Grid>
    </div>
  );
};

SubmitButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(SubmitButton);
