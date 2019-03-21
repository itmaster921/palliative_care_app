/**
 * @providesModule @card
 */

import React from 'react';
import { TouchableOpacity, StyleSheet, View, } from "react-native";
import { deviceWidth } from "@ResponsiveDimensions";
import { Colors, Metrics } from '@theme';

export default (props) => {
    const {topbar, style, onPress, children, contentStyle, ...others} = props;

    var topbarStyle = topbar ? {
        height: topbar.height ? topbar.height : deviceWidth(1.2),
        backgroundColor: topbar.color ? topbar.color : Colors.Red
    } : {
        height: 0
    }

    const Wrapper = onPress ? TouchableOpacity : View

    return(
        <Wrapper style={[styles.shadow, style]} onPress={onPress}>
            <View style={styles.radius} >
                <View style={topbarStyle}/>
                <View style={[styles.children, contentStyle]}>
                    {children}
                </View>
            </View>
        </Wrapper>
    )
}

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
        shadowOpacity: 0.4,
        shadowRadius: 0,
    },

    radius: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: deviceWidth(1.2),
        overflow: 'hidden'
    },

    children: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },

    topbar: {
        height: deviceWidth(1.2),
        backgroundColor: Colors.Red
    }
});
