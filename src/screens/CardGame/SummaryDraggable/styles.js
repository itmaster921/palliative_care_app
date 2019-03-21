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

    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
        paddingHorizontal: deviceWidth(8),
    },

    title: {
        marginVertical: deviceWidth(2),
    },

    importantBar: {
        flexDirection: 'row',     
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: deviceWidth(5),
        marginBottom: deviceWidth(1),
    },

    row: {
        flexDirection: 'row',     
        alignItems: 'center',
    },

    cardItemWithStar: {
        flexDirection: 'row',
        marginVertical: 4,
        alignItems: 'center',
    },

    cardItem: {
        backgroundColor: Colors.backgroundSecondary,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        padding: deviceWidth(1),
        paddingRight: 0,
        marginRight: deviceWidth(1),
    },

    question: {
        marginHorizontal: deviceWidth(1),
        flex: 1,
    },
    
    levelContainer: {
        marginBottom: deviceWidth(5),
    },

    levelIcon: {
        width: deviceHeight(2.4),
        height: deviceHeight(2.4),
        marginRight: 4,
        tintColor: Colors.textPrimary
    },

    dragIcon: {
        width: deviceHeight(1),
        height: deviceHeight(3),
        marginRight: 4,
        tintColor: Colors.textPrimary
    },

    progress: {
        marginVertical: deviceWidth(4),
    },

    progressBar: {
        marginHorizontal: deviceWidth(6.6),
        marginVertical: deviceWidth(1.2),
    },

    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: deviceWidth(2),
    },

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
