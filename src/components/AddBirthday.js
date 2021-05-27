import React, {useState} from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';
import firebase from '../utils/firebase';
import "firebase/firestore";
//import firebase from 'firebase'


//se inicaliza la base de datos en la constante db
const db = firebase.firestore(firebase);

export default function AddBirthday() {
    const [formData, setFormData] = useState({});
    const [isDateTimePickerVisible, setDateTimePickerVisible] = useState(false); 
    const [formError, setFormError] = useState({});
    

    const hideDatePicker = () =>{
        setDateTimePickerVisible(false);
    };

    const handlerConfirm = (date) =>{
        const dateBirth = date;
        dateBirth.setHours(0);
        dateBirth.setMinutes(0);
        dateBirth.setSeconds(0);
        setFormData({...formData, dateBirth})
        hideDatePicker();
    };
    const showDatePicker = () =>{
        setDateTimePickerVisible(true);
    };
    //recibe el evento y el tipo de evento
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    };
    const onSubmit = () =>{
        let errors = {};
        if(!formData.name || !formData.lastname || !formData.dateBirth){
            if(!formData.name) errors.name = true;
            if(!formData.lastname) errors.lastname = true;
            if(!formData.dateBirth) errors.dateBirth = true;
        } else{
            //el año no se calcula , solo los meses para ver cuanto falta para el cumpleaños
            console.log("entra grabar");
             const data = formData;
             data.dateBirth.setYear(0);
             //se crea coleccion
             db.collection("cumples") 
             .add(data)  
             .then(() => {
                console.log("grabo");
             }) 
             .catch(()=>{
                 //si hay error se deja todos los campos con error
                 console.log("error");
                 setFormError({name: true, lastname: true, dateBirth: true})
             });     
        }
        setFormError(errors);
    };
    return (
        <>
            <View style={styles.container}>
                <TextInput 
                style={[styles.textinput, formError.name && {borderColor: '#940c0c'}]} 
                placeholder="Nombre" 
                placeholderTextColor="#969696"
                onChange={(e) => onChange(e, "name")}
                /> 
                <TextInput 
                style={[styles.textinput, formError.lastname && {borderColor: '#940c0c'}]} 
                placeholder="Apellido" 
                placeholderTextColor="#969696"
                onChange={(e) => onChange(e, "lastname")}
                />
                <View style={[styles.textinput, styles.datepicker, formError.dateBirth && {borderColor: '#940c0c'}]}>
                    <Text style={{color: formData.dateBirth ? "#fff" : "#969696", fontSize: 18}} onPress={showDatePicker}>
                        {formData.dateBirth ? moment(formData.dateBirth).format('LL')
                        :
                        'Fecha de nacimiento'}                       
                    </Text>
                </View>
                <TouchableOpacity onPress={onSubmit}>
                    <Text style={styles.addButton}>Crear Cumpleaños</Text>
                </TouchableOpacity>
            </View>   
            <DateTimePickerModal
            isVisible={isDateTimePickerVisible}
            mode="date"
            onConfirm={handlerConfirm}
            onCancel={hideDatePicker}
            />         
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textinput:{
        height: 40,
        width: "80%",
        color: "#fff",
        marginBottom: 25,
        backgroundColor: "#1e3040",
        paddingHorizontal: 20,      
        fontSize: 18,
        borderWidth: 1,
        borderColor: "#1e3040",
        borderRadius: 50,
    },
    datepicker:{
        justifyContent: 'center',
    },  
    addButton:{
        color: "#fff",
    },
});
