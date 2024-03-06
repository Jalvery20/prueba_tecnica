import React from 'react';
import { Box, Typography } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';
import MainLayout from "../../layout/MainLayout"

const ErrorPage = () => {

   
    return (
       <MainLayout>
          <Box sx={{ display: 'flex', flexDirection: 'column',  alignItems: 'center', flexGrow: 1, mt: 10 }}>
            <Box sx={{ display: 'flex' }}>
              <WarningIcon sx={{ color: 'blue', fontSize: '8rem', mr:3 }} />
              <Typography sx={{ fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' }, mt: 2 }} variant="h1" color="blue" >
                404
              </Typography>
            </Box>
            <Typography sx={{ fontSize: { xs: '1rem', sm: '2rem', md: '3rem', lg: '4rem' }, mt: 2 }} variant="h2" color="gray" >
              Oops... Page Not Found!
            </Typography>
    
          </Box>
       </MainLayout>
    );
   };

   export default ErrorPage;