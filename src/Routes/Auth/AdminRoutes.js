import React from 'react';
import { Route } from 'react-router-dom';

//componentes
import AuditoriaHome from '../../Modules/Auditoria/AuditoriaHome';
import CompanyEspecifico from '../../Components/Common/CompanyEspecifico';
import ExcelComparator from '../../Modules/Auditoria/ExcelComparator';
import ImpuestosHome from '../../Modules/Impuestos/ImpuestosHome';
import SettingsNotifications from '../../Components/Common/SettingsNotifications';
import HomeApp from '../../Components/Common/HomeApp';
import SiigoXml from '../../Modules/Siigo/SiigoXml';
import ManyXml from '../../Modules/Siigo/ManyXml';

const adminRoutes = (
    <>
      {/* Rutas Publicas */}
      {/* <Route path="/dashboard" element={< AuditoriaHome/>} /> */}
      <Route path="/dashboard" element={<HomeApp/>} /> 
      <Route path="/Audit" element={< AuditoriaHome/>} /> 
      <Route path="/CompanyEspecific/:CompanyId" element={< CompanyEspecifico/>} />
      {/* <Route path="/siigo" element={< SiigoXml/>} /> */}
      <Route path="/siigo" element={< ManyXml/>} />
      <Route path="/taxes" element={< ImpuestosHome/>} />
      <Route path="/SettingsNotifications" element={< SettingsNotifications/>} />
    </>
  );
  
  export default adminRoutes;
  