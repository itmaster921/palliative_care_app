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
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";


export default MediaQueryStyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
    },
    scroll:{
        paddingHorizontal: width/50,
        paddingVertical:height/60
    },
    title: {
        color: Colors.Navy,
        fontWeight:"200"
    },
    cardtitle: {
        color: Colors.Navy,
        margin: deviceWidth(1),
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
        fontWeight:"100"
    },
    item: {
        flex: 0.5,
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: deviceWidth(1.2),
        shadowColor: '#000',
        shadowOffset: { width: deviceWidth(1.2), height: deviceWidth(1.2) },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        marginBottom: deviceWidth(3), 
        marginHorizontal:deviceWidth(1.5),   
        paddingVertical:deviceWidth(2), 
        alignItems:'center',
        justifyContent: 'center',
    },
    titleView: {
        backgroundColor: Colors.backgroundPrimary,
        borderTopColor: Colors.Navy,
        borderRadius: deviceWidth(1.2),
        borderTopWidth: deviceWidth(0.5),
        shadowColor: '#000',
        shadowOffset: { width: deviceWidth(1.2), height: deviceWidth(1.2) },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        marginBottom: deviceWidth(3), 
        marginHorizontal:deviceWidth(1.5),
        paddingHorizontal:deviceWidth(5),
        paddingVertical:deviceWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        width: width/6,
        height: height/9,
        resizeMode: 'contain', 
        tintColor: Colors.Red,
    }
}, 
{
    [MediaQueries.iPad] : {
        scroll: {
            paddingVertical:deviceWidth(3),
            paddingHorizontal: deviceWidth(12),
        },
        titleView: {
            borderTopWidth: deviceWidth(0.5),
        },
    },
    [MediaQueries.iPhone] : {
        scroll: {
            paddingVertical:deviceWidth(2),
            paddingHorizontal: deviceWidth(1),
        },
        titleView: {
            borderTopWidth: deviceWidth(1.2),
        },
    }
});
