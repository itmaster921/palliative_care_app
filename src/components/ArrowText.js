/**
 * @providesModule @arrow-text
 */

import React, {Component} from 'react';
import { Image, View } from "react-native";
import Text from './Text';
import {Images} from '@theme';

export default (props) => {
    const {color} = props
    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text {...props} />
            <Image source={Images.arrow_blue} style={{height: '64%', resizeMode: 'contain', tintColor: color}}/>
        </View>    
    )
}
