import React, { useState, useEffect } from 'react';
import '../Estilos/cuenta-banco.css';
import ServiceCambiodeCuenta from '../Services/ServiceCambiodeCuenta';

function CuentaBanco() {
  const [cuenta, setCuenta] = useState('');
  const [banco, setBanco] = useState('');
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const obtenerDatosCuenta = async () => {
      try {
        const datosCuenta = await ServiceCambiodeCuenta.ExtraerCuenta();
        
        if (datosCuenta && datosCuenta.Datos && datosCuenta.Datos.length > 0) {
          const primeraCuenta = datosCuenta.Datos[0];
    
          if (primeraCuenta && primeraCuenta.Cuenta && primeraCuenta.Banco) {
            setCuenta(primeraCuenta.Cuenta);
            setBanco(primeraCuenta.Banco);
          } else {
            console.error('Los datos recibidos no contienen las propiedades esperadas:', primeraCuenta);
          }
        } else {
          console.error('Los datos recibidos no tienen la estructura esperada:', datosCuenta);
        }
      } catch (error) {
        console.error('Error al obtener datos de cuenta:', error);
      }
    };
    
    obtenerDatosCuenta();
  }, []);

  const handleCuentaChange = (e) => {
    setCuenta(e.target.value);
  };

  const handleBancoChange = (e) => {
    setBanco(e.target.value);
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = async () => {
    try {
      // Lógica para guardar los cambios utilizando el servicio
      await ServiceCambiodeCuenta.CargarCuentaEdit({ Cuenta: cuenta, Banco: banco });
      setEditMode(false);
    } catch (error) {
      console.error('Error al guardar datos:', error);
  
      // Si el error tiene un mensaje personalizado, puedes mostrarlo al usuario
      if (error.message) {
        alert(`Error al guardar datos: ${error.message}`);
      } else {
        alert('Error desconocido al guardar datos. Por favor, inténtelo de nuevo.');
      }
    }
  };
  

  const bancos = [
    'Bancolombia',
    'Banco de Bogota',
    'Banco de Occidente',
    'Banco Popular',
    'Banco caja social',
    'Davivienda',
    'Neul',
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
