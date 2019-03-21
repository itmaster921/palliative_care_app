import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  View,
  ScrollView,
  ImageBackground
} from "react-native";

import { Colors, Images } from "@theme";
import Styles from "./styles";
import Text from "@text";
import { Button, Loader, Card } from "@components";

import { getCardGame } from "@api";

export default class intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardGame: {},
      loaderVisible: false
    };
  }

  async componentDidMount() {
    var json = await getCardGame(true);
    if (json == null) {
      this.setState({ loaderVisible: true });
      json = await getCardGame(false);
      this.setState({ loaderVisible: false });
    }

    const firstCardGame = json[0];

    var cardIndex = 0;
    for (var card of firstCardGame.cards) {
      card.selectedLevel = -1;
      card.cardIndex = cardIndex++;
    }

    this.setState({
      cardGame: firstCardGame
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={Images.bg_navigation} style={Styles.container}>
        <Loader loading={this.state.loaderVisible} />
        <ScrollView contentContainerStyle={Styles.introContainer}>
          <Card topbar style={Styles.titleView}>
            <Text mediumLarge center color={Colors.Red} style={Styles.title}>
              Discussion cards
            </Text>
            <Text medium bold style={Styles.subtitle} color={Colors.Navy}>
              {this.state.cardGame.title}
            </Text>
          </Card>
          <Card style={Styles.descView}>
            <Image source={Images.cardgame} style={Styles.icon} />
            <Text medium>UNDER CONSTRUCTION</Text>
            <Text style={Styles.intro}>{this.state.cardGame.description}</Text>
          </Card>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <View style={{ flex: 1 }} />
          <Button
            dark
            bold
            onPress={() => {
              navigate("CDSingleView", {
                cardIndex: 0,
                cardGame: this.state.cardGame
              });
            }}
          >
            Start discussion cards
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
