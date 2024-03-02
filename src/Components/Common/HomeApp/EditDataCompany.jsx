import React, { useState, useEffect } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Companys } from '../../../Services/ApiCompany/Companys';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';

//icons
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';

//componets
import Background from './Background'

function EditDataCompany({onClose}) {

  let { CompanyId } = useParams();

  const [formData, setFormData] = useState({
    NameCompany: '',
    Email: '',
    Access_key: '',
    Ubicacion: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

    
      const handleSubmit = (e) => {
        e.preventDefault();

        const dataToUpdate = {
            NameCompany: formData.NameCompany,
            Email: formData.Email,
            Access_key: formData.Access_key,
            Ubicacion: formData.Ubicacion
        };

        Companys.putCompanys({ ...dataToUpdate, CompanyId: CompanyId })
        .then(response => {
          Swal.fire({
            title: '¡Éxito!',
            text: 'Se editó correctamente.',
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
            text: 'Ha ocurrido un error al intentar Editar a la empresa.',
            icon: 'error',
            confirmButtonText: 'Ok'
          }).then((result) => {
            if (result.value) {
              // Si el usuario presiona "Ok", refresca la página
              window.location.reload();
            }
          });
        });
    };

          //api
    const [getcompany, setCompany] = useState([]);

    useEffect(() => {
      Companys.getCompanyDataById(CompanyId)
      .then(response => {
          if (response) {
              setCompany(response);
              // Actualizar formData aquí
              const companyData = response[0];
              setFormData({
                NameCompany: companyData.NameCompany,
                Email: companyData.Email,
                Access_key: companyData.Access_key,
                Ubicacion: companyData.Ubicacion
              });
          } else {
              console.log("La respuesta de la API no contiene datos");
          }
      })
      .catch(error => {
          console.error("Error al cargar las compañías", error);
      });
    }, [CompanyId]); // Asegúrate de incluir CompanyId como dependencia si es necesario
    

    return (
      <Background onClose={onClose}>
        <Card sx={{ maxWidth: 345, padding: '20px' }}>
          <CardContent>
            <Typography gutterBottom variant="h7" component="div">
              <div className="flex justify-between items-center">
                <div>
                  <BusinessIcon /> Editar Company
                </div>
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
                name="Access_key"
                label="Access_key"
                variant="standard"
                value={formData.Access_key}
                onChange={handleChange}
              />
              <div className="mt-5">
                <Button type="submit" variant="contained" color="primary">
                  Editar Empresa
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Background>
    );

  }

export default EditDataCompany