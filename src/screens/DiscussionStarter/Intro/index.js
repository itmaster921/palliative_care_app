import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  View,
  ImageBackground,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Colors, Images } from "@theme";
import Styles from "./styles";
import { Button, Loader, Card } from "@components";
import Text from "@text";

import { getDiscussionStarter } from "@api";

export default class Intro extends Component {
  constructor(props) {
    super(props);
    this.state = {
      discussionStarter: {},
      loaderVisible: false
    };
  }

  async componentDidMount() {
    let json = null;
    if ((await AsyncStorage.getItem("discussion_starter")) == undefined) {
      this.setState({ loaderVisible: true });
      json = await getDiscussionStarter();
      this.setState({ loaderVisible: false });
    } else {
      json = await getDiscussionStarter();
    }
    console.log("componentDidMount");
    console.log(json);
    let firstDiscussionStarter = json[0];
    this.setState({
      discussionStarter: firstDiscussionStarter
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { discussionStarter } = this.state;
    return (
      <ImageBackground
        source={Images.bg_discussion_starter}
        style={Styles.container}
      >
        <Loader loading={this.state.loaderVisible} />
        <ScrollView contentContainerStyle={Styles.introContainer}>
          <Card topbar style={Styles.titleView}>
            <Text mediumLarge center color={Colors.Red} style={Styles.title}>
              Discussion Starter
            </Text>
            <Text medium bold style={Styles.subtitle} color={Colors.Navy}>
              {discussionStarter.subheading}
            </Text>
          </Card>
          <Card style={Styles.descView}>
            <Image source={Images.discussion_starter} style={Styles.icon} />
            <Text style={Styles.intro}>{discussionStarter.intro}</Text>
          </Card>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button
            dark
            bold
            onPress={() => {
              navigate("Activity", {
                activityIndex: 0,
                discussionStarter: discussionStarter
              });
            }}
          >
            Start the conversation
          </Button>
          <Button
            light
            bold
            onPress={() => {
              navigate("ActivityList", {
                discussionStarter: discussionStarter
              });
            }}
          >
            Skip ahead
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
