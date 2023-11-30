import React, { useState } from 'react';

const TablaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    correoUsuario: '',
    contrasena: '',
    rol: 'empleado',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario((prevUsuario) => ({
      ...prevUsuario,
      [name]: value,
    }));
  };

  const agregarUsuario = () => {
    setUsuarios((prevUsuarios) => [...prevUsuarios, nuevoUsuario]);
    setNuevoUsuario({
      correoUsuario: '',
      contrasena: '',
      rol: 'empleado',
    });
  };

  return (
    <div>
      <h2>Tabla de Usuarios</h2>
      <table>
        <thead>
          <tr>
            <th>Correo o Usuario</th>
            <th>Contraseña</th>
            <th>Rol</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario, index) => (
            <tr key={index}>
              <td>{usuario.correoUsuario}</td>
              <td>{usuario.contrasena}</td>
              <td>{usuario.rol}</td>
            </tr>
          ))}
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
        <button onClick={agregarUsuario}>Agregar Usuario</button>
      </div>
    </div>
  );
};

export default TablaUsuarios;
