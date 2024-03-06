import React,{useContext} from 'react';
import { Box, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../store/store';

const Sidebar = () => {
 const { authState } = useContext(AuthContext);
 

 return (
    <Box
    sx={{
      position: { xs: 'absolute', sm: 'relative' },
      width: { xs: '200px', md: '275px', lg: '300px', xl: '325px' },
      bgcolor: '#D3D9D3',
      height:"100%",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      boxSizing: 'border-box',
      zIndex: 5,
   }}
    >
      <Box sx={{ width: '100%', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <AccountCircleIcon sx={{ fontSize: 120 }} />
        <Typography fontWeight="bold" variant="h6" >{authState.username}</Typography>
      </Box>
      <Box sx={{ width: '100%', borderTop: '2px solid #ccd', borderBottom: '2px solid #ccd', padding: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', boxSizing: 'border-box' }}>
        <Typography fontWeight="bold" variant="h5" >MENÚ</Typography>
      </Box>
      <Box sx={{ width: '100%', padding: 5, display: 'flex', flexDirection: 'column', alignItems: 'left', boxSizing: 'border-box' }}>
         <Link to="/" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: "pointer" }}>
               <Typography variant="body1" sx={{ color: '#0099CC', mr: 2 }}>
                  IN
               </Typography>
               <Typography variant="body1">
                  INICIO
               </Typography>
            </Box>
         </Link>
         <Link to="/consulta" style={{ textDecoration: 'none' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, cursor: "pointer" }}>
               <Typography variant="body1" sx={{ color: '#0099CC', mr: 2 }}>
                  CC
               </Typography>
               <Typography variant="body1">
                  Consulta Clientes
               </Typography>
            </Box>
         </Link>
      </Box>
    </Box>
 );
};

export default Sidebar;
