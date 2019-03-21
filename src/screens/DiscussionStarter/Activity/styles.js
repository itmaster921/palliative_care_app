import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';

import { Colors, FontSizes, MediaQueries, Metrics } from '@theme';

const { width } = Dimensions.get('window');

import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';

export default MediaQueryStyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: Colors.backgroundPrimary
		},

		pregressBar: {
			marginHorizontal: deviceWidth(13),
			marginVertical: deviceWidth(2)
		},

		title: {
			margin: deviceWidth(1),
			flexDirection: 'row',
			justifyContent: 'center',
			flexWrap: 'wrap'
		},

		icon: {
			height: 200
		},

		questionItem: {
			marginVertical: deviceWidth(1.5),
			backgroundColor: '#fff',
			borderRadius: deviceWidth(1.2),
			shadowColor: '#000',
			shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
			shadowOpacity: 0.4,
			shadowRadius: 0,
			padding: deviceWidth(2.5)
		},

		questionTitle: {
			marginBottom: deviceWidth(1.8),
			flexDirection: 'row',
			justifyContent: 'space-between'
		},

		questionContainer: {
			width: '80%',
			flexGrow: 1
		},

		textArea: {
			backgroundColor: Colors.backgroundSecondary,
			height: deviceWidth(16),
			color: Colors.textPrimary,
			fontSize: FontSizes.smallMedium,
			padding: deviceWidth(1.2),
			borderWidth: 1,
			borderColor: '#222222'
		},

		buttonBar: {
			flexDirection: 'row',
			justifyContent: 'space-between',
			backgroundColor: '#E6E0D4',
			paddingHorizontal: deviceWidth(8)
		},

		titleView: {
			marginBottom: deviceWidth(2)
		},

		scrollView: {
			flexGrow: 1,
			paddingTop: deviceWidth(4),
			paddingHorizontal: deviceWidth(8),
			paddingBottom: 0
		},

		answerButtonWrapper: {
			flexDirection: 'row',
			justifyContent: 'center'
		},

		answerButton: {
			backgroundColor: Colors.Blue,
			paddingVertical: 4,
			paddingHorizontal: 8,
			marginTop: deviceWidth(1),
			marginLeft: deviceWidth(2),
			flexDirection: 'row',
			alignItems: 'center'
		},

		answerButtonOn: {
			backgroundColor: Colors.Navy,
			paddingVertical: 4,
			paddingHorizontal: 8,
			marginTop: deviceWidth(1),
			marginLeft: deviceWidth(2),
			flexDirection: 'row',
			alignItems: 'center'
		},

		sound: {
			width: deviceHeight(2),
			height: deviceHeight(2),
			marginLeft: deviceWidth(3)
		}
	},
	{
		[MediaQueries.iPhone]: {
			scrollView: {
				paddingHorizontal: deviceWidth(2.8)
			},
			buttonBar: {
				paddingHorizontal: deviceWidth(2.8)
			},
			answerButtonWrapper: {
				flexDirection: 'column'
			},
			answerButton: {
				justifyContent: 'center',
				paddingVertical: 2,
				paddingHorizontal: 4,
				marginTop: 8,
				marginLeft: 0
			},
			answerButtonOn: {
				justifyContent: 'center',
				paddingVertical: 2,
				paddingHorizontal: 4,
				marginTop: 8,
				marginLeft: 0
			}
		}
	}
);
