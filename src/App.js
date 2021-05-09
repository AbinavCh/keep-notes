import React, { useState, useEffect } from 'react';
import Header from './components/Header.js';
import Footer from './components/Footer.js';
import Note from './components/Note.js';
import CreateArea from './components/CreateArea.js';
import firebase, { fire } from './components/firebase';
import Login from './Login-components/Login';

function useArray2() {
  const [array2, setArray2] = useState([]);

  useEffect(() => {
    firebase
      .firestore()
      .collection('Note')
      .onSnapshot((snapshot) => {
        const newArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setArray2(newArray);
      });
  }, []);

  return array2;
}

function App() {
  const array2 = useArray2();

  function deletefireNote(id) {
    firebase.firestore().collection('Note').doc(id).delete();
  }

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasaccount, setHasaccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  };

  const clearErrors = () => {
    setPasswordError('');
    setEmailError('');
  };

  const handleLogin = () => {
    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/invalid-email':
          case 'auth/user-disabled':
          case 'auth/user-not-found':
            setEmailError(error.message);
            break;
          case 'auth/wrong-password':
            setPasswordError(error.message);
            break;
        }
      });
  };

  const handleSignup = () => {
    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
          case 'auth/invalid-email':
            setEmailError(error.message);
            break;
          case 'auth/weak-password':
            setPasswordError(error.message);
            break;
        }
      });
  };

  const handleLogout = () => {
    fire.auth().signOut();
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  /* */

  return (
    <div className='App'>
      {user ? (
        <>
          <Header handleLogout={handleLogout} />
          <CreateArea />
          {array2.map((ele) => {
            return (
              <Note
                key={ele.id}
                id={ele.id}
                clicked={deletefireNote}
                title={ele.noteTitle}
                content={ele.noteContent}
              />
            );
          })}
          <Footer />
        </>
      ) : (
        <Login
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasaccount={hasaccount}
          emailError={emailError}
          passwordError={passwordError}
          setHasaccount={setHasaccount}
        />
      )}
    </div>
  );
}

export default App;
