import React, { useEffect, useState } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import {
  Box, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Drawer as MuiDrawer, List, CssBaseline, Divider, ListItem,
  ListItemButton, ListItemIcon, ListItemText, Badge, InputBase
} from '@mui/material';
import {
  Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, MoveToInbox as InboxIcon,
  Mail as MailIcon, Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle, MoreVert as MoreIcon
} from '@mui/icons-material';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';

//Componente
import Loading from './Loading';
import UnauthenticatedView from './UnauthenticatedView';
import MenuAll from '../Auth/MenuAll';
import Notifications from './Notifications';
import ButtonHelp from './Button/ButtonHelp';

//auth 0
import { useAuth0 } from "@auth0/auth0-react";
import {jwtDecode} from 'jwt-decode';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

function Navbar_sidebar({ children }) {

//auth 0 
  const { user, isAuthenticated, isLoading,getAccessTokenSilently, getIdTokenClaims } = useAuth0();
  const { logout } = useAuth0();

  const obtenerTokenId = async () => {
    if (isAuthenticated) {
      try {
        const tokenClaims = await getIdTokenClaims();
        if (tokenClaims) {
          const idToken = tokenClaims.__raw; // El token de ID crudo
           console.log("Mi Token de ID: " + idToken);

          // Decodificar el token para obtener roles y permisos
          const decodedToken = jwtDecode(idToken);
          // console.log("Roles: ", decodedToken['https://miapp.com/roles']);
          // console.log("Permisos: ", decodedToken['https://miapp.com/permissions']);
          
          //cookies
          Cookies.set('authToken', idToken); 
          Cookies.set('authRoles', decodedToken['https://miapp.com/roles']); 
          Cookies.set('authPermisos', decodedToken['https://miapp.com/permissions']); 
          
          Cookies.set('authUserId', user.id); 

        }
      } catch (error) {
        console.error(error);
      }
    } else {
      // console.log("Usuario no autenticado");
    }
  };

  useEffect(() => {
    obtenerTokenId();
  }, [isAuthenticated]); // Agregar isAuthenticated al array de dependencias


  // const obtenerToken = async () => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     console.log("Mi first TOken: "+token);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

 
  // useEffect(() => {
  //   // Esta función se ejecutará después de que el componente se haya montado
  //   obtenerToken()
  //   // Aquí puedes llamar a cualquier función o ejecutar cualquier código
  // }, []); // El array vacío asegura que el efecto se ejecute solo una vez, al montar el componente



  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);

const handleProfileMenuOpen = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleMenuClose = () => {
  setAnchorEl(null);
};

 if (isLoading) {
   return <Loading></Loading>;
 }

if (!isAuthenticated) {
  return <UnauthenticatedView />; // Vista para usuarios no autenticados
}

  return (
    isAuthenticated && (
 <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
          <Link to="/dashboard">
            AutoConta
          </Link>
          
          </Typography>

          {/* Aquí comienza la integración del código de búsqueda y los iconos */}
          {/* <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search> */}
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {/* Icon */}
         
         <ButtonHelp/>
         <Notifications />
  
            <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu" // Asegúrate de que este ID coincida con el del menú
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
          <Avatar  src={user.picture} alt={user.name}  />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            id="primary-search-account-menu"
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Cerrar seccion</MenuItem>
            {/* Agrega aquí más opciones de menú si es necesario */}
          </Menu>

          </Box>
          {/* Fin de la integración del código */}

            </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
            <DrawerHeader>
            
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>

            </DrawerHeader>
            {/* <Divider /> */}
             <MenuAll open={open}/>
            {/* <Divider /> */}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <DrawerHeader />
            {children}
            
          </Box>
        </Box>
    )
  );
}

export default Navbar_sidebar;
