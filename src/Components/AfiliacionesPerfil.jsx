import React, { useEffect, useState } from 'react';
import '../Estilos/PerfilyAfilaciones.css';
import { FaUserCircle } from 'react-icons/fa';
import ServiceAfiliadosPerfil from '../Services/ServiceAfiliadosPerfil';
import { useHistory } from "react-router";

const AfiliacionesPerfil = () => {
    const [perfil, setPerfil] = useState({
        correo: '',
        nombre: '',
        edad: '',
        puesto: '',
        sueldo: '',
        pension: '',
        cesantias: ''
    });
    const [Afilicaiones, setAfiliaciones] = useState({
        Pension: '',
        Cesantias: '',
        BeneficiosEducativos: '',
        ARL: '',
        SegurodeSalud: '',
    });
    const [afiliacionesEnabled, setAfiliacionesEnabled] = useState(false);
    const [hasAfiliacionesData, setHasAfiliacionesData] = useState(false);
    let history = useHistory();

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await ServiceAfiliadosPerfil.CargarDatainfo();
                if (response.Estado && response.Datos.Estado) {
                    const data = response.Datos.Datos;
                    setPerfil({
                        correo: data.Correo || '',
                        nombre: data.Nombre || '',
                        edad: data.Edad || '',
                        puesto: data.Puesto || '',
                        sueldo: data.Sueldo || '',
                        pension: '',
                        cesantias: ''
                    });
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error.message);
            }
        };

        cargarDatos();
    }, []);

    const RedireccionarMenu = () => {
        history.push('/Home');
        window.location.reload();
    };

    const habilitarAfiliaciones = async () => {
        setAfiliacionesEnabled(!afiliacionesEnabled);
        if (!afiliacionesEnabled) {
            try {
                const response = await ServiceAfiliadosPerfil.CargarAfiliaciones();
                console.log(response);

                if (response.Estado && response.Datos.Estado) {
                    const data = response.Datos.Datos[0];
                    setAfiliaciones({
                        Pension: data.Pension || '',
                        Cesantias: data.Cesantias || '',
                        BeneficiosEducativos: data.BeneficiosEducativos || '',
                        ARL: data.ARL || '',
                        SegurodeSalud: data.SegurodeSalud || '',
                    });
                    setHasAfiliacionesData(true); // Indicar que hay datos
                } else {
                    setHasAfiliacionesData(false); // No hay datos, mostrar dropdowns
                }
            } catch (error) {
                console.error('Error al cargar los datos de afiliaciones:', error.message);
                setHasAfiliacionesData(false);
            }
        }
    };

    return (
        <div className="movilidad-container">
            <div className="row">
                <div className="col-md-4">
                    <div className="offer-card">
                        <div className="card-title">
                            <h4>Perfil</h4> <FaUserCircle />
                        </div>
                        <form className="create-offer-form">
                            <div className="form-group">
                                <label htmlFor="correo">Correo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="correo"
                                    value={perfil.correo}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={perfil.nombre}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edad">Edad:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="edad"
                                    value={perfil.edad}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="puesto">Puesto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="puesto"
                                    value={perfil.puesto}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="sueldo">Sueldo:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="sueldo"
                                    value={perfil.sueldo}
                                    disabled
                                />
                            </div>
                            {afiliacionesEnabled && (
                                <>
                                    <div className="form-group">
                                        <label htmlFor="pension">Pensión:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="pension"
                                                value={Afilicaiones.Pension}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="pension">
                                                <option value="">Seleccione una opción</option>
                                                {/* Agrega aquí las opciones de la lista desplegable */}
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cesantias">Cesantías:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cesantias"
                                                value={Afilicaiones.Cesantias}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="cesantias">
                                                <option value="">Seleccione una opción</option>
                                                {/* Agrega aquí las opciones de la lista desplegable */}
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="beneficiosEducativos">Beneficios Educativos:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="beneficiosEducativos"
                                                value={Afilicaiones.BeneficiosEducativos}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="beneficiosEducativos">
                                                <option value="">Seleccione una opción</option>
                                                {/* Agrega aquí las opciones de la lista desplegable */}
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="arl">ARL:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="arl"
                                                value={Afilicaiones.ARL}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="arl">
                                                <option value="">Seleccione una opción</option>
                                                {/* Agrega aquí las opciones de la lista desplegable */}
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="seguroDeSalud">Seguro de Salud:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="seguroDeSalud"
                                                value={Afilicaiones.SegurodeSalud}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="seguroDeSalud">
                                                <option value="">Seleccione una opción</option>
                                                {/* Agrega aquí las opciones de la lista desplegable */}
                                            </select>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="button-container">
                                <button type="button" className="reject-button">Cancelar</button>
                                <br />
                                <button type="button" onClick={habilitarAfiliaciones}>
                                    {afiliacionesEnabled ? 'Ocultar Afiliaciones' : 'Afiliaciones'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
        </div>
    );
};

export default AfiliacionesPerfil;
