import React from 'react';
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import HelpIcon from '@mui/icons-material/Help';

function ButtonHelp() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const openWhatsApp = (phone, text) => {
    const phoneNumber = phone;
    const message = encodeURIComponent(text);
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWhatsApp = (phone, text) => () => {
    setAnchorEl(null);
    openWhatsApp(phone, text);
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
          <HelpIcon />
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
        <MenuItem onClick={() => window.open("https://www.youtube.com/channel/UCUVZLry6BBuOosPp8P0NvuQ", "_blank")}>
          Documentación <OpenInNewIcon />
        </MenuItem>
        <MenuItem onClick={handleWhatsApp("3006829856", "Hola, quisiera pedir asistencia.")}>Asistencia de AutoConta <OpenInNewIcon /></MenuItem>
        <Divider />
        <MenuItem onClick={handleWhatsApp("3006829856", "Hola, quisiera solicitar una funcion privada.")}>Solicitar una función (privada) <OpenInNewIcon /></MenuItem>
      </Menu>
    </>
  );
}

export default ButtonHelp;
