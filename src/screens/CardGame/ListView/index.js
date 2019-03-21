import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Image,
	TouchableOpacity,
	FlatList,
	View,
	ScrollView,
	TextInput,
	ImageBackground
} from 'react-native';
import { Colors, Images } from '@theme';
import Styles from './styles';

import { Card, ProgressBar, Text, Button, InfoAlert } from '@components';
import { copy } from '@utils';
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';
import { playSounds } from '@utils';

export default class ListView extends Component {
	constructor(props) {
		super(props);
		const { cardGame, cardIndex } = this.props.navigation.state.params;
		const pageTotalCount = parseInt((cardGame.cards.length - 1) / 3) + 1;
		let pageIndex = parseInt(cardIndex / 3);
		this.state = {
			cardGame,
			pageTotalCount,
			pageIndex,
			currentCards: this.cardsInPage(cardGame.cards, pageIndex),
			info: ''
		};
	}

	componentDidMount() {}

	cardsInPage = (cards, pageIndex) => {
		var startIndex = pageIndex * 3;
		var endIndex = startIndex + 3;
		var cardsInPage = cards.slice(startIndex, endIndex);
		return cardsInPage;
	};

	onSelectedLevel = (cardIndex, level) => {
		let cardGame = copy(this.state.cardGame);
		cardGame.cards[cardIndex].selectedLevel = level;

		let currentCards = this.cardsInPage(cardGame.cards, this.state.pageIndex);

		this.setState({
			cardGame,
			currentCards
		});
	};

	onPrev = () => {
		let prevPageIndex = this.state.pageIndex - 1;
		let prevCards = this.cardsInPage(this.state.cardGame.cards, prevPageIndex);
		this.setState({
			pageIndex: prevPageIndex,
			currentCards: prevCards
		});
	};

	onNext = () => {
		let nextPageIndex = this.state.pageIndex + 1;
		let nextCards = this.cardsInPage(this.state.cardGame.cards, nextPageIndex);
		this.setState({
			pageIndex: nextPageIndex,
			currentCards: nextCards
		});
	};

	onDone = () => {
		const { navigate } = this.props.navigation;
		navigate('CDSummary', { cardGame: this.state.cardGame });
	};

	renderCardItem = ({ item, index }) => {
		let selectedLevel = item.selectedLevel;
		let levelItemStyles =
			selectedLevel >= 0 ? [ { opacity: 0.5 }, { opacity: 0.5 }, { opacity: 0.5 } ] : [ {}, {}, {} ];

		if (selectedLevel >= 0) {
			levelItemStyles[selectedLevel].opacity = 1;
		}

		return (
			<Card style={Styles.cardItem}>
				{item.additional_info && (
					<TouchableOpacity
						onPress={() => {
							this.setState({ info: item.additional_info });
						}}
						style={Styles.info_btn}
					>
						<Image source={Images.icon_info_blue} style={Styles.info_icon} />
					</TouchableOpacity>
				)}
				<TouchableOpacity
					onPress={() => {
						playSounds([ item.question_audio_url ]);
					}}
					style={Styles.sound_btn}
				>
					<Image source={Images.sound} style={Styles.sound} />
				</TouchableOpacity>
				<Text bold center color={Colors.Olive} style={Styles.howImportant}>
					How important is...
				</Text>
				<Text medium center style={Styles.question}>
					{item.question}
				</Text>
				<View style={Styles.levelBar}>
					<TouchableOpacity style={{ flex: 1 }} onPress={() => this.onSelectedLevel(item.cardIndex, 0)}>
						<View style={[ Styles.levelItem, levelItemStyles[0] ]}>
							<Image source={Images.levelNot} style={Styles.levelIcon} />
							<Text bold color={Colors.Navy}>
								Not
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={{ flex: 1 }} onPress={() => this.onSelectedLevel(item.cardIndex, 1)}>
						<View style={[ Styles.levelItem, levelItemStyles[1] ]}>
							<Image source={Images.levelSomewhat} style={Styles.levelIcon} />
							<Text bold color={Colors.Navy}>
								Somewhat
							</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity style={{ flex: 1 }} onPress={() => this.onSelectedLevel(item.cardIndex, 2)}>
						<View style={[ Styles.levelItem, levelItemStyles[2] ]}>
							<Image source={Images.levelVery} style={Styles.levelIcon} />
							<Text bold color={Colors.Navy}>
								Very
							</Text>
						</View>
					</TouchableOpacity>
				</View>
			</Card>
		);
	};

	render() {
		const { navigate } = this.props.navigation;
		var cardsCount = this.state.cardGame.cards.length;
		var startNo = this.state.pageIndex * 3 + 1;
		var endNo = startNo + 2;
		if (endNo > cardsCount) endNo = cardsCount;

		return (
			<ImageBackground source={Images.bg_navigation} style={Styles.background}>
				<ScrollView style={Styles.container}>
					<Card topbar style={Styles.titleView}>
						<Text mediumLarge center color={Colors.Red} style={Styles.title}>
							Your end-of-life preferences
						</Text>
						<View style={Styles.progress}>
							<Text small bold center color={Colors.Olive}>
								{startNo} - {endNo} of {this.state.cardGame.cards.length}{' '}
							</Text>
							<ProgressBar
								total={this.state.pageTotalCount}
								progress={this.state.pageIndex + 1}
								style={Styles.progressBar}
							/>
						</View>
					</Card>
					<FlatList
						// key={this.state.pageIndex.toString()}
						data={this.state.currentCards}
						renderItem={this.renderCardItem}
						keyExtractor={(item, index) => index.toString()}
						style={Styles.flatList}
					/>
				</ScrollView>
				<View style={Styles.buttonBar}>
					<Button
						light
						bold
						onPress={() => {
							navigate('CDSingleView', {
								cardIndex: this.state.pageIndex * 3,
								cardGame: this.state.cardGame
							});
						}}
					>
						Single view
					</Button>
					<Button
						light
						bold
						onPress={() => {
							navigate('CDSummary', { cardGame: this.state.cardGame });
						}}
					>
						Finish
					</Button>
					<View style={{ flex: 1 }} />
					{this.state.pageIndex > 0 && (
						<Button dark bold onPress={this.onPrev}>
							Prev
						</Button>
					)}
					{this.state.pageIndex < this.state.pageTotalCount - 1 && (
						<Button dark bold onPress={this.onNext}>
							Next
						</Button>
					)}
					{this.state.pageIndex == this.state.pageTotalCount - 1 && (
						<Button dark bold onPress={this.onDone}>
							Done
						</Button>
					)}
				</View>
				<InfoAlert
					visible={Boolean(this.state.info)}
					icon={Images.icon_info_blue}
					message={this.state.info}
					buttonText="OK"
					dark
					onCancel={() => {
						this.setState({ info: '' });
					}}
				/>
			</ImageBackground>
		);
	}
}
