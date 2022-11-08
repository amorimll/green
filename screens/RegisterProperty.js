import { useNavigation } from '@react-navigation/core'
import { Alert, Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTeste, postImagem } from '../api/index.js'
import axios from "axios";
import { collection, addDoc, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from '../firebase'
import { getStorage, ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import * as FileSystem from 'expo-file-system'
import { auth } from '../firebase'
import baseImage from '../pics/baseImage.jpg'
import { base64 } from '@firebase/util';
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Lato_700Bold, Lato_400Regular } from '@expo-google-fonts/lato';

const RegisterProperty = () => {

    const cameraImage = require('../pics/camera.png')
    const imagemTeste = 'https://i.postimg.cc/mrfdKk2M/smoking.png'

    const [imagem, setImagem] = useState('')
    const [numArvores, setNum] = useState();
    const [nome, setNome] = useState()
    const [descricao, setDesc] = useState()
    const [endereco, setEnd] = useState()
    const [latitude, setLat] = useState()
    const [longitude, setLon] = useState()
    // 52.478116,13.381420,19

    const storage = getStorage();
    const storageRef = ref(storage, 'imagensPropriedades/' + auth.currentUser.uid + '/' + nome);

    const navigation = useNavigation()

    const metadata = {
        contentType: 'image/jpeg',
    };

    let [fontsLoaded] = useFonts({
        Lato_400Regular,
        Inter_600SemiBold,
        Inter_700Bold,
        Lato_700Bold,
        Inter_400Regular
      });

    const uploadImagem = async () => {
        
        

        // function printFile(file) {
        //     const reader = new FileReader();
        //     reader.onload = (evt) => {
        //       console.log(evt.target.result);
        //     };
        //     reader.readAsText(file);
        // }

        // printFile(cameraImage)

        // const filePath = `D:\Arquivos\TCC\client\pics\baseImage.jpg`

        // try {
        //     function toDataURL(url, callback) {
        //         let xhRequest = new XMLHttpRequest();
        //         xhRequest.onload = function () {
        //           let reader = new FileReader();
        //           reader.onloadend = function () {
        //             callback(reader.result);
        //           }
        //           reader.readAsDataURL(xhRequest.response);
        //         };
        //         xhRequest.open('GET', url);
        //         xhRequest.responseType = 'blob';
        //         xhRequest.send();
        //     }
        //     const base64 = toDataURL(imagemTeste, function (dataUrl) {
        //         console.log('RESULT:', dataUrl)
        //     })
        // }catch(error) {
        //     console.log(error)
        // }

        

        // axios.post('https://freeimage.host/api/1/upload?key=6d207e02198a847aa98d0a2a901485a5&source=' + base64 + '&format=json')
        //     .then(res => {
        //         console.log(res)
        //     })

        // const absolutePath = FileSystem.documentDirectory + 'download.jpeg'

        // const response = await fetch(imagemTeste)
        // const imageBlob = await response.blob()

        // function urlToBlob(url) {
        //     return new Promise((resolve, reject) => {
        //       const xhr = new XMLHttpRequest();
        //       xhr.addEventListener('error', reject);
        //       xhr.addEventListener('readystatechange', () => {
        //         if (xhr.readyState === 4) {
        //           resolve(xhr.response);
        //         }
        //       });
        //       xhr.open('GET', url, true);
        //       xhr.responseType = 'blob'; // convert type
        //       xhr.send();
        //     });
        // }

        // const blobTeste = await urlToBlob("file:///D:/Arquivos/TCC/client/pics/baseImage.jpg")

        // uploadBytes(storageRef, blobTeste, metadata).then(() => {
        //     console.log('Uploaded')
        // })
    }

    const criarColecao = async () => {
        try {
            await setDoc(doc(db, "users", auth.currentUser.uid, "properties", nome), {
                nome: nome,
                descricao: descricao,
                endereco: endereco,
                latitude: latitude,
                longitude: longitude,
                numArv: numArvores 
            });
            console.log("Document written");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const postDocument = async () => {
        const url = "http://192.168.1.93:5000/postImagem"
        const formData = new FormData()

        formData.append('latitude', latitude)
        formData.append('longitude', longitude)
        axios.post(url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(res => {
            setNum(res.data)
            setImagem(baseImage)
        })
    }

    if (!fontsLoaded) {
        return null;
      }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.headerButton} onPress={() => { navigation.navigate('Home') }}><Text style={styles.headerButtonText}>Voltar</Text></TouchableOpacity>
            {<Image source={imagem ? imagem : cameraImage} style={styles.imagemStyle} />}
            
            <View style={styles.mainContainer}>
                <TextInput placeholder='Nome' style={styles.input} onChangeText={e => setNome(e)}></TextInput>
                <TextInput placeholder='Descrição' style={styles.input} onChangeText={e => setDesc(e)}></TextInput>
                <TextInput placeholder='Endereço' style={styles.input} onChangeText={e => setEnd(e)}></TextInput>
                <TextInput placeholder='Latitude' style={styles.input} onChangeText={e => setLat(e)}></TextInput>
                <TextInput placeholder='Longitude' style={styles.input} onChangeText={e => setLon(e)}></TextInput>
                <TouchableOpacity style={styles.button} onPress={postDocument}>
                    <Text>Calcular Rendimento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={criarColecao}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <View style={styles.mainContainerQuantidade}>
                    <Image source={require('../pics/tree.png')} style={styles.iconStyle} />
                    <Text style={styles.textoTeste}>{numArvores}</Text>
                </View>
            </View>
        </View>
    )
}

export default RegisterProperty

const styles = StyleSheet.create({
    headerButton: {
        backgroundColor: '#0CE177',
        width: 80,
        height: 40,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 5,
        position: 'absolute',
        top: 40,
        left: 5
    },
    headerButtonText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 17,
        color: 'white'
    },
    iconStyle: {
        width: 40,
        height: 40
    },
    imagemStyle: {
        width: 175,
        height: 175,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#0CE177',
        backgroundColor: '#F5F5F5'
    },
    mainContainerQuantidade: {
        display: 'flex',
        flexDirection: 'row',
    },
    textoTeste: {
        fontSize: 30
    },
    container: {
        backgroundColor: 'white',
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    mainContainer: {
        height: '30%',
        width: '70%',
        marginTop: 150,
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
        marginTop: 5
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