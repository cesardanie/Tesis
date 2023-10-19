import React, { useState } from 'react';
import '../Estilos/LoginForm.css';
import AuthService from '../Services/AuthService.js';
import Modal from '../Components/ModalLogin'; // Ajusta la ruta según tu estructura de carpetas
import { useHistory } from "react-router";
import { Redirect } from 'react-router-dom';

const Login = ({onLoginSuccess, handleAuthentication}) => {
  let history = useHistory ();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [userRole, setUserRole] = useState(null);


  const closeModal = () => {
    setModalIsOpen(false);
    setLoginSuccess(false);
    setModalMessage('');
    setIsSuccessModal(false);
  };

  const handleLogin = async () => {
    try {
      //const response = await AuthService.login(username, password);
      //console.log('Respuesta del servidor:', response);
      const mockToken = 'your-mock-token';
      const mockRole = 'empleado';
      // Verifica si el inicio de sesión fue exitoso y obtén el token y el rol del usuario
      //const { token, role } = response;
  
      // Actualiza los estados
      //setIsAuthenticated(!!token); // Si tienes un token, el usuario está autenticado
     // setUserRole(role);
     setIsAuthenticated(!!mockToken); // Si tienes un token, el usuario está autenticado
     setUserRole(mockRole);
      handleAuthentication(mockToken, mockRole);
      localStorage.setItem('token', mockToken);
      localStorage.setItem('role', mockRole );
      // Mostrar modal de éxito y redirigir a la página de inicio
      setLoginSuccess(true);
      setModalIsOpen(true);
      setModalMessage('Inicio de sesión exitoso. ¡Bienvenido!');
      setIsSuccessModal(true);
  
      // Restablecer los campos
      setUsername('');
      setPassword('');
      console.log("esto es null", userRole)
      onLoginSuccess()
      // Llama a la función de callback para indicar el éxito del inicio de sesión
     
    } catch (error) {
      window.alert("Error credenciales inválidas");
      console.error('Error al iniciar sesión:', error.message);
  
      // Mostrar modal de error
      setModalIsOpen(true);
      setModalMessage('Error al iniciar sesión. Credenciales inválidas.');
      setIsSuccessModal(false);
    }
  };
  if (loginSuccess) {
    return <Redirect to="/Home" />;
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Plasticos la pradera</h1>
        <h2>Iniciar Sesión</h2>
        <input
          className="login-input"
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onClose={closeModal}
        isSuccess={isSuccessModal}
        message={modalMessage}
      />
    </div>
  );
};

export default Login;
