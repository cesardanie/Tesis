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
    onFirmaListo(firmaBase64);

    try {
      console.log(firmaBase64)
      const respuestaServicio = await ServiceFirma.PostFirma(firmaBase64);
      console.log(respuestaServicio);
      // Manejar la respuesta del servicio según tus necesidades
    } catch (error) {
      console.error('Error al llamar al servicio de firma:', error.message);
      // Manejar el error según tus necesidades
    }
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
    </div>
  );
};

export default Firma;
