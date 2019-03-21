import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import { MediaQueries } from '@theme'
import { MediaQueryStyleSheet } from "react-native-responsive";
import { deviceWidth, deviceHeight, windowHeight } from "@ResponsiveDimensions";
import { FontSizes } from '../../theme';

export default MediaQueryStyleSheet.create({
    backgroundImage: {
        flex: 1,
    },

    scrollView: {
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    circle_above: {
        position: 'absolute',
        width: deviceWidth(30),
        height: deviceWidth(30),
        borderRadius: deviceWidth(15),
        backgroundColor: '#fffd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        margin: deviceWidth(5),
        top: 0,
        right: 0,
    },

    pca_logo: {
        width: deviceWidth(23),
        height: deviceWidth(23),
        resizeMode: 'contain',
    },

    center_view: {
        alignItems: 'center',

    },

    app_name: {
        color: '#fff',
        fontSize: FontSizes.large,
        fontWeight: 'bold',
        margin: deviceWidth(1),
    },

    spinner: {
        marginVertical: deviceWidth(2),
    },

    circle_center: {
        width: deviceWidth(18),
        height: deviceWidth(18),
        borderRadius: deviceWidth(9),
        backgroundColor: '#fffd',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 10,
        margin: deviceWidth(2),
    },

    bottom_view: {
        position: 'absolute',
        bottom: 40,
    },

    text_desc: {
        color: '#fff',
        fontSize: FontSizes.medium,
        fontWeight: 'bold',
        textAlign: 'center',
        width: deviceWidth(50),
        margin: deviceWidth(1),
    },

    text_website: {
        color: '#fff',
        fontSize: FontSizes.medium,
        fontWeight: 'bold',
        textAlign: 'center',
    }
}, {
    [MediaQueries.iPad] : {
        circle_above: {
        },
        circle_bellow: {
        },
        pca_logo: {
        },
    },
})