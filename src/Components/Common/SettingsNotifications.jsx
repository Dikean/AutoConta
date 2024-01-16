import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Collapse from '@mui/material/Collapse';

//auth 0
import { useAuth0 } from "@auth0/auth0-react";

//COmponents
import Notifications from './Notifications';
import { Divider } from '@mui/material';
import Loading from './Loading';
import UnauthenticatedView from './UnauthenticatedView';

//icons
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

function SettingsNotifications() {

  //auth 0 
  const { user, isAuthenticated, isLoading, getAccessTokenSilently, getIdTokenClaims } = useAuth0();

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
  );

  if (isLoading) {
    return <Loading></Loading>;
  }
 
 if (!isAuthenticated) {
   return <UnauthenticatedView />; // Vista para usuarios no autenticados
 }

  return (
    <>

    <div className='bg-[#e5eaf0] min-h-screen'>

      <nav className="py-4 px-4 md:px-0">
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div>
            <a href="/" className="text-xl font-bold">Mi Logo</a>
          </div>

          {/* Botones de navegación */}
          <div className="flex space-x-4">
            <Notifications></Notifications>
            <Avatar  src={user.picture} alt={user.name}  />
            {/* Agrega más botones según sea necesario */}
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-6 md:p-12 ">
      <h1>Configuraciones</h1>

      <Card sx={{ minWidth: 275, marginTop: '20px' }}>
      <CardContent>

        <CardActions style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        
          <h2>Configuraciones Avanzadas</h2>

          <Button variant="contained" onClick={handleExpandClick}>
          {expanded ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </Button>

        </CardActions>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </Collapse>

      </CardContent>

      </Card>
      </main>

    </div>


    </>
  )
}

export default SettingsNotifications