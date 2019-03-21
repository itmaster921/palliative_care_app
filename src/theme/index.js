/**
 * @providesModule @theme
 */
import React, { Component } from "react";
import Colors from './colors';
import Images from './images';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { deviceWidth, deviceHeight } from '../components/ResponsiveDimensions';

console.log(Dimensions.get('window'));

const FontSizes = {
	small: deviceHeight(1.4), //14
	smallMedium: deviceHeight(1.8), //18
	medium: deviceHeight(2.4), //24
	mediumLarge: deviceHeight(3.6), //36
	large: deviceHeight(4.8) //48
};

const Metrics = {
	shadowOffset: deviceWidth(0.8)
};

const MediaQueries = {
	iPad: '@media (min-device-width: 768)',
	iPhone: '@media (max-device-width: 767)'
};

const htmlStyles = {
	p: {
		color: Colors.textPrimary,
		fontSize: FontSizes.smallMedium,
		marginBottom: FontSizes.smallMedium
	},
	a: {
		fontSize: FontSizes.smallMedium
	},
	ul: {
		color: Colors.textPrimary,
		fontSize: FontSizes.smallMedium
	},
	ol: {
		color: Colors.textPrimary,
		fontSize: FontSizes.smallMedium
	},
	strong: {
		fontWeight: '800'
	},
	b: {
		fontWeight: '800'
	},
	em: {
		fontStyle: 'italic'
	},
	i: {
		fontStyle: 'italic'
	}
};

function ul(htmlAttribs, children, convertedCSSStyles, passProps = {}) {
	const {
		rawChildren,
		nodeIndex,
		key,
		baseFontStyle,
		listsPrefixesRenderers,
		parentTag
	} = passProps;

	const baseFontSize = baseFontStyle.fontSize || 14;

	if (parentTag != "li") {
		var style = {
			marginLeft: 10,
			marginTop: -10
		};
	}
  
	children =
		children &&
		children.map((child, index) => {
			const rawChild = rawChildren[index];
			let prefix = false;
			const rendererArgs = [
				htmlAttribs,
				children,
				convertedCSSStyles,
				{
					...passProps,
					index
				}
			];
	
			if (rawChild) {
				if (rawChild.parentTag === "ul") {
					prefix =
					listsPrefixesRenderers && listsPrefixesRenderers.ul ? (
						listsPrefixesRenderers.ul(...rendererArgs)
					) : (
						<View
							style={{
								marginRight: 10,
								width: baseFontSize / 2.8,
								height: baseFontSize / 2.8,
								marginTop: baseFontSize / 2,
								borderRadius: baseFontSize / 2.8,
								backgroundColor: "black"
							}}
						/>
					);
				} else if (rawChild.parentTag === "ol") {
					prefix =
					listsPrefixesRenderers && listsPrefixesRenderers.ol ? (
						listsPrefixesRenderers.ol(...rendererArgs)
					) : (
						<Text style={{ marginRight: 5, fontSize: baseFontSize }}>
							{index + 1})
						</Text>
					);
				}
			}
			return (
			<View
				key={`list-${nodeIndex}-${index}-${key}`}
				style={{ flexDirection: "row", marginTop: 10 }}
			>
				{prefix}
				<View style={{ flex: 1 }}>{child}</View>
			</View>
			);
		});
	return (
		<View style={style} key={key}>
			{children}
		</View>
	);
}
  
const htmlRenderers = {
	ul: ul,
	ol: ul
};
  
export { Colors, Images, FontSizes, MediaQueries, Metrics, htmlStyles, htmlRenderers };
