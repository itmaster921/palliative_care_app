import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors, FontSizes, MediaQueries} from '@theme';
import { MediaQueryStyleSheet } from "react-native-responsive";
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";

export default MediaQueryStyleSheet.create({
    background: {
        flex: 1,
    },

    container: {
        flexGrow: 1, 
        paddingHorizontal: deviceWidth(12),
    },

    titleView: {
        marginTop: deviceWidth(3),
    },

    title: {
        marginTop: deviceWidth(1),
        fontWeight: '300',
    },

    cardView: {
        minHeight: deviceWidth(40),
        marginVertical: deviceWidth(2),
    },

    question: {
        fontWeight: '800'
    },

    questionView: {
        marginVertical: deviceWidth(2),
        padding: deviceWidth(2),
        flex: 1,
        justifyContent: 'center'
    },

    additionalInfoWrapper: {
        width: '100%',
    },

    additionalInfoView: {
        minHeight: deviceWidth(8),
        backgroundColor: '#E6E0D4',
        paddingVertical: deviceWidth(1),
    },

    additionalInfo: {
    },

    howImportant: {
        marginVertical: deviceWidth(1),
    },

    triangle: {
        width: 0,
        height: 0,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderLeftWidth: deviceWidth(1),
        borderRightWidth: deviceWidth(1),
        borderBottomWidth: deviceWidth(2),
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: '#E6E0D4'
    },

    levelBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    levelItem: {
        backgroundColor: Colors.Blue,
        marginHorizontal: deviceWidth(1),
        alignItems: 'center',
        padding: deviceWidth(1),
        flex: 1,
    },

    levelIcon: {
        width: deviceWidth(3.2),
        height: deviceWidth(3.2),
        marginVertical: 4,
        tintColor: Colors.Navy
    },

    progress: {
        flex: 1,
        flexDirection: 'row',
        width: '75%',
        alignItems: 'center',
        marginVertical: deviceWidth(1),
    },

    progressBar: {
        flex: 1,
        marginVertical: deviceWidth(1.2),
    },

    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E6E0D4',
        paddingHorizontal: deviceWidth(10),
    },

    sound_btn: {
        position: 'absolute',
        top: deviceWidth(1),
        right: deviceWidth(1),
    },

    sound: {
        width: deviceHeight(2),
        height: deviceHeight(2)
    }

}, {
    [MediaQueries.iPad] : {
        container: {
            flexGrow: 1, 
            paddingHorizontal: deviceWidth(12),
        },
    },
    [MediaQueries.iPhone] : {
        container: {
            flexGrow: 1, 
            paddingHorizontal: deviceWidth(8),
        },
    }
});
