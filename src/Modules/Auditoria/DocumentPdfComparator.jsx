import * as React from 'react';
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { PDFDocument } from 'pdf-lib';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
//icons
import DownloadIcon from '@mui/icons-material/Download';
//componentes
import reporteDianPdf from '../../Assets/Modules/Auditoria/Reporte Dian.pdf';
import EndPdf from '../../Assets/Modules/Auditoria/EndPdf.pdf';

const DocumentPdfComparator = ({ comparisonResult }) => {
  
  const generatePDF = async () => {
    if (!comparisonResult || comparisonResult.length === 0) {
      alert("No hay datos para generar el PDF");
      return;
    }
  
    // Cargar el PDF de la portada
  const existingPdfBytes = await fetch(reporteDianPdf).then(res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(existingPdfBytes);

    // Crear un nuevo documento con jsPDF y agregar la tabla
    const doc = new jsPDF();
    // Definir las columnas de la tabla
    const columns = [
      { header: 'Factura', dataKey: 'Factura proveedor' },
      { header: 'Grupo', dataKey: 'Grupo' },
      { header: 'NIT Receptor', dataKey: 'NIT Receptor' },
      { header: 'Nombre Receptor', dataKey: 'Nombre Receptor' },
      { header: 'Estado', dataKey: 'Coincide' },
      { header: 'Total', dataKey: 'Total' }
    ];
  
    // Agregar la tabla en el contenido
    doc.autoTable({
      columns: columns,
      body: comparisonResult,
      headStyles: { fillColor: [0, 0, 255] }, // Azul para el encabezado
      styles: { fillColor: [255, 255, 255] }, // Blanco para las filas
      columnStyles: {
        'Factura proveedor': { cellWidth: 30 },
        'Grupo': { cellWidth: 30 },
        'NIT Receptor': { cellWidth: 30 },
        'Nombre Receptor': { cellWidth: 30 },
        'Coincide': { cellWidth: 30 },
        'Total': { cellWidth: 30 }
      },
      didDrawPage: function (data) {
        // Puedes agregar encabezados o pies de página aquí
      }
    });
  
    // Convertir el documento jsPDF a un array buffer
    const jsPdfBytes = doc.output('arraybuffer');
  
    // Cargar el documento jsPDF en pdf-lib
    const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
  
    // Copiar las páginas del documento jsPDF al documento de pdf-lib
    const pages = await pdfDoc.copyPages(jsPdfDoc, jsPdfDoc.getPageIndices());
    pages.forEach(page => {
      pdfDoc.addPage(page);
    });
  
    const additionalPdfBytes = await fetch(EndPdf).then(res => res.arrayBuffer());
    const additionalPdfDoc = await PDFDocument.load(additionalPdfBytes);

    // Suponiendo que quieres copiar la primera página del PDF adicional
    const [additionalPage] = await pdfDoc.copyPages(additionalPdfDoc, [0]);
    pdfDoc.addPage(additionalPage);
    
    // Guardar el PDF combinado
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "ReporteDian.pdf", "application/pdf");
  };
  
  const generatePDFWithNonExistingStates = async () => {

     // Verificar si comparisonResult es nulo
  if (!comparisonResult) {
    alert("Los datos de comparación no están disponibles.");
    return;
  }

  const filteredResults = comparisonResult.filter(item => item.Coincide === "No existe");


  if (filteredResults.length === 0) {
    alert("No hay datos con estado 'No existen' para generar el PDF");
    return;
  }
  
    // Cargar el PDF de la portada
    const existingPdfBytes = await fetch(reporteDianPdf).then(res => res.arrayBuffer());
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
    // Crear un nuevo documento con jsPDF y agregar la tabla
    const doc = new jsPDF();
    const columns = [

      { header: 'Factura', dataKey: 'Factura proveedor' },
      { header: 'Grupo', dataKey: 'Grupo' },
      { header: 'NIT Receptor', dataKey: 'NIT Receptor' },
      { header: 'Nombre Receptor', dataKey: 'Nombre Receptor' },
      { header: 'Estado', dataKey: 'Coincide' },
      { header: 'Total', dataKey: 'Total' }
    ];
  
    doc.autoTable({
      columns: columns,
      body: filteredResults,
      headStyles: { fillColor: [0, 0, 255] },
      styles: { fillColor: [255, 255, 255] },
      columnStyles: {
        'Factura proveedor': { cellWidth: 30 },
        'Grupo': { cellWidth: 30 },
        'NIT Receptor': { cellWidth: 30 },
        'Nombre Receptor': { cellWidth: 30 },
        'Coincide': { cellWidth: 30 },
        'Total': { cellWidth: 30 }
      },
    });
  
    // Convertir el documento jsPDF a un array buffer
    const jsPdfBytes = doc.output('arraybuffer');
  
    // Cargar el documento jsPDF en pdf-lib
    const jsPdfDoc = await PDFDocument.load(jsPdfBytes);
  
    // Copiar las páginas del documento jsPDF al documento de pdf-lib
    const pages = await pdfDoc.copyPages(jsPdfDoc, jsPdfDoc.getPageIndices());
    pages.forEach(page => {
      pdfDoc.addPage(page);
    });
  
    const additionalPdfBytes = await fetch(EndPdf).then(res => res.arrayBuffer());
    const additionalPdfDoc = await PDFDocument.load(additionalPdfBytes);
  
    // Suponiendo que quieres copiar la primera página del PDF adicional
    const [additionalPage] = await pdfDoc.copyPages(additionalPdfDoc, [0]);
    pdfDoc.addPage(additionalPage);
    
    // Guardar el PDF combinado
    const pdfBytes = await pdfDoc.save();
    download(pdfBytes, "Reporte_No_Existen.pdf", "application/pdf");
  };
  
  // Función para descargar el PDF
  const download = (data, filename, type) => {
    const file = new Blob([data], { type: type });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(file);
    a.download = filename;
    a.click();
  };

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
    
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
       <DownloadIcon/>
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
        <MenuItem onClick={generatePDF}>Todos</MenuItem>
        <MenuItem onClick={generatePDFWithNonExistingStates}>No existen</MenuItem>
      </Menu>
    </div>
    </>
  );
};

export default DocumentPdfComparator;

