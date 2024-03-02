import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

import "../../../Assets/Css/ModalSweetAlert.css"

function Background({ onClose, children}) {

    const handleClickOutside = (event) => {
        // Verifica si el clic fue fuera del formulario
        if (event.target === event.currentTarget) {
          onClose(); // Llama a la función onClose
        }
      };

  return (
    
        <div 
            className="fixed inset-0 z-50 flex justify-center items-center" 
            style={{ zIndex: 9999, backdropFilter: 'blur(1.5px)', backgroundColor: 'rgba(0, 0, 0, 0.7)' }}
            onClick={handleClickOutside} // Agrega el detector de clics aquí
          >

        {children} {/* Renderiza los children aquí */}

        </div>

  )
}

export default Background