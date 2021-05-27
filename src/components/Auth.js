import React from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import { useState } from "react";
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function Auth(){
    const[isLogin, setIsLogin] = useState(true);

    const changeForm = () => {
        setIsLogin(!isLogin);    
    };
    return(
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/logo.png')}   />
            {isLogin ?(
                //changeForm se pasa por props
                <LoginForm changeForm={changeForm}/>
            ):(
                //changeForm se pasa por props
                <RegisterForm  changeForm={changeForm}/>
            )}           
        </View>
    );
}
const styles = StyleSheet.create({
    view:{
        flex: 1,
        alignItems: 'center',
    },
    logo:{
        width: '80%',
        height: 240,
        marginTop: 50,
        marginBottom: 50,
    },
});