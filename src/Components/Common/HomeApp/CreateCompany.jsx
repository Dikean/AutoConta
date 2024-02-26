import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import "../../../Assets/Css/ModalSweetAlert.css"

//Api
import { Companys } from '../../../Services/ApiCompany/Companys';

//compoents
import Background from './Background'

//icons
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';

function CreateCompany({onClose}) {

  const [isJoinOneCompanyVisible, setIsJoinOneCompanyVisible] = useState(false);
  const [codigo, setCodigo] = useState(''); // Nuevo estado para el campo Codigo

  const handleCodigoChange = (e) => {
    setCodigo(e.target.value);
  };

  const handleCloseBackground = () => {
    setIsJoinOneCompanyVisible(false);
  };

  const [formData, setFormData] = useState({
    NameCompany: '',
    Email: '',
    Access_Key: '', // Cambia aquí
    Ubicacion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //cookies
  const UserId = Cookies.get('authUserId');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica adicional si es necesario
    Companys.postCreateCompanys({ ...formData, userId: UserId  })
    .then(response => {
    
      Swal.fire({
        title: '¡Éxito!',
        text: 'Compañía creada exitosamente',
        icon: 'success',
        confirmButtonText: 'OK',
        customClass: {
          popup: 'swal2-popup-custom'
        }
       }).then((result) => {
        // Si el usuario hace clic en "OK", recarga la página o redirige según necesites
        if (result.isConfirmed) {
          window.location.reload();
        }
       });

  })
    .catch(error => {

      Swal.fire({
        title: 'Error',
        text: 'No se pudo crear la compañía',
        icon: 'error',
        confirmButtonText: 'OK'
      });
      
      console.error('Error al unirse a la crear la empresa:', error)
    });
  
  };


  const joinOneCompany = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica adicional si es necesario
    Companys.postJoinOneCompany({ Codigo:codigo, UserId: UserId  })
    .then(response => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Te uniste exitosamente.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
    })
    .catch(error => {
      // Registrar el error en la consola
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar unirse a la empresa.',
        icon: 'error',
        confirmButtonText: 'Ok'
      });
    });
  
  };

  return (
    <>
    <Background onClose={onClose}>
      <Card sx={{ maxWidth: 345, padding: '20px'  }}>
        {!isJoinOneCompanyVisible && (
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
                <div class="flex justify-between items-center">              
                  <div>
                    <BusinessIcon/> Crear Company
                  </div> 
                  <Button onClick={() => setIsJoinOneCompanyVisible(!isJoinOneCompanyVisible)} >
                  <SettingsIcon/>
                  </Button>
              </div>

            
            </Typography>

            <form className="mt-3" onSubmit={handleSubmit}>
        <TextField
          name="NameCompany"
          label="Nombre"
          variant="standard"
          className="mb-5"
          value={formData.NameCompany}
          onChange={handleChange}
        />
        <TextField
          name="Email"
          label="Email"
          variant="standard"
          className="mb-5"
          value={formData.Email}
          onChange={handleChange}
        />
        <TextField
          name="Ubicacion"
          label="Ubicacion"
          variant="standard"
          value={formData.Ubicacion}
          onChange={handleChange}
        />
          <TextField
          name="Access_key" // Asegúrate de que esto coincida con la propiedad del estado
          label="Access_key"
          variant="standard"
          value={formData.Access_key}
          onChange={handleChange}
        />

        <div className="mt-5">
        <Button type="submit" variant="contained" color="primary" >
          Crear Empresa
        </Button>
        </div>
      
            </form>

          </CardContent>
         )}
        {isJoinOneCompanyVisible && ( 
          <CardContent>
          <Typography gutterBottom variant="h7" component="div">
              <div class="flex justify-between items-center">              
                <div>
                  <BusinessIcon/> Agregar Company
                </div> 
                <Button onClick={() => setIsJoinOneCompanyVisible(!isJoinOneCompanyVisible)} >
                <SettingsIcon/>
                </Button>
            </div>

          
          </Typography>

          <form className="mt-3" onSubmit={joinOneCompany}>
          <TextField
          name="Codigo"
          label="Codigo"
          variant="standard"
          className="mb-5"
          value={codigo}
          onChange={handleCodigoChange}
          />
          <div className="mt-5">
          <Button type="submit" variant="contained" color="primary" >
          Agregar
          </Button>
          </div>

          </form>

          </CardContent>
         )}

        <CardActions>
         {/* <Button variant="contained">Guardar</Button> */}
        </CardActions>
      </Card>
    </Background>
    </>
  )
}

export default CreateCompany