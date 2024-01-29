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
  
    return axios.delete(`${ApiUrl}/companys/deleteDocumentByCompany`, Datos, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(response => {
      console.log("Eliminado exitosamente", response.data);
    })
    .catch(error => {
      console.error("Error en la solicitud:", error);
    });
  },


  //storage
  postSendDataToFirebase: (companyId, archivo) => {
    const token = Cookies.get('authToken');
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}

    const formData = new FormData();
    formData.append('file', archivo); // Asegúrate de que 'archivo' es un objeto File
    formData.append('companyId', companyId); // Asegúrate de que 'companyId' es una cadena
    formData.append('UserId', UserId); // Asegúrate de que 'companyId' es una cadena
    

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

  


};
