import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditarTarifa = ({ onClose }) => {
    const [tarifas, setTarifas] = useState([]);
    const [tipoEspaciosDeportivos, setTipoEspaciosDeportivos] = useState([]);
    const [monedas, setMonedas] = useState([]);
    const [tarifaSeleccionada, setTarifaSeleccionada] = useState(null);
    const [tipoEspacioDeportivo, setTipoEspacioDeportivo] = useState('');
    const [precioPorHora, setPrecioPorHora] = useState('');
    const [moneda, setMoneda] = useState('');
    const [nombre, setNombre] = useState('');
    const [fechaHoraInicio, setFechaHoraInicio] = useState('');
    const [fechaHoraFin, setFechaHoraFin] = useState('');
    const [error, setError] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

    useEffect(() => {
        const cargarTarifas = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/tarifasEstandar');
                setTarifas(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar las tarifas');
                console.error('Error al cargar tarifas:', error);
            }
        };

        const cargarTipoEspaciosDeportivos = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/tipos-espacios-deportivos');
                setTipoEspaciosDeportivos(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar los tipos de espacios deportivos');
                console.error('Error al cargar tipos de espacios deportivos:', error);
            }
        };

        const cargarMonedas = async () => {
            try {
                const response = await axios.get('http://localhost:9090/api/v1/monedas');
                setMonedas(response.data.datos || []);
            } catch (error) {
                setError('Error al cargar las monedas');
                console.error('Error al cargar monedas:', error);
            }
        };

        cargarTarifas();
        cargarTipoEspaciosDeportivos();
        cargarMonedas();
    }, []);

    const formatDateTimeLocal = (dateTime) => {
        const date = new Date(dateTime);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    const handleTarifaSeleccionada = (event) => {
        const tarifaId = event.target.value;
        const tarifa = tarifas.find(tarifa => tarifa.id.toString() === tarifaId);
        if (tarifa) {
            setTarifaSeleccionada(tarifa);
            setTipoEspacioDeportivo(tarifa.tipoEspacioDeportivo?.id?.toString() || '');
            setPrecioPorHora(tarifa.precioPorHora?.toString() || '');
            setMoneda(tarifa.moneda?.id?.toString() || '');
            setNombre(tarifa.nombre || '');
            setFechaHoraInicio(formatDateTimeLocal(tarifa.fechaHoraInicio) || '');
            setFechaHoraFin(formatDateTimeLocal(tarifa.fechaHoraFin) || '');
        } else {
            setTarifaSeleccionada(null);
            setTipoEspacioDeportivo('');
            setPrecioPorHora('');
            setMoneda('');
            setNombre('');
            setFechaHoraInicio('');
            setFechaHoraFin('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!tarifaSeleccionada) {
            setError('Por favor seleccione una tarifa válida a editar');
            return;
        }

        const precioPorHoraNum = parseFloat(precioPorHora);

        const fechaInicio = new Date(fechaHoraInicio);
        const fechaFin = new Date(fechaHoraFin);

        if (fechaInicio > fechaFin) {
            setError('La fecha de inicio no puede ser posterior a la fecha de fin.');
            return;
        }

        if (!fechaHoraInicio && !fechaHoraFin && !tipoEspacioDeportivo && !precioPorHora && !moneda ) {
            setError('Por favor complete todos los campos');
            return;
        }

        const datosTarifa = {
            id: tarifaSeleccionada.id,
            tipoEspacioDeportivo: { id: tipoEspacioDeportivo },
            precioPorHora: precioPorHoraNum,
            moneda: { id: moneda },
            nombre: nombre,
            fechaHoraInicio: fechaHoraInicio.replace('T', ' ') + ':00',
            fechaHoraFin: fechaHoraFin.replace('T', ' ') + ':00'
        };

        try {
            await axios.put('http://localhost:9090/api/v1/tarifasEstandar', datosTarifa, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            setMostrarConfirmacion(true);
            setError('');
        } catch (error) {
            console.error('Error al actualizar la tarifa:', error);
            setError(error.response?.data?.mensajes?.join(' ') || error.message);
        }
    };

    return (
        <div className="formulario-crear-espacio">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡La tarifa fue actualizada exitosamente!</p>
                    <button className="button" onClick={onClose}>Regresar a Tarifas</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crearespacio'>Editar Tarifa</h2>
                    {error && <p className="error">{error}</p>}
                    <div className="form-group">
                        <label htmlFor="tarifaSeleccionada">Tarifa:</label>
                        <select id="tarifaSeleccionada" value={tarifaSeleccionada ? tarifaSeleccionada.id : ''} onChange={handleTarifaSeleccionada}>
                            <option value="">Selecciona una tarifa</option>
                            {tarifas.map((tarifa) => (
                                <option key={tarifa.id} value={tarifa.id}>{tarifa.nombre}</option>
                            ))}
                        </select>
                    </div>
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
                        <label htmlFor="moneda">Moneda:</label>
                        <select id="moneda" value={moneda} onChange={(e) => setMoneda(e.target.value)}>
                            <option value="">Selecciona una moneda</option>
                            {monedas.map((moneda) => (
                                <option key={moneda.id} value={moneda.id}>{moneda.nombre}</option>
                            ))}
                        </select>
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
                        <button type="submit" className='boton-guardar'>Guardar Cambios</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default EditarTarifa;
