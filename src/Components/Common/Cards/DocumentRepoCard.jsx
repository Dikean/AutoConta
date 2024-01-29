import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Link from '@mui/joy/Link';
import Favorite from '@mui/icons-material/Favorite';
import CreateNewFolder from '@mui/icons-material/CreateNewFolder';
import VisibilityIcon from '@mui/icons-material/Visibility'
import DeleteIcon from '@mui/icons-material/Delete';
import { useParams } from 'react-router-dom';

//Api
import { Companys } from '../../../Services/ApiCompany/Companys';

function DocumentRepoCard() {
 
 //api
 const [getDocumentscompany, setDocumentsCompany] = useState([]);

 const handleDelete = (documentId) => {
  console.log("ID del documento a eliminar1:", documentId);
  Companys.deleteDocumentsByCompany(9)
  .then(response => {
    console.log(" que recibo: ", response);
  }).catch(error => {
    console.error("Error al cargar las compañías", error);
})
};


 let { CompanyId } = useParams();

  useEffect(() => {
    Companys.getDocumentsByCompany(CompanyId)
    .then(response => {
      console.log(" que recibo: ", response);
        if (response) {
          setDocumentsCompany(response);
            console.log("Respuesta: ", response);
        } else {
            console.log("La respuesta de la API no contiene datos");
        }
    })
    .catch(error => {
        console.error("Error al cargar las compañías", error);
    });
  }, []);

  return (
        <>

<       div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}> {/* Contenedor Flex */}
                 
        {getDocumentscompany.map((company, index) => (
          <Card
        variant="plain"
        sx={{
          width: 200,
          bgcolor: 'initial',
          p: 0,
        }}
      >
        <Box sx={{ position: 'relative' }}>
          <AspectRatio ratio="4/3">
            <figure>
              <img
                src="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300"
                srcSet="https://images.unsplash.com/photo-1515825838458-f2a94b20105a?auto=format&fit=crop&w=300&dpr=2 2x"
                loading="lazy"
                alt="Yosemite by Casey Horner"
              />
            </figure>
          </AspectRatio>
          <CardCover
            className="gradient-cover"
            sx={{
              '&:hover, &:focus-within': {
                opacity: 1,
              },
              opacity: 0,
              transition: '0.1s ease-in',
              background:
                'linear-gradient(180deg, transparent 62%, rgba(0,0,0,0.00345888) 63.94%, rgba(0,0,0,0.014204) 65.89%, rgba(0,0,0,0.0326639) 67.83%, rgba(0,0,0,0.0589645) 69.78%, rgba(0,0,0,0.0927099) 71.72%, rgba(0,0,0,0.132754) 73.67%, rgba(0,0,0,0.177076) 75.61%, rgba(0,0,0,0.222924) 77.56%, rgba(0,0,0,0.267246) 79.5%, rgba(0,0,0,0.30729) 81.44%, rgba(0,0,0,0.341035) 83.39%, rgba(0,0,0,0.367336) 85.33%, rgba(0,0,0,0.385796) 87.28%, rgba(0,0,0,0.396541) 89.22%, rgba(0,0,0,0.4) 91.17%)',
            }}
          >
            {/* The first box acts as a container that inherits style from the CardCover */}
            <div>
              <Box
                sx={{
                  p: 2,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  flexGrow: 1,
                  alignSelf: 'flex-end',
                }}
              >
                <Typography level="h2" noWrap sx={{ fontSize: 'lg' }}>
                  <Link
                    href="#dribbble-shot"
                    overlay
                    underline="none"
                    sx={{
                      color: '#fff',
                      textOverflow: 'ellipsis',
                      overflow: 'hidden',
                      display: 'block',
                    }}
                  >
                 {company.categoria} 
                  </Link>
                </Typography>
                <IconButton
                  size="sm"
                  variant="solid"
                  color="neutral"
                  sx={{ ml: 'auto', bgcolor: 'rgba(0 0 0 / 0.2)' }}
                  onClick={() => handleDelete(company.RepositoryId	)} // Suponiendo que 'id' es la propiedad que identifica a cada documento
              >
                  <DeleteIcon  />
                </IconButton>
              </Box>
            </div>
          </CardCover>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
        <Typography sx={{ fontSize: 'sm', fontWeight: 'md', flexGrow: 1 }}>
        {company.categoria} 
        </Typography>
        <Link
          href={company.rutadelarchivo}
          target="_blank" 
          underline="none"
          sx={{
            display: 'flex',
            alignItems: 'center',
            fontWeight: 'md',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
            flexShrink: 0
          }}
        >
          <VisibilityIcon />
        </Link>
      </Box>
          </Card>
              ))}
        </div>
     
        </>
  )

}

export default DocumentRepoCard