import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors, MediaQueries} from '@theme';
import { MediaQueryStyleSheet } from "react-native-responsive";
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";

export default MediaQueryStyleSheet.create({
    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
    },

    introContainer: {
        flexGrow: 1, 
        // alignSelf: 'center'
    },

    title: {
        marginTop: deviceWidth(1),
        fontWeight: '300',
    },

    subtitle: {
        textAlign: 'center',
        margin: deviceWidth(1),
        fontWeight: '300',
    },

    icon: {
        width: deviceWidth(25),
        height: deviceWidth(40),
        resizeMode: 'contain',
    },

    intro: {
        margin: 10,
        textAlign: 'center',
    },

    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E6E0D4',
        paddingHorizontal: deviceWidth(10),
    },

    titleView: {
        marginVertical: deviceWidth(4),
    },

    descView: {
    }
}, {
    [MediaQueries.iPad] : {
        introContainer: {
            paddingHorizontal: deviceWidth(10),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(10),            
        }
    },
    [MediaQueries.iPhone] : {
        introContainer: {
            paddingHorizontal: deviceWidth(5),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(5),            
        }
    }
});