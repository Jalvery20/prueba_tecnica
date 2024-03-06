import { useState } from 'react';

const useSnackbarAlert = () => {
 const [open, setOpen] = useState(false);
 const [message, setMessage] = useState('');
 const [severity,setSeverity] = useState('error')

 const showAlert = (message,severity = "error", duration = 5000) => {
    setMessage(message);
    setSeverity(severity)
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, duration);
 };

 const closeAlert = () => {
    setOpen(false);
 };

 return { open, message, showAlert, closeAlert, severity, setSeverity };
};

export default useSnackbarAlert;
