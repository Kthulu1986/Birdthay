import React, {useState} from 'react'
import { StyleSheet, View, TouchableOpacity, TextInput, Text } from 'react-native'
import {validateEmail} from '../utils/validations'
import firebase from '../utils/firebase'
import { Value } from 'react-native-reanimated';


export default function LoginForm(props) {
    const {changeForm} = props;    
    const [formData, setFormData] = useState(defaultValue());
    const [formError, setFormError] = useState({});

    const login = () => {
        let errors = {};       
        if(!formData.email || !formData.password){
            if(!formData.email) errors.email = true;
            if(!formData.password) errors.password = true;
            console.log("error 1");
        }
        else if (!validateEmail(formData.email)){
            errors.email = true;
            console.log("error 2");
        }
        else{
            firebase
            .auth()
            .signInWithEmailAndPassword(formData.email, formData.password)
            .then(() => {
                console.log('OK');
            })
            .catch(() => {
                setFormError({
                    email: true,
                    password: true,
                });
            });
        }
        setFormError(errors);
    };

    const onChance = (e, type) => {
        // console.log('data:', e.nativeEvent.text);
        // console.log('type:', type);
        //type se toma como un objeto dinamico para agregarlo al spread operator
        setFormData({...formData, [type]: e.nativeEvent.text})
    };
    return (
        <>    
            <TextInput
                style={[styles.input, formError.email && styles.error]}
                placeholder='Correo Electronico'
                placeholderTextColor='#969696'
                onChange={(e) => onChance(e, 'email')}
            />
             <TextInput
                style={[styles.input, formError.password && styles.error]}
                placeholder='Contraseña'
                placeholderTextColor='#969696'
                secureTextEntry={true}
                onChange={(e) => onChance(e, 'password')}
            />
            <TouchableOpacity onPress={login}>
                <Text style={styles.btnText}>Inicar Session</Text>
            </TouchableOpacity>

            <View style={styles.register}>
                <TouchableOpacity onPress={changeForm}>
                    <Text style={styles.btnText}>Registrate</Text>
                </TouchableOpacity>  
            </View>
        </>
    );
}
function defaultValue(){
    return{
        email:"",
        password:""
    }
}

const styles = StyleSheet.create({
    input:{
        height: 50,
        color: "#fff",        
        width: "80%",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,
        borderRadius: 50,
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
    },
    btnText:{
        color: "#fff",
        fontSize: 18,
    },
    register:{
        flex:1,
        justifyContent: 'flex-end',
        marginBottom: 10,
    },
    error:{
        borderColor: "#940c0c",
    },
});
