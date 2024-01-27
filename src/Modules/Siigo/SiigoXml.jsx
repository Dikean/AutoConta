import React from 'react'
import Button from '@mui/material/Button';


//components
import Navbar_sidebar from '../../Components/Common/Navbar_sidebar'

function SiigoXml() {
    const fileInputRef = React.useRef();
    const [xmlContent, setXmlContent] = React.useState("");
    const tagName = 'cbc:Description'; // Definir la etiqueta aquí

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const content = e.target.result;
                extractContentBetweenTags(content, tagName);
            };
            reader.readAsText(file);
        }
    };

    const extractContentBetweenTags = (content, tagName) => {
        const startTag = `<${tagName}>`;
        const endTag = `</${tagName}>`;
        let startIndex = content.indexOf(startTag);
        let endIndex = content.indexOf(endTag);

        if (startIndex !== -1 && endIndex !== -1) {
            // Ajustar índices para incluir las etiquetas
            endIndex = endIndex + endTag.length;
            const partContent = content.substring(startIndex, endIndex);
            setXmlContent(partContent);
        } else {
            // Si no se encuentran las etiquetas, no establecer contenido
            setXmlContent("Etiqueta no encontrada");
        }
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
                            <h3>Contenido de &lt;{tagName}&gt;:</h3>
                            <pre>{xmlContent}</pre> {/* Muestra el contenido XML */}
                        </div>
                    )}
                </div>
            </Navbar_sidebar>
        </>
    );
}

export default SiigoXml;
