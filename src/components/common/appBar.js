import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import AccountIcon from '@material-ui/icons/AccountCircle';
import {NavLink} from 'react-router-dom';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
    fontFamily: 'Alfa Slab One',
    textShadow: '0 1px 0 #5d0a6b',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

function PollAppBar(props) {
  const {classes} = props;
  const theme = useTheme();
  const matchedNormalScreen = useMediaQuery(theme.breakpoints.up('sm'));
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <nav>
            <NavLink to={"/"} activeStyle={{color: '#ffffff'}} style={{color: '#ffffff'}} exact>
              <AddIcon/>
            </NavLink>
          </nav>

          <Typography variant="h4" color="inherit" className={classes.grow} align={'center'}>
            {matchedNormalScreen ? 'FirePoll' : 'fp'}
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
