import React from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

function Loading() {
  return (
    <>
     <div className="fixed inset-0 bg-black bg-opacity-80 z-100 flex justify-center items-center">
     <Box sx={{ display: 'flex' }}>
      <CircularProgress />
    </Box>
        </div>
    </>
  )
}

export default Loading