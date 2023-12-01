import React, { useState,useEffect } from 'react';
import '../Estilos/TabladeUsuariosestilo.css';
import { useHistory } from "react-router";
import ServiceUsuarios from '../Services/ServiceUsuarios';
import AuthServiceToken from '../Services/AuthServiceToken';
import SessionService from '../Services/SessionService';

const TablaUsuarios = () => {
    let history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    correoUsuario: '',
    contrasena: '',
    rol: 'empleado',
  });
  const [reloadTable, setReloadTable] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };
  const RedireccionarTabladeUsuarios=()=>
  {
    history.push('/Gerente');
    window.location.reload();
  }

  const agregarUsuario = () => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
    setNuevoUsuario({
        id:'',
        Correo: '',
        Contrasena: '',
        Rol: 'empleado',
    });
  };
  const eliminarUsuario = async (id) => {
    try {
    
      const usuariosData = await ServiceUsuarios.Eliminar(id);
        console.log(usuariosData);
        if (usuariosData.Estado === true) {
            setReloadTable(!reloadTable); // Cambiar el estado para recargar la tabla
          }
    } catch (error) {
      console.error('Error al eliminar usuario:', error.message);
    }
  };
    // Agrega un efecto para cargar los usuarios al montar el componente
    useEffect(() => {
      // Verificar si el token es válido al cargar el componente
      if (!AuthServiceToken.isLoggedIn()) {
        SessionService.clearSession();
        // Redirigir al menú principal si el token no es válido
        history.push('/'); // Ajusta la ruta según la estructura de tus rutas
      } else {
        const cargarUsuarios = async () => {
          try {
            const usuariosData = await ServiceUsuarios.ObtenerUsuarios();
            setUsuarios(usuariosData.data);
          } catch (error) {
            console.error('Error al cargar usuarios:', error.message);
          }
        };
  
        cargarUsuarios();
      }
    }, [reloadTable, history]); // El segundo argumento es un array de dependencias, en este caso, está vacío, lo que significa que se ejecutará una vez al montar el componente.
    

  return (
    <div>
      <h2>Tabla de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Correo o Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
        {usuarios && usuarios.length > 0 ? (
          usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.id}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Contrasena}</td>
              <td>{usuario.Rol}</td>
              <td>
                <button onClick={() => eliminarUsuario(usuario.id)}>Eliminar</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">No hay usuarios disponibles</td>
          </tr>
        )}
        </tbody>
      </table>

      <div>
        <h3>Agregar Nuevo Usuario</h3>
        <label>
          Correo o Usuario:
          <input
            type="text"
            name="correoUsuario"
            value={nuevoUsuario.correoUsuario}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="contrasena"
            value={nuevoUsuario.contrasena}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rol:
          <select
            name="rol"
            value={nuevoUsuario.rol}
            onChange={handleInputChange}
          >
            <option value="empleado">Empleado</option>
            <option value="administrador">Administrador</option>
          </select>
        </label>
        <br/>
        <button onClick={agregarUsuario}>Agregar Usuario</button>
        <br/>
        <br/>
        <button onClick={RedireccionarTabladeUsuarios}>Menu Principal</button>
        <br/>
        <br/>
      </div>
    </div>
  );
};

export default TablaUsuarios;
