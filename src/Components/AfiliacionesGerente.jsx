import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ServiceAfiliadosPerfil from '../Services/ServiceAfiliadosPerfil';
import '../Estilos/AfiliacionesGerente.css'; 
import { useHistory } from "react-router";

const AfiliacionesGerente = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [editandoUsuario, setEditandoUsuario] = useState(null);
  const [usuarioEditado, setUsuarioEditado] = useState({});
  let history = useHistory();
  const [reload, setReload] = useState(false);
    // Ejecutar la carga de datos al montar el componente
    useEffect(() => {
      cargarDatos();
    }, [reload]);
 

  const handleEditarClick = (usuario) => {
    setEditandoUsuario(usuario.idUsuario);
    setUsuarioEditado({ ...usuario });
  };
  const cargarDatos = async () => {
    try {
      const response = await ServiceAfiliadosPerfil.CargarDatosdeAfiliados();
      if (response.Estado) {
        setUsuarios(response.Datos.Datos);
      } else {
        console.error('Error en la respuesta de la API:', response.data);
      }
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  };

  const handleInputChange = (e) => {
    setUsuarioEditado({
      ...usuarioEditado,
      [e.target.name]: e.target.value,
    });
  };
  const RedireccionarMenu = () => {
    history.push('/Gerente');
    window.location.reload();
  };
  const handleGuardarClick = async () => {
    try {
      debugger
      const response = await ServiceAfiliadosPerfil.GuardarAfilicacionesEditadas(usuarioEditado);
      console.log('Datos guardados:', response);
      setEditandoUsuario(null);
      setReload(!reload);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Lista de Usuarios</h2>
      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="thead-light"> {/* Azul clarito */}
            <tr>
              <th>ID Usuario</th>
              <th>Nombre</th>
              <th>Pensión</th>
              <th>Cesantías</th>
              <th>Beneficios Educativos</th>
              <th>ARL</th>
              <th>Seguro de Salud</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((usuario, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{usuario.idUsuario}</td>
                    <td>{usuario.Nombre}</td>
                    <td>{usuario.Pension}</td>
                    <td>{usuario.Cesantias}</td>
                    <td>{usuario.BeneficiosEducativos}</td>
                    <td>{usuario.ARL}</td>
                    <td>{usuario.SegurodeSalud}</td>
                    <td>
                      <button className="btn btn-primary" onClick={() => handleEditarClick(usuario)}>Editar</button>
                    </td>
                  </tr>
                  {editandoUsuario === usuario.idUsuario && (
                    <tr>
                      <td colSpan="8">
                        <div className="form-group">
                          <label>Nombre</label>
                          <input
                            type="text"
                            className="form-control short-input" // Input más corto
                            name="Nombre"
                            value={usuarioEditado.Nombre}
                            onChange={handleInputChange}
                            disabled
                          />
                        </div>
                        <div className="form-group">
                          <label>Pensión</label>
                          <input
                            type="text"
                            className="form-control short-input"
                            name="Pension"
                            value={usuarioEditado.Pension}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Cesantías</label>
                          <input
                            type="text"
                            className="form-control short-input"
                            name="Cesantias"
                            value={usuarioEditado.Cesantias}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Beneficios Educativos</label>
                          <input
                            type="text"
                            className="form-control short-input"
                            name="BeneficiosEducativos"
                            value={usuarioEditado.BeneficiosEducativos}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>ARL</label>
                          <input
                            type="text"
                            className="form-control short-input"
                            name="ARL"
                            value={usuarioEditado.ARL}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="form-group">
                          <label>Seguro de Salud</label>
                          <input
                            type="text"
                            className="form-control short-input"
                            name="SegurodeSalud"
                            value={usuarioEditado.SegurodeSalud}
                            onChange={handleInputChange}
                          />
                        </div>
                        <button className="btn btn-success btn-rounded" onClick={handleGuardarClick}>Guardar</button>
                        <button className="btn btn-secondary btn-rounded ml-2" onClick={() => setEditandoUsuario(null)}>Cancelar</button>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No hay datos disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <br/>
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
    </div>
  );
};

export default AfiliacionesGerente;
