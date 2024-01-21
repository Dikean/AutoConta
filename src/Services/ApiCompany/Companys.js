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

  getCompanyDataById: (CompanyId) =>{
    const token = Cookies.get('authToken'); // Obtiene el token de la 
    
    return axios.get(`${ApiUrl}/companys/byId/${CompanyId}`, {
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
  
  }
  

};
