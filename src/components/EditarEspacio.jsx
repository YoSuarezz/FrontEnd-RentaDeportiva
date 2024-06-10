import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarEspacio = ({ onClose }) => {
    const [espacios, setEspacios] = useState([]);
    const [deportes, setDeportes] = useState([]);
    const [espacioSeleccionado, setEspacioSeleccionado] = useState(null);
    const [deporteSeleccionado, setDeporteSeleccionado] = useState('');
    const [espacio, setEspacio] = useState('');
    const [inventario, setInventario] = useState('');
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    const espaciosPorDeporte = {
        'fútbol': ['Cancha', 'Estadio'],
        'tenis': ['Mesa', 'Campo'],
        'voleibol': ['Cancha de arena', 'Cancha interior'],
        'natacion': ['Piscina olímpica', 'Piscina recreativa']
    };

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

        const cargarDeportes = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/deportes');
                setDeportes(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar los deportes');
                console.error('Error al cargar deportes:', error);
            }
        };

        cargarEspacios();
        cargarDeportes();
    }, []);

    const handleEspacioSeleccionado = (event) => {
        const espacioId = event.target.value;
        const espacioSeleccionado = espacios.find(esp => esp.id.toString() === espacioId);
        if (espacioSeleccionado) {
            setEspacioSeleccionado(espacioSeleccionado);
            setDeporteSeleccionado(espacioSeleccionado.deporte?.id?.toString() || '');
            setEspacio(espacioSeleccionado.espacio || '');
            setInventario(espacioSeleccionado.cantidad?.toString() || '');
            setNombre(espacioSeleccionado.nombre || '');
        } else {
            setEspacioSeleccionado(null);
            setDeporteSeleccionado('');
            setEspacio('');
            setInventario('');
            setNombre('');
        }
    };

    const handleDeporteChange = (event) => {
        const deporteId = event.target.value;
        setDeporteSeleccionado(deporteId);
        setEspacio(''); 
        setEspacioSeleccionado(null);
    };

    const obtenerOpcionesEspacio = () => {
        const deporteSeleccionadoObj = deportes.find(dep => dep.id.toString() === deporteSeleccionado);
        if (deporteSeleccionadoObj) {
            return espaciosPorDeporte[deporteSeleccionadoObj.nombre.toLowerCase()] || [];
        }
        return [];
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!espacioSeleccionado) {
            setError('Por favor seleccione un espacio válido');
            return;
        }

        const inventarioNum = parseFloat(inventario);

        const datosEspacio = {
            id: espacioSeleccionado.id,
            unidadDeportiva: { id: 1 },
            deporte: { id: deporteSeleccionado },
            espacio: espacio,
            cantidad: inventarioNum,
            nombre: nombre
        };

        try {
            await axios.put('http://localhost:9090/api/v1/tipos-espacios-deportivos', datosEspacio, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMostrarConfirmacion(true);
            setError('');
        } catch (error) {
            console.error('Error al actualizar el espacio:', error);
            setError(error.response?.data?.mensajes?.join(' ') || error.message);
        }
    };

    return (
        <div className="formulario-crear-espacio">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡El espacio deportivo fue actualizado exitosamente!</p>
                    <button className="button" onClick={onClose}>Regresar a Espacios</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crearespacio'>Editar Espacio Deportivo</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="espacioSeleccionado">Espacio Deportivo:</label>
                        <select id="espacioSeleccionado" value={espacioSeleccionado?.id || ''} onChange={handleEspacioSeleccionado}>
                            <option value="">Selecciona un espacio</option>
                            {espacios.map((esp) => (
                                <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="deporte">Deporte:</label>
                        <select id="deporte" value={deporteSeleccionado} onChange={handleDeporteChange}>
                            <option value="">Selecciona un deporte</option>
                            {deportes.map((dep) => (
                                <option key={dep.id} value={dep.id}>{dep.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="espacio">Espacio:</label>
                        <select id="espacio" value={espacio} onChange={(e) => setEspacio(e.target.value)}>
                            <option value="">Selecciona un espacio</option>
                            {obtenerOpcionesEspacio().map((esp, idx) => (
                                <option key={idx} value={esp}>{esp}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="inventario">Cantidad de Espacios:</label>
                        <input
                            type="number"
                            id="inventario"
                            value={inventario}
                            onChange={(e) => setInventario(e.target.value)}
                            className="input-inventario"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="nombre">Nombre:</label>
                        <input
                            type="text"
                            id="nombre"
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                        />
                    </div>
                    <div className="button-container">
                        <button type="submit" className='boton-guardar'>Guardar Cambios</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditarEspacio;
