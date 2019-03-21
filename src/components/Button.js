/**
 * @providesModule @button
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet } from "react-native";
import {Colors, FontSizes} from '@theme'
import Text from '@text'
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { deviceWidth, deviceHeight, windowHeight } from "@ResponsiveDimensions";

export default (props) => {
    const {buttonStyles, textStyles, children, onPress} = props;

    var textProps = {}

    var buttonStyle = {
        paddingVertical: deviceWidth(1),
        paddingHorizontal: deviceWidth(2),
        margin: deviceWidth(1),
        justifyContent: 'center',
        alignItems: 'center',
    }

    var textStyle = {}

    var color = (props.color) ? props.color : Colors.Navy

    Object.keys(props).forEach(propKey => {
        if (propKey in FontSizes){
            textProps[propKey] = true
        }else if (propKey == 'light'){
            buttonStyle.borderWidth = 2;
            buttonStyle.borderColor = color;
            textStyle.color=color
        }else if (propKey == 'dark'){
            buttonStyle.backgroundColor = color;
            textStyle.color=Colors.white
        }else if (propKey == 'bold'){
            textProps.bold = true;
        }else{

        }
    });

    return(
        <TouchableOpacity style={[buttonStyle, buttonStyles]} onPress={onPress}>
            <Text {...textProps} style={[textStyle, textStyles]}>{children}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

});
