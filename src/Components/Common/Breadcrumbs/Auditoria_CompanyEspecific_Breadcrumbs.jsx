import * as React from 'react';
import Breadcrumbs from '@mui/joy/Breadcrumbs';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';

function Auditoria_CompanyEspecific_Breadcrumbs({NameCompany}) {
    return (
        <Breadcrumbs aria-label="breadcrumbs">
          {['Company'].map((item) => (
            <Link key={item} color="neutral" href="/dashboard">
              {item}
            </Link>
          ))}
          <Typography>{NameCompany}</Typography>
        </Breadcrumbs>
      );
}

export default Auditoria_CompanyEspecific_Breadcrumbs