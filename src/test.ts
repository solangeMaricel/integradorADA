import { format } from 'date-fns';

const fechaActual = new Date();
const fechaFormateada = format(fechaActual, 'dd/MM/yyyy');

console.log(fechaFormateada);