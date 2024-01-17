import React from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//compoents
import Background from './Background';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';

function ChartStatistics({onClose}) {
  return (
    <>
    <Background onClose={onClose}>
      <div className="container p-[50px]">
      <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
            <Paper elevation={3} style={{ padding: '30px' }}>
               <BarChart/>
            </Paper>
            </Grid>
            <Grid item xs={12} md={4}>
             <Paper elevation={3} style={{ padding: '30px' }}>
               <PieChart/>
              </Paper>
            </Grid>
        </Grid>
      </div>
    </Background>
    </>
  )
}

export default ChartStatistics