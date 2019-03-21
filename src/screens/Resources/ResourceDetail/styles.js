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
        textAlign: 'center',
        marginTop:deviceWidth(2),
    },
    middleimage: {
        height:deviceHeight(35),
        width:deviceWidth(60)
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
        paddingHorizontal:deviceWidth(5),
        paddingVertical:deviceWidth(3),
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonBar: {
        backgroundColor:Colors.Sand,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: deviceWidth(1),
        paddingHorizontal: deviceWidth(14),
        alignItems: 'center',
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
        justifyContent: 'center',
        alignItems: 'center',
    },

}, 
{
    [MediaQueries.iPad] : {
        scroll: {
            paddingVertical:deviceWidth(3),
            paddingHorizontal: deviceWidth(13),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(14),            
        },
        titleView: {
            borderTopWidth: deviceWidth(0.5),
        },
    },
    [MediaQueries.iPhone] : {
        scroll: {
            paddingVertical:deviceWidth(2),
            paddingHorizontal: deviceWidth(2),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(3),            
        },
         titleView: {
            borderTopWidth: deviceWidth(1.2),
        },
    }
});
