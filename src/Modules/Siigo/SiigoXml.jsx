import React from 'react'
import Button from '@mui/material/Button';


//components
import Navbar_sidebar from '../../Components/Common/Navbar_sidebar'


function SiigoXml() {

    // Referencia al input de tipo file
    const fileInputRef = React.useRef();

    // Función para manejar el clic en el botón
    const handleButtonClick = () => {
        // Activar el clic en el input de tipo file
        fileInputRef.current.click();
    };

    // Función para manejar la selección de archivo
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                parseAndDisplayXML(content);
            };
            reader.readAsText(file);
        }
    };

    const [xmlContent, setXmlContent] = React.useState("");

    const parseAndDisplayXML = (xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "text/xml");
    
        // Encuentra todas las etiquetas <cac:InvoiceLine>
        const invoiceLineElements = xmlDoc.getElementsByTagName("cac:InvoiceLine");
        let items = [];
    
        for (let element of invoiceLineElements) {
            // Extraer los datos relevantes de cada ítem
            const codigo = element.getElementsByTagName("cbc:ID")[0]?.textContent;

            console.log("codigo"+codigo);
            const description = element.getElementsByTagName("cbc:Description")[0]?.textContent;
            const quantity = element.getElementsByTagName("cbc:InvoicedQuantity")[0]?.textContent;
            const unitPrice = element.getElementsByTagName("cbc:PriceAmount")[0]?.textContent;
            // Agregar más campos según sea necesario
    
            // Suponiendo que el descuento, IVA y valor total están en etiquetas específicas
            // const descuento = element.getElementsByTagName("TU_ETIQUETA_DESCUENTO")[0]?.textContent;
            // const iva = element.getElementsByTagName("TU_ETIQUETA_IVA")[0]?.textContent;
            // const valorTotal = element.getElementsByTagName("TU_ETIQUETA_VALOR_TOTAL")[0]?.textContent;
    
            items.push({ codigo, description, quantity, unitPrice /*, descuento, iva, valorTotal */ });
        }
    
        // Actualiza el estado con los ítems extraídos
        setXmlContent(items);
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
                {xmlContent && (
                    <div>
                        <h3>Ítems de la Factura:</h3>
                        <ul>
                            {xmlContent.map((item, index) => (
                                <li key={index}>
                                    Código: {item.codigo}, Descripción: {item.description}, Cantidad: {item.quantity}, Precio Unitario: {item.unitPrice} {/*, Descuento: {item.descuento}, IVA: {item.iva}, Valor Total: {item.valorTotal} */}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </Navbar_sidebar>
    </>
  )
}

export default SiigoXml