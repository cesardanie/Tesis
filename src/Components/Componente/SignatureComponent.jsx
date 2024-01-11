import React, { useRef } from 'react';
import { SignatureCanvas } from 'react-signature-canvas';

const SignatureComponent = () => {
  const signatureRef = useRef();

  const handleSave = () => {
    if (signatureRef.current.isEmpty()) {
      alert('La firma está vacía.');
    } else {
      const dataUrl = signatureRef.current.toDataURL();
      const blob = dataURItoBlob(dataUrl);
      const formData = new FormData();
      formData.append('firma', blob, 'firma.png');

      // Envía el formData al servidor o realiza otras acciones necesarias
      // fetch('URL_DEL_SERVIDOR', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => console.log(data))
      // .catch(error => console.error('Error:', error));

      // Limpiar la firma después de guardar
      signatureRef.current.clear();
    }
  };

  const handleClear = () => {
    // Limpia la firma sin guardar
    signatureRef.current.clear();
  };

  const dataURItoBlob = (dataURI) => {
    const byteString = atob(dataURI.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  };

  return (
    <div>
      <SignatureCanvas
        ref={signatureRef}
        canvasProps={{ width: 500, height: 200, className: 'signature-canvas' }}
      />
      <button onClick={handleSave}>Guardar Firma</button>
      <button onClick={handleClear}>Limpiar Firma</button>
    </div>
  );
};

export default SignatureComponent;
