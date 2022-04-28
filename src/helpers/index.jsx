export const generarId=()=>{
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);
    return random + fecha;
}

export const formatearFecha =(date)=>{
    const opt = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
    }
    // cambiar el formato de fecha
    const fechaNueva = new Date(date);
    return fechaNueva.toLocaleDateString('es-ES',opt);
  }