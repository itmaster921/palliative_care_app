/**
 * @providesModule @imagebutton
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import { TouchableOpacity, StyleSheet, Image } from "react-native";
import {Colors, FontSizes} from '@theme'
import Text from '@text'

export default (props) => {
    const {onPress, circle, backgroundColor, ...imageProps} = props;
    let wrapperStyle = {};
    if(circle){
        wrapperStyle.borderRadius = circle;
    }
    if(backgroundColor){
        wrapperStyle.backgroundColor = backgroundColor;
    }
    
    return(
        <TouchableOpacity onPress={onPress} style={wrapperStyle}>
            <Image {...imageProps}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

});
