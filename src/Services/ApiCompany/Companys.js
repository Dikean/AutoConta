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
          'Authorization': `Bearer ${token}` // Usa el token en el encabezado de autorización
        }
      });

  },


//   enviarDatos: (nuevosDatos) => {
//     return axios.post(`${BASE_URL}/user_family_info`, nuevosDatos);
//   },

};
