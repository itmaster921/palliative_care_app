import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors, FontSizes, Metrics, MediaQueries} from '@theme';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";
import { MediaQueryStyleSheet } from "react-native-responsive";


export default MediaQueryStyleSheet.create({

    container: {
        flex: 1, 
    },

    scrollView: {
        flexGrow: 1, 
        paddingHorizontal: deviceWidth(8),
        paddingVertical: deviceWidth(2),
    },

    titleView: {
        marginBottom: deviceWidth(2),
    },

    title: {
        marginVertical: deviceWidth(2),
        fontWeight: '300',
    },

    flatList: {
        width: '100%',
        padding: deviceWidth(1)
    },

    importantBar: {
        width: '100%',
        padding: deviceWidth(1.5),
        backgroundColor: Colors.Red,
        flexDirection: 'row',     
        alignItems: 'center'   
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
    },

    question: {
        marginHorizontal: 8,
        flex: 1,
    },
    
    levelContainer: {
        marginBottom: deviceWidth(2),
    },

    levelIcon: {
        width: deviceHeight(2.2),
        height: deviceHeight(2.2),
        marginRight: 4,
        tintColor: Colors.white,
    },

    itemLevelIcon: {
        width: deviceHeight(2.4),
        height: deviceHeight(2.4),
        marginLeft: 12,
    },

    dragIcon: {
        width: deviceHeight(0.6), 
        height: deviceHeight(2.0), 
        marginRight: 4,
        tintColor: Colors.lightGray
    },

    starIcon: { 
        width: deviceHeight(2.2), 
        height: deviceHeight(2.2), 
        marginHorizontal: 8, 
    }, 

    progress: {
        marginVertical: 30,
    },

    progressBar: {
        marginHorizontal: 50,
        marginVertical: 10,
    },

    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E6E0D4',
        paddingHorizontal: deviceWidth(10),
    },

    dropLevelBar: {
        position: 'absolute',
        bottom: deviceWidth(10),
        marginHorizontal: deviceWidth(8),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    dropLevelItem: {
        backgroundColor: Colors.Blue,
        marginHorizontal: deviceWidth(1),
        alignItems: 'center',
        padding: deviceWidth(2),
        flex: 1,
    },

    dropLevelIcon: {
        width: deviceHeight(3),
        height: deviceHeight(3),
        marginHorizontal: deviceWidth(1),
        tintColor: Colors.Navy
    },

    saveView: {
        backgroundColor: '#fff',
        borderRadius: deviceWidth(1.2),
        shadowColor: '#000',
        shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
        shadowOpacity: 0.4,
        shadowRadius: 0,
        padding: deviceWidth(1),
        marginVertical: deviceWidth(1.2),
    },

    saveTitle: {
        marginVertical: 8,
        fontWeight: '300'
    },

    draggingItem: {
        position: 'absolute',
        backgroundColor: Colors.backgroundSecondary,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        paddingRight: 0,
        zIndex: 9999,
    },

    veryImportantTitle: {
        flexDirection: 'row',
        alignItems: 'center'
    }    
}, {
    [MediaQueries.iPad] : {
        veryImportantTitle: {
            flexDirection: 'row',
            alignItems: 'center'
        }    
    },
    [MediaQueries.iPhone] : {
        veryImportantTitle: {
            flexDirection: 'column',
            alignItems: 'flex-start'
        },
        dropLevelBar: { 
            marginHorizontal: deviceWidth(4), 
        }
    }
});
