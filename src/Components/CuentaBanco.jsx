import React, { useState } from 'react';
import '../Estilos/cuenta-banco.css';


function CuentaBanco() {
    const [cuenta, setCuenta] = useState('1234567890');
    const [banco, setBanco] = useState('Mi Banco');
    const [editMode, setEditMode] = useState(false);
  
    const handleCuentaChange = (e) => {
      setCuenta(e.target.value);
    };
  
    const handleBancoChange = (e) => {
      setBanco(e.target.value);
    };
  
    const handleEditClick = () => {
      setEditMode(true);
    };
  
    const handleSaveClick = () => {
      setEditMode(false);
    };
  
    // Lista de nombres de bancos
    const bancos = [
      'Mi Banco',
      'Banco A',
      'Banco B',
      'Banco C',
      'Otro Banco',
    ];
  
    return (
      <div className="cuenta-banco">
        <h2>Mi Cuenta Bancaria</h2>
        <table>
          <tbody>
            <tr>
              <td>Número de Cuenta:</td>
              <td>{editMode ? <input type="text" value={cuenta} onChange={handleCuentaChange} /> : cuenta}</td>
            </tr>
            <tr>
              <td>Nombre del Banco:</td>
              <td>
                {editMode ? (
                  <select value={banco} onChange={handleBancoChange}>
                    {bancos.map((nombre, index) => (
                      <option key={index} value={nombre}>
                        {nombre}
                      </option>
                    ))}
                  </select>
                ) : (
                  banco
                )}
              </td>
            </tr>
          </tbody>
        </table>
        {editMode ? (
          <button onClick={handleSaveClick}>Guardar</button>
        ) : (
          <button onClick={handleEditClick}>Editar</button>
        )}
      </div>
    );
  }
  
export default CuentaBanco;
