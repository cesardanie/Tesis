import React, { useState } from 'react';
import '../Estilos/LoginForm.css';
import AuthService from '../Services/AuthService.js';
import Modal from '../Components/ModalLogin'; // Ajusta la ruta según tu estructura de carpetas
import { useHistory } from "react-router";
import { Redirect } from 'react-router-dom';

const Login = () => {
  let history = useHistory();
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
      // Validaciones adicionales
      if (!username || !password) {
        // Si el nombre de usuario o la contraseña están en blanco, muestra un mensaje de error
        window.alert("Por favor, completa todos los campos.");
        return;
      }

      // Realizar la solicitud de inicio de sesión
      const response = await AuthService.login(username, password);
      console.log('Respuesta del servidor:', response);
      if(response.estado==='true'){
        console.log("positivo")
        const { token, role } = response;
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.Rol);
        localStorage.setItem('id', response.id);
        localStorage.setItem('estado', response.estado);
        // Mostrar modal de éxito y redirigir a la página de inicio
        setLoginSuccess(true);
        setModalIsOpen(true);
        setModalMessage('Inicio de sesión exitoso. ¡Bienvenido!');
        setIsSuccessModal(true);
  
        history.push('/Home');
        // Recargar la página
        window.location.reload();
      }
      if(response.estado==='false')
      {
        console.log("negativo")
        window.alert("credenciales inválidas");
        // Mostrar modal de error
        setModalIsOpen(true);
        setModalMessage('Error al iniciar sesión. Credenciales inválidas.');
        setIsSuccessModal(false);
                // Restablecer los campos
                setUsername('');
                setPassword('');
        history.push('/');
      }


    } catch (error) {
      window.alert("Error credenciales inválidas");
      console.error('Error al iniciar sesión:', error.message);

      // Mostrar modal de error
      setModalIsOpen(true);
      setModalMessage('Error al iniciar sesión. Credenciales inválidas.');
      setIsSuccessModal(false);
    }
  };

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
          required
        />
        <input
          className="login-input"
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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
