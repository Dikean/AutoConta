import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, MoveToInbox as InboxIcon,
    Mail as MailIcon, Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle, MoreVert as MoreIcon
  } from '@mui/icons-material';
  import {
   IconButton, Badge
  } from '@mui/material';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/joy/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Input from '@mui/joy/Input';

//icons
import CancelIcon from '@mui/icons-material/Cancel';
import SettingsIcon from '@mui/icons-material/Settings';

function Notifications() {

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const [inputValue, setInputValue] = useState(''); // Estado para almacenar el valor del input

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Actualiza el estado con el valor del input
  };

  

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 380 }}
      role="presentation"
    >
      <AppBar position="static" sx={{ background: '#33a1fd'}}>
        <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1}}>
              Notificaciones
            </Typography>
           
            <Tooltip title="Ajustes">
              <IconButton color="inherit">
                <Link to="/SettingsNotifications">
                  <SettingsIcon />
                </Link>
                </IconButton>
            </Tooltip>

            <Tooltip title="Cerrar">
              <IconButton color="inherit" onClick={toggleDrawer('right', false)}>
                <CancelIcon />
              </IconButton>
            </Tooltip>

        </Toolbar>
    </AppBar>

  
      <List >

        <div className="container px-4 py-1">
        <div class="mt-2">

            <div style={{ display: 'flex', justifyContent: 'flex-end', width: '100%' }}>
            <Input
               endDecorator={<Button>Buscar</Button>}
               style={{ width: '200px' }} // Ajusta el ancho según tus necesidades
            />
            </div>

            <div class="text-xs text-gray-400 font-semibold uppercase mt-3">Hoy</div>
         
         
        </div>
          <div class="mt-2">
            <div class="flex flex-col -mx-4">
              {/* Notification Card */}
              <div class="relative flex flex-row items-center p-4 hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:border-l-2 hover:border-blue-500">
                <div class="absolute text-xs text-gray-500 right-0 top-0 mr-4 mt-3">5 min</div>
                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-[#2196f3] text-white font-bold flex-shrink-0">
                  <NotificationsIcon/>
                </div>
                <div class="flex flex-col flex-grow ml-3">
                  <div class="text-sm font-medium">Cuberto</div>
                  <div class="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                </div>
                <div class="flex-shrink-0 ml-2 self-end mb-1">
                  <span class="flex items-center justify-center h-5 w-5 bg-[#2196f3] text-white text-xs rounded-full">5</span>
                </div>
              </div>
              {/* Hover */}
              <div class="flex flex-row items-center p-4 hover:bg-gradient-to-r hover:from-blue-100 hover:to-transparent hover:border-l-2 hover:border-blue-500">
                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-[#2196f3] text-white font-bold flex-shrink-0">
                <NotificationsIcon/>
                </div>
                <div class="flex flex-col flex-grow ml-3">
                  <div class="flex items-center">
                    <div class="text-sm font-medium">UI Art Design</div>
                    <div class="h-2 w-2 rounded-full bg-green-500 ml-2"></div>
                  </div>
                  <div class="text-xs truncate w-40">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis, doloribus?</div>
                </div>
              </div>
            </div>
          </div>
        </div>
   
        {/* {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))} */}
      </List>
    </Box>
  );
  
  return (
    <>

    <div>
      {['right'].map((anchor) => (
        <React.Fragment key={anchor}>
        
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 999 }} // Ajusta el z-index aquí

          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
    
    {['right'].map((anchor) => (
      <Tooltip title="Notificaciones">
       <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
              onClick={toggleDrawer(anchor, true)}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
             </Tooltip>
    ))}

    </>
  )
}

export default Notifications