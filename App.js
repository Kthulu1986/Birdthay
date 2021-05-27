import React, {useEffect, useState} from 'react';
import {StyleSheet, SafeAreaView,  StatusBar} from 'react-native';
import firebase from './src/utils/firebase';
import {decode, encode} from "base-64"
//se importa el componente Auth para desplegar en App
import Auth from './src/components/Auth';
import 'firebase/auth';
import ListBirthday from './src/components/ListBirthday';

if(!global.btoa) global.btoa = encode;
if(!global.atob) global.atob = decode;

export default function App(){
  const [user, setUser] = useState (undefined);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((response) => {
      setUser(response);
    });  
  }, []);

  //undefined no es ningun tipo de dato por lo que valida si hay algo en la variable (no es igual a nulo)
  if (user === undefined) return null;  

  return(   
    <>
      <StatusBar barStyle={'light-content'}/> 
      <SafeAreaView style={styles.background}>      
        {user ? <ListBirthday /> : <Auth/>}
      </SafeAreaView>
    </>
  );
}

// //funcion es renderizada como componente
// function Logout() {
//   //funcion flecha logout
//   const logout = () => {
//     firebase.auth().signOut();
// } 
// return(
//     <View>
//       <Text>Estas Logueado</Text>
//       <Button title="Cerrar Session" onPress={logout}/>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  background:{
    backgroundColor: "#15212b",
    height: "100%",
  },
})

