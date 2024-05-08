import React, { useState } from 'react';

const CrearEspacio = () => {
    const [deporte, setDeporte] = useState('');
    const [espacio, setEspacio] = useState('');
    const [inventario, setInventario] = useState('');
    const [nombre, setNombre] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que ninguna casilla esté vacía
        if (!deporte || !espacio || !inventario || !nombre) {
            setError('Por favor completa todos los campos.');
            return;
        }

        // Validar formato y longitud de inventario
        const inventarioNumber = parseInt(inventario);
        if (isNaN(inventarioNumber) || inventarioNumber <= 0) {
            setError('La cantidad de espacios debe ser un número entero positivo.');
            return;
        }

        // Validar formato y contenido de espacio y nombre (solo caracteres permitidos)
        if (!/^[a-zA-Z\s]+$/.test(espacio)) {
            setError('El espacio solo puede contener letras y espacios.');
            return;
        }

        // Crear objeto con los datos del espacio
        const datosEspacio = {
            deporte,
            espacio,
            inventario,
            nombre
        };

        // Mostrar mensaje de confirmación con los datos del espacio creado
        setMostrarConfirmacion(datosEspacio);

        // Limpiar campos y errores
        setDeporte('');
        setEspacio('');
        setInventario('');
        setNombre('');
        setError('');
    };

    return (
        <div className="formulario-crear-espacio">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡La creación del espacio deportivo fue exitosa!</p>
                    <p>Se han creado {mostrarConfirmacion.inventario} {mostrarConfirmacion.espacio}(s) de {mostrarConfirmacion.nombre}</p>
                    <button className="button" onClick={() => setMostrarConfirmacion(false)}>Regresar a Espacios</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crearespacio'>Crear Nuevo Espacio Deportivo</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="deporte">Deporte:</label>
                        <select id="deporte" value={deporte} onChange={(e) => setDeporte(e.target.value)}>
                            <option value="">Selecciona un deporte</option>
                            <option value="futbol">Fútbol</option>
                            <option value="tenis">Tenis</option>
                            <option value="natacion">Natación</option>
                            <option value="voleibol">Voleibol</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="espacio">Espacio Deportivo:</label>
                        <input type="text" id="espacio" value={espacio} onChange={(e) => setEspacio(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="inventario">Cantidad de Espacios:</label>
                        <div className="input-wrapper">
                            <input
                                type="number"
                                id="inventario"
                                value={inventario}
                                onChange={(e) => setInventario(e.target.value)}
                                className="input-inventario"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
                    </div>
                    <div className="button-container">
                        <button type="submit" className='boton-guardar'>Crear</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CrearEspacio;
