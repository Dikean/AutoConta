import React, { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//Api
import { Companys } from '../../../Services/ApiCompany/Companys';

//compoents
import Background from './Background'

//icons
import BusinessIcon from '@mui/icons-material/Business';

function CreateCompany({onClose}) {

  const [formData, setFormData] = useState({
    NameCompany: '',
    Email: '',
    Access_key: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes agregar lógica adicional si es necesario
    Companys.postCreateCompanys({ ...formData, userId: 1557, Date: "2024-01-16", Codigo: formData.NameCompany })
      .then(/* manejar respuesta */)
      .catch(/* manejar error */);
  };

  return (
    <>
    <Background onClose={onClose}>
      <Card sx={{ maxWidth: 345, padding: '20px'  }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
           <BusinessIcon/> Crear Company
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
        name="Access_key"
        label="Access Key"
        variant="standard"
        value={formData.Access_key}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Crear Empresa
      </Button>
    </form>

       
        </CardContent>

        <CardActions>
         {/* <Button variant="contained">Guardar</Button> */}
        </CardActions>
      </Card>
    </Background>
    </>
  )
}

export default CreateCompany