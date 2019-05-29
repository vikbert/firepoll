import React from 'react';
import PropTypes from 'prop-types';
import Typography from "@material-ui/core/Typography/Typography";
import {withStyles} from '@material-ui/styles';

const styles = () => ({
  title: {
    color: '#5d5959',
  },
});

const PollTitle = props => {
  const {title, classes} = props;
  return (
    <Typography className={classes.title} variant={'subtitle1'}>{title}</Typography>
  );
};

PollTitle.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(PollTitle);
