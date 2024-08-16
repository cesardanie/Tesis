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
    const [afiliacionesEnabled, setAfiliacionesEnabled] = useState(false);
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

    const habilitarAfiliaciones = () => {
        debugger
        setAfiliacionesEnabled(!afiliacionesEnabled);
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
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="pension"
                                            value={perfil.pension}
                                            onChange={(e) => setPerfil({ ...perfil, pension: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cesantias">Cesantías:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cesantias"
                                            value={perfil.cesantias}
                                            onChange={(e) => setPerfil({ ...perfil, cesantias: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cesantias">Beneficios Educativos:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cesantias"
                                            value={perfil.cesantias}
                                            onChange={(e) => setPerfil({ ...perfil, cesantias: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cesantias">ARL:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cesantias"
                                            value={perfil.cesantias}
                                            onChange={(e) => setPerfil({ ...perfil, cesantias: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="cesantias">Seguro de Salud:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="cesantias"
                                            value={perfil.cesantias}
                                            onChange={(e) => setPerfil({ ...perfil, cesantias: e.target.value })}
                                        />
                                    </div>
                                </>
                            )}
                            <div className="button-container">
                                <button type="button" className="reject-button">Cancelar</button>
                                <br/>
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
