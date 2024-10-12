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
                        edad: calcularEdad(data.Edad) || '',
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
    const calcularEdad = (fechaNacimiento) => {
        const hoy = new Date();
        const nacimiento = new Date(fechaNacimiento);
    
        let edad = hoy.getFullYear() - nacimiento.getFullYear();
        const mes = hoy.getMonth() - nacimiento.getMonth();
    
        // Ajusta si el mes actual es anterior al mes de nacimiento
        if (mes < 0 || (mes === 0 && hoy.getDate() < nacimiento.getDate())) {
          edad--;
        }
    
        return edad;
      };
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
                    setHasAfiliacionesData(true);
                } else {
                    setHasAfiliacionesData(false);
                }
            } catch (error) {
                console.error('Error al cargar los datos de afiliaciones:', error.message);
                setHasAfiliacionesData(false);
            }
        }
    };

    const handleSubmit = async (event) => {
        debugger
        debugger
        const sessionString = localStorage.getItem('session');
        const sessionObject = JSON.parse(sessionString);
        const token = sessionObject.token;
        const id = sessionObject.id;
        event.preventDefault();
        console.log('Datos a enviar:', {
            pension: Afilicaiones.Pension || '',
            cesantias: Afilicaiones.Cesantias || '',
            beneficiosEducativos: Afilicaiones.BeneficiosEducativos || '',
            arl: Afilicaiones.ARL || '',
            seguroDeSalud: Afilicaiones.SegurodeSalud || '',
            id: id
        });
    
        const datosAfiliaciones = {
            pension: Afilicaiones.Pension || '',
            cesantias: Afilicaiones.Cesantias || '',
            beneficiosEducativos: Afilicaiones.BeneficiosEducativos || '',
            arl: Afilicaiones.ARL || '',
            seguroDeSalud: Afilicaiones.SegurodeSalud || '',
            id: id||''
        };
    
        try {
            const response = await ServiceAfiliadosPerfil.GuardarAfiliaciones(datosAfiliaciones);
            console.log('Respuesta del servidor:', response);
    
            if (response.Estado) {
                console.log('Datos guardados exitosamente:', response.Datos);
                window.location.reload();
            } else {
                console.error('Error al guardar los datos:', response.Mensaje);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error.message);
        }
    };
    

    const handleChange = (event) => {
        const { id, value } = event.target;
        console.log(`Cambios en ${id}:`, value); // Agrega esta línea para verificar el valor
        setAfiliaciones(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    return (
        <div className="movilidad-container">
            <div className="row">
                <div className="col-md-4">
                    <div className="offer-card">
                        <div className="card-title">
                            <h4>Perfil</h4> <FaUserCircle />
                        </div>
                        <form className="create-offer-form" onSubmit={handleSubmit}>
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
                                        <label htmlFor="Pension">Pensión:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Pension"
                                                value={Afilicaiones.Pension}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="Pension" value={Afilicaiones.Pension} onChange={handleChange}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="colpensiones">Colpensiones</option>
                                                <option value="porvenir">Porvenir</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="Cesantias">Cesantías:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="Cesantias"
                                                value={Afilicaiones.Cesantias}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="Cesantias" value={Afilicaiones.Cesantias} onChange={handleChange}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="colpensiones">Colpensiones</option>
                                                <option value="porvenir">Porvenir</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="BeneficiosEducativos">Beneficios Educativos:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="BeneficiosEducativos"
                                                value={Afilicaiones.BeneficiosEducativos}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="BeneficiosEducativos" value={Afilicaiones.BeneficiosEducativos} onChange={handleChange}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="SI">SI</option>
                                                <option value="NO">NO</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="ARL">ARL:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="ARL"
                                                value={Afilicaiones.ARL}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="ARL" value={Afilicaiones.ARL} onChange={handleChange}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="sura">Sura</option>
                                                <option value="Compensar">Compensar</option>
                                            </select>
                                        )}
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="SegurodeSalud">Seguro de Salud:</label>
                                        {hasAfiliacionesData ? (
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="SegurodeSalud"
                                                value={Afilicaiones.SegurodeSalud}
                                                disabled
                                            />
                                        ) : (
                                            <select className="form-control" id="SegurodeSalud" value={Afilicaiones.SegurodeSalud} onChange={handleChange}>
                                                <option value="">Seleccione una opción</option>
                                                <option value="si">SI</option>
                                                <option value="no">NO</option>
                                            </select>
                                        )}
                                    </div>
                                </>
                            )}
                            <div className="button-container">
                                <button type="button" onClick={RedireccionarMenu} className="reject-button">Cancelar</button>
                                <br />
                                <button type="submit" className="btn btn-success">
                                    Guardar
                                </button>
                                <br />
                                <button type="button" onClick={habilitarAfiliaciones}>
                                    {afiliacionesEnabled ? 'Ocultar Afiliaciones' : 'Afiliaciones'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AfiliacionesPerfil;
