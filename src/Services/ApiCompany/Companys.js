// api/companys
import Cookies from 'js-cookie';
import axios from 'axios';
import { AppUrl } from '../ConfigUrl';
const ApiUrl = AppUrl +'api'; // Url 


export const Companys = {

  getCompanysByUserId: () => {

    const token = Cookies.get('authToken'); // Obtiene el token de la 
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}
  
    return axios.get(`${ApiUrl}/companys/byUser/123`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa
      console.log("Datos recibidos:", response.data);
      // Aquí puedes hacer lo que necesites con response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud:", error);
  });
  

  },

  postCreateCompanys: (Datos) =>{
    const token = Cookies.get('authToken'); // Obtiene el token de la 
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}
  
    return axios.post(`${ApiUrl}/companys/createCompany`, {
      headers: {
          'Authorization': `Bearer ${token}`// Usa el token en el encabezado de autorización
      }
  })
  .then(response => {
      // Manejar la respuesta exitosa
      console.log("Datos recibidos:", response.data);
      // Aquí puedes hacer lo que necesites con response.data
  })
  .catch(error => {
      // Manejar el error
      console.error("Error en la solicitud:", error);
  });
  }

//   enviarDatos: (nuevosDatos) => {
//     return axios.post(`${BASE_URL}/user_family_info`, nuevosDatos);
//   },

};
