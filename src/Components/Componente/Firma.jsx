import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import ServiceFirma from '../../Services/ServiceFirma';

const Firma = ({ onFirmaListo }) => {
  const firmaCanvas = useRef();

  const limpiarFirma = () => {
    firmaCanvas.current.clear();
  };

  const guardarFirma = async () => {
    const firmaBase64 = firmaCanvas.current.toDataURL();

    try {
      // Convertir la firma a un objeto Blob
      const firmaBlob = await fetch(firmaBase64).then((res) => res.blob());

      // Crear un objeto FormData
      const formData = new FormData();
      const sessionString = localStorage.getItem('session');
      const sessionObject = JSON.parse(sessionString);
      const id = sessionObject.id;
      formData.append('id',id);
      formData.append('firma', firmaBlob, 'firma.png');

      // Adjuntar la firma al servicio utilizando FormData
      const respuestaServicio = await ServiceFirma.PostFirma(formData);
      console.log(respuestaServicio);

      if (respuestaServicio.Estado === true) {
        window.alert('Se agregó correctamente la firma');
      }
      // Manejar la respuesta del servicio según tus necesidades
    } catch (error) {
      console.error('Error al llamar al servicio de firma:', error.message);
      // Manejar el error según tus necesidades
    }
  };

  const descargarFirma = () => {
    const canvas = firmaCanvas.current.getCanvas();
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'firma.png';
    link.click();
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Firma del Gerente</h2>
      <div style={{ border: '1px solid #000', backgroundColor: '#fff', padding: '10px', display: 'inline-block' }}>
        <SignatureCanvas
          ref={firmaCanvas}
          penColor="black"
          canvasProps={{ width: 600, height: 300, className: 'firma-canvas' }}
        />
      </div>
      <br />
      <button style={{ margin: '10px' }} onClick={limpiarFirma}>
        Limpiar Firma
      </button>
      <button style={{ margin: '10px' }} onClick={guardarFirma}>
        Guardar Firma
      </button>
      <button style={{ margin: '10px' }} onClick={descargarFirma}>
        Descargar Firma PNG
      </button>
    </div>
  );
};

export default Firma;
