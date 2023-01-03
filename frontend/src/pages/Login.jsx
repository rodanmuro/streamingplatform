import React from 'react';
import LoginRegister from '../components/Login-register/LoginRegister';

const Login = () => {
  return (
    <div className='seccion-formulario'>
      <div className="row sin-m">
        <div className="col-12 sin-p">
          <img 
          className='login-bg' 
          src='https://assets.nflxext.com/ffe/siteui/vlv3/f669a8f4-de1e-49d7-bb56-c9bd1f4a9069/31eaedd5-6273-45f1-be30-cd57d69d1528/CO-es-20221031-popsignuptwoweeks-perspective_alpha_website_large.jpg'
          />
          <h1 className="text-center py-5 px-3">Plataforma de Streaming UNIR</h1>
        </div>
      </div>
      <div className='row sin-m d-flex justify-content-center'>
        <div className='col-11 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4'>
          <LoginRegister />
        </div>
      </div>
    </div>
  );
}

export default Login;

