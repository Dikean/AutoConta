import React from 'react'

function BackGroundScroll({ onClose, children}) {

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
        width: '100vw', // Asegura que el div ocupe todo el ancho de la ventana
        height: '100vh', // Asegura que el div ocupe toda la altura de la ventana
        display: 'flex', // Usa flexbox para centrar el contenido
        flexDirection: 'column', // Alinea los hijos verticalmente
        justifyContent: 'center', // Centra los hijos verticalmente
        alignItems: 'center', // Centra los hijos horizontalmente
      }}
    onClick={handleClickOutside} // Agrega el detector de clics aquí
  >

{children} {/* Renderiza los children aquí */}

</div>
  )
}

export default BackGroundScroll