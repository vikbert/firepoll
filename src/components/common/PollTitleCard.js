import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/styles';
import CardHeader from "@material-ui/core/CardHeader/CardHeader";
import Avatar from "@material-ui/core/Avatar/Avatar";
import Card from "@material-ui/core/Card/Card";

const styles = () => ({
  title: {
    color: '#5d5959',
  },
  avatar: {
    backgroundColor: '#bcb23e',
  },
});

const PollTitle = props => {
  const {title, classes} = props;
  const headerAvatar = <Avatar aria-label="Recipe" className={classes.avatar}>Q</Avatar>;
  return (
    <Card>
      <CardHeader avatar={headerAvatar} title={title}/>
    </Card>
  );
};

PollTitle.propTypes = {
  title: PropTypes.string,
};

export default withStyles(styles)(PollTitle);
