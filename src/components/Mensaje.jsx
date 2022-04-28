import React from 'react'

const Mensaje = ({children, tipo,mensaje}) => {
  return (
    // <div className='bg-red-700 text-white text-center p-3 rounded-md mt-10 font-bold'>
    //     {mensaje}
    // </div>

    <div className={`alerta ${tipo}`}>{children}</div>
  )
}

export default Mensaje