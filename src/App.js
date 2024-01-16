
import * as React from 'react';

//router dom
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Routes/AppRoutes';

import LandingPage from './Pages/LandingPage';

function App() {

  return (
     <>
    <Router>
      <AppRoutes />
    </Router>
    </>
  );
}

export default App;
