import React, { Component } from 'react';
import { StyleSheet, View, Modal, Image } from 'react-native';
import { Colors, Metrics } from '@theme';
import Button from '@button';
import Text from '@text';
import { deviceWidth } from '@ResponsiveDimensions';

export default (InfoAlert = (props) => {
	const { icon, message, onCancel, dark } = props;
	return (
		<Modal
			supportedOrientations={[ 'portrait', 'landscape' ]}
			animationType="slide"
			transparent={true}
			visible={props.visible}
		>
			<View style={styles.container}>
				<View style={styles.modal}>
					<Image source={icon} style={styles.icon} />
					<Text smallMedium center color={dark ? Colors.textPrimary : Colors.Olive}>
						{message}
					</Text>
					{dark ? (
						<Button
							dark
							bold
							color={Colors.Navy}
							buttonStyles={styles.closeButton}
							onPress={() => onCancel()}
						>
							{props.buttonText ? props.buttonText : `Close`}
						</Button>
					) : (
						<Button
							light
							bold
							color={Colors.Navy}
							buttonStyles={styles.closeButton}
							onPress={() => onCancel()}
						>
							{props.buttonText ? props.buttonText : `Close`}
						</Button>
					)}
				</View>
			</View>
		</Modal>
	);
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.backgroundModal,
		justifyContent: 'center',
		alignItems: 'center'
	},

	modal: {
		backgroundColor: Colors.backgroundPrimary,
		borderRadius: deviceWidth(1.2),
		width: 300,
		padding: 15,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: Metrics.shadowOffset, height: Metrics.shadowOffset },
		shadowOpacity: 0.4,
		shadowRadius: 0
	},

	title: {
		marginBottom: 10
	},

	textInput: {
		height: 44,
		backgroundColor: Colors.backgroundSecondary,
		marginVertical: 10
	},

	closeButton: {
		marginTop: 20,
		paddingHorizontal: 20,
	},

	icon: {
		resizeMode: 'contain',
		width: 64,
		height: 64,
		marginVertical: 5,
		marginBottom: 18
	}
});
