import React, { Component } from 'react';
import { StyleSheet, View, Animated, Easing } from 'react-native';
import { Colors, Images } from '@theme';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';

class Spinner extends Component {
	constructor(props) {
		super(props);
		this.spinValue = new Animated.Value(0);
	}

	componentDidMount() {
		this.spin();
	}

	spin() {
		this.spinValue.setValue(0);
		Animated.timing(this.spinValue, {
			toValue: 4,
			duration: 4000,
			easing: Easing.linear,
			useNativeDriver: true
		}).start(() => {
			if (!this.props.loading) this.spin();
		});
	}

	render() {
		const { loading, size, style, ...attributes } = this.props;

		const spin = this.spinValue.interpolate({
			inputRange: [ 0, 1 ],
			outputRange: [ '0deg', '360deg' ]
		});
		return (
			<View style={[ styles.wrapper, style ]} {...attributes}>
				{loading && (
					<Animated.Image
						style={{
							width: size,
							height: size,
							transform: [ { rotate: spin } ]
						}}
						source={Images.icon_loader}
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: {}
});

export default Spinner;
