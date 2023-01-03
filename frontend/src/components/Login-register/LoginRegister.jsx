import './LoginRegister.css';

import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { setDataUser } from "../../redux/userSlice";

import { firebaseApp } from '../../api/apiFirebase/apiConfig';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, updateDoc, query, where  } from 'firebase/firestore';
import  apiFirestore  from '../../api/apiFirebase/apiFirestore';

import { getDataUser, login, registrar } from "../../api/apiSpring/apiSpring";

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

const LoginRegister = () => {
  const dispatch = useDispatch();
  const [registro, setRegistro] = useState(false);

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try{
      if(registro){
        // Registro de usuario en la plataforma
        const nombre = e.target.nombre.value;

        let dataUSer = await registrar(email, password, nombre, 'USER');
        if(dataUSer){
          let dataUSer = await login(email, password);
          dispatch(setDataUser(dataUSer));
        }
      } else{
        // Inicio de sesión en la plataforma
        let dataUSer = await login(email, password);
        dispatch(setDataUser(dataUSer));
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <div className='mt-4 cont-formulario'>
      <h2 className='text-center'>{registro ? 'Registrarse' : 'Iniciar Sesión'}</h2>
      <form onSubmit={handlerSubmit}>
        <div className='pt-5 mb-3'>
          <input type='email' id='email' placeholder='Correo Electrónico' className='form-control' required style={{ width: '100%' }}></input>
        </div>
        {registro ? (
          <div className='mb-3'>
            <input type='nombre' id='nombre' placeholder='Nombre Completo' className='form-control' required style={{ width: '100%' }}></input>
          </div>
        ) : ''}
        <div className='mb-5'>
          <input type='password' id='password' placeholder='Contraseña' className='form-control' required style={{ width: '100%' }}></input>
        </div>
        <button className='btn-login' type='submit'>
          {registro ? 'Registrarse' : 'Iniciar Sesión'}
        </button>
      </form>
      <div className='form-group'>
        <button className='btn-opcion mt-3' onClick={() => setRegistro(!registro)}>
          {registro ? '¿Ya tienes una cuenta? Inicia sesión' : '¿No tienes cuenta? Registrate'}
        </button>
      </div>
    </div>
  )
}

export default LoginRegister;