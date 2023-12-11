import React, { useState } from 'react';

const CuentaBancariaGerente = () => {
  const [usuarios, setUsuarios] = useState([
    // Lista de usuarios (puedes obtenerla de tu API o definirla aquí)
    { id: 1, Correo: 'usuario1@example.com', Contrasena: 'password1', Rol: 'Gerente', Nombre: 'Nombre1', Edad: 30, Puesto: 'Puesto1', Sueldo: 50000 },
    // Otros usuarios...
  ]);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [nuevaCuenta, setNuevaCuenta] = useState({
    id: '',
    Cuenta: '',
    Banco: ''
  });

  const handleAñadirCuentaClick = (usuario) => {
    setUsuarioSeleccionado(usuario);
    setNuevaCuenta({
      id: usuario.id,
      Cuenta: '',
      Banco: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaCuenta((prevCuenta) => ({
      ...prevCuenta,
      [name]: value
    }));
  };

  const handleGuardarCuentaClick = () => {
    // Lógica para guardar la cuenta (puedes utilizar tu servicio aquí)
    console.log('Guardando cuenta:', nuevaCuenta);
    // Limpia los estados después de guardar
    setUsuarioSeleccionado(null);
    setNuevaCuenta({
      id: '',
      Cuenta: '',
      Banco: ''
    });
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
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>{usuario.Correo}</td>
              <td>{usuario.Contrasena}</td>
              <td>{usuario.Rol}</td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.Edad}</td>
              <td>{usuario.Puesto}</td>
              <td>{usuario.Sueldo}</td>
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
    </div>
  );
};

export default CuentaBancariaGerente;
