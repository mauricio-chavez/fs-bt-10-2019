import React, {useState} from 'react';
import firebase from '../utils/firebase'

function Signup() {

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
      await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <section>
      <h1>Crear cuenta</h1>
      <form onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email-signup">Correo Electrónico:</label>
          <input type="email" id="email-signup" value={email} onChange={handleEmailChange} />
        </p>
        <p>
          <label htmlFor="password-signup">Contraseña:</label>
          <input type="password" id="password-signup" value={password} onChange={handlePasswordChange} />
        </p>
        <button type="submit">Enviar</button>
      </form>
    </section>
  )
}

export default Signup