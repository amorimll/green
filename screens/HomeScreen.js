import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import Header from 'Header.js';
import LoginScreen from 'LoginScreen.js';

const HomeScreen = (name,ultimoLogin) => {

    const navigation = useNavigation()

    const handleSignOut = async () => {
        try {
            await signOut(auth)
            .then(() => {
                navigation.replace("Login")
            })
            
        } catch (error) {
            console.log(error.message)
        }
    }
  return (
    <View style={styles.container}>
      <Text>Olá, {name}</Text>
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
      onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
            backgroundColor: '#0782F9',
            width: '60%',
            padding: 15,
            borderRadius: 10,
            alignItems: 'center',
            marginTop: 40
        },
    buttonText: {
            color: 'white',
            fontWeight: '700',
            fontSize: 16,
        },
})