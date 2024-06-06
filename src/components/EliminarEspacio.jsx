import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EliminarEspacio = ({ onClose }) => {
    const [espacios, setEspacios] = useState([]);
    const [espacioId, setEspacioId] = useState('');
    const [error, setError] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    // Cargar todos los espacios deportivos al montar el componente
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

    const handleEliminar = async () => {
        if (!espacioId) {
            setError('Seleccione un espacio para eliminar');
            return;
        }
        try {
            await axios.delete(`http://localhost:9090/api/v1/tipos-espacios-deportivos/${espacioId}`);
            setEspacios(espacios.filter(espacio => espacio.id !== parseInt(espacioId)));
            setMostrarConfirmacion(true);
            setError('');
        } catch (error) {
            setError('Error al eliminar el espacio');
            console.error('Error al eliminar espacio:', error);
        }
    };

    return (
        <div className="formulario-crear-espacio">
            <h2 className="titulo_crearespacio">Eliminar Espacio Deportivo</h2>
            {error && <p className="error">{error}</p>}
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡El espacio deportivo fue eliminado exitosamente!</p>
                    <button onClick={onClose} className="boton-guardar">Regresar a Espacios</button>
                </div>
            ) : (
                <>
                    <div className="form-group">
                        <label htmlFor="espacio">Espacio Deportivo:</label>
                        <select id="espacio" value={espacioId} onChange={(e) => setEspacioId(e.target.value)}>
                            <option value="">Seleccione un espacio</option>
                            {espacios.map(espacio => (
                                <option key={espacio.id} value={espacio.id}>
                                    {espacio.cantidad} {espacio.espacio}(s) - {espacio.nombre}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button onClick={handleEliminar} className='boton-guardar'>Eliminar</button>
                    </div>
                </>
            )}
        </div>
    );
};

export default EliminarEspacio;
