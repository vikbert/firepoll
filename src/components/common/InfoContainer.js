import React from 'react';
import PropTypes from 'prop-types';
import Box from "@material-ui/core/Box/Box";
import Typography from "@material-ui/core/Typography/Typography";
import HighlightIcon from "@material-ui/icons/Highlight";

const InfoContainer = ({info}) => {
  return (
    <>
      <Box>
        <Typography component={'p'} align={'center'} style={{color: '#b7b7b7', margin: '1em'}}>
          {info}
        </Typography>
      </Box>

      <Box display={'flex'} justifyContent={'center'}>
        <HighlightIcon color={'disabled'} style={{fontSize: 60, display: 'block'}}/>
      </Box>
    </>
  );
};

InfoContainer.propTypes = {
  info: PropTypes.string
};

export default InfoContainer;
