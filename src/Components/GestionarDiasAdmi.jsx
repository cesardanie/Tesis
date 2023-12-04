import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from "react-router";
import GestionarDiasAdmiService from '../Services/ServiceGestionDiasGerente';

const GestionarDiasAdmi = () => {
    let history = useHistory();
  const [data, setData] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  
  useEffect(() => {
    const cargarUsuariosAdmi = async () => {
      try {
        const usuariosData = await GestionarDiasAdmiService.CargarSolicitudesVacaciones();
        setData(usuariosData.data);
        console.log(usuariosData);
      } catch (error) {
        console.error('Error al cargar usuarios:', error.message);
      }
    };
  
    cargarUsuariosAdmi(); // Llama a la función directamente
  }, [history]);
  

  const handleStatusChange = async (e, id) => {
    try {
      // Lógica para cambiar el estado y enviar la actualización a la API
      setSelectedStatus(e.target.value);
  
      // Actualiza el estado local después de la actualización en la API
      const updatedData = data.map(item => {
        if (item.id === id) {
          return { ...item, Estado: selectedStatus };
        }
        return item;
      });
  
      setData(updatedData);
  
      // Llamada al servicio para actualizar el estado en el servidor
      await GestionarDiasAdmiService.ActualizarEstado(id, selectedStatus);
    } catch (error) {
      console.error('Error al actualizar estado en el servidor:', error.message);
    }
  };
  const Menu=()=>
  {
    history.push('/Gerente');
    window.location.reload();
  }
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
          {data?.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.correo}</td>
              <td>{item.DiaInicial}</td>
              <td>{item.Diafinal}</td>
              <td>{item.Observacion}</td>
              <td>{item.Estado}</td>
              <td>
              <select
                value={selectedStatus}
                onChange={(e) => handleStatusChange(e, item.id)} // Pasa el evento 'e' y el ID
                >
                  <option value="">Seleccionar Estado</option>
                  <option value="Aprobado">Aprobado</option>
                  <option value="Rechazado">Rechazado</option>
                </select>
                <button onClick={() => handleStatusChange(item.id)}>
                  Enviar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <button className="button" onClick={Menu}>
          Menu Principal
        </button>
        <br/>
        <br/>
        <br/>
    </div>
    
  );
};

export default GestionarDiasAdmi;
