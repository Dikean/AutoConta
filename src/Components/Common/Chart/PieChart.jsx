import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

function PieChart() {

  const chartRef = useRef(null);
  let chartInstance = null; // Mueve la declaración aquí

  // ...
  useEffect(() => {
    if (chartRef.current) {
        chartInstance = new Chart(chartRef.current, {
            type: 'pie', // Cambia a 'pie'
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [{
                    label: 'Ventas por Mes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    // borderColor y borderWidth son opcionales para un pie chart
                }]
            },
            options: {
                // Las opciones pueden variar según tus necesidades
                responsive: true,
                maintainAspectRatio: false,
            }
        });
    }

    return () => {
        if (chartInstance) {
            chartInstance.destroy();
        }
    };
}, []);

  return (
    <>
    <canvas ref={chartRef}></canvas>
  </>
  )
}

export default PieChart
