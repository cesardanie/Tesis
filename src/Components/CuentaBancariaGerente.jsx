import React, { useState,useEffect } from 'react';
import { useHistory } from "react-router";
import ServiceCambiodeCuenta from '../Services/ServiceCambiodeCuenta';

const CuentaBancariaGerente = () => {
  let history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevaCuenta, setNuevaCuenta] = useState({
    id: '',
    Cuenta: '',
    Banco: '',
  });

  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await ServiceCambiodeCuenta.ExtraerCuentaTotal();
        setUsuarios(data.Datos);
      } catch (error) {
        console.error('Error al cargar usuarios:', error.message);
      }
    };

    cargarUsuarios();
  }, []); // El segundo argumento [] asegura que se ejecute solo al montar el componente

  const handleAñadirCuentaClick = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevaCuenta({
      id: usuario.id,
      Cuenta: '',
      Banco: '',
    });
  };

  const RedireccionarMenu = () => {
    history.push('/Gerente');
    window.location.reload();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCuenta((prevCuenta) => ({
      ...prevCuenta,
      [name]: value,
    }));
  };

  const handleGuardarCuentaClick = async () => {
    try {
      // Lógica para guardar la cuenta utilizando el servicio
      const respuesta=await ServiceCambiodeCuenta.InsertarDatos(nuevaCuenta);
      console.log(respuesta);
      if(respuesta.Estado===true)
      {
        window.alert("Se agrego correctamente la cuenta")
        window.location.reload();
      }else{
        window.alert("No se pudo agregar")
        window.location.reload();
      }
      setUsuarioSeleccionado(null);
      setNuevaCuenta({
        id: '',
        Cuenta: '',
        Banco: '',
      });
      
    } catch (error) {
      console.error('Error al guardar cuenta:', error.message);
    }
  };

  return (
    <div>
      <h2>Usuarios</h2>
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
            <th>Banco</th>
            <th>Cuenta</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios?.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Contrasena}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Edad}</td>
              <td>{usuario.Puesto}</td>
              <td>{usuario.Sueldo}</td>
              <td>{usuario.Cuenta}</td>
              <td>{usuario.Banco}</td>
              <td>
                <button onClick={() => handleAñadirCuentaClick(usuario)}>Añadir Cuenta</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {usuarioSeleccionado && (
        <div>
          <h2>Añadir Cuenta para {usuarioSeleccionado.Nombre}</h2>
          <form>
            <label>
              ID:
              <input type="text" name="id" value={nuevaCuenta.id} readOnly />
            </label>
            <br />
            <label>
              Cuenta:
              <input type="text" name="Cuenta" value={nuevaCuenta.Cuenta} onChange={handleInputChange} />
            </label>
            <br />
            <label>
              Banco:
              <input type="text" name="Banco" value={nuevaCuenta.Banco} onChange={handleInputChange} />
            </label>
            <br />
            <button type="button" onClick={handleGuardarCuentaClick}>Guardar Cuenta</button>
          </form>
        </div>
      )}
      <br />
      <br />
      <button type="button" onClick={RedireccionarMenu}>Menu Principal</button>
      <br />
      <br />
    </div>
  );
};

export default CuentaBancariaGerente;
