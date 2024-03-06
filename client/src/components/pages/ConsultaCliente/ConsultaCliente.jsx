import React, { useContext, useEffect, useState  } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import { AuthContext } from '../../../store/store';
import { Box, Button, SvgIcon, Typography } from '@mui/material';
import { Fab, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import styled from '@emotion/styled';
import ClientsTable from '../../ui/ClientsTable';
import { baseUrl } from '../../../utils/constants';
import axios from "axios"
import useSnackbarAlert from '../../hooks/useSnackbarAlert';
import SnackbarError from '../../ui/SnackbarAlert';
import MainLayout from '../../layout/MainLayout';
const StyledFab = styled(Fab)({
   backgroundColor: 'white',
   color: 'black',
   width: '40px', 
   height: '40px',
   marginLeft:"10px", 
   cursor: 'pointer', 
   '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
   },
  });

const ConsultaCliente = () => {
   const navigate = useNavigate(); 
   const { authState } = useContext(AuthContext);
   const [clients,setClients]=useState([])
   const [nombre,setNombre]=useState('')
   const [identificacion,setIdentificacion]=useState('')
   const { open, message, showAlert, closeAlert } = useSnackbarAlert();
   useEffect(() => {
    // Verifica si el token existe
    if (!authState.token) {
      
      navigate('/login');
    }
 }, [authState.token, navigate]);

 const handleSearch = async () => {
  const usuarioId = authState.userid;
  try {
    const response = await axios.post(
      `${baseUrl}/api/Cliente/Listado`,
      { nombre, identificacion, usuarioId },
      {
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      }
    );

    setClients(response.data); 
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    showAlert(errorMessage);
  }
};

 return (
 <MainLayout>      
        <Box sx={{ display: 'flex', flexGrow: 1,padding:3 }}>
          <Box sx={{ width: '100%',flexDirection:"column", border: '1px solid #ccc', padding: 2, display: 'flex',  }}>
            <Box sx={{ display: 'flex', justifyContent:"space-between" }}>
              <Typography  sx={{ fontSize: { xs:'.75rem', sm: '1.00rem', lg: '1.20rem' } }} fontWeight="bold" variant="h5">Consulta de Clientes</Typography>
              <Box sx={{ display: 'flex', justifyContent:"space-between", gap: 2 }}>
                <Link style={{textDecoration:"none"}} to="/mantenimiento">
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    aria-label="agregar"
                    sx={{
                      backgroundColor: '#eee',
                      color: 'black',
                      fontSize: { xs: '.60rem', sm: '.80rem' },
                      width: { xs: '100%', sm: 'auto' }, 
                      padding: { xs: '6px 2px', sm: '6px 12px', md: '8px 16px' }, 
                      '& .MuiSvgIcon-root': { // Selecciona el icono dentro del botón
                        fontSize: { xs: '.90rem', sm: '1.2rem' },
                      }, 
                      '&:hover': { 
                    backgroundColor: '#eee', 
                    color: 'black',
                      }
                    }}
                  >
                    Agregar
                  </Button>
                </Link>
                <Link  style={{textDecoration:"none"}} to="/">
                  <Button
                    variant="contained"
                    startIcon={<ArrowBackIcon  />}
                    aria-label="regresar"
                    sx={{
                      backgroundColor: '#eee',
                      color: 'black',
                      fontSize: { xs: '.60rem', sm: '.80rem' },
                      width: { xs: '100%', sm: 'auto' }, 
                      padding: { xs: '6px 2px', sm: '6px 12px', md: '8px 16px' }, 
                      '& .MuiSvgIcon-root': { // Selecciona el icono dentro del botón
                        fontSize: { xs: '.90rem', sm: '1.2rem' },
                      }, 
                      '&:hover': { 
                      backgroundColor: '#eee', 
                      color: 'black',
                      }
                    }}
                  >
                  Regresar
                  </Button>
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems:"center",mt:1, justifyContent:"space-between" }}>
                  <TextField
                    variant="outlined"
                    placeholder="Nombre"
                    sx={{ width:"45%"}}
                    fullWidth
                    value={nombre}
                    onChange={(e)=>setNombre(e.target.value)}
                    margin="normal"
                  />
                  <TextField
                    variant="outlined"
                    placeholder="Identificación"
                    sx={{ width:"45%" }}
                    value={identificacion}
                    onChange={(e)=>setIdentificacion(e.target.value)}
                    margin="normal"
                  />
                  <StyledFab onClick={handleSearch} >
                    <SvgIcon component={SearchIcon} sx={{ fontSize: '25px' }} />
                  </StyledFab>
              </Box>
              <ClientsTable setClients={setClients} clients={clients}/>
            </Box>
          </Box>
        <SnackbarError  open={open} message={message} handleClose={closeAlert} />
    
  </MainLayout>
   
 );
};

export default ConsultaCliente;
