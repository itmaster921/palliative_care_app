import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors, MediaQueries} from '@theme';

const { width,height } = Dimensions.get('window');
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MediaQueryStyleSheet } from "react-native-responsive";


export default MediaQueryStyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
    },
    scroll:{
        paddingHorizontal: responsiveWidth(8.8),
    },
    title: {
        color: Colors.Navy,
        fontWeight:"200"
    },
    cardtitle: {
        fontWeight: '300',
        color: Colors.Navy,
        margin: 8,
        textAlign:'center'
    },
    cardView:{
        flexDirection:'row',
        alignItems:'center'
    },
    subtitle: {
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop:2,
        fontWeight:"200"
    },
    firstrowItem: {
       flex: 1,
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: responsiveWidth(1.2),
        borderTopWidth: responsiveWidth(1.2),
        borderTopColor: Colors.Navy,
        margin: width/60,   
        paddingVertical:height/30,
        shadowColor: '#000',
        shadowOffset: { width: responsiveWidth(1.2), height: responsiveWidth(1.2) },
        shadowOpacity: 0.5,
        shadowRadius: 0,
    },
    titleView: {
        backgroundColor: Colors.backgroundSecondary,
        borderTopColor: Colors.Navy,
        borderRadius: responsiveWidth(1.2),
        borderTopWidth: responsiveWidth(1.2),
        shadowColor: '#000',
        shadowOffset: { width: responsiveWidth(1.2), height: responsiveWidth(1.2) },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        marginBottom: width/50,
        marginTop : width/35, 
        marginHorizontal:width/60,   
        paddingVertical:height/45,
        paddingHorizontal:width/20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        width: width/11,
        height: height/5,
        resizeMode: 'contain', 
        tintColor: Colors.Navy,
    },
    buttonBackView:{
        backgroundColor:Colors.Sand,
        height:height/16,
        justifyContent:'center',
        paddingHorizontal:width/10,

    },
    buttonBack:{
        height:height/22,
        width:width/6,
        paddingHorizontal:width/90
    },
}, {
    [MediaQueries.iPad] : {
        item: {
            flex: 1,
            backgroundColor: Colors.backgroundSecondary,
            borderRadius: 8,
            shadowColor: '#000',
            shadowOffset: { width: responsiveWidth(1.2), height: responsiveWidth(1.2) },
            shadowOpacity: 0.5,
            shadowRadius: 0,
            margin: width/60,   
            paddingVertical:height/80,  
            justifyContent: 'center',
            alignItems: 'center',
        },
        firstrowItem: {
            flex: 1,
            backgroundColor: Colors.backgroundSecondary,
            borderRadius: responsiveWidth(1.2),
            borderTopWidth: responsiveWidth(1.2),
            borderTopColor: Colors.Navy,
            margin: width/60,   
            paddingVertical:height/30,
            shadowColor: '#000',
            shadowOffset: { width: responsiveWidth(1.2), height: responsiveWidth(1.2) },
            shadowOpacity: 0.5,
            shadowRadius: 0,
            justifyContent: 'center',
            alignItems: 'center',
        }
    }
});
