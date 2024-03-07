import React, { useState, useEffect } from 'react';
import Background from './HomeApp/Background'
import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { useParams } from 'react-router-dom';

//Api
import { Companys } from '../../Services/ApiCompany/Companys';

//icons
import DeleteIcon from '@mui/icons-material/Delete';

function EditRolCompany({ selectedPerson, onClose }) {


  const [role, setRole] = useState(selectedPerson.Rol);

  let { CompanyId } = useParams();

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí manejarías el envío del formulario
    console.log('Formulario enviado', role);
  };

  // Función para manejar el cambio de rol
  const handleRoleChange = (newRole) => {
    setRole(newRole);
    // Aquí podrías actualizar el rol en selectedPerson o manejar el cambio como necesites
  };

  

  const putRolInCompany = (e) => {
    e.preventDefault();
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}
  
    console.log("rol enviado"+role);
    // Aquí puedes agregar lógica adicional si es necesario
    Companys.putRolInCompany({ CompanyId: CompanyId, UserId: UserId, IntegranteId: selectedPerson.UserId, Rol:role  })
    .then(response => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Cambio de rol exitoso!!',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal2-popup-custom '
        }
      }).then((result) => {
        if (result.value) {
          // Si el usuario presiona "Ok", refresca la página
          window.location.reload();
        }
      });
    })
    .catch(error => {
      // Registrar el error en la consola
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar cambiar el rol.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal2-popup-custom '
        }
      }).then((result) => {
        if (result.value) {
          // Si el usuario presiona "Ok", refresca la página
          window.location.reload();
        }
      });
    });
  
  };

  const deleteUserByAdminCompany = (e) => {
    e.preventDefault();
    const UserId = Cookies.get('authUserId'); // Obtiene el User ID de auth 0 ${UserId}
  
    // Aquí puedes agregar lógica adicional si es necesario
    Companys.deleteUserByAdminCompany({ CompanyId: CompanyId, UserId: UserId, IntegranteId: selectedPerson.UserId  })
    .then(response => {
      Swal.fire({
        title: '¡Éxito!',
        text: 'Eliminado Exitosamente',
        icon: 'success',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal2-popup-custom '
        }
      }).then((result) => {
        if (result.value) {
          // Si el usuario presiona "Ok", refresca la página
          window.location.reload();
        }
      });
    })
    .catch(error => {
      // Registrar el error en la consola
      Swal.fire({
        title: 'Error',
        text: 'Ha ocurrido un error al intentar eliminar el usuario.',
        icon: 'error',
        confirmButtonText: 'Ok',
        customClass: {
          container: 'swal2-popup-custom '
        }
      }).then((result) => {
        if (result.value) {
          // Si el usuario presiona "Ok", refresca la página
          window.location.reload();
        }
      });
    });
  
  };
  
  return (
    <>
    <Background onClose={onClose}>
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-md px-6 py-4 my-6">
      <div className="sm:flex sm:justify-between">
        <div className="flex items-center mt-2">
          <img className="h-12 w-12 rounded-full" src={selectedPerson.UserPhoto} alt="" />
          <div className="ml-2">
            <h3 className="text-lg text-gray-800 font-medium">{selectedPerson.Email}</h3>
            <select
              id="roleSelect"
              className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={role}
              onChange={(e) => handleRoleChange(e.target.value)}
              >
              <option value="Lector">Lector</option>
              <option value="Administrator">Administrator</option>
            </select>
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
 
        </div>
      </div>

      <div class="flex justify-between items-center mt-5 p-1 py-2">
  <button class=" hover:bg-gray-500 font-bold py-2 px-4 rounded transition duration-300" onClick={deleteUserByAdminCompany}>
    <DeleteIcon className="h-6 w-6 text-black hover:text-red-500" />
  </button>
  <div class="flex gap-2">
    <button class="bg-blue-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition duration-300" onClick={putRolInCompany}>
   Cambiar rol
    </button>
  </div>
</div>

    </div>
    </Background>
    </>
  )
}

export default EditRolCompany
