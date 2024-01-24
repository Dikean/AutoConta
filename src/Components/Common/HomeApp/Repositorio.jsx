import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';


//icons
import OpenWithIcon from '@mui/icons-material/OpenWith';
import AddIcon from '@mui/icons-material/Add';


//Components
import DocumentRepoCard from '../Cards/DocumentRepoCard';
import BigFolderView from './BigFolderView';

function Repositorio() {

  const [isFolderVisible, setIsFolderVisible] = useState(false);

  const handleCloseBackground = () => {
    setIsFolderVisible(false);
  };

  return (
    <>
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        {/* Search */}
      <TextField  fullWidth label=""
        InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon /> Buscar
          </InputAdornment>
        ),
         }}
       />
      </Grid>
      <Grid item xs={12} md={6} container justifyContent="flex-end" spacing={2}>
        {/* Button */}
        <Grid item>
          <Button variant="contained" color="primary"   onClick={() => setIsFolderVisible(!isFolderVisible)} >
            <OpenWithIcon/>
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary">
            <AddIcon/>
          </Button>
        </Grid>
      </Grid>
    </Grid>

    
    
    {isFolderVisible && <BigFolderView onClose={handleCloseBackground} />}

    <main className='mt-[80px]'>
        <DocumentRepoCard/>
    </main>
    </>
  )
}

export default Repositorio