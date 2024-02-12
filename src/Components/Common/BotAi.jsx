import React, { useState, useEffect } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Textarea from '@mui/joy/Textarea';

//components
import BackGroundScroll from './BackGround/BackGroundScroll';
import { Companys } from '../../Services/ApiCompany/Companys';

function BotAi({onClose}) {
    
    const [responseContent, setResponseContent] = useState('');

    const [formData, setFormData] = useState({
        model: "gpt-3.5-turbo",
        temperature: 0.7
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };

      
      const handleSubmit = (e) => {
        e.preventDefault();
      
        // Formatear el campo messages correctamente
        const payload = {
          ...formData,
          messages: [{ role: "user", content: formData.messages }],
        };
      
        // Asumiendo que Companys.postSendQuestioToChatGpt está correctamente definido
        Companys.postSendQuestioToChatGpt(payload)
        .then(data => {
          if (data.choices && data.choices.length > 0) {
            const content = data.choices[0].message.content;
            setResponseContent(content); // Actualiza el estado con el contenido de la respuesta
          } else {
            console.log('La respuesta no tiene el formato esperado o está vacía');
            setResponseContent('No se recibió una respuesta válida.'); // Opcional: manejar casos sin respuesta
          }
        })
        .catch(error => {
          console.error("Error en la solicitud:", error);
          setResponseContent('Ocurrió un error al procesar su solicitud.'); // Manejar errores
        });
        
        
      
      };
      
    

  return (
    <BackGroundScroll onClose={onClose}>
<Box
  sx={{
    width: 650, // Ancho del Box
    height: 500, // Altura del Box
    color: 'white', // Color del texto dentro del Box
    boxShadow: 3, // Aplica una sombra predefinida por Material-UI
    display: 'flex', // Utiliza flexbox para alinear el contenido
    justifyContent: 'center', // Centra el contenido horizontalmente
    alignItems: 'center', // Centra el contenido verticalmente
    overflow: 'auto', // Añade desplazamiento automático cuando el contenido excede el tamaño del Box

  }}
> 
      {/* Contenido del Box */}
   <p className='p-5 mt-5 mb-5'>{responseContent}</p>
   
    </Box>

    <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: "50px" }}>

            <Textarea
             minRows={2}
                    value={formData.messages}
                    onChange={handleChange}
                    placeholder="Pregúntame algo!"
                    variant="soft"
                    sx={{
                      width: '400px', 
                      borderRadius: '100px',
                      borderBottom: '2px solid',
                      borderColor: 'neutral.outlinedBorder',
                      borderRadius: 0,
                      '&:hover': {
                        borderColor: 'neutral.outlinedHoverBorder',
                      },
                      '&::before': {
                        border: '1px solid var(--Textarea-focusedHighlight)',
                        transform: 'scaleX(0)',
                        left: 0,
                        right: 0,
                        bottom: '-2px',
                        top: 'unset',
                        transition: 'transform .15s cubic-bezier(0.1,0.9,0.2,1)',
                        borderRadius: 0,
                      },
                      '&:focus-within::before': {
                        transform: 'scaleX(1)',
                      },
             }}
            />
            <Button  type="submit" className='bg-info'>Enviar</Button>
        </form>
    </BackGroundScroll>
  )
}

export default BotAi