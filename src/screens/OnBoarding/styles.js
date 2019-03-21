/**
 * @providesModule @OnBoardingstyles
 */

import React, { Component } from 'react';
import { Platform, Dimensions, orientation } from 'react-native';

//import {Colors} from '../../theme'; // use for theme color
import { Colors, MediaQueries } from '@theme';
const { width, height } = Dimensions.get('window'); // Detect screen width and height
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'; // use for responsive screen UI
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';
import { MediaQueryStyleSheet } from 'react-native-responsive';

export default MediaQueryStyleSheet.create(
	{
		slide: {
			alignItems: 'center',
			shadowColor: '#000',
			shadowOffset: { width: responsiveWidth(0.5), height: responsiveWidth(0.5) },
			shadowOpacity: 0.5,
			shadowRadius: 0,
			marginBottom: deviceWidth(8)
		},
		slideLandscape: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			shadowColor: '#000',
			shadowOffset: { width: responsiveWidth(0.5), height: responsiveWidth(0.5) },
			shadowOpacity: 0.5,
			shadowRadius: 0,
			marginBottom: deviceWidth(8)
		},
		scrollcontainer: {
			alignItems: 'center'
		},
		logo: {
			marginBottom: deviceHeight(5.5),
			marginTop: deviceHeight(8),
			height: deviceHeight(15),
			width: deviceWidth(25)
		},
		middleimage: {
			height: deviceHeight(29),
			width: deviceWidth(70),
			padding: deviceWidth(10),
			alignItems: 'center',
			justifyContent: 'center'
		},
		middleicon: {
			height: deviceHeight(23),
			width: deviceWidth(40)
		},
		descText: {
			fontSize: deviceHeight(2.0),
			textAlign: 'center',
			color: Colors.Navy
		},
		titleText: {
			textAlign: 'center',
			color: Colors.white
		},
		subTitleText: {
			textAlign: 'center',
			color: Colors.white,
			marginTop: deviceWidth(1)
		},
		container: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center'
		},
		cardDetails: {
			alignItems: 'center',
			backgroundColor: Colors.white
		},
		cardDetailsLandscape: {
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: Colors.white,
			height: deviceHeight(29)
		},
		pagination: {
			flexDirection: 'row',
			justifyContent: 'center',
			marginVertical: deviceHeight(2)
		},
		dot: {
			backgroundColor: Colors.white,
			width: deviceWidth(6),
			height: deviceHeight(0.6),
			borderWidth: 1,
			borderColor: Colors.Olive,
			marginLeft: 2,
			marginRight: 2
		},
		activeDot: {
			backgroundColor: Colors.Olive
		},
		buttonContainer: {
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		},
		buttonPrev: {
			width: deviceWidth(20),
			paddingVertical: deviceHeight(1),
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: deviceHeight(1)
		},
		buttonNext: {
			width: deviceWidth(20),
			paddingVertical: deviceHeight(1),
			borderWidth: 2,
			borderColor: Colors.Navy,
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: deviceHeight(1)
		},
		buttonpageView: {
			width: deviceWidth(70)
		},
		textView: {
			paddingHorizontal: deviceWidth(2),
			height: deviceWidth(18),
			width: deviceWidth(70),
			alignItems: 'center',
			justifyContent: 'center'
		},
		background: {
			flex: 1,
			width: undefined,
			height: undefined,
			backgroundColor: 'transparent',
			alignItems: 'center'
		}
	},
	{
		[MediaQueries.iPad]: {
			scrollcontainer: {
				paddingVertical: deviceHeight(7)
			},
			subTitleView: {
				marginBottom: deviceWidth(5)
			},
			subTitleText: {
				marginTop: deviceWidth(1)
			},
			middleimage: {
				width: deviceWidth(60)
			},
			textView: {
				width: deviceWidth(60),
				height: deviceWidth(16)
			},
			buttonpageView: {
				width: deviceWidth(60)
			}
		},
		[MediaQueries.iPhone]: {
			scrollcontainer: {
				paddingVertical: deviceHeight(10)
			},
			subTitleView: {
				marginBottom: deviceWidth(9)
			},
			subTitleText: {
				marginTop: deviceWidth(2)
			},
			middleimage: {
				width: deviceWidth(70)
			},
			textView: {
				width: deviceWidth(70),
				height: deviceWidth(16)
			},
			buttonpageView: {
				width: deviceWidth(70)
			}
		}
	}
);
