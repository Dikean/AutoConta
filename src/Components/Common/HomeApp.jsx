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

//Api
import { Companys } from '../../Services/ApiCompany/Companys';

//components
import Navbar_sidebar from './Navbar_sidebar'
import Background from './HomeApp/Background';
import ChartStatistics from './HomeApp/ChartStatistics';
import CreateCompany from './HomeApp/CreateCompany';

//icon
import BusinessIcon from '@mui/icons-material/Business';
import AddIcon from '@mui/icons-material/Add';
import PieChartIcon from '@mui/icons-material/PieChart';



function HomeApp(props) {

  //api
  const [getcompanys, setCompanys] = useState([]);
  
  Companys.getCompanysByUserId()
  .then(response => {
      console.log("Respuesta completa de la API:", response); // Para ver toda la respuesta
      if (response) {
         setCompanys(response);
         console.log("Datos establecidos en el estado:", response);
     } else {
         console.log("La respuesta de la API no contiene datos");
     }
 })
 .catch(error => {
     console.error("Error al cargar las compañías", error);
 });

  
  //
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const [isChartVisible, setIsChartVisible] = useState(false);

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
      <Button 
      variant="contained" 
      color="primary" 
      style={{ marginLeft: '8px' }}
      onClick={() => setIsComponentVisible(!isComponentVisible)} // Cambia el estado al hacer clic
    >
      <AddIcon/>
    </Button>
    </Tooltip>

    </div>

    </div>

   

    <Grid container spacing={2}>
  {getcompanys.length > 0 ? (
    getcompanys.map((company) => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={company.CompanyId}>
       <Link to="/">
         <Card variant="outlined" >
      <CardOverflow>
        <AspectRatio ratio="2">
          <img
            src="../../Assets/Img/Company.jpg"
            srcSet="../../"
            loading="lazy"
            alt="Bussness"
          />
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
            6.3k views
          </Typography>
          <Divider orientation="vertical" />
          <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
          {company.Codigo}
          </Typography>
        </CardContent>
      </CardOverflow>
    </Card>
    </Link>
      </Grid>
    ))
  ) : (
    <div>Cargando compañíasa...</div>
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