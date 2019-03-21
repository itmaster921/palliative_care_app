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
        
        alignSelf: 'center',
    },
    title: {
        color: Colors.Navy,
        fontWeight:"200",
    },
    subtitle: {
        color: Colors.textSecondary,
        textAlign: 'left',
        marginVertical:width/50,
    },
    middleimage: {
        height:height/5,
        width:width/4.5,
        alignSelf: 'center',
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
        marginTop : width/35, 
        marginBottom: width/35,
        paddingVertical:height/60,
        paddingHorizontal:width/20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBar: {
        backgroundColor:Colors.Sand,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: deviceWidth(1),
        paddingHorizontal: deviceWidth(10),
        alignItems: 'center',
    },
    buttonBack:{
        height:height/22,
        width:width/6,
        paddingHorizontal:width/90
    },
    itemView: {
        flex:1,
        backgroundColor: Colors.backgroundPrimary,
        borderRadius: deviceWidth(1.2),
        shadowColor: '#000',
        shadowOffset: { width: deviceWidth(1.2), height: deviceWidth(1.2) },
        shadowOpacity: 0.5,
        shadowRadius: 0,
        paddingHorizontal:deviceWidth(5),
        paddingVertical:deviceWidth(3),
        marginBottom : width/35, 
        justifyContent: 'center',
        // alignItems: 'center',
    },
},
{
    [MediaQueries.iPad] : {
        scroll: {
            paddingHorizontal: deviceWidth(13),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(14),            
        },
        titleView: {
            marginTop : width/25, 
        },
        middleimage: {
            height:height/7,
            width:width/2,
        },
    },
    [MediaQueries.iPhone] : {
        scroll: {
            paddingHorizontal: deviceWidth(2),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(4),            
        },
        titleView: {
            marginTop : width/35, 
        },
        middleimage: {
            height:height/7.5,
            width:width/4,
        },
    }
});
