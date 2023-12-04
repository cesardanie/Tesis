import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import GestionarDiasAdmiService from '../Services/ServiceGestionDiasGerente';
import SessionService from '../Services/SessionService.js';

const GestionarDiasAdmi = () => {
  let history = useHistory();
  const [data, setData] = useState([]);
  const [estados, setEstados] = useState({});

  useEffect(() => {
    const cargarUsuariosAdmi = async () => {
      try {
        const usuariosData = await GestionarDiasAdmiService.CargarSolicitudesVacaciones();
        const estadosIniciales = usuariosData.data.reduce(
          (acc, item) => ({ ...acc, [item.id]: item.Estado }),
          {}
        );
        setEstados(estadosIniciales);
        setData(usuariosData.data);
        console.log(usuariosData);
      } catch (error) {
        console.error('Error al cargar usuarios:', error.message);
      }
    };

    cargarUsuariosAdmi();
  }, [history]);

  const Menu = () => {
    history.push('/Gerente');
    window.location.reload();
  };

  const handleLogin = async (id, Estado) => {
    try {
      const response = await GestionarDiasAdmiService.ActualizarEstado(Estado, id);
      console.log('Respuesta del servidor:', response);
      setEstados((prevEstados) => ({ ...prevEstados, [id]: Estado }));
    } catch (error) {
      window.alert('Error credenciales inválidas');
      console.error('Error al iniciar sesión:', error.message);
      SessionService.clearSession();
    }
  };

  return (
    <div>
      <h2>Gestionar Días Administrativos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Fecha de inicio</th>
            <th>Fecha de fin</th>
            <th>Observaciones</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.correo}</td>
              <td>{item.DiaInicial}</td>
              <td>{item.Diafinal}</td>
              <td>{item.Observacion}</td>
              <td>{item.Estado}</td>
              <td>
                <select
                  value={estados[item.id] || ''}
                  onChange={(e) =>
                    setEstados((prevEstados) => ({
                      ...prevEstados,
                      [item.id]: e.target.value,
                    }))
                  }
                >
                  <option value="">Seleccionar Estado</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
                <button onClick={() => handleLogin(item.id, estados[item.id])}>
                  Enviar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button className="button" onClick={Menu}>
        Menu Principal
      </button>
      <br />
      <br />
      <br />
    </div>
  );
};

export default GestionarDiasAdmi;
