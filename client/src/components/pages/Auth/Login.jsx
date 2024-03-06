import React, { useContext, useEffect, useState } from 'react';
import { Button, TextField, Container, Box, FormControlLabel, Checkbox, Link, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import SnackbarAlert from '../../ui/SnackbarAlert';
import useSnackbarAlert from '../../hooks/useSnackbarAlert';
import axios from 'axios';
import { baseUrl } from '../../../utils/constants';
import { AuthContext } from '../../../store/store';
import { useNavigate  } from 'react-router-dom';
const Login = () => {

 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');
 const [showPassword, setShowPassword] = useState(false);
 const [rememberMe, setRememberMe] = useState(false);
 const { login } = useContext(AuthContext);
 const navigate = useNavigate();
 const { open, message, showAlert, closeAlert } = useSnackbarAlert();

 useEffect(() => {
    const rememberedUsername = localStorage.getItem('username');
    if (rememberedUsername) {
      setUsername(rememberedUsername);
    }
 }, []);

 const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!username || !password) {
        showAlert('Por favor, completa todos los campos.');
      } else {

        const userData = {
          username: username, 
          password: password,
       };
       try {
        const loginUrl = `${baseUrl}/api/Authenticate/login`;

        const {data} = await axios.post(loginUrl, userData);
        login(data);

        if (rememberMe) {
          localStorage.setItem('username', username);
        } else {
          
          localStorage.removeItem('username');
        }
        navigate('/');

     } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      showAlert(errorMessage);
     }
      }
 };

 
 const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
 };

 const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
        <h1>Iniciar sesión</h1>
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
            name="password"
            label="Contraseña"
            type={showPassword ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                 <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                 >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                 </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
            label="Recuérdame"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Iniciar sesión
          </Button>
          <Box mt={2}>
            <Link href="/registro" variant="body2">
              ¿No tienes una cuenta? Regístrate
            </Link>
          </Box>
        </form>
        <SnackbarAlert  open={open} message={message} handleClose={closeAlert} severity="error" />
      </Box>
    </Container>
 );
};

export default Login;
