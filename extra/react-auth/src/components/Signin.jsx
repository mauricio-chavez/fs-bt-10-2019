import React, { useState } from 'react';
import firebase from '../utils/firebase'


function Signin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function handleEmailChange(e) {
    setEmail(e.target.value)
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <section>
      <h1>Iniciar sesión</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email-signin">Correo Electrónico:</label>
          <input type="email" id="email-signin" value={email} onChange={handleEmailChange} />
        </p>
        <p>
          <label htmlFor="password-signin">Contraseña:</label>
          <input type="password" id="password-signin" value={password} onChange={handlePasswordChange} />
        </p>
        <button type="submit">Enviar</button>
      </form>
      <button onClick={async () => {
        try {
          const provider = new firebase.auth.GoogleAuthProvider();
          await firebase.auth().signInWithPopup(provider)
        } catch(e) {
          console.log(e)
        }
      }}>Iniciar sesión con Google</button>
    </section>
  )
}

export default Signin