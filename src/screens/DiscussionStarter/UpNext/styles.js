import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';

import { Colors, FontSizes, MediaQueries, Metrics } from '@theme';

const { width } = Dimensions.get('window');

import { MediaQueryStyleSheet } from 'react-native-responsive';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';

export default MediaQueryStyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: Colors.backgroundPrimary
		},

		contentView: {
			paddingHorizontal: deviceWidth(8),
			paddingVertical: deviceWidth(2),
			flexGrow: 1
		},

		currentWrapper: {
			marginVertical: deviceHeight(2),
			shadowColor: '#000',
			shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
			shadowOpacity: 0.4,
			shadowRadius: 0
		},

		current: {
			borderRadius: deviceWidth(1.2),
			overflow: 'hidden'
		},

		next: {
			backgroundColor: '#fff',
			marginVertical: deviceHeight(2),
			paddingVertical: deviceHeight(2),
			borderRadius: deviceWidth(1.2),
			paddingLeft: 4,
			paddingRight: 4,
			shadowColor: '#000',
			shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
			shadowOpacity: 0.4,
			shadowRadius: 0
		},

		currentHeader: {
			padding: deviceWidth(1),
			flexDirection: 'row',
			backgroundColor: Colors.Navy,
			alignItems: 'center',
			justifyContent: 'space-between'
		},

		complete_text: {
			fontSize: deviceHeight(3)
		},

		currentDescView: {
			backgroundColor: '#fff',
			padding: deviceWidth(2),
			alignItems: 'center'
		},

		currentTitle: {
			padding: deviceWidth(2),
			fontWeight: '300',
			fontSize: 28
		},

		nextTitle: {
			margin: deviceWidth(2),
			flexDirection: 'row',
			justifyContent: 'center'
		},

		nextPrecomment: {},

		later: {
			marginVertical: deviceWidth(4)
		},

		later_text: {
			marginBottom: deviceWidth(2)
		},

		buttonBar: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: '#E6E0D4',
			paddingHorizontal: deviceWidth(9)
		},

		checkIcon: {
			width: deviceHeight(3.6),
			height: deviceHeight(3.6),
			marginHorizontal: deviceWidth(1),
			tintColor: '#fff'
		}
	},
	{
		[MediaQueries.iPhone]: {
			contentView: {
				paddingHorizontal: deviceWidth(2.8),
				paddingVertical: deviceWidth(2.8)
			},
			buttonBar: {
				paddingHorizontal: deviceWidth(2.8)
			},
			currentWrapper: {
				marginVertical: 0
			}
		}
	}
);
