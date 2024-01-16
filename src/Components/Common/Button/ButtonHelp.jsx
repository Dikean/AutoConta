import React from 'react'
import {
    Divider,
    IconButton
  } from '@mui/material';
  
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
//components
import HelpIcon from '@mui/icons-material/Help';

function ButtonHelp() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
  return (
   <>

   <Tooltip title="Ayudas">
     <IconButton 
         id="basic-button"
         aria-controls={open ? 'basic-menu' : undefined}
         aria-haspopup="true"
         aria-expanded={open ? 'true' : undefined}
         onClick={handleClick}
         size="large" aria-label="show 4 new mails" color="inherit">
        <HelpIcon/>
       </IconButton> 
    </Tooltip>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
         <a href="https://www.youtube.com/channel/UCUVZLry6BBuOosPp8P0NvuQ" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
         Documentación <OpenInNewIcon />
        </a>
        </MenuItem>
        <MenuItem onClick={handleClose}>Asistencia de AutoConta <OpenInNewIcon/></MenuItem>
        <Divider/>
        <MenuItem onClick={handleClose}>Solicitar una función (privada) <OpenInNewIcon/></MenuItem>
      </Menu>

   </>
  )
}

export default ButtonHelp