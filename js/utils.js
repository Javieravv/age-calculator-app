// Funciones de utilidad.

export const isValidDate = ( date )  => {
    // Ver si la fecha es válida o no.
    return !isNaN(date.getTime())
}

// Restar dos fechas  devolver el año, mes y día.
export const dateDifference = (date1, date2) => {
    // Calcular la diferencia en milisegundos
    const differenceMilliseconds = date1 - date2;
  
    // Convertir la diferencia en milisegundos a días, horas, minutos y segundos
    const seconds = Math.floor(differenceMilliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
  
    // Calcular la diferencia en años, meses y días
    const years = Math.floor(days / 365.25);
    const months = Math.floor((days % 365.25) / 30.4375); // Promedio de días por mes
    const remainingDays = Math.ceil(days - (years * 365.25) - (months * 30.4375));
  
    return { years, months, days: remainingDays };
  }