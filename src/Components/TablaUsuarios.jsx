import React, { useState, useEffect } from 'react';
import '../Estilos/TabladeUsuariosestilo.css';
import { useHistory } from 'react-router';
import ServiceUsuarios from '../Services/ServiceUsuarios';
import AuthServiceToken from '../Services/AuthServiceToken';
import SessionService from '../Services/SessionService';

const TablaUsuarios = () => {
  let history = useHistory();
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    Correo: '',
    Contrasena: '',
    Rol: 'Empleado',
    Nombre: '',
    Edad: '',
    Puesto: '',
    Sueldo: '',
  });
  const [reloadTable, setReloadTable] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const RedireccionarTabladeUsuarios = () => {
    history.push('/Gerente');
    window.location.reload();
  };

  const cargarUsuarios = async () => {
    try {
      const usuariosData = await ServiceUsuarios.ObtenerUsuarios();
      setUsuarios(usuariosData.data);
    } catch (error) {
      console.error('Error al cargar usuarios:', error.message);
    }
  };

  const agregarUsuario = async () => {
    try {
      debugger
      // Llama al servicio para enviar todos los datos del nuevo usuario a la API
      const response = await ServiceUsuarios.AgregarUsuario(nuevoUsuario);
      const estado = response.Estado;
      console.log(response);

      // Si el usuario se agregó exitosamente, recarga la lista de usuarios
      if (estado === true) {
        // Llama a la función cargarUsuarios para obtener la lista actualizada desde la API
        cargarUsuarios();
        window.alert('Usuario Agregado con éxito');
      } else {
        window.alert('El Usuario ya existe y no se puede agregar');

      }

      // Reinicia el estado de nuevoUsuario después de agregarlo
      setNuevoUsuario((prevUsuario) => ({
        ...prevUsuario,
        Correo: '',
        Contrasena: '',
        Rol: '',
        Nombre: '',
        Edad: '',
        Puesto: '',
        Sueldo: '',
      }));
    } catch (error) {
      // Maneja el error aquí si es necesario
      console.error('Error al agregar usuario:', error);
    }
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
      cargarUsuarios();
    }
  }, [reloadTable, history]); // El segundo argumento es un array de dependencias, en este caso, está vacío, lo que significa que se ejecutará una vez al montar el componente.
  // Función para calcular la edad a partir de la fecha de nacimiento
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
            <th>Nombre</th>
            <th>Edad</th>
            <th>Puesto</th>
            <th>Sueldo</th>
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
                <td>{usuario.Nombre}</td>
                <td>{calcularEdad(usuario.Edad)}</td>
                <td>{usuario.Puesto}</td>
                <td>{usuario.Sueldo}</td>
                <td>
                  <button onClick={() => eliminarUsuario(usuario.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">No hay usuarios disponibles</td>
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
            name="Correo"
            value={nuevoUsuario.Correo}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="Contrasena"
            value={nuevoUsuario.Contrasena}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Rol:
          <select
            name="Rol"
            value={nuevoUsuario.Rol}
            onChange={handleInputChange}
          >
            <option value="">Seleccione una opcion</option>
            <option value="Empleado">Empleado</option>
            <option value="Administrador">Administrador</option>
          </select>
        </label>
        <label>
          Nombre:
          <input
            type="text"
            name="Nombre"
            value={nuevoUsuario.Nombre}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Edad:
          <input
            type="date"
            name="Edad"
            value={nuevoUsuario.Edad}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Puesto:
          <input
            type="text"
            name="Puesto"
            value={nuevoUsuario.Puesto}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Sueldo:
          <input
            type="text"
            name="Sueldo"
            value={nuevoUsuario.Sueldo}
            onChange={handleInputChange}
          />
        </label>
        <br />
        <button onClick={agregarUsuario}>Agregar Usuario</button>
        <br />
        <br />
        <button onClick={RedireccionarTabladeUsuarios}>Menu Principal</button>
        <br />
        <br />
      </div>
    </div>
  );
};

export default TablaUsuarios;
