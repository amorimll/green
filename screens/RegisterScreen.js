import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { Lato_700Bold } from '@expo-google-fonts/lato';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
        Lato_700Bold,
        Inter_400Regular
      });
    
    const navigation = useNavigation()
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) {
                navigation.navigate("Home")
            }
        })

        return unsubscribe
    }, [])

    const handleSignUp = async () => {
        try {
            const user = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            console.log(user)
        } catch (error) {
            console.log(error.message)
        }
    }

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <View style={styles.inputContainer}>
                    <TextInput placeholder='Email' style={styles.input} onChangeText={text => setEmail(text)}></TextInput>
                    <TextInput placeholder='Senha' style={styles.input} onChangeText={text => setPassword(text)} secureTextEntry></TextInput>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleSignUp} style={styles.button}>
                        <Text style={styles.buttonText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputContainer: {
        width: '60%',
    },
    button: {
        backgroundColor: '#0CE177',
        padding: 15,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 140,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#0CE177',
        width: '100%',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
})

export default LoginScreen