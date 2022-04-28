import { useState, useEffect } from "react";
import Header from "./components/Header";
import Modal from "./components/Modal";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import ListadoGastos from "./components/ListadoGastos";
import { generarId } from "./helpers";
import Filtros from "./components/Filtros";
function App() {
  const [presupuesto, setPresupuesto] = useState(
    Number(localStorage.getItem("presupuesto")) || 0
  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    JSON.parse(localStorage.getItem("gastos")) || []
  )

  const [gastoEditar, setGastoEditar] = useState({});

  const [filtro, setFiltro] = useState('');
  const [gastosFiltrados, setGastosFiltrados] = useState([]);

  useEffect(() => {
    if(Object.keys(gastoEditar).length >0){
      setModal(true);
  
    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
    }
  },[gastoEditar]);


  const handleNuevoGasto =()=>{
    setModal(true);
    setGastoEditar({});

    setTimeout(() => {
      setAnimarModal(true);
    }, 200);
  }

  useEffect(()=>{
    if(filtro){
      const gastosFiltrados = gastos.filter(gasto=> gasto.categoria === filtro);
      setGastosFiltrados(gastosFiltrados);
    }
  },[filtro]);

  useEffect(()=>{
    localStorage.setItem('presupuesto',presupuesto ?? 0);
  },[presupuesto]);

  useEffect(()=>{
    localStorage.setItem('gastos',JSON.stringify(gastos));
  },[gastos]);

useEffect(()=>{
  const presupuestoLS = Number(localStorage.getItem('presupuesto')) ?? 0;

  if(presupuestoLS)
  {
    setIsValidPresupuesto(true);
  }
},[]);


  const guardarGasto =(gasto)=>{
    if(gasto.id){

      const gastosActualizados = gastos.map(gastoActual =>gastoActual.id === gasto.id ? gasto : gastoActual);

      setGastos(gastosActualizados);
      setGastoEditar({});
    }else{
      gasto.id = generarId();
      setGastos([...gastos, gasto]);
    }
  }
  const eliminarGasto=(id)=>{

    // const confirmacion = window.confirm('¿Estas seguro de eliminar este gasto?');

    // if(confirmacion){

      const gastoEliminado = gastos.filter(gasto => gasto.id !== id);
  
      setGastos(gastoEliminado);
    // }
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        presupuesto={presupuesto}
        setPresupuesto={setPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        gastos={gastos}
        setGastos={setGastos}
      />

      {isValidPresupuesto && (
        <>
        <main>
          <Filtros setFiltro={setFiltro} filtro={filtro}/>
        <ListadoGastos gastos={gastos} setGastoEditar={setGastoEditar} eliminarGasto={eliminarGasto} gastosFiltrados={gastosFiltrados} filtro={filtro}/>
        </main>
        <div className="nuevo-gasto">
          <img src={IconoNuevoGasto} alt="Nuevo gasto" onClick={handleNuevoGasto}/>
        </div>
        </>
      )}

      {modal && <Modal setModal={setModal} animarModal={animarModal} setAnimarModal={setAnimarModal} guardarGasto={guardarGasto} gastoEditar={gastoEditar} gastos={gastos} setGastoEditar={setGastoEditar}/>}
    </div>
    
  );
}

export default App;
