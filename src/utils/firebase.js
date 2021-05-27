import firebase from 'firebase/app';

//constante esta configuracion de mantiene
const firebaseConfig = {
    apiKey: "AIzaSyDICxdvgO66pYfDVQs1PjeKCYg0-apVG_Q",
    authDomain: "birthay-43e01.firebaseapp.com",
    projectId: "birthay-43e01",
    storageBucket: "birthay-43e01.appspot.com",
    messagingSenderId: "933404831638",
    appId: "1:933404831638:web:936fe49e8061c92f72f7b7"
  };

  //para reutilizar en otros componentes y no importar todo el codigo
  export default firebase.initializeApp(firebaseConfig);
  