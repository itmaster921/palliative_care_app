/**
 * @providesModule @text
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import { Text, StyleSheet } from "react-native";
import {Colors, FontSizes} from '@theme'

export default (props) => {

    const colors = {
        light: Colors.white,
        dark: Colors.textPrimary,
    }

    var style = {
        fontSize: FontSizes.smallMedium,
        color: colors.dark,
        textAlign: 'left'
    }

    var positions = ['left', 'center', 'right']

    Object.keys(props).forEach(propKey => {
        if (propKey in FontSizes){
            var fontSize = FontSizes[propKey];
            style.fontSize = fontSize;
        }else if (propKey in colors){
            var color = colors[propKey];
            style.color = color;
        }else if (positions.includes(propKey)){
            style.textAlign = propKey;
        }else if (propKey == 'bold'){
            style.fontWeight = '800';
        }else if (propKey == 'color'){
            style.color = props.color;
        }else{

        }
    });

    return (
        <Text style={[style, props.style]}>{props.children}</Text>
    )
}

const defaultStyles = StyleSheet.create({
});
