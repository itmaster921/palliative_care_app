/**
 * @providesModule @progressbar
 */

import PropTypes from "prop-types";
import React, {Component} from 'react';
import {View, StyleSheet } from "react-native";
import {Colors, FontSizes} from '@theme'
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from "@ResponsiveDimensions";

export default (props) => {
    const {total, progress, style} = props

    var items = []
    var containerStyle = {}
    var itemStyle = {}
    if(total > 5) {
        containerStyle.borderWidth = 1;
        itemStyle.borderWidth = 0;
        itemStyle.margin = 0;
    }
    for(let i = 0; i < total; i++){
        if(i < progress){
            items.push(
                <View key={i} style={[defaultStyles.item, itemStyle, {backgroundColor: Colors.Olive}]}/>
            )
        }else{
            items.push(
                <View key={i} style={[defaultStyles.item, itemStyle]}/>
            )    
        }
    }

    return (
        <View style={[defaultStyles.container, containerStyle, style]}>
            {items}
        </View>
    )
}

const defaultStyles = StyleSheet.create({
    container: {
        borderColor: Colors.Olive,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        borderWidth: 1,
        borderColor: Colors.Olive,
        height: deviceWidth(1),
        margin: 1,
        flex: 1,
    }
});
