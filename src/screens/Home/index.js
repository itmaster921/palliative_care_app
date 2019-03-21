import React, { Component } from 'react';
import { Image, ImageBackground, View, TouchableOpacity, Dimensions, ScrollView } from 'react-native';

import { Colors, Images, FontSizes } from '@theme';
import Styles from './styles';
import { MediaQuery } from 'react-native-responsive';
import store from '../../Store';
import { Card, ArrowText } from '@components';
import Text from '@text';

const { height, width } = Dimensions.get('window');

export default class Home extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {
		console.log(Dimensions.get('window'));
	}

	gotoRoute(routeName, pageName) {
		store.activeRoute = routeName;
		store.routesInStack.push(routeName);
		var key = routeName;
		this.props.navigation.navigate(
			routeName,
			{
				pageName: pageName
			},
			null,
			key
		);
	}

	render() {
		return (
			<ImageBackground source={Images.bg_navigation} style={Styles.container}>
				<ScrollView contentContainerStyle={Styles.scrollView} scrollEnabled={height < 768}>
					<View style={Styles.containerLeft}>
						<Card
							topbar={{ color: Colors.Red }}
							style={Styles.item}
							onPress={() => {
								this.gotoRoute('DiscussionStarter');
							}}
						>
							<MediaQuery minDeviceWidth={768}>
								<Image source={Images.discussion_starter} style={Styles.right_icon} />
							</MediaQuery>
							<Text medium bold color={Colors.Red} style={Styles.right_item_text}>
								Use discussion starter
							</Text>
						</Card>
						<Card
							topbar={{ color: Colors.Red }}
							style={Styles.item}
							onPress={() => {
								this.gotoRoute('CardGame');
							}}
						>
							<MediaQuery minDeviceWidth={768}>
								<Image source={Images.cardgame} style={[ Styles.right_icon, Styles.reduce_opacity ]} />
							</MediaQuery>
							<Text
								medium
								bold
								color={Colors.Red}
								style={[ Styles.right_item_text, Styles.reduce_opacity ]}
							>
								Discussion cards
							</Text>
							<Text style={Styles.coming_soon}>Coming soon...</Text>
						</Card>
					</View>
					<View style={Styles.containerRight}>
						<Card
							topbar={{ color: Colors.Navy }}
							style={Styles.item}
							onPress={() => {
								this.gotoRoute('Page', 'looking_after_yourself');
							}}
						>
							<MediaQuery minDeviceWidth={768}>
								<Image source={Images.looking_after} style={Styles.left_icon} />
							</MediaQuery>
							<Text bold color={Colors.Navy} style={Styles.left_item_text}>
								Looking after yourself
							</Text>
						</Card>
						<Card
							topbar={{ color: Colors.Navy }}
							style={Styles.item}
							onPress={() => {
								this.gotoRoute('UserGuides');
							}}
						>
							<MediaQuery minDeviceWidth={768}>
								<Image source={Images.icon_how_to} style={Styles.left_icon} />
							</MediaQuery>
							<Text bold color={Colors.Navy} style={Styles.left_item_text}>
								Using this app
							</Text>
						</Card>
						<Card
							topbar={{ color: Colors.Navy }}
							style={Styles.item}
							onPress={() => {
								this.gotoRoute('Resources');
							}}
						>
							<MediaQuery minDeviceWidth={768}>
								<Image source={Images.more_info} style={Styles.left_icon} />
							</MediaQuery>
							<Text bold color={Colors.Navy} style={Styles.left_item_text}>
								Resource library
							</Text>
						</Card>
						<Card
							topbar={{ color: Colors.Navy }}
							style={[ Styles.item, Styles.survey_item ]}
							onPress={() => {}}
						>
							<Text bold color={Colors.Navy} style={Styles.left_item_text}>
								Survey
							</Text>
							<Text style={Styles.coming_soon}>Coming soon...</Text>
						</Card>
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}
