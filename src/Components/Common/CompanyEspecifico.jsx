import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Card from '@mui/joy/Card';
import CardCover from '@mui/joy/CardCover';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import Chip from '@mui/material/Chip';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Tooltip from '@mui/material/Tooltip';
import { Divider } from '@mui/material';
import { useParams } from 'react-router-dom';

//icons
import CopyAllIcon from '@mui/icons-material/CopyAll';

//components
import Navbar_sidebar from './Navbar_sidebar'
import Auditoria_CompanyEspecific_Breadcrumbs from './Breadcrumbs/Auditoria_CompanyEspecific_Breadcrumbs';
import BarChart from './Chart/BarChart';
import PieChart from './Chart/PieChart';
// import CityVideo from "../../Assets/Videos/City.mp4";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
function CompanyEspecifico() {

    //Params
    const { companyId } = useParams();

  console.log('datos'+companyId);


    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

  return (
   <>
      <Navbar_sidebar>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          
        <Auditoria_CompanyEspecific_Breadcrumbs NameCompany="{companyData.NameCompany}"/>

        <Grid container spacing={2} sx={{  marginBottom: '4%' }}>
        <Grid item xs={12} md={4}>

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
            poster="https://assets.codepen.io/6093409/river.jpg"
          >


            {/* <source
              src={CityVideo}
              type="video/mp4"
            /> */}
          </video>

        </CardCover>
        <CardContent>
          <Typography
            level="body-lg"
            fontWeight="lg"
            textColor="#fff"
            mt={{ xs: 12, sm: 18 }}
          >
            Company
          </Typography>
        </CardContent>
      </Card> 
    
        </Box>
        </Grid>
        <Grid item xs={12} md={4}>

          <h1><Chip label="Company" color="primary" /></h1>
          <p className='mt-2'>Codigo: 1564845</p>
          <p>Email: prueba@gmail.com</p>
          <p>Ubicaccion: Soledad</p>
          <Divider sx={{width: '200px'}}></Divider>

          <div className="mt-3">
          <Input placeholder="Access Key…" variant="soft" size="sm" 
          className='mb-2'
          endDecorator={
           <Tooltip title="Copiar">
              <Button>
                <CopyAllIcon/>
              </Button>
            </Tooltip>}/>
          </div>

        </Grid>
        </Grid>

        <TabContext value={value}  >
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Item One" value="1" />
            <Tab label="Item Two" value="2" />
            <Tab label="Repositorio" value="3" />
            </TabList>
        </Box>

        <TabPanel value="1">Item One</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Repositorio</TabPanel>

        </TabContext>

        </Grid>
        {/* Columna 2 */}
        <Grid item xs={12} md={4}>

          <Item  sx={{  marginBottom: '8%' }}>
          <PieChart/> 
          </Item>

          <Item  sx={{  marginBottom: '5%' }}>
           <BarChart/>
            </Item>

        </Grid>
      </Grid>
    </Box>


    </Navbar_sidebar>
   </>
  )
}

export default CompanyEspecifico