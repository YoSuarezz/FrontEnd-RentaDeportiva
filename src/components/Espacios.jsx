import React, { useState } from 'react';
import CrearEspacio from './CrearEspacio';

const Espacios = () => {
const [mostrarCrearEspacio, setMostrarCrearEspacio] = useState(false);
const [mostrarEditarEspacio, setMostrarEditarEspacio] = useState(false);
const [mostrarEliminarEspacio, setMostrarEliminarEspacio] = useState(false);
const [mostrarConsultarEspacio, setMostrarConsultarEspacio] = useState(false);

const handleMostrarCrearEspacio = () => {
    setMostrarCrearEspacio(true);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

const handleMostrarEditarEspacio = () => {
    setMostrarCrearEspacio(false);
    setMostrarEditarEspacio(true);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

const handleMostrarEliminarEspacio = () => {
    setMostrarCrearEspacio(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(true);
    setMostrarConsultarEspacio(false);
};

const handleMostrarConsultarEspacio = () => {
    setMostrarCrearEspacio(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(true);
};

const handleReturnToSpaces = () => {
    setMostrarCrearEspacio(false);
    setMostrarEditarEspacio(false);
    setMostrarEliminarEspacio(false);
    setMostrarConsultarEspacio(false);
};

return (
    <div>
    <h2 className='espacio_banner'>Espacios</h2>
    <div className="contenedor-botones">
        {mostrarCrearEspacio ? (
        <CrearEspacio onClose={() => setMostrarCrearEspacio(false)} />
        ) : (
        <>
            <button onClick={handleMostrarCrearEspacio} className="botones_espacios">
            Crear Espacio
            </button>
            <button onClick={handleMostrarEditarEspacio} className="botones_espacios">
            Editar Espacio
            </button>
            <button onClick={handleMostrarEliminarEspacio} className="botones_espacios">
            Eliminar Espacio
            </button>
            <button onClick={handleMostrarConsultarEspacio} className="botones_espacios">
            Consultar Espacio
            </button>
        </>
        )}
    </div>
    </div>
);
};

export default Espacios;