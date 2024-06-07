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
        'natación': ['Piscina olímpica', 'Piscina recreativa'],
        'voleibol': ['Cancha de arena', 'Cancha interior']
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
            setDeporteSeleccionado(espacioSeleccionado.deporte.id);
            setEspacio(espacioSeleccionado.espacio);
            setInventario(espacioSeleccionado.cantidad);
            setNombre(espacioSeleccionado.nombre);
        }
    };

    const handleDeporteChange = (event) => {
        const deporteId = event.target.value;
        setDeporteSeleccionado(deporteId);
        setEspacio(''); // Clear espacio selection when deporte changes
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
        if (!espacioSeleccionado || !deporteSeleccionado || !espacio || !inventario || !nombre) {
            setError('Por favor completa todos los campos.');
            return;
        }

        const inventarioNum = parseFloat(inventario);
        if (!Number.isInteger(inventarioNum) || inventarioNum < 1 || inventarioNum > 49) {
            setError('La cantidad de espacios debe ser un número entero entre 1 y 49.');
            return;
        }

        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            setError('El nombre solo puede contener letras y espacios.');
            return;
        }

        const datosEspacio = {
            id: espacioSeleccionado.id,
            unidadDeportiva: { id: 1 },
            deporte: { id: deporteSeleccionado },
            espacio: espacio,
            cantidad: inventarioNum,
            nombre: nombre
        };

        try {
            const response = await axios.put('http://localhost:9090/api/v1/tipos-espacios-deportivos', datosEspacio, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMostrarConfirmacion(true);
            setError('');
        } catch (error) {
            console.error('Error al actualizar el espacio:', error);
            setError('Error al actualizar el espacio: ' + (error.response?.data?.message || error.message));
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