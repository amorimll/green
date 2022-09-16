import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTeste } from '../api/index.js'

const RegisterProperty = () => {

    const [dataTeste, setTeste] = useState('')

    useEffect(() => {
        getTeste()
        .then(valor => {
          setTeste(valor.data)
        })
      })

    return (
        <View style={styles.container}>
            <Text>{dataTeste}</Text>
            <View style={styles.mainContainer}>
                <TextInput placeholder='Nome' style={styles.input}></TextInput>
                <TextInput placeholder='Descrição' style={styles.input}></TextInput>
                <TextInput placeholder='Endereço' style={styles.input}></TextInput>
            </View>
        </View>
    )
}

export default RegisterProperty

const styles = StyleSheet.create({
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