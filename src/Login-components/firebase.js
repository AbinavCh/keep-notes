import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyART-X4BTiQgZUQpVV-Rf4Mf6qxwxG6nhg',
  authDomain: 'keep-notes-32def.firebaseapp.com',
  projectId: 'keep-notes-32def',
  storageBucket: 'keep-notes-32def.appspot.com',
  messagingSenderId: '986878073716',
  appId: '1:986878073716:web:b4a7540fc8c4cdf071aa21',
};
// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;
