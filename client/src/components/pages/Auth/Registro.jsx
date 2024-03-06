import React, { useState } from 'react';
import { Button, TextField, Container, Box } from '@mui/material';
import useSnackbarAlert from '../../hooks/useSnackbarAlert';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import SnackbarAlert from '../../ui/SnackbarAlert';

const Registro = () => {
  
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [email, setEmail] = useState('');
 const { open, message, showAlert, closeAlert } = useSnackbarAlert();
 const navigate = useNavigate();
 const handleSubmit = async (event) => {
  event.preventDefault();

  
  if (!username || !password || !email) {
      showAlert('Por favor, completa todos los campos.');
      return; 
  }

  // Expresión regular para validar el correo electrónico
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  // Expresión regular para validar la contraseña
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])?[A-Za-z\d@$!%*?&]{8,20}$/;


  // Verificar si el correo electrónico es válido
  if (!emailRegex.test(email)) {
      showAlert('Por favor, ingresa una dirección de correo válida.');
      return; 
  }

  // Verificar si la contraseña cumple con los requisitos
  if (!passwordRegex.test(password)) {
      showAlert('La contraseña debe tener entre 8 y 20 caracteres, al menos una mayúscula, una minúscula y un número.');
      return; 
  }

 

  const userData = {
      username: username,
      email: email,
      password: password,
  };

  try {
      const registerUrl = `${baseUrl}/api/Authenticate/register`;
      await axios.post(registerUrl, userData);
      navigate('/login');
  } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      showAlert(errorMessage);
  }
};


 return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            fullWidth
            id="usuario"
            label="Usuario"
            name="usuario"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Dirección de correo"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            name="password"
            label="Contraseña"
            type={'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            
          />
        
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            REGISTRARME
          </Button>
        </form>
        <SnackbarAlert  open={open} message={message} handleClose={closeAlert} severity={"error"} />
      </Box>
    </Container>
 );
}

export default Registro
