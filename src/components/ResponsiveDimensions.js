/**
 * @providesModule @ResponsiveDimensions
 */

import {
    Dimensions
} from 'react-native';

const {height, width} = Dimensions.get('window');
const _deviceWidth = Math.min(width, height)
const _deviceHeight = Math.max(width, height)

const deviceWidth = (w) => {
    return _deviceWidth*(w/100);
}

const deviceHeight = (h) => {
    return _deviceHeight*(h/100);
}

const windowWidth = (w) => {
    return width*(w/100);
}

const windowHeight = (h) => {
    return height*(h/100);
}

export {deviceWidth, deviceHeight, windowWidth, windowHeight}