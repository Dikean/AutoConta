import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

//components
import Background from './Background'

//Api
import { Companys } from '../../../Services/ApiCompany/Companys';

function UploadDocumentByCompany({onClose}) {

    let { CompanyId } = useParams();
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleFileUpload = () => {
    
        Companys.postSendDataToFirebase(CompanyId, file).then(response => {
            if (response) {
                console.log("Enbviado exitosamente: ", response);
            } else {
                console.log("La respuesta de la API no contiene datos");
            }
        })
        .catch(error => {
            console.error("Error al cargar las compañías", error);
        });
    };

  return (
    <>
  <Background onClose={onClose}>
    <div className="flex flex-col items-center justify-center w-full bg-grey-lighter">
        <label className="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
        <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
            </svg>
            <span className="mt-2 text-base leading-normal">Select a file</span>
            <input type='file' className="hidden" onChange={handleFileChange} />
        </label>

        {/* Button y text */}
        {file && (
                    <div className="text-center mt-4">
                        <p className='p-5'>Archivo seleccionado: {fileName}</p>
                        <Button onClick={handleFileUpload} variant="contained" className='mt-5'>Enviar Archivo</Button>
                    </div>
                )}
    </div>
</Background>

    </>
  )
}

export default UploadDocumentByCompany