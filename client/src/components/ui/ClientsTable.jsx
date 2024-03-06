import React, { useContext, useState } from 'react';
import {Table, Box, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton} from '@mui/material';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { Link } from 'react-router-dom';
import axios from 'axios';

import ConfirmDeleteDialog from './ConfirmDeleteDialog';
import SnackbarError from './SnackbarAlert';
import useSnackbarAlert from '../hooks/useSnackbarAlert';

import { baseUrl } from '../../utils/constants';
import { AuthContext } from '../../store/store';

const  ClientsTable= ({clients,setClients} ) => {
 const [openDialog, setOpenDialog] = useState(false);
 const [selectedId, setSelectedId] = useState('');
 const { authState } = useContext(AuthContext);
 const { open, message, showAlert, closeAlert } = useSnackbarAlert();

 const handleClickOpen = (id) => {
    setOpenDialog(true);
    setSelectedId(id)
  };

 const handleClose = () => {
    setOpenDialog(false);
    setSelectedId('')
 };

 const handleDelete =async () => {
    try {
         await axios.delete(
          `${baseUrl}/api/Cliente/Eliminar/${selectedId}`,
          {
            headers: {
              Authorization: `Bearer ${authState.token}`,
            },
          }
        );
        setSelectedId('')
        setClients(clients => clients.filter(client => client.id !== selectedId));
        showAlert('Cliente eliminado correctamente','success')
      } catch (error) {
        const errorMessage = error.response?.data?.message || error.message;
        showAlert(errorMessage);
      }
    handleClose();
 };
    
    return (
       <Box>
         <TableContainer component={Paper}>
           <Table sx={{color:"grey",mt:2}} aria-label="table">
             <TableHead sx={{background:"blue"}}>
               <TableRow sx={{background:"blue",color:"white"}}>
                 <TableCell sx={{color:"white"}}>Identificación</TableCell>
                 <TableCell sx={{color:"white"}}>Nombre Completo</TableCell>
                 <TableCell sx={{color:"white"}} align="right">Acciones</TableCell>
               </TableRow>
             </TableHead>
             <TableBody>
               {clients.length > 0 ? (
                clients.map((client) => (
                 <TableRow key={client.id}>
                   <TableCell sx={{color:"grey"}} component="th" scope="row">
                    {client.identificacion}
                   </TableCell>
                   <TableCell sx={{color:"grey"}}>{`${client.nombre} ${client.apellidos}`} </TableCell>
                   <TableCell  align="right">
                      <Link to={`/mantenimiento/${client.id}`}>
                          <IconButton sx={{cursor:"pointer"}} aria-label="editar">
                          <EditIcon />
                          </IconButton>
                      </Link>
                    
                      <IconButton onClick={()=> handleClickOpen(client.id) } sx={{cursor:"pointer"}}  aria-label="eliminar">
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                 </TableRow>
                 ))
            ) : <TableRow>
                  <TableCell colSpan={3} align="center">
                    No hay clientes...
                  </TableCell>
                </TableRow>
            }
          </TableBody>
        </Table>
      </TableContainer>
      <ConfirmDeleteDialog
        open={openDialog}
        handleClose={handleClose}
        handleDelete={handleDelete}
      />
      <SnackbarError  open={open} message={message} handleClose={closeAlert} />
    </Box>
  );
}
   
   export default ClientsTable;