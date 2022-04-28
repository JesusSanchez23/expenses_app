import CerrarBtn from '../img/cerrar.svg';
import { useState,useEffect } from 'react';
import Mensaje from './Mensaje';
import { generarId } from '../helpers';

const Modal = ({setModal, animarModal,setAnimarModal,guardarGasto,gastoEditar,setGastoEditar,gastos}) => {

    const [nombre, setNombre] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [categoria, setCategoria] = useState('')
    const [mensaje, setMensaje] = useState('');
    const [id, setId] = useState('');
    

    useEffect(() => {
     if(Object.keys(gastoEditar).length >0){
        setNombre(gastoEditar.nombre);
        setCantidad(gastoEditar.cantidad);
        setCategoria(gastoEditar.categoria);
        setId(gastoEditar.id);
     }
    }, [gastoEditar])
    


    const handleValid =()=>{
        setAnimarModal(false);
        setGastoEditar({});
        setTimeout(() => {
            setModal(false);
          }, 500);

    }

    const handleModal =(e)=>{
        e.preventDefault();

        if([nombre,cantidad,categoria].includes('') || cantidad <= 0){
            setMensaje('Todos los campos son obligatorios');
            setTimeout(() => {
                setMensaje('');
            }, 2000);
            return;
        }

    
        guardarGasto({nombre,cantidad,categoria, id, fecha:Date.now()});
        handleValid();
        
    }
  return (
    <div className="modal">
        <div className="cerrar-modal cursor-pointer">
        <img src={CerrarBtn} alt="Cerrar Modal" onClick={handleValid} />
        </div>

    
        <form className={`formulario ${animarModal ? "animar" : 'cerrar'}`} onSubmit={handleModal}>
            <legend>{gastoEditar.nombre ? 'Editar Gasto' : 'Nuevo gasto' }</legend>
        {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}
            <div className="campo">
                <label htmlFor="gasto">Nombre Gasto</label>
                <input type="text" id='gasto' placeholder='Añade el nombre del gasto' value={nombre} onChange={e=>setNombre(e.target.value)}/>
            </div>
            <div className="campo">
                <label htmlFor="cantidad">Cantidad</label>
                <input type="number" id='cantidad' placeholder='Añade La cantidad del gasto' value={cantidad} onChange={e=>setCantidad(Number(e.target.value))} />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoria</label>
                <select id="categoria" value={categoria} onChange={e=>setCategoria(e.target.value)}>
                    <option value="">-- Seleccione --</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Subscripciones</option>
                </select>
            </div>
            <input type="submit" value={gastoEditar.nombre ? 'Guardar Cambios' : 'Añadir gasto' } className='rounded-md'/>
        </form>
    </div>
  )
}

export default Modal