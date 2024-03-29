import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import DocumentPdfComparator from './DocumentPdfComparator';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

//icon
import FilterAltIcon from '@mui/icons-material/FilterAlt';

function ConciliacionCompra() {

    //Hooks
    const [filterStatus, setFilterStatus] = useState('Todos');

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
    const [comparisonResult, setComparisonResult] = useState([]);
    
    const [isDataFile1, isItDataFile1] = useState([]);
    //Hooks de guradado de lectura de excel 2
    const [Result, setResult] = useState([]);
    const [data2Total , setData2Total] = useState([]);

    const readExcelFile = (file, isSecondFile = false) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsArrayBuffer(file);
    
            fileReader.onload = (e) => {
                const bufferArray = e.target.result;
                const wb = XLSX.read(bufferArray, { type: 'buffer' });
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
    
                // Convertir los datos a formato JSON
                const jsonData = XLSX.utils.sheet_to_json(XLSX.utils.aoa_to_sheet(data));

              
    
                if (isSecondFile) {
                    // Procesamiento para el segundo archivo
                    const facturaProveedorData = jsonData.map(row => row['Factura proveedor']);
                    const Total = jsonData.map(row => row['Total']);
    
                    setResult(facturaProveedorData);
                    setData2Total(Total);
    
                    resolve(facturaProveedorData);
                } else {
                    // Filtrar para el primer archivo
                    const filteredData = jsonData.filter(row => {
                        return row['Tipo de documento'] === 'Factura electrónica' || row['Tipo Documento'] === 'Nota de crédito electrónica';
                    });

                    isItDataFile1(filteredData);
                    resolve(filteredData);
                }
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

    const compareData = () => {
        // Modifica esta sección para ajustar los estados
        const modifiedDataFile1 = isDataFile1.map(item => ({
            ...item,
            'Folio-Prefijo': `${item.Prefijo}-${item.Folio}`,
            'Origen': 'Archivo 1',
            'Estado': item['Estado'],
            'existsInSecondFile': Result.includes(`${item.Prefijo}-${item.Folio}`),
            'totalMatches': Result.includes(`${item.Prefijo}-${item.Folio}`) && item.Total === data2Total[Result.indexOf(`${item.Prefijo}-${item.Folio}`)],
            // Ajuste de estado basado en la nueva especificación
            'Estado': Result.includes(`${item.Prefijo}-${item.Folio}`) ? 
                      (item['totalMatches'] ? 'Totales Coinciden' : 'Totales Diferentes') : 
                      'Existe en Dian solamente'
        }));
    
        const modifiedDataFile2 = Result.map((folioPrefijo, index) => ({
            'Folio-Prefijo': folioPrefijo,
            'Total': data2Total[index],
            'Origen': 'Archivo 2',
            'existsInFirstFile': modifiedDataFile1.some(item => item['Folio-Prefijo'] === folioPrefijo),
            // Ajuste de estado para el segundo archivo
            'Estado': modifiedDataFile1.some(item => item['Folio-Prefijo'] === folioPrefijo) ? 
                      'Existe en Siigo solamente' : 
                      'No encontrado en Archivo 1'
        }));
    
        // Combinar ambas listas
        const combinedData = [...modifiedDataFile1, ...modifiedDataFile2];
    
        // Actualizar el estado con los resultados de la comparación
        setComparisonResult(combinedData);
    };
    
    
    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
        setData(prev => {
            const newData = { ...prev };
            delete newData[`file${index + 1}`];
            return newData;
        });
    };

    //paginacion
   
    const [currentPage, setCurrentPage] = useState(1);
    const recordsPerPage = 10; // Puedes ajustar esto según tus necesidades
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        if (comparisonResult) {
            setTotalPages(Math.ceil(comparisonResult.length / recordsPerPage));
        }
    }, [comparisonResult]);

    const goToPrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const goToNextPage = () => {
        setCurrentPage(currentPage => Math.min(currentPage + 1, totalPages));
    };

    // Obtener los registros para la página actual
    const currentRecords = comparisonResult.slice(
        (currentPage - 1) * recordsPerPage,
        currentPage * recordsPerPage
    );

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Totales Coinciden':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 bg-emerald-100/60 dark:bg-gray-800";
            case 'Totales Diferentes':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-yellow-500 bg-yellow-100/60 dark:bg-gray-800";
            case 'Existe en Dian solamente':
            case 'Existe en Siigo solamente':
                return "inline px-3 py-1 text-sm font-normal rounded-full text-red-500 bg-red-100/60 dark:bg-gray-800";
            default:
                return "";
        }
    };

    
    


    return (
        <>
                <div className="flex items-center justify-center">
                    <div className="mx-auto w-full max-w-[550px] bg-white">
                        <form className="px-9">
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
                        {currentRecords.map((item, index) => (
                            <tr key={index}>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{index + 1}</td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{item['Folio-Prefijo']}</td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{item['NIT Receptor']}</td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{item['Nombre Receptor']}</td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{item['Grupo']}</td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">
                                    <div className={getStatusStyle(
                                        item['Origen'] === 'Archivo 1' ? 
                                        (item['existsInSecondFile'] ? (item['totalMatches'] ? 'Totales Coinciden' : 'Totales Diferentes') : 'Existe en Dian solamente') : 
                                        (item['existsInFirstFile'] ? 'Existe en Siigo solamente' : 'No encontrado en Archivo 1')
                                    )}>
                                        {item['Origen'] === 'Archivo 1' ? 
                                            (item['existsInSecondFile'] ? (item['totalMatches'] ? 'Totales Coinciden' : 'Totales Diferentes') : 'Existe en Dian solamente') : 
                                            (item['existsInFirstFile'] ? 'Existe en Siigo solamente' : 'No encontrado en Archivo 1')
                                        }
                                    </div>
                                </td>
                                <td className="py-3.5 px-4 text-sm text-gray-500 dark:text-gray-400">{item['Total']}</td>
                            </tr>
                        ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    {/* pagination */}

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