// FileDownloader.jsx
import AssignmentReturnedIcon from '@mui/icons-material/AssignmentReturned';
import React from 'react';
import { useHistory } from "react-router";
import GiteIcon from '@mui/icons-material/Gite';

const FileDownloader = () => {
    let history = useHistory();
  const handleDownload = (fileType) => {
    let fileName, fileContent;

    switch (fileType) {
      case 'constancia':
        fileName = 'constancia_trabajo.txt';
        fileContent = 'Contenido de la constancia de trabajo.';
        break;
      case 'certificacionMedica':
        fileName = 'certificacion_medica.txt';
        fileContent = 'Contenido de la certificación médica.';
        break;
      case 'certificadoCesantias':
        fileName = 'certificado_cesantias.txt';
        fileContent = 'Contenido del certificado de cesantías.';
        break;
      default:
        return;
    }

    const blob = new Blob([fileContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = fileName;
    link.click();
  };
  const RedireccionarMenu = () => {
    history.push('/Gerente');
    window.location.reload();
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ margin: '10px' }}>


        <button
          onClick={() => handleDownload('constancia')}
          style={{ backgroundColor: 'lightgreen', color: 'darkgreen', padding: '10px', margin: '5px' }}
        >
          Descargar Constancia de Trabajo <AssignmentReturnedIcon/>
        </button>
      </div>
      <div style={{ margin: '10px' }}>
        <button
          onClick={() => handleDownload('certificacionMedica')}
          style={{ backgroundColor: 'lightblue', color: 'darkblue', padding: '10px', margin: '5px' }}
        >
          Descargar Certificación Médica <AssignmentReturnedIcon/>
        </button>
      </div>
      <div style={{ margin: '10px' }}>
        <button
          onClick={() => handleDownload('certificadoCesantias')}
          style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', margin: '5px' }}
        >
          Descargar Certificado de Cesantías <AssignmentReturnedIcon/>
        </button>
      </div>
      <div style={{ margin: '10px' }}>
        <button
        onClick={RedireccionarMenu}
          style={{ backgroundColor: 'lightcoral', color: 'darkred', padding: '10px', margin: '5px' }}
        >
         Menu Principal <GiteIcon/>
        </button>
      </div>
      
      <br/>
      <br/>
      <br/>
    </div>
    
  );
};

export default FileDownloader;
