import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CrearTarifa = ({ onClose }) => {
    const [tipoEspacioDeportivo, setTipoEspacioDeportivo] = useState('');
    const [tipoEspaciosDeportivos, setTipoEspaciosDeportivos] = useState([]);
    const [precioPorHora, setPrecioPorHora] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaHoraInicio, setFechaHoraInicio] = useState('');
    const [fechaHoraFin, setFechaHoraFin] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchTipoEspaciosDeportivos = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/tipos-espacios-deportivos');
                setTipoEspaciosDeportivos(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar los tipos de espacios deportivos');
                console.error('Error fetching tipos de espacios deportivos:', error);
            }
        };
        fetchTipoEspaciosDeportivos();
    }, []);

    const registrarTarifa = async (datosTarifa) => {
        try {
            const response = await axios.post('http://localhost:9090/api/v1/tarifasEstandar', datosTarifa, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Registro exitoso:', response.data);
            setMostrarConfirmacion(true);
            setError('');
        } catch (error) {
            console.error('Error al registrar la tarifa:', error);
            setError('Error al registrar la tarifa: ' + (error.response?.data?.message || error.message));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!tipoEspacioDeportivo || !precioPorHora || !nombre || !fechaHoraInicio || !fechaHoraFin) {
            setError('Por favor completa todos los campos.');
            return;
        }

        const precioPorHoraNum = parseFloat(precioPorHora);
        if (!Number.isInteger(precioPorHoraNum) || precioPorHoraNum <= 0) {
            setError('El precio por hora debe ser un número entero positivo.');
            return;
        }

        if (!/^[a-zA-Z0-9\s]+$/.test(nombre)) {
            setError('El nombre solo puede contener letras, números y espacios.');
            return;
        }

        // Formatear las fechas y horas correctamente
        const formatDateTime = (dateTime) => {
            const date = new Date(dateTime);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const hours = String(date.getHours()).padStart(2, '0');
            const minutes = String(date.getMinutes()).padStart(2, '0');
            const seconds = String(date.getSeconds()).padStart(2, '0');
            return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        };

        const fechaInicioFormateada = formatDateTime(fechaHoraInicio);
        const fechaFinFormateada = formatDateTime(fechaHoraFin);

        const datosTarifa = {
            id: 0,
            tipoEspacioDeportivo: { id: tipoEspacioDeportivo },
            precioPorHora: precioPorHoraNum,
            nombre: nombre,
            fechaHoraInicio: fechaInicioFormateada,
            fechaHoraFin: fechaFinFormateada
        };

        await registrarTarifa(datosTarifa);
    };

    return (
        <div className="formulario-crear-espacio">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡La creación de la tarifa fue exitosa!</p>
                    <button className="button" onClick={onClose}>Regresar a Tarifas</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crearespacio'>Crear Nueva Tarifa</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="tipoEspacioDeportivo">Tipo de Espacio Deportivo:</label>
                        <select id="tipoEspacioDeportivo" value={tipoEspacioDeportivo} onChange={(e) => setTipoEspacioDeportivo(e.target.value)}>
                            <option value="">Selecciona un tipo de espacio</option>
                            {tipoEspaciosDeportivos.map((tipo) => (
                                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="precioPorHora">Precio por Hora:</label>
                        <input
                            type="number"
                            id="precioPorHora"
                            value={precioPorHora}
                            onChange={(e) => setPrecioPorHora(e.target.value)}
                            className="input"
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
                    <div className="form-group">
                        <label htmlFor="fechaHoraInicio">Fecha y Hora de Inicio:</label>
                        <input
                            type="datetime-local"
                            id="fechaHoraInicio"
                            value={fechaHoraInicio}
                            onChange={(e) => setFechaHoraInicio(e.target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaHoraFin">Fecha y Hora de Fin:</label>
                        <input
                            type="datetime-local"
                            id="fechaHoraFin"
                            value={fechaHoraFin}
                            onChange={(e) => setFechaHoraFin(e.target.value)}
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

export default CrearTarifa;
