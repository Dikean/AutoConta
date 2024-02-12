import React from 'react'
import Button from '@mui/material/Button';

//icons
import CancelIcon from '@mui/icons-material/Cancel';


function BackGroundScroll({onClose, children}) {

    const handleClickOutside = (event) => {
        // Verifica si el clic fue fuera del formulario
        if (event.target === event.currentTarget) {
          onClose(); // Llama a la función onClose
        }
      };

  return (

    <div 
  className="fixed inset-0 z-50 flex justify-center items-center" 
  style={{
    zIndex: 9999,
    backdropFilter: 'blur(1.7px)',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  {/* Contenedor para el botón */}
  <div style={{ alignSelf: 'flex-end', paddingRight: '50px', paddingTop: '20px' }}>
    <Button
      onClick={handleClickOutside}
      style={{
        color: 'white', // Color del icono
        backgroundColor: 'red', // Color de fondo del botón
        borderRadius: '10px', // border-radius de 20px
        '&:hover': {
          backgroundColor: 'darkred', // Esto no funcionará aquí
        },
      }}
    >
     <CancelIcon/>
    </Button>
  </div>

  {children} {/* Renderiza los children aquí */}
</div>

  )
}

export default BackGroundScroll