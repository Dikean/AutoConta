import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

//compoents
import Background from './Background';
import BarChart from '../Chart/BarChart';
import PieChart from '../Chart/PieChart';

//API
import { Companys } from '../../../Services/ApiCompany/Companys';


function ChartStatistics({onClose}) {
  // Inicializar con datos predeterminados o vacíos
  const [byUserOfCompanys, setByUserOfCompanys] = useState([]);
  
  useEffect(() => {
    Companys.getbyUserCompanyChart()
      .then(response => {
          if (response) {
            const data = JSON.parse(response);
            // Si los nuevos datos son diferentes a los actuales, actualiza el estado
            if (JSON.stringify(data) !== JSON.stringify(byUserOfCompanys)) {
              setByUserOfCompanys(data);
            }else{
              console.log("No cambio de datos");
            }
          } else {
            console.log("La respuesta de la API no es un arreglo o está vacía");
          }
      })
      .catch(error => {
          console.error("Error al cargar las compañías", error);
      });
}, []);

  // Preparar los datos para el PieChart
  const pieChartLabels = byUserOfCompanys.map(item => item.city);
  const pieChartData = byUserOfCompanys.map(item => item.percentage);




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
             <PieChart data={pieChartData} labels={pieChartLabels} />
              </Paper>
            </Grid>
        </Grid>
      </div>
    </Background>
    </>
  )
}

export default ChartStatistics