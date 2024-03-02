import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Background from './Background'
import Button from '@mui/material/Button';

import Swal from 'sweetalert2';
//components


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

      const category = "categoria01"
        Companys.postSendDataToFirebase(CompanyId, file, fileName, category).then(response => {
                Swal.fire({
                    title: '¡Éxito!',
                    text: 'Subiste el archivo exitosamente.',
                    icon: 'success',
                    confirmButtonText: 'Ok',
                    customClass: {
                      container: 'swal2-popup-custom '
                    }
                  }).then((result) => {
                    if (result.value) {
                      // Si el usuario presiona "Ok", refresca la página
                      window.location.reload();
                    }
                  });
        
        })
        .catch(error => {
            Swal.fire({
                title: 'Error',
                text: 'Ha ocurrido un error al intentar Subir los documentos.',
                icon: 'error',
                confirmButtonText: 'Ok',
                customClass: {
                  container: 'swal2-popup-custom '
                }
              }).then((result) => {
                if (result.value) {
                  // Si el usuario presiona "Ok", refresca la página
                  window.location.reload();
                }
              });
        });
    };

  return (
    <>
  <Background onClose={onClose}>

    <div className="flex flex-col items-center justify-center bg-white p-5">

        <h1 className='font-bold p-3'>Subir Archivo</h1>

        <label className="mt-3 border-dashed border-[#e0e0e0] w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
          <svg class="w-8 h-8" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
          </svg>
          <span className="mt-2 text-base leading-normal">Seleccionar un File</span>
            <input type='file' className="hidden" onChange={handleFileChange} />
        </label>
        {/* Button y text */}
        {file && (
                    <div className="text-center mt-4">
                     {/*  Banner */}
                      <div className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8">
                      <div className="flex items-center justify-between">
                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                        {fileName}
                        </span>
                        <button className="text-[#07074D]">
                          {/* SVG or Icon for delete button */}
                        </button>
                      </div>
                      </div>    
                   </div>
        )}

        <div className=" py-5">
        <Button onClick={handleFileUpload} variant="contained" className='mt-5'>Enviar Archivo</Button>
        </div>
                    
    </div>

</Background>



    </>
  )
}



export default UploadDocumentByCompany


