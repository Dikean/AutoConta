import React, { useState, useEffect } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

//Api
import { Companys } from '../../Services/ApiCompany/Companys';

//components
import Navbar_sidebar from './Navbar_sidebar'
import Background from './HomeApp/Background';
import ChartStatistics from './HomeApp/ChartStatistics';
import CreateCompany from './HomeApp/CreateCompany';
import Bussness from '../../Assets/Img/Company.jpg'
import Loading from './Loading';
//icon
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';



function HomeApp(props) {

  //api
  const [getcompanys, setCompanys] = useState([]);
  
  const [cargaIntentos, setCargaIntentos] = useState(0);
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

  useEffect(() => {
    Companys.getCompanysByUserId()
      .then(response => {
        if (response) {
          setCompanys(response);
        } else {
          console.log("La respuesta de la API no contiene datos");
          // Incrementa el contador de intentos para reintentar la carga
          setCargaIntentos(cargaIntentos => cargaIntentos + 1);
        }
      })
      .catch(error => {
        console.error("Error al cargar las compañías", error);
        // Incrementa el contador de intentos para reintentar la carga
        setCargaIntentos(cargaIntentos => cargaIntentos + 1);
      });
  }, [cargaIntentos]); // Dependencia del efecto

  // Función para manejar el reintento manualmente, si lo necesitas
  const reintentaCarga = () => {
    setCargaIntentos(cargaIntentos => cargaIntentos + 1);
  };


  const handleCloseBackground = () => {
    setIsComponentVisible(false);
    setIsChartVisible(false);
  };


  return (
    <>
  

    <Navbar_sidebar>

    <div className="container">

    <div className="flex justify-between items-center mb-5 mt-3">
    <h1 className="text-2xl flex-shrink-0" >
     <BusinessIcon/> Empresas
    </h1>
    <div className="flex-shrink-0">
      
    <Tooltip title="Estadisticas">
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginRight: '8px' }} // 16px equivale aproximadamente a mr-4 en Tailwind
        onClick={() => setIsChartVisible(!isChartVisible)} 
      >
        <PieChartIcon/>
      </Button>
      </Tooltip>

      <Tooltip title="Crear Empresa">
    
    </Tooltip>

    </div>

    </div>


   

    <Grid container spacing={2}>

       {/* Card create data */}
       <Grid item xs={12} sm={6} md={4} lg={3} onClick={() => setIsComponentVisible(!isComponentVisible)}>
        
       {getcompanys.length === 0 ? (
  <Card 
    variant="outlined" 
    sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: { xs: '200px', sm: '200px', md: '200px', lg: '290px' },
      boxShadow: 3 
    }}
  >
    <CardContent 
      sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100%',
        width: '100%'
      }}
    >
      <AddIcon fontSize="large" />
    </CardContent>
  </Card>
        ) : (
          <Card 
            variant="outlined" 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              alignItems: 'center', 
              height: { xs: '200px', sm: '100%', md: '100%', lg: '100%' },
              boxShadow: 3 
            }}
          >
            <CardContent 
              sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100%',
                width: '100%'
              }}
            >
              <AddIcon fontSize="large" />
            </CardContent>
          </Card>
        )}

      </Grid>


  {getcompanys.length > 0 ? (
    getcompanys.map((company) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={company.CompanyId}>
       <Link to={`/CompanyEspecific/${company.CompanyId}`}>
         <Card variant="outlined" >
      <CardOverflow>
        <AspectRatio ratio="2">
      
        <img 
        src={Bussness}
        loading="lazy"
        alt="Bussness"/>
        
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="title-md">{company.NameCompany}</Typography>
        <Typography level="body-sm">{company.Email}</Typography>
      </CardContent>
      <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
        <Divider inset="context" />
        <CardContent orientation="horizontal">
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
            Ubicacion
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
          {company.Ubicacion}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
    </Link>
      </Grid>
    ))
  ) : (
    <Box sx={{ display: 'flex' }} className="p-4">
    <Loading /> 
  </Box>
  )}
    </Grid>


    </div>

    {isComponentVisible && <CreateCompany onClose={handleCloseBackground} />}
    {isChartVisible && <ChartStatistics onClose={handleCloseBackground} />}
      
    </Navbar_sidebar>
    
    </>
  )
}

export default HomeApp