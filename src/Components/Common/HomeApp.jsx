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
  const [companys, setCompanys] = useState([]);

  useEffect(() => {
    Companys.getCompanysByUserId()
      .then(response => {
        setCompanys(response.data);
      })
      .catch(error => {
        console.error("Error al cargar las compañías", error);
      });
  }, []);

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

    {/* <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={3}>
        
          <Link to="/CompanyEspecific">
            <Card variant="outlined" >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src="https://images.griddo.universitatcarlemany.com/c/contain/q/65/w/754/h/503/f/jpeg/por-que-estudiar-administracion-y-direccion-de-empresas-0"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md"><BusinessIcon/> Rappi</Typography>
                  <Typography level="body-sm"> Barranquilla</Typography>
                </CardContent>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                      6.3k views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                      1 hour ago
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
          </Link>
        </Grid>
    </Grid> */}

    <Grid container spacing={2}>
  {companys ? (
    <div>Cargando...</div>
  ) : companys.length > 0 ? (
    companys.map(company => (
      <Grid item xs={12} sm={6} md={4} lg={3} key={company.id}>
        <Link to={`/CompanyEspecific/${company.id}`}>
        <Card variant="outlined" >
                <CardOverflow>
                  <AspectRatio ratio="2">
                    <img
                      src="https://images.griddo.universitatcarlemany.com/c/contain/q/65/w/754/h/503/f/jpeg/por-que-estudiar-administracion-y-direccion-de-empresas-0"
                      loading="lazy"
                      alt=""
                    />
                  </AspectRatio>
                </CardOverflow>
                <CardContent>
                  <Typography level="title-md"><BusinessIcon/> Rappi</Typography>
                  <Typography level="body-sm"> Barranquilla</Typography>
                </CardContent>
                <CardOverflow variant="soft" sx={{ bgcolor: 'background.level1' }}>
                  <Divider inset="context" />
                  <CardContent orientation="horizontal">
                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                      6.3k views
                    </Typography>
                    <Divider orientation="vertical" />
                    <Typography level="body-xs" fontWeight="md" textColor="text.secondary">
                      1 hour ago
                    </Typography>
                  </CardContent>
                </CardOverflow>
              </Card>
        </Link>
      </Grid>
    ))
  ) : (
    <div>No se encontraron compañías</div>
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