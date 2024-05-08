import React, { useState } from 'react';

const CrearEspacio = ({ onClose }) => {
const [deporte, setDeporte] = useState('');
const [espacio, setEspacio] = useState('');
const [inventario, setInventario] = useState('');
const [nombre, setNombre] = useState('');

  // Función para manejar el envío del formulario
const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Deporte seleccionado:', deporte);
    console.log('Espacio seleccionado:', espacio);
    console.log('Inventario seleccionado:', inventario);
    console.log('Nombre introducido:', nombre);
    // Cerrar el formulario
    onClose();
};

return (
    <div className="formulario-crear-espacio">
    <h2 className='titulo_crearespacio'>Crear Nuevo Espacio</h2>
    <form onSubmit={handleSubmit} style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div className="form-group">
        <label htmlFor="deporte">Deporte:</label>
        <select id="deporte" value={deporte} onChange={(e) => setDeporte(e.target.value)}>
            <option value="futbol">Fútbol</option>
            <option value="tenis">Tenis</option>
            <option value="natacion">Natación</option>
            <option value="voleibol">Voleibol</option>
            {/* Agregar más opciones según sea necesario */}
        </select>
        </div>
        <div className="form-group">
        <label htmlFor="espacio">Espacio:</label>
        <input type="text" id="espacio" value={espacio} onChange={(e) => setEspacio(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="inventario">Cantidad:</label>
        <input type="text" id="inventario" value={inventario} onChange={(e) => setInventario(e.target.value)} />
        </div>
        <div className="form-group">
        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
        </div>
        <div className="button-container">
        <button type="submit" className='boton-guardar'>Guardar</button>
        </div>
    </form>
    </div>
);
};

export default CrearEspacio;