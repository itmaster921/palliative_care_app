/**
 * @providesModule @choice
 */

import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import {Colors, MediaQueries, FontSizes} from '@theme';
import Button from '@button'
import Text from '@text'
import { MediaQueryStyleSheet } from "react-native-responsive";
import { deviceWidth, deviceHeight } from "@ResponsiveDimensions";
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Choice extends Component {
    render() {
        const {selected} = this.props

        var style = {}
        if(selected){
            style.backgroundColor = Colors.backgroundSecondary
        }
        
        return (
            <View style={style}>
            {this.props.disabled?
                <View style={styles.container}>
                    <Text smallMedium style={styles.text}>{this.props.text}</Text>            
                </View>
                :
                this.props.selected?
                    <View style={styles.container}>
                        <Icon name={'check'} color={Colors.Navy} style={styles.icon} size={20}/>
                        <Text smallMedium style={styles.text}>{this.props.text}</Text>
                        <Button small light bold color={Colors.Red} 
                            buttonStyles={{width: deviceHeight(8), paddingHorizontal: 0}} 
                            onPress={()=>{this.props.onPress(this.props.index)}}>
                            Remove
                        </Button>
                    </View>
                    :
                    <View style={styles.container}>
                        <Text smallMedium style={styles.text}>{this.props.text}</Text>            
                        <Button small light bold color={Colors.Navy} 
                            buttonStyles={{width: deviceHeight(8), paddingHorizontal: 0}} 
                            onPress={()=>{this.props.onPress(this.props.index)}}>
                            Select
                        </Button>
                    </View>
            }
            </View>    
        )
    }
}

const styles = MediaQueryStyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: deviceWidth(1),
        minHeight: FontSizes.smallMedium + deviceWidth(5),
    },

    icon: {
        marginRight: deviceWidth(1),
    },

    text: {
        flex: 1,
    },

    button: {

    }
}, {
    [MediaQueries.iPhone] : {
        container: {
            padding: deviceWidth(1),
            minHeight: FontSizes.smallMedium + deviceWidth(7),
        }
    }
});