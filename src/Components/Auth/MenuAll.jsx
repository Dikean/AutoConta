import React from 'react'
import {
    Box, AppBar as MuiAppBar, Toolbar, Typography, IconButton, Drawer as MuiDrawer, List, CssBaseline, Divider, ListItem,
    ListItemButton, ListItemIcon, ListItemText, Badge, InputBase
  } from '@mui/material';
  import {
    Menu as MenuIcon, ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon, MoveToInbox as InboxIcon,
    Mail as MailIcon, Search as SearchIcon, Notifications as NotificationsIcon, AccountCircle, MoreVert as MoreIcon
  } from '@mui/icons-material';
  import { Link } from 'react-router-dom';
  import ReceiptIcon from '@mui/icons-material/Receipt';
  import Tooltip from '@mui/material/Tooltip';

function MenuAll({ open }) {
  return (
    <>
        <List>
             
              {/* Auditoria */}          
              <ListItem disablePadding sx={{ display: 'block' }}>
              <Link to="/audit" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                  <InboxIcon />
            </ListItemIcon>
             <ListItemText primary="Auditoria" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </Link>
              </ListItem>

               {/* Impuestos */}
               <ListItem disablePadding sx={{ display: 'block' }}>
                 <Link to="/taxes" style={{ textDecoration: 'none', color: 'inherit' }}>
                 <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                  <ReceiptIcon />
            </ListItemIcon>
             <ListItemText primary="Impuestos" sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
                </Link>
              </ListItem>

              </List>
    </>
  )
}

export default MenuAll