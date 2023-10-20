import React, { useState, useEffect } from 'react';
import '../Estilos/TablaStyles.css';

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Realiza una solicitud a la API para obtener los datos de los usuarios
    fetch('https://api-ejemplo.com/users')
      .then((response) => response.json())
      .then((data) => {
        setUsers(data); // Almacena los datos de los usuarios en el estado
      })
      .catch((error) => {
        console.error('Error al obtener datos de la API', error);
      });
  }, []);

  return (
    <div>
      <h1>Tabla de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
