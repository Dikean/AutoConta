import * as React from 'react';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

//compoents
import Background from './Background'

//icons
import BusinessIcon from '@mui/icons-material/Business';

function CreateCompany({onClose}) {
  return (
    <>
    <Background onClose={onClose}>
      <Card sx={{ maxWidth: 345, padding: '20px'  }}>
        <CardContent>
            <Typography gutterBottom variant="h5" component="div">
           <BusinessIcon/> Crear Company
            </Typography>

            <form className="mt-3"> 
              <TextField id="standard-basic" label="Nombre" variant="standard" className="mb-5" />
              <TextField id="standard-basic" label="Email" variant="standard" className="mb-5" />
              <TextField id="standard-basic" label="Access Key" variant="standard" />
            </form>

       
        </CardContent>

        <CardActions>
         <Button variant="contained">Guardar</Button>
        </CardActions>
      </Card>
    </Background>
    </>
  )
}

export default CreateCompany