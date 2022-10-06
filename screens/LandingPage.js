import { useNavigation } from '@react-navigation/core'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase'
import { useFonts, Inter_700Bold, Inter_400Regular } from '@expo-google-fonts/inter';
import { Lato_700Bold } from '@expo-google-fonts/lato';

const LandingPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    let [fontsLoaded] = useFonts({
        Inter_700Bold,
        Lato_700Bold,
        Inter_400Regular
      });

    const navigation = useNavigation()
    
    const handleSignUp = async () => {
        try {
            navigation.replace("Cadastro")
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleLogin = async () => {
        try {
            navigation.replace("Login")
        } catch (error) {
            console.log(error.message)
        }
    }

    // const handleLogin = async () => {
    //     try {
    //         const user = await signInWithEmailAndPassword(
    //             auth,
    //             email,
    //             password
    //         )
    //         console.log("Logou com: ", user.email)
    //     } catch (error) {
    //         console.log(error.message)
    //     }
    // }
    
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <Text style={styles.titleText}>Diminua as emissões de carbono criando projetos ecológicos.</Text>
                <Text style={styles.mainText}>Plante árvores em suas propriedades ou crie projetos ecológicos, e faça elas gerarem renda passivamente!</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleLogin} style={styles.button}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleSignUp} style={[styles.button, styles.buttonOutline]}>
                        <Text style={styles.buttonOutlineText}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default LandingPage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    mainContainer: {
        height: '65%',
        width: '80%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        width: '80%',
    },
    inputContainer: {
        width: '80%',
    },
    titleText: {
        fontFamily: 'Inter_700Bold',
        fontSize: 25,
        textAlign: 'center',
    },
    mainText: {
        fontFamily: 'Inter_400Regular',
        fontSize: 17,
        color: '#646464',
        textAlign: 'center',
    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#0CE177',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 140,
    },
    button: {
        backgroundColor: '#0CE177',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0CE177',
        borderWidth: 2,
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0CE177',
        fontWeight: '700',
        fontSize: 16,
    },
})