import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import { styled } from '@mui/system';
import { Fab, SvgIcon } from '@mui/material';
import { AuthContext } from '../../store/store';


const LogoutFab = styled(Fab)(({ theme }) => ({
  backgroundColor: 'white',
  color: 'black',
  width: '35px', // Ancho base
  height: '35px', // Alto base
  marginLeft: '10px',
  cursor: 'pointer',
  '&:hover': {
     backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  
  [theme.breakpoints.up('sm')]: {
     width: '40px', 
     height: '40px', 
  }
 }));


const Navbar = ({setShowSidebar}) => {
 const { logout, authState } = useContext(AuthContext);

 const handleLogout = () => {
   logout();
 };

 return (
    <AppBar position="static" sx={{ backgroundColor: 'black', color: 'white', borderBottom: '1px solid #00A2E8' }}>
      <Toolbar>
        <IconButton onClick={()=>setShowSidebar(prev=>!prev)} edge="start" color="inherit" aria-label="menu" sx={{ cursor: 'pointer' }}>
          <MenuIcon />
        </IconButton>
        <Typography sx={{ fontSize: { xs:'.75rem', sm: '1.00rem', lg: '1.20rem' },flexGrow: 1 }} variant="h6" component="div" >
          COMPAÑIA PRUEBA
        </Typography>
        <Typography sx={{ fontSize: { xs:'.75rem', sm: '1.00rem', lg: '1.20rem' } }} variant="h6" component="div">
          {authState.username}
        </Typography>
        <LogoutFab onClick={handleLogout}>
            <SvgIcon component={LogoutIcon} sx={{ fontSize: '15px' }} />
        </LogoutFab>
      </Toolbar>
    </AppBar>
 );
};

export default Navbar;
