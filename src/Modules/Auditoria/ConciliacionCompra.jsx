import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import DocumentPdfComparator from './DocumentPdfComparator';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//icon
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function ConciliacionCompra() {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    /**Excel */
    const [files, setFiles] = useState([]);
    const [data, setData] = useState({ file1: [], file2: [] });
    const [comparisonResult, setComparisonResult] = useState(null);

    const readExcelFile = (file, isSecondFile = false) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
    
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                let data = XLSX.utils.sheet_to_json(ws, { header: 1 }); // Leer datos como matriz
    
                if (isSecondFile) {
                    // Encontrar la fila que contiene 'Comprobante' y empezar a leer desde allí
                    const startRowIndex = data.findIndex(row => row[0] === 'Comprobante');
                    if (startRowIndex !== -1) {
                        data = data.slice(startRowIndex);
                    }
                }
    
                resolve(XLSX.utils.sheet_to_json(XLSX.utils.aoa_to_sheet(data))); // Convertir de nuevo a formato JSON
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };
    
    const handleFileChange = async (e) => {
        
        if (files.length >= 2) {
            alert("Solo puedes subir un máximo de dos archivos.");
            return;
        }

        const newFile = e.target.files[0];
        if (!newFile) return;

        if (!/\.(xlsx|xls|csv)$/i.test(newFile.name)) {
            alert("Por favor, carga un archivo Excel.");
            return;
        }

        if (newFile.size > 25000000) {
            alert("Archivo muy pesado. El tamaño máximo es 25 MB.");
            return;
        }

        const isSecondFile = files.length === 1; // True si ya hay un archivo cargado
        const fileData = await readExcelFile(newFile, isSecondFile);
        setData(prev => ({ ...prev, [`file${files.length + 1}`]: fileData }));
        setFiles(prev => [...prev, newFile]);
    };

    const normalizeNumber = (value) => {
        if (value === undefined || value === null || isNaN(value)) {
            return 0;
        }
    
        let stringValue = value.toString();
        // Eliminar caracteres no numéricos excepto el punto decimal y el signo negativo
        stringValue = stringValue.replace(/[^\d.-]/g, '');
        return parseFloat(stringValue);
    };
    
    // Función para extraer el folio del comprobante
    const extraerFolio = (comprobante) => {
        if (typeof comprobante !== 'string') {
            console.error('Invalid input for extraerFolio:', comprobante);
            return ''; // Return an empty string or handle the error as needed
        }

        const partes = comprobante.split('-');
        return partes[partes.length - 1]; // Devuelve la última parte, que es el número de folio
    };

    const extraerNumerosComprobante = (comprobante) => {
        if (typeof comprobante !== 'string') {
            console.error('Invalid input for extraerNumerosComprobante:', comprobante);
            return null; // O manejar el error como sea necesario
        }
    
        const match = comprobante.match(/\d+$/);
        return match ? match[0] : null;
    };
    

    const normalizarFolio = (folio) => {
        return folio.replace(/-/g, '');
    };

    const compareData = () => {
        // Normalizar y filtrar los datos del primer archivo
        const file1Data = data.file1.filter(item => 
            item['Tipo de documento'] === 'Factura electrónica' || 
            item['Tipo de documento'] === 'Nota de crédito electrónica'
        ).map(item => ({
            ...item,
            'Folio': item['Folio'].toString(), // Asegurarse de que el folio sea una cadena
            'TotalNormalizado': normalizeNumber(item['Total'])
        }));
        
        // Normalizar los datos del segundo archivo para la comparación
        const file2Data = data.file2.map(item => ({
            ...item,
            'FolioExtraido': extraerFolio(item['Comprobante']),
            'TotalNormalizado': normalizeNumber(item['Total'])
        }));

        console.log("Datos normalizados del archivo 1:", file1Data);
        console.log("Datos normalizados del archivo 2:", file2Data);

        // Comparar los datos
        const comparison = file2Data.map(item2 => {
            let folioNumerico = extraerNumerosComprobante(item2['Comprobante']);
            
            let match = file1Data.find(item1 => item1['Folio'] === folioNumerico);
            if (!match) {
                // Usa el comprobante completo sin guiones para la segunda comparación
                const folioCompletoSinGuiones = normalizarFolio(item2['Comprobante']);
                match = file1Data.find(item1 => item1['Folio'] === folioCompletoSinGuiones);
            }

            let resultadoComparacion = 'No existe';
            if (match) {
                resultadoComparacion = match.TotalNormalizado === item2.TotalNormalizado ? 'Existe' : 'Existe, pero los totales no coinciden';
            }

            console.log("Valor de TotalNormalizado en file1Data:", match ? match.TotalNormalizado : "No encontrado");
            console.log("Valor de TotalNormalizado en file2Data:", item2.TotalNormalizado);
         

            const grupo = match ? match['Grupo'] : 'No encontrado';
            const Nombre_Receptor = match ? match['Nombre Receptor'] : 'No encontrado';
            const NIT_Receptor = match ? match['NIT Receptor'] : 'No encontrado';
           // alert(item2['Total'])

            return {
                'Factura proveedor': item2['Comprobante'],
                'Grupo': grupo,
                'NIT Receptor' : NIT_Receptor,
                'Nombre Receptor' : Nombre_Receptor,
                'Total': item2['Total'],
                'Coincide': resultadoComparacion,
            };
        });

        setComparisonResult(comparison);
        // Pasar comparisonResults a DocumentPdfComparator
    };
    
    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setData(prev => {
            const newData = { ...prev };
            delete newData[`file${index + 1}`];
            return newData;
        });
    };

        /** Table */
    // ... tus estados y funciones existentes ...

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [resultsPerPage, setResultsPerPage] = useState(10);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Reiniciar a la primera página con cada nueva búsqueda
    };

    const filteredResults = comparisonResult 
    ? comparisonResult.filter(result => {
        const facturaProveedor = result['Factura proveedor'];
        return facturaProveedor 
            ? facturaProveedor.toLowerCase().includes(searchTerm.toLowerCase())
            : false;
    })
    : [];

    // Paso 3: Crear funciones para navegar entre páginas
    const goToPrevPage = () => {
        setCurrentPage(currentPage > 1 ? currentPage - 1 : currentPage);
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage < totalPages ? currentPage + 1 : currentPage);
    };

    // Paso 1: Crear una función para obtener clases de estilo
    const getStatusStyle = (status) => {
        switch (status) {
            case 'Existe':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 bg-emerald-100/60 dark:bg-gray-800";
            case 'No existe':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-red-500 bg-red-100/60 dark:bg-gray-800";
            case 'Existe, pero los totales no coinciden':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-yellow-500 bg-yellow-100/60 dark:bg-gray-800";
            default:
                return "";
        }
    };

    const [filterStatus, setFilterStatus] = useState('Todos');
    const [currentFilteredResults, setCurrentFilteredResults] = useState([]);

    // Actualizar la lógica de filtrado y búsqueda
    useEffect(() => {
        const getFilteredResults = () => {
            if (!comparisonResult) return [];

            let results = comparisonResult;

            // Aplicar filtro de estado
            if (filterStatus !== 'Todos') {
                results = results.filter(result => result['Coincide'] === filterStatus);
            }

            // Aplicar filtro de búsqueda
            if (searchTerm) {
                results = results.filter(result => {
                    const facturaProveedor = result['Factura proveedor'];
                    // Verificar que facturaProveedor no sea undefined y sea una cadena
                    if (facturaProveedor && typeof facturaProveedor === 'string') {
                        return facturaProveedor.toLowerCase().includes(searchTerm.toLowerCase());
                    }
                    return false;
                });
                
                        
            }

            return results;
        };

        setCurrentFilteredResults(getFilteredResults());
    }, [comparisonResult, filterStatus, searchTerm]); // Agregar searchTerm a las dependencias

    // Cálculo de resultados paginados basado en currentFilteredResults
    const paginatedResults = currentFilteredResults.slice(
        (currentPage - 1) * resultsPerPage,
        currentPage * resultsPerPage
    );

    // Cálculo del número total de páginas
    const totalResults = currentFilteredResults.length;
    const totalPages = Math.ceil(totalResults / resultsPerPage);



    return (
        <>
                <div className="flex items-center justify-center">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form className="px-9">
                            {/* ... Resto del código del formulario ... */}
                            <div className="mb-6 pt-4">
                                <label className="mb-5 block text-xl font-semibold text-[#07074D]" style={{ fontFamily: 'Poppins' }}>
                                    Conciliacion Compra
                                </label>

                                <div className="mb-8" >
                                    <input type="file" id="file" name="file" onChange={handleFileChange} className="sr-only" />
                                    <label htmlFor="file" className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center cursor-pointer">
                                        <div style={{ fontFamily: 'Roboto' }}>
                                            <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                                                Arrastra los archivos aquí
                                            </span>
                                            <span className="mb-2 block text-base font-medium text-[#6B7280]">
                                                O
                                            </span>
                                            <span className="inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                                                Buscar
                                            </span>
                                        </div>
                                    </label>
                                </div>

                                {files.map((file, index) => (
                                    <div key={index} className="mb-5 rounded-md bg-[#F5F7FB] py-4 px-8 flex items-center justify-between">
                                        <span className="truncate pr-3 text-base font-medium text-[#07074D]">
                                            {file.name}
                                        </span>
                                        <button onClick={() => removeFile(index)} className="text-[#07074D]">
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z" fill="currentColor"/>
                                                <path fillRule="evenodd" clipRule="evenodd" d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z" fill="currentColor"/>
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>


                            <Button className='w-full' variant="contained" onClick={compareData}>Verificar</Button>
                        </form>
                    </div>
                </div>

                <section className="container px-4 mx-auto mt-[100px] mb-5" >
        
           
    <div style={{ fontFamily: 'Roboto' }} class="mt-6 md:flex md:items-center md:justify-between">
        <div class="inline-flex overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700">
       
       
        <DocumentPdfComparator comparisonResult={comparisonResult} />

        <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <FilterAltIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => setFilterStatus('Todos')}>Ver todos</MenuItem>
        <MenuItem onClick={() => setFilterStatus('Existe')}>Existe</MenuItem>
        <MenuItem onClick={() => setFilterStatus('No existe')}>No existen</MenuItem>
        <MenuItem onClick={() => setFilterStatus('Existe, pero los totales no coinciden')}> Totales no coinciden</MenuItem>

      </Menu>
    </div>
    
        </div>

        <div class="relative flex items-center mt-4 md:mt-0">
            <span class="absolute">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
            </span>

            <input type="text" placeholder="Buscar Factura"
             value={searchTerm}
             onChange={handleSearchChange}
             class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-80 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
        </div>
    </div>

    <div class="flex flex-col mt-6">
        <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                    <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead class="bg-gray-50 dark:bg-gray-800">
                            <tr>
                               <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   <span>id</span>
                                </th>

                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   <span>Factura</span>
                                </th>

                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   <span>NIT Receptor</span>
                                </th>

                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   <span>Nombre Receptor</span>
                                </th>

                                <th scope="col" class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                   <span>Grupo</span>
                                </th>

                                <th scope="col" class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Estado
                                </th>

                                <th scope="col" class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    Valor
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                        {paginatedResults.map((result, index) => (
    <tr key={index}>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            {(currentPage - 1) * resultsPerPage + index + 1} {/* Ajuste aquí */}
        </td>
        <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
            {result['Factura proveedor']}
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
                {result['NIT Receptor']}
            </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
                {result['Nombre Receptor']}
            </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
                {result['Grupo']}
            </td>
        <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
            <div className={getStatusStyle(result['Coincide'])}>
                {result['Coincide']}
            </div>
        </td>
        <td className="px-4 py-4 text-sm whitespace-nowrap">
            {result['Total']}
        </td>
    </tr>
))}

                </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

            <div class="mt-6 sm:flex sm:items-center sm:justify-between ">
        <div class="text-sm text-gray-500 dark:text-gray-400">
        Pagina <span class="font-medium text-gray-700 dark:text-gray-100">{currentPage} de {totalPages}</span> 
        </div>

        <div class="flex items-center mt-4 gap-x-4 sm:mt-0">
            <a onClick={goToPrevPage} disabled={currentPage === 1} class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18" />
                </svg>

                <span>
                    Anterior
                </span>
            </a>

            <a  onClick={goToNextPage} disabled={currentPage === totalPages} class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800">
                <span>
                   Siguiente
                </span>

                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 rtl:-scale-x-100">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
            </a>
        </div>
    </div>
                  </section>


        </>
    );
}

export default ConciliacionCompra