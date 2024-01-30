import React from 'react';
import Button from '@mui/material/Button';
import * as XLSX from 'xlsx';

// Components
import Navbar_sidebar from '../../Components/Common/Navbar_sidebar';
import TableCheck from '../../Components/Common/Table/TableCheck';


const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'description', headerName: 'Description', width: 400 },
    { field: 'quantity', headerName: 'Quantity', width: 130 },
    { field: 'price', headerName: 'Price', width: 130 },
    // Add more columns as needed
];

function SiigoXml() {
    const fileInputRef = React.useRef();
    const [items, setItems] = React.useState([]);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                extractItems(content);
            };
            reader.readAsText(file);
        }
    };

    const extractItems = (content) => {
        const itemRegex = /<cac:InvoiceLine>(.*?)<\/cac:InvoiceLine>/gs;
        let match;
        const itemsArray = [];

        while ((match = itemRegex.exec(content)) !== null) {
            // Aquí puedes extraer más detalles de cada ítem si es necesario
            const descriptionMatch = match[1].match(/<cbc:Description>(.*?)<\/cbc:Description>/);
            const quantityMatch = match[1].match(/<cbc:InvoicedQuantity.*?>(.*?)<\/cbc:InvoicedQuantity>/);
            const priceMatch = match[1].match(/<cbc:PriceAmount.*?>(.*?)<\/cbc:PriceAmount>/);

            if (descriptionMatch && quantityMatch && priceMatch) {
                itemsArray.push({
                    description: descriptionMatch[1],
                    quantity: quantityMatch[1],
                    price: priceMatch[1]
                });
            }
        }

        setItems(itemsArray);
    };

    //exportToExcel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(items);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Items");

        // Escribe el archivo y descarga
        XLSX.writeFile(wb, "items.xlsx");
    };

    return (
        <>
        <Navbar_sidebar>
            <div>
                <Button variant="text" onClick={handleButtonClick}>
                    Upload File
                </Button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                />
                {items.length > 0 && (
                    <div>
                        <h3>Ítems de la Factura:</h3>

                        <TableCheck 
                            rows={items.map((item, index) => ({ ...item, id: index + 1 }))}
                            columns={columns}
                        />

                        <Button variant="contained" onClick={exportToExcel}>
                            Descargar Excel
                        </Button>
                    </div>
                )}
            </div>
        </Navbar_sidebar>
    </>
    );
}

export default SiigoXml;
