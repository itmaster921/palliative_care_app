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
        flexGrow: 1,
    },
    title: {
        color: Colors.Navy,
        fontWeight:"200"
    },
    subtitle: {
        color: Colors.textSecondary,
        textAlign: 'center',
        marginTop:2,
        fontWeight:"200"
    },
    viewImage:{
        alignItems: 'center',
        marginVertical: height/30,
    },
    middleimage: {
        height:height/3,
        width:width/1.5
    },
    viewBody:{
        paddingHorizontal:deviceWidth(4),
        paddingVertical:deviceWidth(2),
        alignItems: 'center'
    },
    faqItem: {
        marginVertical: height/40,
    },
    itemTitle: {
        padding: 16,
        flexDirection: 'row',
        backgroundColor: Colors.backgroundSecondary,
    },
    txtQuestion: {
        fontSize: width/30,
    },
    txtAnswer: {
        fontSize: width/30,
        padding : 16, 
        borderWidth: 1.5,
        borderColor: Colors.backgroundSecondary,
    },
    faqTitle: {
        marginHorizontal : width/10,
    },
    flatList: {
        marginHorizontal : width/10,
    },
    imageView:{
        width: width,
        height: height-responsiveHeight(15), 
    },
    titleView: {
        margin: deviceWidth(1.2), 
        marginBottom: deviceWidth(2),
    },
    title_content: {
        paddingVertical: deviceWidth(2),
    },
    item: {
         margin: deviceWidth(1.2), 
    },
    item_content: {
        alignItems: 'center',
        justifyContent: 'space-between', 
        paddingVertical: deviceWidth(2),
    },
    buttonBar: {
        backgroundColor:Colors.Sand,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: deviceWidth(0.5),
        paddingHorizontal: deviceWidth(10),
        alignItems: 'center',
    },
},
{
    [MediaQueries.iPad] : {
        scroll: {
            paddingVertical:deviceWidth(3),
             paddingHorizontal: deviceWidth(8.8),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(9.8),            
        },
    },
    [MediaQueries.iPhone] : {
        scroll: {
            paddingVertical:deviceWidth(2),
            paddingHorizontal: deviceWidth(2.8),
        },
        buttonBar: {
            paddingHorizontal: deviceWidth(3.8),            
        }, 
    }
});
