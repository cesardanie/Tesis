// ModalLogin.js
import React from 'react';
import ReactModal from 'react-modal';

ReactModal.setAppElement('#root'); // Configura el elemento raíz de la aplicación

const ModalLogin = ({ isOpen, onClose, isSuccess, message }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="modal-content">
        <h2>{isSuccess ? 'Registro Exitoso' : 'Error de Registro'}</h2>
        <p>{message}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </ReactModal>
  );
};

export default ModalLogin;
