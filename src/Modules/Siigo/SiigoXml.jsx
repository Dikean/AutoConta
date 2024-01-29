import React from 'react';
import Button from '@mui/material/Button';

// Components
import Navbar_sidebar from '../../Components/Common/Navbar_sidebar';

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
                            <ul>
                                {items.map((item, index) => (
                                    <li key={index}>
                                        Descripción: {item.description}, Cantidad: {item.quantity}, Precio: {item.price}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </Navbar_sidebar>
        </>
    );
}

export default SiigoXml;
