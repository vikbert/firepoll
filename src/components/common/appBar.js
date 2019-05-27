import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AccountIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PollAppBar(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Link color="inherit" href="/">
              <AddIcon/>
            </Link>
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Create a new poll
          </Typography>
          <IconButton color="inherit" target="_blank" href="https://github.com/vikbert">
            <AccountIcon/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

PollAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PollAppBar);
