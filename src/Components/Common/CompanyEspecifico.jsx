import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Grid, Paper, Tab, Divider, Chip, Tooltip } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';


//Api
import { Companys } from '../../Services/ApiCompany/Companys';
//icons
import CopyAllIcon from '@mui/icons-material/CopyAll';
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
//components
import Navbar_sidebar from './Navbar_sidebar'
import Auditoria_CompanyEspecific_Breadcrumbs from './Breadcrumbs/Auditoria_CompanyEspecific_Breadcrumbs';
import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
import Repositorio from './HomeApp/Repositorio';
import BigFolderView from './HomeApp/BigFolderView';
import EditDataCompany from './HomeApp/EditDataCompany';
import BotAi from './BotAi';


import CompanyFoto from "../../Assets/Img/CompanyFoto.jpg";
// import CityVideo from "../../Assets/Videos/City.mp4";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
function CompanyEspecifico() {


  //
  const [isEditCompanyVisible, setIsEditCompanyVisible] = useState(false);
  const [isBotAiVisible, setIsBotAiVisible] = useState(false);

  const handleCloseBackground = () => {
    setIsEditCompanyVisible(false);
    setIsBotAiVisible(false);
  };

  const actions = [
    { icon: <SmartToyIcon />, name: 'Bot AI', onClick: () => setIsBotAiVisible(!isBotAiVisible) },
  ];
  

  const handleCopyToClipboard = (value) => {
    navigator.clipboard.writeText(value)
      .then(() => {
        // Opcional: Mostrar alguna notificación de éxito
        console.log("Valor copiado al portapapeles");
      })
      .catch(err => {
        // Opcional: Manejar errores de copia
        console.error("No se pudo copiar al portapapeles", err);
      });
  };

    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    //aPI
    //api
    const [getcompany, setCompany] = useState([]);

    let { CompanyId } = useParams();


    useEffect(() => {
      // Asegúrate de que estás llamando a la función correctamente
      // Suponiendo que `getCompanyDataById` necesita un ID como argumento
      Companys.getCompanyDataById(CompanyId)
      .then(response => {
          if (response) {
              setCompany(response);
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

   
    <Navbar_sidebar>



      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>

    

        {getcompany.map((company, index) => (
    
         <Auditoria_CompanyEspecific_Breadcrumbs NameCompany={company.NameCompany}/>
         ))}

        <Grid container spacing={2} sx={{  marginBottom: '4%' }}>
        <Grid item xs={12} md={6} >

         <Box
      component="ul"
      sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', p: 0, m: 0 }}
        >

      <Card component="li" sx={{ minWidth: 300, flexGrow: 1 }}>
        <CardCover>
          <video
            autoPlay
            loop
            muted
            poster={CompanyFoto}
          >
            <source
              src="https://firebasestorage.googleapis.com/v0/b/autoconta-12190.appspot.com/o/ContentVideoAutoConta%2FCity.mp4?alt=media&token=e8570b07-98ea-4038-9c63-5281a1ed6ca8"
              type="video/mp4"
            /> 
          </video>

        </CardCover>
        <CardContent>
        {getcompany.map((company, index) => (
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
           {company.NameCompany}
          </Typography>
                ))}
        </CardContent>
      </Card> 
    
        </Box>
        </Grid>
        <Grid item xs={12} md={5} >
        {getcompany.map((company, index) => (
          <div key={index}>

            <div className="flex justify-between items-center">
            <h1><Chip label={company.NameCompany} color="primary" /></h1>
            <Tooltip title="Editar">
            <Button onClick={() => setIsEditCompanyVisible(!isEditCompanyVisible)} className="p-1 text-xs"><EditIcon className='h-1 w-1' /></Button>
            </Tooltip>         
            </div>

          <p className='mt-2'>Codigo: {company.Codigo}</p> 
          <p>Email: {company.Email}</p>
          <p>Ubicaccion: {company.Ubicacion}</p>
          </div>
         
          ))}
         
          <Divider sx={{width: '200px'}}></Divider>
          {getcompany.map((company, index) => (
          <div className="mt-3">
          <Input placeholder='Access Key'  variant="soft" size="sm" 
          className='mb-2'
          endDecorator={
           <Tooltip title="Copiar">
              <Button onClick={() => handleCopyToClipboard(company.Access_key)}>
                <CopyAllIcon/>
              </Button>
            </Tooltip>}/>
          </div>
            ))}
        </Grid>
        </Grid>


        <TabContext value={value}  >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
            {/* <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" /> */}
            <Tab label="Repositorio" value="1" />
            </TabList>
        </Box>
{/* 
        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel> */}
        <TabPanel value="1">
        <Repositorio/>
        </TabPanel>

        </TabContext>
         
        </Grid>
        {/* Columna 2 chart*/}
        {/* <Grid item xs={12} md={4}>

          <Item  sx={{  marginBottom: '8%' }}>
          <PieChart/> 
          </Item>

          <Item  sx={{  marginBottom: '5%' }}>
           <BarChart/>
          </Item> 

        </Grid> */}
      </Grid>

      
      </Box>

      <Box sx={{ position: 'fixed', bottom: 16, right: 38, zIndex: 1000 }}>
  <SpeedDial
    ariaLabel="SpeedDial basic example"
    icon={<SpeedDialIcon />}
  >
    {actions.map((action) => (
      <SpeedDialAction
        key={action.name}
        icon={action.icon}
        tooltipTitle={action.name}
        onClick={action.onClick} // Aquí se maneja el evento onClick
       
      />
    ))}
  </SpeedDial>
</Box>
  

     {isEditCompanyVisible && <EditDataCompany  onClose={handleCloseBackground} /> }
     {isBotAiVisible && <BotAi  onClose={handleCloseBackground} /> }

    </Navbar_sidebar>
    
    

   </>
  )
}

export default CompanyEspecifico