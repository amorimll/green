import { Alert, Button, TouchableOpacity, StyleSheet, Text, TextInput, View, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTeste, postImagem } from '../api/index.js'
import { launchImageLibrary } from 'react-native-image-picker'
import * as ImagePicker from 'expo-image-picker'
import { Buffer } from "buffer";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const RegisterProperty = () => {

    const baseImage = require('../pics/baseImage.jpg')
    const cameraImage = require('../pics/camera.png')

    const [imagem, setImagem] = useState('')
    const [numArvores, setNum] = useState();
    const [latitude, setLat] = useState()
    const [longitude, setLon] = useState()

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

    return (
        <View style={styles.container}>
            {<Image source={imagem ? imagem : cameraImage} style={styles.imagemStyle} />}
            <View style={styles.mainContainer}>
                <TextInput placeholder='Nome' style={styles.input}></TextInput>
                <TextInput placeholder='Descrição' style={styles.input}></TextInput>
                <TextInput placeholder='Endereço' style={styles.input}></TextInput>
                <TextInput placeholder='Latitude' style={styles.input} onChangeText={e => setLat(e)}></TextInput>
                <TextInput placeholder='Longitude' style={styles.input} onChangeText={e => setLon(e)}></TextInput>
                <TouchableOpacity style={styles.button}>
                    <Text>Calcular Rendimento</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={postDocument}>
                    <Text>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={styles.textoTeste}>{numArvores}</Text>
            </View>
        </View>
    )
}

export default RegisterProperty

const styles = StyleSheet.create({
    imagemStyle: {
        width: 175,
        height: 175,
        borderRadius: 35,
        borderWidth: 2,
        borderColor: '#0CE177',
        backgroundColor: '#F5F5F5'
    },
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