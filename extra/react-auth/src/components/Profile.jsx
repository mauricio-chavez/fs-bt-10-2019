import React from 'react'
import firebase from '../utils/firebase'

function Profile() {
  const email = firebase.auth().currentUser.email
  return <section>
    <h1>{email}</h1>
    <button onClick={() => firebase.auth().signOut()}>Cerrar sesión</button>
  </section>;
}

export default Profile