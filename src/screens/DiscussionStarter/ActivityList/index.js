import React, { Component } from 'react';
import { ImageBackground, FlatList, View, ScrollView, Image } from 'react-native';
import { Colors, Images, FontSizes } from '@theme';
import Styles from './styles';
import { Text, Button } from '@components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MediaQuery } from 'react-native-responsive';

import { Card, ArrowText } from '@components';

export default class ActivityList extends Component {
	constructor(props) {
		super(props);
		const { discussionStarter } = this.props.navigation.state.params;
		const activities = discussionStarter.discussion_starter;
		this.state = {
			discussionStarter,
			discussionStarter,
			activities: activities
		};
	}

	goBack() {
		const { goBack } = this.props.navigation;
		goBack();
	}
	renderActivityItem({ item, index }) {
		const { navigate } = this.props.navigation;
		return (
			<Card
				topbar={{ color: Colors.Navy }}
				style={Styles.item}
				contentStyle={Styles.item_content}
				onPress={() => {
					navigate('Activity', { activityIndex: index, discussionStarter: this.state.discussionStarter });
				}}
			>
				<Text mediumLarge bold center style={Styles.item_number}>
					{index + 1}
				</Text>
				<MediaQuery minDeviceWidth={768}>
					<Text bold center style={Styles.item_text}>
						{item.stage}
					</Text>
					<ArrowText medium bold center color={Colors.Red} style={Styles.item_start_text}>
						Start{' '}
					</ArrowText>
				</MediaQuery>
				<MediaQuery maxDeviceWidth={767}>
					<Text bold center style={Styles.item_text}>
						{item.stage}
					</Text>
					<Image
						source={Images.arrow_blue}
						style={{ height: 16, resizeMode: 'contain', tintColor: Colors.Red }}
					/>
				</MediaQuery>
			</Card>
		);
	}

	render() {
		const { navigate } = this.props.navigation;
		return (
			<ImageBackground source={Images.bg_discussion_starter} style={Styles.container}>
				<ScrollView contentContainerStyle={Styles.scrollView}>
					<Card topbar style={Styles.titleView}>
						<Text style={Styles.title} mediumLarge center bold>
							Discussion Starter
						</Text>
						<Text style={Styles.subtitle} medium center>
							Pick up from where you left off...
						</Text>
					</Card>
					<MediaQuery minDeviceWidth={768}>
						<FlatList
							numColumns={2}
							data={this.state.activities}
							renderItem={this.renderActivityItem.bind(this)}
							keyExtractor={(item, index) => index.toString()}
							contentContainerStyle={Styles.flatList}
						/>
					</MediaQuery>
					<MediaQuery maxDeviceWidth={767}>
						<FlatList
							numColumns={1}
							data={this.state.activities}
							renderItem={this.renderActivityItem.bind(this)}
							keyExtractor={(item, index) => index.toString()}
							contentContainerStyle={Styles.flatList}
						/>
					</MediaQuery>
				</ScrollView>
				<View style={Styles.buttonBar}>
					<Button light bold onPress={this.goBack.bind(this)}>
						Go back
					</Button>
					<Button
						dark
						bold
						onPress={() => {
							navigate('Activity', { activityIndex: 0, discussionStarter: this.state.discussionStarter });
						}}
					>
						Start the conversation
					</Button>
				</View>
			</ImageBackground>
		);
	}
}
