import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';

import { Colors, MediaQueries, FontSizes, Metrics } from '@theme';

import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { deviceWidth, deviceHeight, windowHeight } from '@ResponsiveDimensions';

export default MediaQueryStyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: Colors.backgroundPrimary,
			paddingHorizontal: 32
		},

		scrollView: {
			flexGrow: 1,
			flexDirection: 'row'
		},

		containerRight: {
			flex: 3
		},

		containerLeft: {
			flex: 5
		},

		item: {
			margin: 8,
			flex: 1
		},

		survey_item: {
			flex: 0.25
		},

		right_item_text: {
			fontSize: deviceHeight(2.7)
		},

		left_item_text: {},

		right_icon: {
			width: '60%',
			height: '60%',
			resizeMode: 'contain',
			marginVertical: 20
		},

		left_icon: {
			width: '60%',
			height: '60%',
			resizeMode: 'contain',
			marginVertical: 20
		},

		reduce_opacity: {
			opacity: 0.3
		},

		coming_soon: {
			position: 'absolute',
			top: '50%',
			left: '50%',
			transform: [ { translateY: -5 }, { translateX: -64 } ],
			width: 140,
			height: 30,
			lineHeight: 30,
			backgroundColor: Colors.Red,
			color: Colors.white,
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'center'
		}
	},
	{
		[MediaQueries.iPhone]: {
			scrollView: {
				flexDirection: 'column'
			},

			survey_item: {
				flex: 1
			},
			containerLeft: {
				flex: 3
			},
			containerRight: {
				flex: 5
			},
			left_item_text: {
				fontSize: FontSizes.medium
			}
		}
	}
);
