import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js/auto'

function BarChart() {

    const chartRef = useRef(null);
    let chartInstance = null; // Mueve la declaración aquí

   // ...
   useEffect(() => {
    if (chartRef.current) {
        chartInstance = new Chart(chartRef.current, {
            type: 'bar',
            data: {
                labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
                datasets: [{
                    label: 'Ventas por Mes',
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        // ... otros colores
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        // ... otros colores
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    return () => {
        if (chartInstance) {
            chartInstance.destroy(); // Destruye la instancia aquí
        }
    };
  }, []);

  return (
   <>
     <canvas ref={chartRef}></canvas>
   </>
  )
}

export default BarChart