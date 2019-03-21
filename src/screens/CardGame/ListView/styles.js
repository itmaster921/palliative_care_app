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
        paddingHorizontal: deviceWidth(8),
    },

    titleView: {
        marginVertical: deviceWidth(3),
        marginHorizontal: deviceWidth(1),
    },

    title: {
        marginTop: deviceWidth(1),
        fontWeight: '300',
    },

    flatList: {
        paddingHorizontal: deviceWidth(1)
    },

    cardItem: {
        marginBottom: deviceWidth(2),
    },

    question: {
        fontWeight: '600',
        marginVertical: deviceWidth(2),
    },

    questionView: {
        backgroundColor: Colors.backgroundThird,
        height: windowHeight(15),
        justifyContent: 'center',
        flex: 1,
        padding: deviceWidth(1),
    },

    additionalInfo: {
        backgroundColor: Colors.backgroundThird,
        marginBottom: deviceWidth(2),
        padding: deviceWidth(1),
    },

    levelBar: {
        flexDirection: 'row',
    },

    levelItem: {
        flex: 1,
        backgroundColor: Colors.Blue,
        flexDirection: 'row',
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
        padding: deviceWidth(1),
    },

    levelIcon: {
        width: deviceHeight(2.3),
        height: deviceHeight(2.3),
        marginHorizontal: 4,
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
        paddingHorizontal: deviceWidth(8),
    },

    sound_btn: {
        position: 'absolute',
        top: deviceWidth(1),
        right: deviceWidth(1),
    },

    sound: {
        width: deviceHeight(2),
        height: deviceHeight(2)
    },

    info_btn: {
        position: 'absolute',
        top: deviceWidth(1),
        left: deviceWidth(1),
    },

    info_icon: {
        resizeMode: 'contain',
        width: deviceHeight(2),
        height: deviceHeight(2)
    }
}, {
    [MediaQueries.iPad] : {
        container: {
            paddingHorizontal: deviceWidth(8),
        }
    },
    [MediaQueries.iPhone] : {
        container: {
            paddingHorizontal: deviceWidth(4),
        }
    }
});
