import { useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, TouchableOpacity, View, StatusBar, ImageBackground, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { Fontisto } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons';
import { getTeste } from '../api/index.js'
import { useFonts, Inter_700Bold, Inter_400Regular, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { Lato_700Bold, Lato_400Regular } from '@expo-google-fonts/lato';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const HomeScreen = () => {
  const anonImage = require('../pics/anonImage4.png')

  let [fontsLoaded] = useFonts({
    Lato_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Lato_700Bold,
    Inter_400Regular
  });

  const navigation = useNavigation()
  const [imagem, setImagem] = useState()

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

  if (!fontsLoaded) {
    return null;
  }
  return (
    <View style={styles.body} >
      <View style={styles.header}>
        <View style={styles.headerSub}>
          <View style={styles.headerSubImagem}>{<Image source={imagem ? imagem : anonImage} style={styles.imagemStyle} />}</View>
          <Text style={styles.headerSubText}>Olá, <Text style={styles.headerSubTextBold}>{auth.currentUser?.email}.</Text></Text>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.contentSub}>
          <View style={styles.contentSubSaldo}>
            <Text style={styles.contentSubSaldoText}>Conta</Text>
            <Text style={styles.contentSubSaldoDinheiro}>R$ 1000</Text>
          </View>
          <View style={styles.contentSubRendimento}>
            <Text style={styles.contentSubSaldoText}>Rendimento</Text>
            <Text style={styles.contentSubSaldoDinheiro}>R$ 256/mês</Text>
          </View>
        </View>
        <View style={styles.contentSubCards}>
          <View style={styles.contentSubCardsImagem}>
            <View style={styles.headerSubImagem}>{<Image source={imagem ? imagem : anonImage} style={styles.imagemStyle} />}</View>
          </View>
          <View style={styles.contentSubCardsContent}>
            <View style={styles.contentSubCardsConteudo}>
              <Text style={styles.contentSubCardsConteudoTexto}>Propriedade 1</Text>
              <Text style={styles.contentSubCardsConteudoTexto}>Vasta terra com cerca de 600 árvores.</Text>
            </View>
            <View style={styles.contentSubCardsRendimento}>
              <Text style={styles.contentSubCardsRendimentoTexto}>R$ 172/mês</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentSubCards}>
          <View style={styles.contentSubCardsImagem}>
            <View style={styles.headerSubImagem}>{<Image source={imagem ? imagem : anonImage} style={styles.imagemStyle} />}</View>
          </View>
          <View style={styles.contentSubCardsContent}>
            <View style={styles.contentSubCardsConteudo}>
              <Text style={styles.contentSubCardsConteudoTexto}>Propriedade 2</Text>
              <Text style={styles.contentSubCardsConteudoTexto}>Espaço agrário com foco em plantações.</Text>
            </View>
            <View style={styles.contentSubCardsRendimento}>
              <Text style={styles.contentSubCardsRendimentoTexto}>R$ 84/mês</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={handleSignOut} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => { navigation.replace("CadastrarPropriedade") }}>
          <Image source={require('../pics/add.png')} style={styles.imageAdd}></Image>
        </TouchableOpacity> 
      </View>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  headerSubText: {
    fontFamily: 'Inter_400Regular',
    marginTop: 30,
    fontWeight: '500',
    fontSize: 17,
  },
  headerSubTextBold: {
    fontFamily: 'Inter_700Bold'
  },
  headerSubImagem: {
    width: 55,
    height: 55,
    backgroundColor: '#C9C9C9',
    opacity: 0.75,
    borderRadius: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  imagemStyle: {
    width: 40,
    height: 40,
  },
  body: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  header: {
    backgroundColor: '#0CE177',
    paddingTop: statusBarHeight,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  headerSub: {
    width: '85%',
    height: 125,
  },
  content: { //area do user (nome e botão)
    width: '85%',
  },
  contentSub: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  contentSubCards: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: '10%',
    backgroundColor: 'red',
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 2,
  },
  contentSubCardsContent: {
    display: 'flex',
  },
  contentSubCardsImagem: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    width: 125,
    backgroundColor: '#0CE177',
    borderBottomLeftRadius: 15,
    borderTopLeftRadius: 15
  },
  contentSubCardsConteudo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
    padding: 12,
    width: 225,
    height: 90,
    borderTopRightRadius: 15
  },
  contentSubCardsConteudoTexto: {
    fontFamily: 'Inter_400Regular',
    fontSize: 16
  },
  contentSubCardsRendimento: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#16F385',
    width: 225,
    height: 60,
    borderBottomRightRadius: 15,
  },
  contentSubCardsRendimentoTexto: {
    fontFamily: 'Lato_700Bold',
    fontSize: 19
  },
  contentSubSaldo: {
    width: '45%',
    height: '100%',
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1.5,
  },
  contentSubRendimento: {
    width: '45%',
    height: '100%',
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#F5F5F5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 1.5,
  },
  contentSubSaldoText: {
    fontFamily: 'Inter_400Regular',
    fontWeight: '400',
    fontSize: 15,
    marginBottom: 10,
  },
  contentSubSaldoDinheiro: {
    fontFamily: 'Inter_600SemiBold',
    fontSize: 18
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
    height: 50,
  }
})

  //         < View style = { styles.content } >
  //         <TouchableOpacity /*activeOpacity={0.1}*/ style={styles.buttonUser}>
  //           <ImageBackground source={{ uri: 'https://scontent-gig2-1.xx.fbcdn.net/v/t39.30808-6/280370677_7447181435352331_1439375223080131899_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG6rFJcmeoNtOQ8uMTWNfRpg-yXgJfy09yD7JeAl_LT3GaH8eeVKwf_WisnR9nzr0RNxOvwHPKfs7f9ngjNc_TQ&_nc_ohc=VxBgZKrIeLUAX8xF-zj&_nc_ht=scontent-gig2-1.xx&oh=00_AT_ZY_8A_GZg3ROH4FPJITb1iDKQqA3wEZxv6alCv69F1g&oe=6311A542' }}  /*resizeMode="cover"*/ style={styles.image} imageStyle={{ borderRadius: 44 / 2 }}></ImageBackground>
  //         </TouchableOpacity>
  //         <View style={{ flex: 1, flexDirection: 'column' }}>
  //           <Text style={styles.username}> Olá, {auth.currentUser?.email}</Text>
  //           <Text style={styles.textoPadrao}> Última transação:</Text>
  //           <Text style={styles.textoLogin}> 29/08/2022</Text>
  //         </View>

  //         <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-end' }}>
  //           <TouchableOpacity /*activeOpacity={0.1}*/>
  //             <Ionicons name="notifications-outline" size={24} color="white" />
  //           </TouchableOpacity>
  //           <TouchableOpacity /*activeOpacity={0.1}*/>
  //             <Fontisto name="low-vision" size={24} color="white" />
  //           </TouchableOpacity>
  //         </View>
  //       </View >