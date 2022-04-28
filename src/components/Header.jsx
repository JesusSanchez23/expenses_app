import React from 'react';
import NuevoPresupuesto from './NuevoPresupuesto';
import ControlPresupuesto from './ControlPresupuesto';

const Header = ({setPresupuesto, presupuesto,isValidPresupuesto,setIsValidPresupuesto,gastos,setGastos }) => {
  return (
    <div>
        <header>
            <h1>Planificador de Gastos</h1>
            {isValidPresupuesto ? (
                <ControlPresupuesto presupuesto={presupuesto} gastos={gastos} setGastos={setGastos} setPresupuesto={setPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto}/>
            ): (
                <NuevoPresupuesto presupuesto={presupuesto} setPresupuesto={setPresupuesto} setIsValidPresupuesto={setIsValidPresupuesto}/>
            )}
        </header>
    </div>
  )
}

export default Header