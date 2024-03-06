import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { AuthContext } from '../../../store/store';
import { Box, Typography } from '@mui/material';
import MainLayout from '../../layout/MainLayout';

const Home = () => {
   const navigate = useNavigate(); 
   const { authState } = useContext(AuthContext);
 
   useEffect(() => {
    // Verifica si el token existe
    if (!authState.token) {
      
      navigate('/login');
    }
 }, [authState.token, navigate]);

 return (
  <MainLayout>
    <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1, mt: 17 }}>
      <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' } }} variant="h2">
        Bienvenido
      </Typography>
    </Box>
  </MainLayout>
 );
};

export default Home;
