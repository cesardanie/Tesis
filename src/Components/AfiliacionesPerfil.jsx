import React, { useEffect, useState } from 'react';
import '../Estilos/PerfilyAfilaciones.css';
import { FaUserCircle } from 'react-icons/fa';
import ServiceAfiliadosPerfil from '../Services/ServiceAfiliadosPerfil';

const AfiliacionesPerfil = () => {
    const [perfil, setPerfil] = useState({
        correo: '',
        contrasena: '',
        nombre: '',
        edad: '',
        puesto: '',
        afiliacionCesantias: '',
        fondoPensiones: ''
    });

    useEffect(async() => {

        try {
            const data=await ServiceAfiliadosPerfil.CargarDatainfo()
            setPerfil(data); 

        } catch (error) {
            console.error('Error al enviar los datos al servidor:', error.message);

        }
    }, []);

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setPerfil({ ...perfil, [id]: value });
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
                                    type="email"
                                    className="form-control"
                                    id="correo"
                                    value={perfil.correo}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="contrasena">Contraseña:</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="contrasena"
                                    value={perfil.contrasena}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="nombre">Nombre:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    value={perfil.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="edad">Edad:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="edad"
                                    value={perfil.edad}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="puesto">Puesto:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="puesto"
                                    value={perfil.puesto}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="afiliacionCesantias">Afiliación de Cesantías:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="afiliacionCesantias"
                                    value={perfil.afiliacionCesantias}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="fondoPensiones">Fondo de Pensiones:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="fondoPensiones"
                                    value={perfil.fondoPensiones}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="button-container">
                                <button type="submit" className="apply-button">Guardar</button>
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
