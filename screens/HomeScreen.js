import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Fontisto } from '@expo/vector-icons';
import {Feather} from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { getTeste } from '../api/index.js'

const image = { uri: "https://upload.wikimedia.org/wikipedia/commons/d/d3/React_Native.png" };
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const HomeScreen = () => {
  const data = []
  const navigation = useNavigation()
  const [dataTeste, setTeste] = useState('')

  const handleSignOut = async () => {
    try {
      await signOut(auth)
        .then(() => {
          navigation.replace("LandingPage")
        })

    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <View style={styles.container_pai}>
      <View style={styles.container_filho}>
        <View style={styles.content}>
          <TouchableOpacity /*activeOpacity={0.1}*/ style={styles.buttonUser}>
            <ImageBackground source={{ uri: 'https://scontent-gig2-1.xx.fbcdn.net/v/t39.30808-6/280370677_7447181435352331_1439375223080131899_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG6rFJcmeoNtOQ8uMTWNfRpg-yXgJfy09yD7JeAl_LT3GaH8eeVKwf_WisnR9nzr0RNxOvwHPKfs7f9ngjNc_TQ&_nc_ohc=VxBgZKrIeLUAX8xF-zj&_nc_ht=scontent-gig2-1.xx&oh=00_AT_ZY_8A_GZg3ROH4FPJITb1iDKQqA3wEZxv6alCv69F1g&oe=6311A542' }}  /*resizeMode="cover"*/ style={styles.image} imageStyle={{ borderRadius: 44 / 2 }}></ImageBackground>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'column' }}>
            <Text style={styles.username}> Olá, {auth.currentUser?.email}</Text>
            <Text style={styles.textoPadrao}> Última transação:</Text>
            <Text style={styles.textoLogin}> 29/08/2022</Text>
          </View>
          <TouchableOpacity
            onPress={handleSignOut}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Sign Out</Text>
          </TouchableOpacity>
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
            <TouchableOpacity /*activeOpacity={0.1}*/>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity /*activeOpacity={0.1}*/>
              <Fontisto name="low-vision" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => {navigation.replace("CadastrarPropriedade")}}>
          <Image source={require('../pics/add.png')} style={styles.imageAdd}></Image>
        </TouchableOpacity>
        <Text >{dataTeste}</Text>
      </View>
    </View>

  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container_pai: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  container_filho: {
    backgroundColor: '#142a2d',
    paddingTop: statusBarHeight,
    flexDirection: 'row',
    paddingEnd: 16,
    paddingStart: 16,
    paddingBottom: 44,
  },
  content: { //area do user (nome e botão)
    flex: 1, // flex 1 pra pegar o tamanho inteiro da tela
    alignItems: 'center', // para alinhar verticalmente ao centro
    flexDirection: 'row', // para os elementos ficarem um ao lado do outro       
  },
  mainContainer: { //area do user (nome e botão)
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 400,  
  },
  button: {
    backgroundColor: '#0782F9',
    width: '20%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  content: { //area do user (nome e botão)
    flex: 1, // flex 1 pra pegar o tamanho inteiro da tela
    alignItems: 'center', // para alinhar verticalmente ao centro
    flexDirection: 'row', // para os elementos ficarem um ao lado do outro       
  },
  buttonUser: {
    width: 44,
    height: 44,
    //backgroundColor: '#85b39e',
    //background-image: URL("C:/Users/dayvi/Downloads/user.jpg"),
    justifyContent: 'center',
    //alignItems: 'center',
    borderRadius: 44 / 2, //elipse
    margin: 10,
  },
  username: {
    fontSize: 16,
    color: '#90bacb',
    fontWeight: 'bold'
  },
  textoPadrao: {
      paddingTop: 5,
      fontSize: 14,
      color: '#fff',
      //fontWeight: 'bold'
  },
  textoLogin: {
      fontSize: 13,
      color: '#a8bcbe',
      //fontWeight: 'bold'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    borderRadius: 44 / 2, //elipse
  },
  imageAdd: {
    width: 50,
    height:50
  }
})