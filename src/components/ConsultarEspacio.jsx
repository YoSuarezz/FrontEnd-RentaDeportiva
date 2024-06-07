import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConsultarEspacio = ({ onClose }) => {
    const [espacios, setEspacios] = useState([]);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const cargarEspacios = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/tipos-espacios-deportivos');
                setEspacios(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar los espacios deportivos');
                console.error('Error al cargar espacios:', error);
            }
        };
        cargarEspacios();
    }, []);

    const handleEspacioSeleccionado = (event) => {
        const espacioId = event.target.value;
        const espacioSeleccionado = espacios.find(esp => esp.id.toString() === espacioId);
        setEspacioSeleccionado(espacioSeleccionado);
    };

    return (
        <div className="formulario-crear-espacio">
            <h2 className='titulo_crearespacio'>Consultar Espacio Deportivo</h2>
            {error && <p className="error">{error}</p>}
            <div className="form-group">
                <label htmlFor="espacioSeleccionado">Espacio Deportivo:</label>
                <select id="espacioSeleccionado" onChange={handleEspacioSeleccionado}>
                    <option value="">Selecciona un espacio</option>
                    {espacios.map((esp) => (
                        <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                    ))}
                </select>
            </div>
            {espacioSeleccionado && (
                <div className="detalle-espacio">
                    <h3>Detalles del Espacio</h3>
                    <p><strong>Nombre:</strong> {espacioSeleccionado.nombre}</p>
                    <p><strong>Deporte:</strong> {espacioSeleccionado.deporte.nombre}</p>
                    <p><strong>Espacio:</strong> {espacioSeleccionado.espacio}</p>
                    <p><strong>Cantidad:</strong> {espacioSeleccionado.cantidad}</p>
                </div>
            )}
            <div className="button-container">
                <button className="boton-guardar" onClick={onClose}>Regresar a Espacios</button>
            </div>
        </div>
    );
};

export default ConsultarEspacio;
