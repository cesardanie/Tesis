import React, { useEffect, useState } from 'react';
import '../Estilos/PerfilyAfilaciones.css';
import { FaUserCircle } from 'react-icons/fa';
import ServiceAfiliadosPerfil from '../Services/ServiceAfiliadosPerfil';

const AfiliacionesPerfil = () => {
    const [perfil, setPerfil] = useState({
        correo: '',
        nombre: '',
        edad: '',
        puesto: '',
        sueldo: ''
    });

    useEffect(() => {
        const cargarDatos = async () => {
            try {
                const response = await ServiceAfiliadosPerfil.CargarDatainfo();
                if (response.Estado && response.Datos.Estado) {
                    const data = response.Datos;
                    setPerfil({
                        correo: data.Correo,
                        nombre: data.Nombre,
                        edad: data.Edad,
                        puesto: data.Puesto,
                        sueldo: data.Sueldo
                    });
                }
            } catch (error) {
                console.error('Error al cargar los datos del perfil:', error.message);
            }
        };

        cargarDatos();
    }, []);

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
                            <div className="button-container">
                                <button type="button" className="reject-button">Cancelar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfiliacionesPerfil;
