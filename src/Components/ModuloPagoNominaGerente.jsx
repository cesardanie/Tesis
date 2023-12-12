// ModuloPagoNominaGerente.js
import React, { useState, useEffect } from 'react';
import Mes from '../Components/Componente/Mes';
import ServiceNomina from '../Services/ServiceNomina';
import { useHistory } from "react-router";

const mesesDelAno = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

const ModuloPagoNominaGerente = () => {
    let history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState('');
  const [estadoPago, setEstadoPago] = useState(''); // Pago, Pendiente, En proceso
  const [filaSeleccionada, setFilaSeleccionada] = useState(null);

  useEffect(() => {
    // Llamada al servicio para obtener datos de la tabla
    ServiceNomina.ObtenerUsuarios()
      .then((data) => {
        setUsuarios(data.Datos); // Actualizar el estado con los datos obtenidos
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error.message);
      });
  }, []); // El segundo parámetro asegura que useEffect solo se ejecute una vez al montar el componente

  const handleRealizarPago = async(index) => {
    try {
        console.log(usuarios[index].id)
        const id=usuarios[index].id
        const datos = await ServiceNomina.CrearPagoNomina(mesSeleccionado, estadoPago, id);
        console.log(`Realizando pago para el mes ${mesSeleccionado} con estado ${estadoPago} en la fila ${index}`);
        window.location.reload();
        // Puedes manejar la respuesta del servicio según sea necesario
      } catch (error) {
        console.error('Error al realizar el pago:', error.message);
      }
  };
  const RedireccionarMenu = () => {
    history.push('/Gerente');
    window.location.reload();
  };

  return (
    <div>
      <h2>Selecciona el pago al colaborador</h2>
      
      {/* Mostrar la tabla de usuarios */}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Puesto</th>
            <th>Sueldo</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.id}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Contrasena}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Edad}</td>
              <td>{usuario.Puesto}</td>
              <td>{usuario.Sueldo}</td>
              <td>
                <button onClick={() => setFilaSeleccionada(index)}>Realizar Pago</button>
                {filaSeleccionada === index && (
                  <div>
                    <label>Mes:</label>
                    <select value={mesSeleccionado} onChange={(e) => setMesSeleccionado(e.target.value)}>
                      <option value="">Selecciona un mes</option>
                      {mesesDelAno.map((mes) => (
                        <option key={mes} value={mes}>{mes}</option>
                      ))}
                    </select>
                    <label>Estado del pago:</label>
                    <select value={estadoPago} onChange={(e) => setEstadoPago(e.target.value)}>
                      <option value="">Selecciona un estado</option>
                      <option value="Pago">Pago</option>
                      <option value="Pendiente">Pendiente</option>
                      <option value="En proceso">En proceso</option>
                    </select>
                    <button onClick={() => handleRealizarPago(index)}>Confirmar Pago</button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Tabla de pagos</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Correo</th>
            <th>Contraseña</th>
            <th>Rol</th>
            <th>Nombre</th>
            <th>Edad</th>
            <th>Puesto</th>
            <th>Sueldo</th>
            <th>Mes y Estado </th>

          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.id}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Contrasena}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Edad}</td>
              <td>{usuario.Puesto}</td>
              <td>{usuario.Sueldo}</td>
              {usuario?.Nomina?.map((nominaItem, nominaIndex) => (
  <tr key={nominaIndex}>
    <td>{nominaItem.Mes}</td>
    <td>{nominaItem.Estado}</td>
  </tr>
))}
              <td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <br />
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
      <br />
      <br />
    </div>
  );
};

export default ModuloPagoNominaGerente;
