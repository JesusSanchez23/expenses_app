import { useEffect, useState } from "react";
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import "react-circular-progressbar/dist/styles.css";

const ControlPresupuesto = ({presupuesto,gastos, setGastos, setPresupuesto, setIsValidPresupuesto}) => {

const [disponible, setDisponible] = useState(0);
const [gastado, setGastado] = useState(0);
const [porcentaje, setPorcentaje] = useState(0);

  useEffect(()=>{
    const totalGastado = gastos.reduce((total, gasto) => gasto.cantidad + total , 0);
    setGastado(totalGastado);

    const calcularPorcentaje= ((totalGastado*100)/presupuesto).toFixed(2);
    setTimeout(() => {
      
      setPorcentaje(calcularPorcentaje);
    }, 1000);

    const totalDisponible = presupuesto - totalGastado;
    setDisponible(totalDisponible);
  }
  ,[gastos]);
 const formatearCantidad=(cantidad)=>{
  return cantidad.toLocaleString('en-US',{ style:'currency',currency:'USD'})
 }

 const handleReset=()=>{
   const confirmar = window.confirm('Esta seguro de eliminar todos los gastos?');

   if(confirmar){

     setGastos([]);
     setPresupuesto(0);
     setIsValidPresupuesto(false);
   }
 }


  return (
    <div className='contenedor contenedor-presupuesto sombra dos-columnas'>
        <div className="mb-10">
            <CircularProgressbar value={porcentaje} text={`${porcentaje}% Gastado`} styles={buildStyles({
              pathColor: porcentaje > 100 ? '#DC2626' : '#3B82F6',
              trailColor:'#F5F5F5',
              textColor:porcentaje > 100 ? '#DC2626' : '#3B82F6',
            })}/>
        </div>
        <div className='contenido-presupuesto'>
        <button className="w-full bg-red-500 rounded-lg p-3 mb-10 text-white uppercase font-bold hover:bg-red-700" onClick={handleReset}>Reiniciar App</button>
        <p className='mb-0 mt-10'><span>Presupuesto:</span> {formatearCantidad(presupuesto)}</p>
        <p className={`${disponible < 0 ? 'negativo' : ''}`}><span>Disponible:</span> {formatearCantidad(disponible)}</p>
        <p><span>Gastado:</span> {formatearCantidad(gastado)}</p>
        </div>
    </div>
  )
}

export default ControlPresupuesto