import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Dimensions,
} from 'react-native';

import {Colors} from '@theme';

export default {

    container: {
        flex: 1, 
        backgroundColor: Colors.backgroundPrimary,
    },
    scroll:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    scrollcontainer:{
        flex : 1,
    },
    title: {
        color: Colors.textPrimary,
    },
    viewBody:{
        alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemTop: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        marginBottom: 8,    
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemBottom: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        margin: 8,     
        justifyContent: 'center',
        alignItems: 'center',
        flex : 1
    },
    buttonView:{
        flexDirection : 'row',
    },
    button: {       
        backgroundColor : Colors.buttonPrimary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },
    buttonText: {       
        marginTop : 2
    },
    buttonMiddle: {       
        backgroundColor : Colors.borderSecondary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },
    listitemBottomView: {
        flexDirection : 'row',
        flex : 1,
    },
    buttonleft: {       
        backgroundColor : Colors.buttonPrimary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },
    buttonright: {       
        backgroundColor : Colors.borderSecondary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },
    contactText: {       
        marginTop : 2
    },
    contactView: {       
        flexDirection : 'row',
        flex:1,
        padding : 10
    },
    

};
