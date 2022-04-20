import { request, response } from 'express';

import Personal from '../models/Personal.js';
import Usuario from '../models/Usuario.js';

const registrarPersonal = async (req = request, res = response) => {

  const { nombres, apellidos, idtipodocumento, numerodocumento, idsexo, email, domicilio, fechanacimiento, idoperadortelefonico,numerotelefono } = req.body;

  try {

    const personal = new Personal({nombres, apellidos, idtipodocumento, numerodocumento, idsexo, email, domicilio, fechanacimiento, idoperadortelefonico,
    numerotelefono});

    await personal.save();

    const usuario = new Usuario();
    usuario.usuario = numerodocumento;
    usuario.idpersonal = personal.id;
    usuario.idrol = 1;
    usuario.password = '123456';

    await usuario.save();

    res.json(usuario);

  } catch (error) {

    console.log(error);
    res.status(500).json({
      msg : "Hable con el administrador."
    });

  }

};

const ingresarPersonal = async (req = request, res = response) => {

  const { usuario, password } = req.body;

  res.json({
    usuario, 
    password
  })
}

const confirmarCuenta = async (req = request, res = response) => {

  const { usuario, password } = req.body;

  

  res.json({
    usuario, password
  });

}

export {
  registrarPersonal,
  ingresarPersonal,
  confirmarCuenta
}