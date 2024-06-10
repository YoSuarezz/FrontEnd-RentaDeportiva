import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearEspacio = ({ onClose }) => {
    const [deporte, setDeporte] = useState('');
    const [deportes, setDeportes] = useState([]);
    const [espacio, setEspacio] = useState('');
    const [inventario, setInventario] = useState('');
    const [nombre, setNombre] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [error, setError] = useState('');

    const espaciosPorDeporte = {
        'fútbol': ['Cancha', 'Estadio'],
        'tenis': ['Mesa', 'Campo'],
        'natacion': ['Piscina olímpica', 'Piscina recreativa'],
        'voleibol': ['Cancha de arena', 'Cancha interior']
    };

    useEffect(() => {
        const fetchDeportes = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/deportes');
                setDeportes(response.data.datos);
                console.log("Deportes cargados:", response.data.datos);
            } catch (error) {
                setError('Error al cargar los deportes');
                console.error('Error fetching deportes:', error);
            }
        };
        fetchDeportes();
    }, []);

    const handleDeporteChange = (event) => {
        const deporteId = event.target.value;
        const deporteSeleccionado = deportes.find(dep => dep.id.toString() === deporteId);
        setDeporte(deporteSeleccionado || {});
    };

    const obtenerOpcionesEspacio = () => {
        if (deporte && deporte.nombre) {
            return espaciosPorDeporte[deporte.nombre.toLowerCase()] || [];
        }
        return [];
    };

    const registrarEspacio = async (datosEspacio) => {
        try {
            const response = await axios.post('http://localhost:9090/api/v1/tipos-espacios-deportivos', datosEspacio, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registro exitoso:', response.data);
            setMostrarConfirmacion({
                inventario: datosEspacio.cantidad,
                espacio: datosEspacio.espacio,
                nombre: datosEspacio.nombre
            });
            setError('');
        } catch (error) {
            console.error('Error al registrar el espacio:', error);
            setError('Error al registrar el espacio: ' + (error.response?.data?.mensajes?.join(' ') || error.message));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!deporte || !espacio || !inventario || !nombre) {
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
            id: 0,
            unidadDeportiva: { id: 1 },
            deporte: { id: deporte.id },
            espacio: espacio,
            cantidad: inventarioNum,
            nombre: nombre
        };

        await registrarEspacio(datosEspacio);
    };

    return (
        <div className="formulario-crear-espacio">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡La creación del espacio deportivo fue exitosa!</p>
                    <p>Se han creado {mostrarConfirmacion.inventario} {mostrarConfirmacion.espacio}(s) de {mostrarConfirmacion.nombre}</p>
                    <button className="button" onClick={onClose}>Regresar a Espacios</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crearespacio'>Crear Nuevo Espacio Deportivo</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="deporte">Deporte:</label>
                        <select id="deporte" value={deporte.id || ''} onChange={handleDeporteChange}>
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
                        <button type="submit" className='boton-guardar'>Crear</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CrearEspacio;
