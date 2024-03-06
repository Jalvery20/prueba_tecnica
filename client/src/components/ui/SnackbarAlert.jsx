import React from 'react';
import {Snackbar, Alert} from '@mui/material';

const SnackbarAlert = ({ open, message, handleClose, severity }) => {
 return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
      <Alert onClose={handleClose}  severity={severity} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
 );
};

export default SnackbarAlert;
