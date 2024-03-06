export const validateForm = (formState) => {
    let errors = {};
   
    // Validar nombre
    if (!formState.nombre) {
       errors.nombre = "El nombre es requerido.";
    } else if (formState.nombre.length > 50) {
       errors.nombre = "El nombre no debe exceder los 50 caracteres.";
    }
   
    // Validar apellidos
    if (!formState.apellidos) {
       errors.apellidos = "Los apellidos son requeridos.";
    } else if (formState.apellidos.length > 100) {
       errors.apellidos = "Los apellidos no deben exceder los 100 caracteres.";
    }
   
   
    // Validar fecha de nacimiento
    if (!formState.fechaNacimiento) {
       errors.fechaNacimiento = "La fecha de nacimiento es requerida.";
    } else {
       const fechaNacimiento = new Date(formState.fechaNacimiento);
       if (isNaN(fechaNacimiento)) {
         errors.fechaNacimiento = "La fecha de nacimiento ingresada no es válida.";
       }
    }
   
    // Validar fecha de afiliación
    if (!formState.fechaAfiliacion) {
       errors.fechaAfiliacion = "La fecha de afiliación es requerida.";
    } else {
       const fechaAfiliacion = new Date(formState.fechaAfiliacion);
       if (isNaN(fechaAfiliacion)) {
         errors.fechaAfiliacion = "La fecha de afiliación ingresada no es válida.";
       } else if (formState.fechaNacimiento && fechaAfiliacion < new Date(formState.fechaNacimiento)) {
         errors.fechaAfiliacion = "La fecha de afiliación no puede ser anterior a la fecha de nacimiento.";
       }
    }
   
    // Validar teléfono celular
    if (!formState.telefonoCelular) {
       errors.telefonoCelular = "El teléfono celular es requerido.";
    } else if (formState.telefonoCelular.length > 20) {
       errors.telefonoCelular = "El teléfono celular no debe exceder los 20 caracteres.";
    }
   
    if (formState.telefonoOtro && formState.telefonoOtro.length > 20) {
       errors.telefonoOtro = "El otro teléfono no debe exceder los 20 caracteres.";
    } else if (formState.telefonoOtro && formState.telefonoOtro === formState.telefonoCelular) {
       errors.telefonoOtro = "El otro teléfono no puede ser igual al teléfono celular.";
    }

    // Validar interés
    if (formState.interesFK === 'Seleccione') {
       errors.interes = "Debe seleccionar un interés.";
    }
   
    // Validar dirección
    if (!formState.direccion) {
       errors.direccion = "La dirección es requerida.";
    } else if (formState.direccion.length > 200) {
       errors.direccion = "La dirección no debe exceder los 200 caracteres.";
    }
   
    // Validar reseña personal
    if (!formState.resenaPersonal) {
       errors.reseñaPersonal = "La reseña es requerida.";
    } else if (formState.nombre.length > 200) {
       errors.reseñaPersonal = "La reseña personal no debe exceder los 200 caracteres.";
    }
    
   
    
   
    return errors;
   };

   export const formatDateToYYYYMMDD=(date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = (d.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript empiezan en 0
    const day = d.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}