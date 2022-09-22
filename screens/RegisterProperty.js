import { Alert, Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTeste, postImagem } from '../api/index.js'
import { launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import axios from "axios";

const RegisterProperty = () => {

    const [dataTeste, setTeste] = useState('')
    const [imagem, setImagem] = useState('')
    const [testeData, setTesteData] = useState('')

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImagem(result.uri);
            let formData = new FormData();
            formData.append("file", imagem)
            axios({
                method: "post",
                url: "http://192.168.1.93:5000/postImagem",
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(res => {
                console.log(formData)
            })
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textoTeste}>{dataTeste}</Text>
            {imagem && <Image source={{ uri: imagem }} style={{ width: 200, height: 200 }} />}
            <View style={styles.mainContainer}>
                <TextInput placeholder='Nome' style={styles.input}></TextInput>
                <TextInput placeholder='Descrição' style={styles.input}></TextInput>
                <TextInput placeholder='Endereço' style={styles.input}></TextInput>
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text>Upload</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default RegisterProperty

const styles = StyleSheet.create({
    textoTeste: {
        fontSize: 40
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        height: '36%',
        width: '80%',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    inputContainer: {
        width: '60%',
    },
    button: {
        backgroundColor: '#0CE177',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#0CE177',
        width: '100%',
        borderWidth: 1,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
})

// import { Alert, Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native'
// import React, { useState, useEffect } from 'react'
// import { getTeste, postImagem } from '../api/index.js'
// import { launchImageLibrary } from 'react-native-image-picker'
// import * as ImagePicker from 'expo-image-picker'

// const RegisterProperty = () => {

//     const [dataTeste, setTeste] = useState('')
//     const [imagem, setImagem] = useState('')

//     const pickImage = async () => {
//     // No permissions request is necessary for launching the image library
//         let result = await ImagePicker.launchImageLibraryAsync({
//             mediaTypes: ImagePicker.MediaTypeOptions.All,
//             allowsEditing: true,
//             aspect: [4, 3],
//             quality: 1,
//         });

//         console.log(result);

//         if (!result.cancelled) {
//             setImagem(result.uri);
//             postImagem("Teste 4")
//                 .then(res => {
//                     setTeste(res.data)
//                     console.log(res.data)
//                 })
//         }
//     };

//     return (
//         <View style={styles.container}>
//             <Text style={styles.textoTeste}>{dataTeste}</Text>
//             {imagem && <Image source={{ uri: imagem }} style={{ width: 200, height: 200 }} />}
//             <View style={styles.mainContainer}>
//                 <TextInput placeholder='Nome' style={styles.input}></TextInput>
//                 <TextInput placeholder='Descrição' style={styles.input}></TextInput>
//                 <TextInput placeholder='Endereço' style={styles.input}></TextInput>
//                 <TouchableOpacity style={styles.button} onPress={pickImage}>
//                     <Text>Upload</Text>
//                 </TouchableOpacity>
//             </View>
//         </View>
//     )
// }

// export default RegisterProperty

// const styles = StyleSheet.create({
//     textoTeste: {
//         fontSize: 40
//     },
//     container: {
//         backgroundColor: 'white',
//         height: '100%',
//         width: '100%',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     mainContainer: {
//         height: '36%',
//         width: '80%',
//         justifyContent: 'center',
//         alignItems: 'flex-start',
//     },
//     inputContainer: {
//         width: '60%',
//     },
//     button: {
//         backgroundColor: '#0CE177',
//         width: '100%',
//         padding: 15,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     input: {
//         backgroundColor: 'white',
//         borderColor: '#0CE177',
//         width: '100%',
//         borderWidth: 1,
//         paddingHorizontal: 15,
//         paddingVertical: 10,
//         borderRadius: 10,
//         marginTop: 5,
//     },
// })