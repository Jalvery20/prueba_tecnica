import React, { useContext, useEffect, useRef, useState  } from 'react';
import { useNavigate, useParams,Link } from 'react-router-dom'; 
import { AuthContext } from '../../../store/store';
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography, TextField } from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AccountIcon from '@mui/icons-material/AccountCircle';

import { baseUrl } from '../../../utils/constants';
import axios from "axios"

import useSnackbarAlert from '../../hooks/useSnackbarAlert';
import SnackbarError from '../../ui/SnackbarAlert';
import MainLayout from '../../layout/MainLayout';
import { formatDateToYYYYMMDD, validateForm } from './utils';

const MantenimientoCliente = () => {
   const navigate = useNavigate(); 
   const { clientId } = useParams();
   const { authState } = useContext(AuthContext);
   const { open, message, showAlert, closeAlert, severity } = useSnackbarAlert();
   const isMounted = useRef(false);
   const fileInputRef = useRef(null);
   const [intereses, setIntereses] = useState([]);
   const [imageSrc, setImageSrc] = useState(null);
   const [formState, setFormState] = useState({
    identificacion: '',
    nombre: '',
    apellidos: '',
    sexo: 'F',
    fechaNacimiento: '',
    fechaAfiliacion: '',
    telefonoCelular: '',
    telefonoOtro: '',
    interesFK:'Seleccione',
    direccion: '',
    resenaPersonal: '',
 });

 useEffect(() => {
    // Verifica si el token existe
    if (!authState.token) {
      
      navigate('/login');
    }
 }, [authState.token, navigate]);

 

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
 };
 
   useEffect(() => {
    isMounted.current = true; // Marca el componente como montado

    const fetchIntereses = async () => {
      try {
        const response = await axios.get(`${baseUrl}/api/Intereses/Listado`);
        if (isMounted.current) { // Verifica si el componente está montado antes de actualizar el estado
          
          setIntereses(response.data);
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        showAlert(errorMessage);
      }
    };

    fetchIntereses();

    return () => {
      isMounted.current = false; // Marca el componente como desmontado
    }; 
    // eslint-disable-next-line
 }, []);

 useEffect(() => {
    isMounted.current = true; // Marca el componente como montado
    
    const fetchClient = async () => {
      try {

        const {data} = await axios.get(`${baseUrl}/api/Cliente/Obtener/${clientId}`);
        if (isMounted.current) { 
          setFormState({
            identificacion: data.identificacion, 
            nombre: data.nombre,
            apellidos: data.apellidos,
            sexo: data.sexo,
            fechaNacimiento: formatDateToYYYYMMDD(data.fNacimiento),
            fechaAfiliacion: formatDateToYYYYMMDD(data.fAfiliacion),
            telefonoCelular: data.telefonoCelular,
            telefonoOtro: data.otroTelefono,
            interesFK: data.interesFK,
            direccion: data.direccion,
            resenaPersonal: data.resenaPersonal,
          });
          setImageSrc(data.imagen ? data.imagen : "")
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        showAlert(errorMessage);
      }
    };

    clientId && fetchClient();

    return () => {
      isMounted.current = false; // Marca el componente como desmontado
    }; 
    // eslint-disable-next-line
 }, [clientId]);


 const handleIconClick = () => {
    fileInputRef.current.click();
 };

 const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Verifica si el archivo es una imagen
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImageSrc(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona un archivo de imagen.');
      }
    } else {
      setImageSrc(null);
    }
 };
 
   
 const handleSubmit = async (event) => {
    event.preventDefault();
    const errors = validateForm(formState);
    if (Object.keys(errors).length > 0) {
        const primerError = Object.entries(errors).find(([key, value]) => value);

    if (primerError) {
        showAlert(primerError[1]); 
    }
    return;
    }

    // Preparar los datos a enviar
    const data = {
        identificacion:formState.identificacion,
        nombre: formState.nombre,
        apellidos: formState.apellidos,
        telefonoCelular: formState.telefonoCelular,
        otroTelefono: formState.telefonoOtro,
        direccion: formState.direccion,
        fNacimiento: formState.fechaNacimiento,
        fAfiliacion: formState.fechaAfiliacion,
        sexo: formState.sexo, 
        resenaPersonal: formState.resenaPersonal,
        imagen: imageSrc, 
        interesFK: formState.interesFK,
        usuarioId: authState.userid, 
    };
    if (clientId) {
    data.id = clientId;
    }

    try {
      if ( clientId ) {
          await axios.post(`${baseUrl}/api/Cliente/Actualizar`, data);
        
          showAlert( "Cliente actualizado correctamente","success" )
          
         
          
      } else {
        await axios.post(`${baseUrl}/api/Cliente/Crear`, data);
         showAlert("Cliente creado correctamente","success")
      }
      setTimeout(() => {
        navigate("/consulta")
      }, 3000);
      
      
    } catch (error) {
     const errorMessage = error.response?.data?.message || error.message;
     showAlert(errorMessage);
    }
 };

 

 return (
   <MainLayout>
        <Box sx={{ display: 'flex', flexGrow: 1,padding:3 }}>
          <Box sx={{ width: '100%',flexDirection:"column", border: '1px solid #ccc', padding: 2, display: 'flex'  }}>
            <form onSubmit={handleSubmit}>
              <Box sx={{ display: 'flex', justifyContent:"space-between",  }}>
                <Box sx={{ display: 'flex',alignItems:'center'  }}>
                    {imageSrc ? (
                      <img
                        src={imageSrc}
                        alt="Selected"
                        style={{ marginRight: 3, cursor: 'pointer', width: 40, height: 40,borderRadius:'100%' }}
                        onClick={handleIconClick}
                      />
                    ) : (
                      <AccountIcon
                        sx={{ marginRight:{ xs:0, sm:1, md:3 } , fontSize:{xs:20, sm:30, md:40} , cursor: 'pointer' }}
                        onClick={handleIconClick}
                      />
                    )}
                    <Typography sx={{ fontSize: { xs:'.75rem', sm: '.80rem', lg: '1.20rem' } }} fontWeight="bold" variant="h5">Mantenimiento de clientes</Typography>
                    <input
                        type="file"
                        ref={fileInputRef}
                        style={{ display: 'none' }} 
                        onChange={handleFileChange}
                     />
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent:"space-between", gap: 2 }}>
                    <Button
                        variant="contained"
                        type='submit'
                        startIcon={<SaveIcon />}
                        aria-label="guardar"
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
                        Guardar
                    </Button>
                <Link to="/consulta">
                  <Button
                    variant="contained"
                    
                    startIcon={<ArrowBackIcon />}
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
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 3, justifyContent: 'space-between', }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                    <TextField autoFocus name="identificacion"  value={formState.identificacion} onChange={handleChange} fullWidth placeholder="Identificación" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth name="nombre"  value={formState.nombre} onChange={handleChange} placeholder="Nombre*" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth name="apellidos"  value={formState.apellidos} onChange={handleChange} placeholder="Apellidos*" />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel id="gender-label">Género*</InputLabel>
                    <Select
                      labelId="gender-label"
                      label="Género*"
                      name='sexo'
                      value={formState.sexo} 
                      onChange={handleChange} 
                    >
                      <MenuItem value="F">Femenino</MenuItem>
                      <MenuItem value="M">Masculino</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha de Nacimiento*"
                    name="fechaNacimiento"  
                    value={formState.fechaNacimiento} 
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    type="date"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    label="Fecha de Afiliación*"
                    name="fechaAfiliacion"  
                    value={formState.fechaAfiliacion} 
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>

              <Grid container spacing={2} mt={2}>
                <Grid item xs={4}>
                    <TextField fullWidth name="telefonoCelular"  value={formState.telefonoCelular} onChange={handleChange} placeholder="Teléfono Celular*" />
                </Grid>
                <Grid item xs={4}>
                    <TextField fullWidth  name="telefonoOtro"  value={formState.telefonoOtro} onChange={handleChange} placeholder="Teléfono Otro*" />
                </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth>
                  <InputLabel id="interes-label">Interés*</InputLabel>
                  <Select
                    labelId="interes-label"
                    label="Interés*"
                    name="interesFK"  
                    value={formState.interesFK} 
                    onChange={handleChange} 
                  >
                    <MenuItem disabled value="Seleccione">Seleccione</MenuItem>
                      {intereses.map((interes) => (
                          <MenuItem key={interes.id} value={interes.id}>
                            {interes.descripcion}
                          </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>

            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                  <TextField fullWidth name="direccion"  value={formState.direccion} onChange={handleChange} placeholder="Dirección*" />
              </Grid>
            </Grid>
            <Grid container spacing={2} mt={2}>
              <Grid item xs={12}>
                  <TextField fullWidth name="resenaPersonal"  value={formState.resenaPersonal} onChange={handleChange} placeholder="Reseña*" />
              </Grid>
            </Grid>
          </Box>
        </form>
      </Box>
    </Box>
    <SnackbarError  open={open} message={message} handleClose={closeAlert} severity={severity} />
  </MainLayout>
 );
};

export default MantenimientoCliente;
