import React, { useState, useEffect } from 'react';

const CrearDeportista = () => {
    const [deporte, setDeporte] = useState('');
    const [tipoDocumento, setTipoDocumento] = useState('');
    const [posicion, setPosicion] = useState('');
    const [posiciones, setPosiciones] = useState([]);
    const [numeroDocumento, setNumeroDocumento] = useState('');
    const [fechaNacimiento, setFechaNacimiento] = useState('');
    const [nombreCompleto, setNombreCompleto] = useState('');
    const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
    const [mensajeError, setMensajeError] = useState('');

    useEffect(() => {
        const posicionesPorDeporte = {
            futbol: ['Portero', 'Defensa', 'Medio Centro', 'Delantero'],
            voleibol: ['Libero', 'Armador', 'Punta', 'Central'],
            tenis: ['Predeterminado'],
            natacion: ['Predeterminado'],
        };
        setPosicion(''); // Resetear la posición seleccionada al cambiar el deporte
        setPosiciones(posicionesPorDeporte[deporte] || []);
    }, [deporte]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validar que ninguna casilla esté vacía
        if (!deporte || !posicion || !fechaNacimiento || !nombreCompleto || !numeroDocumento || !tipoDocumento) {
            setMensajeError('Por favor completa todos los campos.');
            return;
        }

        // Validar formato y longitud de fecha de nacimiento
        const fechaNacimientoValida = new Date(fechaNacimiento);
        if (isNaN(fechaNacimientoValida.getTime())) {
            setMensajeError('La fecha de nacimiento debe ser una fecha válida.');
            return;
        }

        // Validar formato y contenido de posición y nombre completo (solo caracteres permitidos)
        if (!/^[a-zA-Z\s]+$/.test(posicion)) {
            setMensajeError('La posición solo puede contener letras y espacios.');
            return;
        }

        // Crear objeto con los datos del deportista
        const datosDeportista = {
            deporte,
            posicion,
            fechaNacimiento,
            nombreCompleto,
            tipoDocumento,
            numeroDocumento
        };

        // Mostrar mensaje de confirmación con los datos del deportista creado
        setMostrarConfirmacion(datosDeportista);

        // Limpiar campos y errores
        setDeporte('');
        setPosicion('');
        setFechaNacimiento('');
        setNombreCompleto('');
        setNumeroDocumento('');
        setTipoDocumento('');
        setMensajeError('');
    };

    return (
        <div className="formulario-crear-deportista">
            {mostrarConfirmacion ? (
                <div className="mensaje-confirmacion">
                    <p>¡La creación del deportista fue exitosa!</p>
                    <button className="button" onClick={() => setMostrarConfirmacion(false)}>Regresar a Crear Deportistas</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h2 className='titulo_crear_deportista'>Crear Nuevo Deportista</h2>
                    {mensajeError && <p className="error">{mensajeError}</p>}
                    <div className="form-group">
                        <label htmlFor="nombreCompleto">Nombres y Apellidos:</label>
                        <input type="text" id="nombreCompleto" value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
                        <div className="input-wrapper">
                            <input
                                type="date"
                                id="fechaNacimiento"
                                value={fechaNacimiento}
                                onChange={(e) => setFechaNacimiento(e.target.value)}
                                className="input-fecha-nacimiento"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="tipoDocumento">Tipo de Documento:</label>
                        <select id="tipoDocumento" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)}>
                            <option value="">Selecciona un tipo de documento</option>
                            <option value="cedula">Cédula</option>
                            <option value="tarjetaIdentidad">Tarjeta de Identidad</option>
                            <option value="cedulaExtranjeria">Cédula de Extranjería</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="numeroDocumento">Número de Documento:</label>
                        <input type="text" id="numeroDocumento" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
                    </div>
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
                        <label htmlFor="posicion">Posición de Juego:</label>
                        <select id="posicion" value={posicion} onChange={(e) => setPosicion(e.target.value)}>
                            <option value="">Selecciona una posición</option>
                            {posiciones.map((pos, index) => (
                                <option key={index} value={pos}>{pos}</option>
                            ))}
                        </select>
                    </div>
                    <div className="button-container">
                        <button type="submit" className='boton-guardar'>Crear</button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default CrearDeportista;
