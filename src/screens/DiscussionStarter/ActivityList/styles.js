import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors, MediaQueries, Metrics} from '@theme';

const { width } = Dimensions.get('window');
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MediaQueryStyleSheet } from "react-native-responsive";
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";

export default MediaQueryStyleSheet.create({

    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
    },

    scrollView: {
        flexGrow: 1,
        padding: deviceWidth(8.8),
    },

    introContainer: {
    },

    title: {
        color: Colors.Red,
        margin: 4,
        fontWeight: '300'
    },

    subtitle: {
        color: Colors.Navy,
        margin: 4,
        fontWeight: '300'
    },

    flatList: {
        // alignItems: 'center',
    },

    item: {
        flex: 1,
        height: width/3,
        margin: deviceWidth(1.2), 
    },

    item_content: {
        justifyContent: 'space-between', 
        paddingVertical: deviceWidth(4)
    },

    titleView: {
        margin: deviceWidth(1.2), 
        marginBottom: deviceWidth(2),
    },

    item_number_view: {
        width: deviceWidth(6),
        height: deviceWidth(6),
        backgroundColor: Colors.Navy,
        justifyContent: 'center',
        borderRadius: deviceWidth(3),
    },
    item_number: {
        color: Colors.Navy,
        fontWeight: '900'
    }, 
    item_text: {
        color: Colors.Navy,
        fontSize: 30,
        fontWeight: '300'
    },
    item_start_text: {
        color: Colors.Red,
    },

    buttonBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#E6E0D4',
        paddingHorizontal: deviceWidth(10),
    },


}, {
    [MediaQueries.iPhone] : {
        scrollView: {
            padding: deviceWidth(2.8),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(4),            
        },
        item: {
            height: null,
            marginVertical: deviceWidth(2),
        },
        item_content: {
            flexDirection: 'row',
            justifyContent: 'space-between', 
            paddingVertical: deviceWidth(4)
        },    
        item_text: {
            flex: 1,
            fontSize: 22,
            marginLeft: deviceWidth(2),
            textAlign: 'left',
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(5),            
        }
    }
});
