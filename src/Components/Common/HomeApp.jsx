import React, { useState } from 'react';
import AspectRatio from '@mui/joy/AspectRatio';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Divider from '@mui/joy/Divider';
import Typography from '@mui/joy/Typography';
import { Button } from '@mui/material';
import Grid from '@mui/material/Grid';

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
      <Button 
        variant="contained" 
        color="primary" 
        style={{ marginRight: '8px' }} // 16px equivale aproximadamente a mr-4 en Tailwind
        onClick={() => setIsChartVisible(!isChartVisible)} 
      >
        <PieChartIcon/>
      </Button>

      <Button 
      variant="contained" 
      color="primary" 
      style={{ marginLeft: '8px' }}
      onClick={() => setIsComponentVisible(!isComponentVisible)} // Cambia el estado al hacer clic
    >
      <AddIcon/>
    </Button>

    </div>

</div>


    <Grid container spacing={2}>

    {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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
            </Grid>
    ))}
    </Grid>
    </div>

    {isComponentVisible && <CreateCompany onClose={handleCloseBackground} />}
    {isChartVisible && <ChartStatistics onClose={handleCloseBackground} />}
      
    </Navbar_sidebar>
    
    </>
  )
}

export default HomeApp