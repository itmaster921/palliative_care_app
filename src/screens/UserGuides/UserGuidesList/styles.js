import React, { Component } from 'react';
import { Platform, StyleSheet, Dimensions } from 'react-native';

import { Colors, MediaQueries } from '@theme';

const { width, height } = Dimensions.get('window');
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';

export default MediaQueryStyleSheet.create(
	{
		container: {
			flex: 1,
			backgroundColor: Colors.backgroundPrimary
		},
		scroll: {
			flexGrow: 1
		},
		title: {
			color: Colors.Navy,
			fontWeight: '200'
		},
		subtitle: {
			color: Colors.textSecondary,
			textAlign: 'center',
			marginTop: 2,
			fontWeight: '200'
		},
		cardtitle: {
			color: Colors.Navy,
			textAlign: 'center',
			marginHorizontal: deviceWidth(1.5)
		},
		cardView: {
			flexDirection: 'row',
			alignItems: 'center'
		},
		item: {
			flex: 1,
			margin: deviceWidth(1.2)
		},
		titleView: {
			margin: deviceWidth(1.2),
			marginBottom: deviceWidth(2)
		},
		title_content: {
			paddingVertical: deviceWidth(2)
		},
		icon: {
			width: deviceWidth(25),
			height: deviceHeight(15),
			resizeMode: 'contain',
			marginVertical: deviceWidth(2),
			flexDirection: 'row',
			justifyContent: 'center'
		},
		icon_wrap: {
			width: deviceWidth(25),
			justifyContent: 'center',
			alignItems: 'center'
		},
		smallIcon: {
			width: deviceWidth(6),
			height: deviceHeight(4),
			resizeMode: 'contain',
			tintColor: Colors.Navy
		},
		buttonBar: {
			backgroundColor: Colors.Sand,
			flexDirection: 'row',
			justifyContent: 'space-between',
			paddingVertical: deviceWidth(0.5),
			paddingHorizontal: deviceWidth(10),
			alignItems: 'center'
		}
	},
	{
		[MediaQueries.iPad]: {
			scroll: {
				paddingVertical: deviceWidth(3),
				paddingHorizontal: deviceWidth(8.8)
			},
			buttonBar: {
				paddingHorizontal: deviceWidth(9.8)
			},
			item_content: {
				justifyContent: 'space-between',
				paddingVertical: deviceWidth(2)
			}
		},
		[MediaQueries.iPhone]: {
			scroll: {
				paddingVertical: deviceWidth(2),
				paddingHorizontal: deviceWidth(2.8)
			},
			buttonBar: {
				paddingHorizontal: deviceWidth(3.8)
			},
			item_content: {
				flexDirection: 'row',
				justifyContent: 'space-between',
				paddingVertical: deviceWidth(2)
			}
		}
	}
);
