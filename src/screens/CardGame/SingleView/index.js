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

import { getCardGame } from '@api';
import { Loader, Button, Text, ProgressBar, Card } from '@components';
import { playSounds } from '@utils';
import { getSpeechConstant } from '@api';

export default class SingleView extends Component {
	constructor(props) {
		super(props);
		const { cardIndex, cardGame } = this.props.navigation.state.params;
		const cards = cardGame.cards;
		this.state = {
			cardIndex: cardIndex,
			cardGame: cardGame,
			cardTotalCount: cards.length,
			currentCard: cards[cardIndex]
		};
	}

	componentDidMount() {}

	onSkip() {
		if (this.state.cardIndex + 1 >= this.state.cardTotalCount) {
			this.onFinish();
		} else {
			const { navigate } = this.props.navigation;
			navigate('CDSingleView', {
				cardIndex: this.state.cardIndex + 1,
				cardGame: this.state.cardGame
			});
		}
	}

	onFinish() {
		const { navigate } = this.props.navigation;
		navigate('CDSummary', { cardGame: this.state.cardGame });
	}

	onSelectedLevel(level) {
		let cardGame = this.state.cardGame;
		cardGame.cards[this.state.cardIndex].selectedLevel = level;

		if (this.state.cardIndex + 1 >= this.state.cardTotalCount) {
			this.onFinish();
		} else {
			const { navigate } = this.props.navigation;
			navigate('CDSingleView', {
				cardIndex: this.state.cardIndex + 1,
				cardGame: cardGame
			});
		}
	}

	async playAudio() {
		let audio = [ this.state.currentCard.question_audio_url, this.state.currentCard.additional_info_audio_url ];
		let speechConstant = await getSpeechConstant(0);
		speechConstant ? (audio = [ speechConstant.speech_constants[0].audio_url, ...audio ]) : null;
		playSounds(audio);
	}

	render() {
		const { navigate } = this.props.navigation;
		let selectedLevel = this.state.currentCard.selectedLevel;
		let levelItemStyles =
			selectedLevel >= 0 ? [ { opacity: 0.75 }, { opacity: 0.75 }, { opacity: 0.75 } ] : [ {}, {}, {} ];

		if (selectedLevel >= 0) {
			levelItemStyles[selectedLevel].opacity = 1;
		}

		return (
			<ImageBackground source={Images.bg_navigation} style={Styles.background}>
				<ScrollView contentContainerStyle={Styles.container}>
					<Card topbar style={Styles.titleView}>
						<Text mediumLarge center color={Colors.Red} style={Styles.title}>
							Your end-of-life preferences
						</Text>
						<View style={Styles.progress}>
							<Text small bold center color={Colors.Olive}>
								{this.state.cardIndex + 1} of {this.state.cardTotalCount}{' '}
							</Text>
							<ProgressBar
								total={this.state.cardTotalCount}
								progress={this.state.cardIndex + 1}
								style={Styles.progressBar}
							/>
						</View>
					</Card>
					<Card style={Styles.cardView} contentStyle={{ padding: 0 }}>
						<TouchableOpacity onPress={this.playAudio.bind(this)} style={Styles.sound_btn}>
							<Image source={Images.sound} style={Styles.sound} />
						</TouchableOpacity>
						<Text bold center color={Colors.Olive} style={Styles.howImportant}>
							How important is...
						</Text>
						<View style={Styles.questionView}>
							<Text medium center style={Styles.question}>
								{this.state.currentCard.question}
							</Text>
						</View>
						{this.state.currentCard.additional_info && (
							<View style={Styles.additionalInfoWrapper}>
								<View style={Styles.triangle} />
								<View style={Styles.additionalInfoView}>
									<Text center style={Styles.additionalInfo}>
										{this.state.currentCard.additional_info}
									</Text>
								</View>
							</View>
						)}
					</Card>
					<View style={Styles.levelBar}>
						<TouchableOpacity style={{ flex: 1 }} onPress={this.onSelectedLevel.bind(this, 0)}>
							<View style={[ Styles.levelItem, levelItemStyles[0] ]}>
								<Image source={Images.levelNot} style={Styles.levelIcon} />
								<Text bold color={Colors.Navy}>
									Not
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={{ flex: 1 }} onPress={this.onSelectedLevel.bind(this, 1)}>
							<View style={[ Styles.levelItem, levelItemStyles[1] ]}>
								<Image source={Images.levelSomewhat} style={Styles.levelIcon} />
								<Text bold color={Colors.Navy}>
									Somewhat
								</Text>
							</View>
						</TouchableOpacity>
						<TouchableOpacity style={{ flex: 1 }} onPress={this.onSelectedLevel.bind(this, 2)}>
							<View style={[ Styles.levelItem, levelItemStyles[2] ]}>
								<Image source={Images.levelVery} style={Styles.levelIcon} />
								<Text bold color={Colors.Navy}>
									Very
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				</ScrollView>
				<View style={Styles.buttonBar}>
					<Button
						light
						bold
						onPress={() =>
							navigate('CDListView', { cardGame: this.state.cardGame, cardIndex: this.state.cardIndex })}
					>
						List view
					</Button>
					<View style={{ flex: 1 }} />
					<Button light bold onPress={this.onSkip.bind(this)}>
						Skip
					</Button>
					<Button dark bold onPress={this.onFinish.bind(this)}>
						Finish cards
					</Button>
				</View>
			</ImageBackground>
		);
	}
}
