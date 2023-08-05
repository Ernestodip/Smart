// Registro.js
import React, { useState } from 'react';
import axios from 'axios';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [telefono, setTelefono] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [message, setMessage] = useState('');

  const handleRegistro = () => {
    axios.post('/api/register', {
      nombre,
      apellido,
      email,
      password,
      fechaNacimiento,
      codigoPostal,
      telefono,
      domicilio,
      ciudad,
    })
      .then((response) => {
        setMessage(response.data.message);
        setNombre('');
        setApellido('');
        setEmail('');
        setPassword('');
        setFechaNacimiento('');
        setCodigoPostal('');
        setTelefono('');
        setDomicilio('');
        setCiudad('');
      })
      .catch((error) => {
        setMessage(error.response.data.error);
      });
  };

  return (
    <div>
      <h2>Registro</h2>
      {message && <p>{message}</p>}
      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="date"
        placeholder="Fecha de nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
      />
      <input
        type="text"
        placeholder="Código postal"
        value={codigoPostal}
        onChange={(e) => setCodigoPostal(e.target.value)}
      />
      <input
        type="tel"
        placeholder="Teléfono"
        value={telefono}
        onChange={(e) => setTelefono(e.target.value)}
      />
      <input
        type="text"
        placeholder="Domicilio"
        value={domicilio}
        onChange={(e) => setDomicilio(e.target.value)}
      />
      <input
        type="text"
        placeholder="Ciudad"
        value={ciudad}
        onChange={(e) => setCiudad(e.target.value)}
      />
      <button onClick={handleRegistro}>Registrarse</button>
    </div>
  );
};

export default Registro;
