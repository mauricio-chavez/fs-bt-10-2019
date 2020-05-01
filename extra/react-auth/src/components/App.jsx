import React, {useState} from 'react';
import firebase from '../utils/firebase'
import Signup from './Signup'
import Signin from './Signin'
import Profile from './Profile'
import '../styles/App.css';

function App() {
  const [authenticated, setAuthenticated] = useState(false)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setAuthenticated(true)
    } else {
      setAuthenticated(false)
    }
  })

  if (authenticated) {
    return <Profile />
  } else {
    return <>
      <Signin />
      <Signup />
    </>;
  }

}

export default App;
