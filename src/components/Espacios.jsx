import React, { useState } from 'react';
import CrearDeportista from './CrearDeportista';

const Espacios = () => {
const [mostrarCrearDeportista, setMostrarCrearDeportista] = useState(false);
const [mostrarEditarEspacio, setMostrarEditarEspacio] = useState(false);
const [mostrarEliminarEspacio, setMostrarEliminarEspacio] = useState(false);
const [mostrarConsultarEspacio, setMostrarConsultarEspacio] = useState(false);

const handleMostrarCrearDeportista = () => {
    setMostrarCrearDeportista(true);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

const handleMostrarEditarEspacio = () => {
    setMostrarCrearDeportista(false);
    setMostrarEditarEspacio(true);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

const handleMostrarEliminarEspacio = () => {
    setMostrarCrearDeportista(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(true);
    setMostrarConsultarEspacio(false);
};

const handleMostrarConsultarEspacio = () => {
    setMostrarCrearDeportista(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(true);
};

const handleReturnToSpaces = () => {
    setMostrarCrearDeportista(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

return (
    <div>
    <h2 className='deportista_banner'>Deportistas</h2>
    <div className="contenedor-botones">
        {mostrarCrearDeportista ? (
        <CrearDeportista onClose={() => setMostrarCrearDeportista(false)} />
        ) : (
        <>
            <button onClick={handleMostrarCrearDeportista} className="botones_espacios">
            Crear Deportista
            </button>
            <button onClick={handleMostrarEditarEspacio} className="botones_espacios">
            Editar Deportista
            </button>
            <button onClick={handleMostrarEliminarEspacio} className="botones_espacios">
            Eliminar Deportista
            </button>
            <button onClick={handleMostrarConsultarEspacio} className="botones_espacios">
            Consultar Deportista
            </button>
        </>
        )}
    </div>
    </div>
);
};

export default Espacios;
