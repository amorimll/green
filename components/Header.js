import React from "react";
import {View, StyleSheet, StatusBar, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Feather} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../firebase'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;
const image = {uri: "https://upload.wikimedia.org/wikipedia/commons/d/d3/React_Native.png"};
import { Fontisto } from '@expo/vector-icons';

export default function Header({email}) {
    return(
        <View style={styles.container}>
            <View style={styles.content}>
                <TouchableOpacity /*activeOpacity={0.1}*/ style={styles.buttonUser}>
                    <ImageBackground source={{uri: 'https://scontent-gig2-1.xx.fbcdn.net/v/t39.30808-6/280370677_7447181435352331_1439375223080131899_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeG6rFJcmeoNtOQ8uMTWNfRpg-yXgJfy09yD7JeAl_LT3GaH8eeVKwf_WisnR9nzr0RNxOvwHPKfs7f9ngjNc_TQ&_nc_ohc=VxBgZKrIeLUAX8xF-zj&_nc_ht=scontent-gig2-1.xx&oh=00_AT_ZY_8A_GZg3ROH4FPJITb1iDKQqA3wEZxv6alCv69F1g&oe=6311A542'}}  /*resizeMode="cover"*/ style={styles.image} imageStyle={{ borderRadius: 44 / 2}}></ImageBackground>
                </TouchableOpacity>
                <View style={{flex: 1, flexDirection: 'column'}}>
                    <Text style={styles.textoPadrao}> Última transação:</Text>
                </View>
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'flex-end'}}>
                    <Ionicons name="notifications-outline" size={24} color="white" />
                    <Fontisto name="low-vision" size={24} color="white" />
                </View>
                
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create(
    {
        container: {
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
        image: {
          flex: 1,
          justifyContent: "center",
          borderRadius: 44 / 2, //elipse
        },
    }
)