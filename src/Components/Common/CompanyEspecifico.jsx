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
import Cookies from 'js-cookie';
import Skeleton from '@mui/material/Skeleton';

//Api
import { Companys } from '../../Services/ApiCompany/Companys';

//icons
import CopyAllIcon from '@mui/icons-material/CopyAll';
import EditIcon from '@mui/icons-material/Edit';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loading from './Loading';

//components
import Navbar_sidebar from './Navbar_sidebar'
import Auditoria_CompanyEspecific_Breadcrumbs from './Breadcrumbs/Auditoria_CompanyEspecific_Breadcrumbs';
import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
import Repositorio from './HomeApp/Repositorio';
import BigFolderView from './HomeApp/BigFolderView';
import EditDataCompany from './HomeApp/EditDataCompany';
import BotAi from './BotAi';
import EditRolCompany from './EditRolCompany';


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
  const [isEditRolVisible, setIsEditRolVisible] = useState(false);

  const [selectedPerson, setSelectedPerson] = useState(null);


  const handleCloseBackground = () => {
    setIsEditCompanyVisible(false);
    setIsBotAiVisible(false); 
    setIsEditRolVisible(false);
  };

  const handleEditClick = (person) => {
    setSelectedPerson(person); 
    setIsEditRolVisible(true);
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

    //api
    const [getcompany, setCompany] = useState([]);
    const [userByCompany , setUserByCompany] = useState([]);

    const [getRol, SetRol] = useState('');

    let { CompanyId } = useParams();
  

    useEffect(() => {
      
      Companys.getCompanyDataById(CompanyId)
      .then(response => {
          if (response) {
              setCompany(response);
          } else {
              console.log("La respuesta de la API no contiene datos");
          }
      })
      .catch(error => {
          console.error("Error al cargar las compañías", error);
      });

      
      const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}

      Companys.postUserByCompanyEspecific({ CompanyId: CompanyId, UserId: UserId})
      .then(response => {
        // Asegurándose de que la respuesta sea tratada como un arreglo
        let responseArray = response;
        // Si la respuesta es un string, convertirla a un objeto JavaScript
        if (typeof response === 'string') {
          responseArray = JSON.parse(response);
        }
        // Asegurándose de que ahora responseArray sea un arreglo
        if (!Array.isArray(responseArray)) {
          responseArray = [responseArray];
        }
        setUserByCompany(responseArray);
        console.log("USUARIOS: ", responseArray);
      })
      .catch(error => {
        console.error("Error al cargar las compañías", error);
      });

      Companys.postGetRolInCompany({ CompanyId: CompanyId, UserId: UserId})
      .then(response => {
     
        SetRol(response);
      })
      .catch(error => {
        console.error("Error al cargar las compañías", error);
      });

    

  }, []);
  

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = userByCompany.slice(indexOfFirstItem, indexOfLastItem);

  return (
   <>

   
    <Navbar_sidebar>



      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>

    
        {/* Name Company*/}
        {getcompany.length > 0 ? (
          getcompany.map((company, index) => (
            <Auditoria_CompanyEspecific_Breadcrumbs key={index} NameCompany={company.NameCompany} />
          ))
        ) : (
          <Skeleton variant="rounded" width={200} height={15} className='mt-3 mb-5' />
        )}


        <Grid container spacing={2} sx={{  marginBottom: '4%' }}>
        <Grid item xs={12} md={6} >
          
        {/* Video */}
        {getcompany.length > 0 ? (
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
        
        ) : (
          <Skeleton variant="rounded" width={460} height={220} className='' />
        )}
        

   
        </Grid>
        <Grid item xs={12} md={5} >

        {getcompany.length > 0 ? (
        <>
          {getcompany.map((company, index) => (
          <div key={index}>

            <div className="flex justify-between items-center">
            <h1> <strong><Chip label={company.NameCompany} color="primary" /></strong></h1>

            {getRol === "Administrator" && (
            <Tooltip title="Editar">
              <Button onClick={() => setIsEditCompanyVisible(!isEditCompanyVisible)} className="p-1 text-xs">
                <EditIcon className='h-1 w-1' />
              </Button>
            </Tooltip>
              )}
            
            </div>

          <p className='mt-5'> <strong>Código:</strong> {company.Codigo}</p> 
          <p><strong>Email:</strong> {company.Email}</p>
          <p className='mb-3'><strong>Ubicación:</strong> {company.Ubicacion}</p>
          </div>
         
          ))}
        </>
        ):(<>
        
          <div>

            <div className="flex justify-between items-center ">
            <Skeleton variant="rounded" width={65} height={30} className='mb-5' />
            </div>

            <Skeleton variant="rounded" width={120} height={12} className='mt-5' />
            <Skeleton variant="rounded" width={190} height={12} className='mt-2' />
            <Skeleton variant="rounded" width={160} height={12} className='mt-2 mb-3 ' />
          </div>
         
        
        </>)}
 
         
          <Divider sx={{width: '200px'}}></Divider>
    
          {getcompany.map((company, index) => (
          <div className="mt-3">
                {getRol === "Administrator" && (
          <Input placeholder='Access Key'  variant="soft" size="sm" 
          className='mb-2'
          endDecorator={
           <Tooltip title="Copiar">
              <Button onClick={() => handleCopyToClipboard(company.Access_key)}>
                <CopyAllIcon/>
              </Button>
            </Tooltip>}/>
                )}
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
        <Repositorio RolUser={getRol} />
        </TabPanel>

        </TabContext>
         
        </Grid>

      {/* solo para Administrador de la company */}


      {getRol === "Administrator" && getcompany.length > 0 ?(

       <Grid item xs={12} md={4}>
          <Item  sx={{  marginBottom: '8%' }}>
            <div className='p-1'>
              <h1 className='mt-1 font-bold text-black'>Usuarios</h1>
              <ul role="list" className="divide-y divide-gray-100 px-5 py-3">
  {currentItems.map((person, index) => (
    <li key={index} className="flex justify-between gap-x-6 py-5">
      <div className="flex min-w-0 gap-x-4">
        <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={person.UserPhoto} alt="" />
        <div className="min-w-0 flex-auto">
          <p className="text-sm font-semibold leading-6 text-gray-900">{person.Email}</p>
          <p className="mt-1 truncate text-xs leading-5 text-gray-500">{person.Rol}</p>
        </div>
      </div>  
      <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
      <Button onClick={() => handleEditClick(person)}>
        <EditIcon/>
      </Button>

      </div>
    </li>
  ))}
</ul>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
        <Button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
          <ArrowBackIosIcon style={{ fontSize: 10 }} />
        </Button>
        <Button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === Math.ceil(currentItems.length / itemsPerPage)}>
        <ArrowForwardIosIcon style={{ fontSize: 10 }} />
        </Button>
      </div>
            </div>
          </Item>
        {/* Columna 2 chart*
          <Item  sx={{  marginBottom: '5%' }}>
           <BarChart/>
          </Item>  */}
      </Grid>

      ) : (

      <Grid item xs={12} md={4}>
         <Item  sx={{  marginBottom: '8%' }}>

         <div className='p-1'>
          
           <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
           <Skeleton variant="text" sx={{ fontSize: '1rem' }} width={80} height={12}/>
           </div>
              <ul role="list" className="divide-y divide-gray-100 px-5 py-3">
                <li className="flex justify-between gap-x-6 py-5">
                  <div className="flex min-w-0 gap-x-4">
                    <Skeleton variant="circular" width={50} height={50}  />
                    <div className="min-w-0 flex-auto">
                     <Skeleton variant="rounded" width={180} height={12} className='mt-1'/>   

                     <div className='mt-1' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                     <Skeleton variant="rounded" width={50} height={12} className='mt-1'/> 
                     </div>
 
                    </div>
                  </div>  
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                  <Skeleton variant="rounded" width={40} height={40} className='mt-3 mb-5' />
                  </div>
                </li>
              </ul>

              <div style={{ display: 'flex', justifyContent: 'center', gap: '5px' }}>
              <Skeleton variant="rounded" width={40} height={40} className='mt-3 mb-5' />
              <Skeleton variant="rounded" width={40} height={40} className='mt-3 mb-5' />
              </div>


         </div>

         </Item>
      </Grid>

      )}
      
      </Grid>

      
      </Box>

      {/*  BUTTON IA

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
      </Box
      >*/}
  

    {isEditCompanyVisible && <EditDataCompany onClose={handleCloseBackground} /> }
    {isBotAiVisible && <BotAi onClose={handleCloseBackground} /> }
    {isEditRolVisible  && <EditRolCompany selectedPerson={selectedPerson} onClose={handleCloseBackground} /> }

    </Navbar_sidebar>
    
    
{/* selectedPerson={selectedPerson} */}
   </>
  )
}

export default CompanyEspecifico