import { useState } from "react";
import Mensaje from "./Mensaje";

const NuevoPresupuesto = ({presupuesto,
     setPresupuesto,
     setIsValidPresupuesto}) => {

    const [mensaje, setMensaje] = useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();

        // validar que sea un numero
        if(!presupuesto|| presupuesto < 0){
            setMensaje('No es un presupuesto Válido');
            return;
        }

        setMensaje('');
        setIsValidPresupuesto(true);


    }
 


  return (
    <div className='contenedor contenedor-presupuesto sombra'>
        <form className='formulario' onSubmit={handleSubmit}>
            <div className="campo">
                <label htmlFor="presupuesto">Definir presupuesto</label>
                <input type="number" id='presupuesto' className='nuevo-presupuesto' placeholder='Añade tu presupuesto' value={presupuesto} onChange={(e)=>setPresupuesto(Number(e.target.value))}/>
            </div>

            <input type="submit" value="añadir" className='rounded-md' />

            {/* {mensaje && <Mensaje mensaje={mensaje}/>} */}

            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
        </form>
    </div>
  )
}

export default NuevoPresupuesto