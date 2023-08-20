import React, { useState } from 'react';
import '../Estilos/LoginForm.css';
import AuthService from '../Services/AuthService.js';
import Modal from '../Components/ModalLogin'; // Ajusta la ruta según tu estructura de carpetas

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isSuccessModal, setIsSuccessModal] = useState(false);

  const closeModal = () => {
    setModalIsOpen(false);
    setLoginSuccess(false);
    setModalMessage('');
    setIsSuccessModal(false);
  };

  const handleLogin = async () => {
    try {
      const response = await AuthService.login(username, password);
      console.log('Respuesta del servidor:', response);

      // Mostrar modal de éxito
      setLoginSuccess(true);
      setModalIsOpen(true);
      window.alert("Bienvenido")
      setModalMessage('Inicio de sesión exitoso. ¡Bienvenido!');
      setIsSuccessModal(true);

      // Restablecer los campos
      setUsername('');
      setPassword('');
    } catch (error) {
      window.alert("Error credenciales invalidas")
      console.error('Error al iniciar sesión:', error.message);

      // Mostrar modal de error
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
