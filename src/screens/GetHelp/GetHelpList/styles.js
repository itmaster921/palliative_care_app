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
        flex:1,
        flexDirection:'row',
    },
    title: {
        color: Colors.textPrimary,
    },
    subtitle: {
        color: Colors.textPrimary,
        textAlign: 'center',
        marginTop:2,
    },
    item: {
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
    listitem: {
        backgroundColor: Colors.backgroundSecondary,
        borderRadius: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.5,
        shadowRadius: 2,
        margin: 8,      
        justifyContent: 'center',
    },
    listitemTopView: {
        flexDirection : 'row',
        flex : 1,
        padding : 16,
    },
    listitemBottomView: {
        flexDirection : 'row',
        flex : 1,
    },
    listTitle: {
        color: Colors.textPrimary,
        marginTop:2,
    },
    listDesc: {
        color: Colors.textPrimary,
        marginTop:2,
    },
    listTitleView: {
        flex:1
    },
    listButtonView:{
        flexDirection : 'row',
    },
    listButton: {       
        backgroundColor : Colors.buttonPrimary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },
    listButtonText: {       
        marginTop : 2
    },
    listButtonMiddle: {    
        backgroundColor : Colors.borderSecondary,
        alignItems:'center',
        justifyContent:'center',
        padding: 8,
    },

};
