import React, { useState } from 'react';
import CrearTarifa from './CrearTarifa';
// Importar los otros componentes de tarifas cuando los tengas

const Tarifas = () => {
    const [mostrarCrearTarifa, setMostrarCrearTarifa] = useState(false);
    const [mostrarEditarTarifa, setMostrarEditarTarifa] = useState(false);
    const [mostrarEliminarTarifa, setMostrarEliminarTarifa] = useState(false);
    const [mostrarConsultarTarifa, setMostrarConsultarTarifa] = useState(false);

    const handleMostrarCrearTarifa = () => {
        setMostrarCrearTarifa(true);
        setMostrarEditarTarifa(false);
        setMostrarEliminarTarifa(false);
        setMostrarConsultarTarifa(false);
    };

    const handleMostrarEditarTarifa = () => {
        setMostrarCrearTarifa(false);
        setMostrarEditarTarifa(true);
        setMostrarEliminarTarifa(false);
        setMostrarConsultarTarifa(false);
    };

    const handleMostrarEliminarTarifa = () => {
        setMostrarCrearTarifa(false);
        setMostrarEditarTarifa(false);
        setMostrarEliminarTarifa(true);
        setMostrarConsultarTarifa(false);
    };

    const handleMostrarConsultarTarifa = () => {
        setMostrarCrearTarifa(false);
        setMostrarEditarTarifa(false);
        setMostrarEliminarTarifa(false);
        setMostrarConsultarTarifa(true);
    };

    const handleReturnToTarifas = () => {
        setMostrarCrearTarifa(false);
        setMostrarEditarTarifa(false);
        setMostrarEliminarTarifa(false);
        setMostrarConsultarTarifa(false);
    };

    return (
        <div>
            <h2 className='espacio_banner'>Tarifas</h2>
            <div className="contenedor-botones">
                {mostrarCrearTarifa && <CrearTarifa onClose={handleReturnToTarifas} />}
                {/* Aquí puedes añadir los componentes de editar, eliminar y consultar cuando los tengas */}
                {!mostrarCrearTarifa && !mostrarEditarTarifa && !mostrarEliminarTarifa && !mostrarConsultarTarifa && (
                    <>
                        <button onClick={handleMostrarCrearTarifa} className="botones_espacios">Crear Tarifa</button>
                        <button onClick={handleMostrarEditarTarifa} className="botones_espacios">Editar Tarifa</button>
                        <button onClick={handleMostrarEliminarTarifa} className="botones_espacios">Eliminar Tarifa</button>
                        <button onClick={handleMostrarConsultarTarifa} className="botones_espacios">Consultar Tarifa</button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Tarifas;
