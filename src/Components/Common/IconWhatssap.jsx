import React from 'react'
import Fab from '@mui/material/Fab';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
function IconWhatssap() {

  return (
   <>
   <a className="fixed bottom-0 right-0  p-6 mb-4" href='https://wa.me/573225080628?text=Hola%2C%20me%20gustaria%20conocer%20más%20sobre%20su%20aplicacion'>
    <Fab style={{zIndex: 10, backgroundColor: 'green', padding: '35px' }} aria-label="whatssap">
    <WhatsAppIcon  style={{ fontSize: '50px', color: 'white' }}></WhatsAppIcon >
    </Fab>
   </a>
    
   </>
  )
}

export default IconWhatssap