// api/companys
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppUrl } from '../ConfigUrl';
const ApiUrl = AppUrl +'api'; // Url 

export const Companys = {


  getCompanysByUserId: () => {

    const token = Cookies.get('authToken'); // Obtiene el token de la 
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}
  
    return axios.get(`${ApiUrl}/companys/byUser/${UserId}`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa

      return response.data

      // Aquí puedes hacer lo que necesites con response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud:", error);
  });
  

  },

  postCreateCompanys: (Datos) => {
    const token = Cookies.get('authToken');
  
    return axios.post(`${ApiUrl}/companys/createCompany`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Compañía creada", response.data);
      // Aquí puedes hacer lo que necesites con response.data
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  },

  putCompanys: (Datos) => {
    const token = Cookies.get('authToken');
  
    return axios.put(`${ApiUrl}/companys/updateCompany`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Compañía creada", response.data);
      // Aquí puedes hacer lo que necesites con response.data
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  },

  getCompanyDataById: (CompanyId) =>{
    const token = Cookies.get('authToken'); // Obtiene el token de la 
    
    return axios.get(`${ApiUrl}/companys/byCompany/${CompanyId}`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa

      return response.data

      // Aquí puedes hacer lo que necesites con response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud:", error);
  });
  
  },

  getbyUserCompanyChart: () =>{
    const token = Cookies.get('authToken'); // Obtiene el token de la 
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}

    return axios.get(`${ApiUrl}/companys/byUserCompanyChart/${UserId}`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa
      return JSON.stringify(response.data)

      // Aquí puedes hacer lo que necesites con response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud getbyUserCompanyChart:", error);
  });
  
  },

  postUserByCompanyEspecific: (Datos) => {
    const token = Cookies.get('authToken'); // Obtiene el token de la cookie
  
    return axios.post(`${ApiUrl}/userscompany/getUserByAdmin`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`, // Usa el token en el encabezado de autorización
        'Content-Type': 'application/json' // Asegúrate de que el servidor espera JSON
      }
    })
    .then(response => {
      return response.data; // Retorna directamente los datos, sin convertirlos a string
    })
    .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud getUserByCompanyEspecific:", error);
    });
  },
  
  postGetRolInCompany: (Datos) => {
    const token = Cookies.get('authToken'); // Obtiene el token de la cookie
  
    return axios.post(`${ApiUrl}/userscompany/getRolInCompany`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`, // Usa el token en el encabezado de autorización
        'Content-Type': 'application/json' // Asegúrate de que el servidor espera JSON
      }
    })
    .then(response => {

      return response.data; // Retorna directamente los datos, sin convertirlos a string
    })
    .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud getUserByCompanyEspecific:", error);
    });
  },
  
  
  postJoinOneCompany: (Datos) => {
    const token = Cookies.get('authToken');
    
    return axios.post(`${ApiUrl}/companys/joinOneCompany`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Añadido exitosamente", response.data);
      // Aquí puedes hacer lo que necesites con response.data
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  },

  deleteDocumentsByCompany: (Datos) => {
    const token = Cookies.get('authToken');
  
    // Utilizar axios de manera que puedas incluir el cuerpo en la solicitud delete
    return axios({
      method: 'delete',
      url: `${ApiUrl}/companys/deletDocumente`,
      data: Datos, // Aquí pasas los datos en el cuerpo de la solicitud
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Eliminado exitosamente", response.data);
    })
    .catch(error => {
      console.error("Error en la solicitud de envio:", error);
    });
  },

  //storage
  postSendDataToFirebase: (companyId, archivo, fileName, category) => {
    const token = Cookies.get('authToken');
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}

    const formData = new FormData();
    formData.append('file', archivo);
    formData.append('companyId', companyId); 
    formData.append('UserId', UserId);
    formData.append('name', fileName);
    formData.append('category', category); 
    

    return axios.post(`${ApiUrl}/companys/upload`, formData, {
        headers: {
            'Authorization': `Bearer ${token}`,
        }
    })
    .then(response => {
        console.log("Enviado Exitosamente", response.data);
    })
    .catch(error => {
        console.error("Error en la solicitud:", error);
    });
  },

  getDocumentsByCompany: (CompanyId) =>{
    const token = Cookies.get('authToken'); // Obtiene el token de la 
    //companys/getDocuments/${CompanyId}
    return axios.get(`${ApiUrl}/companys/getDocuments/${CompanyId}`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      return response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud:", error);
  });
  
  },

  //Chat GPT
  postSendQuestioToChatGpt: (Datos) => {
    const token = "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";
  
    return axios.post(`https://api.openai.com/v1/chat/completions`, JSON.stringify(Datos), {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.data) // Devuelve directamente response.data
    .catch(error => {
      console.error("Error en la solicitud:", error);
      throw error; // Propaga el error para manejarlo en el .catch de la llamada
    });
  }
  
};
