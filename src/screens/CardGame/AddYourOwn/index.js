import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  ScrollView,
  TextInput,
  ImageBackground,
  Modal
} from "react-native";
import { Colors, Images, Metrics } from "@theme";
import Styles from "./styles";

import { getCardGame } from "@api";
import { Loader, Button, Text, ProgressBar, Card } from "@components";
import { playSounds } from "@utils";
import { deviceWidth } from "@ResponsiveDimensions";

AddedModal = props => {
  const { onAddAnother, onFinish } = props;
  const styles = {
    container: {
      flex: 1,
      backgroundColor: Colors.backgroundModal,
      justifyContent: "center",
      alignItems: "center"
    },

    modal: {
      backgroundColor: Colors.backgroundPrimary,
      borderRadius: deviceWidth(1.2),
      width: 300,
      padding: 15,
      justifyContent: "center",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: Metrics.shadowOffset,
        height: Metrics.shadowOffset
      },
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
      width: 100
    },

    icon: {
      resizeMode: "contain",
      width: 64,
      height: 64,
      // tintColor: Colors.Olive,
      marginVertical: 5
    },

    buttons: {
      flexDirection: "row"
    }
  };
  return (
    <Modal
      supportedOrientations={["portrait", "landscape"]}
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Image source={Images.check} style={styles.icon} />
          <Text medium center color={Colors.Olive}>
            Perference added
          </Text>
          <Text center style={{ marginTop: 8 }}>
            Would you like to add another?
          </Text>
          <View style={styles.buttons}>
            <Button
              light
              bold
              color={Colors.Navy}
              buttonStyles={styles.closeButton}
              onPress={() => onAddAnother()}
            >
              Add
            </Button>
            <Button
              dark
              bold
              color={Colors.Navy}
              buttonStyles={styles.closeButton}
              onPress={() => onFinish()}
            >
              Finish
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default class AddYourOwn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yourOwn: "",
      visibleAddedModal: false
    };
  }

  componentDidMount() {}

  onSelectedLevel(level) {
    if (!this.state.yourOwn) return;
    const {
      navigate,
      goBack,
      state: {
        params: { cardGame }
      }
    } = this.props.navigation;
    console.log(cardGame);
    cardGame.cards.push({
      question: this.state.yourOwn,
      selectedLevel: level,
      cardIndex: cardGame.cards.length
    });
    this.setState({ visibleAddedModal: true });
  }

  onAddAnother = () => {
    this.setState({ visibleAddedModal: false, yourOwn: "" });
  };

  onFinish = () => {
    const {
      navigate,
      goBack,
      state: {
        params: { cardGame, onGoBack }
      }
    } = this.props.navigation;
    this.setState({ visibleAddedModal: false });
    setTimeout(() => {
      goBack();
      onGoBack(cardGame);
    }, 200);
  };

  render() {
    const { navigate, goBack } = this.props.navigation;

    return (
      <ImageBackground source={Images.bg_navigation} style={Styles.background}>
        <ScrollView contentContainerStyle={Styles.container}>
          <Card topbar style={Styles.titleView}>
            <Text mediumLarge center color={Colors.Red} style={Styles.title}>
              Your end-of-life preferences
            </Text>
          </Card>
          <Card style={Styles.cardView}>
            <Text bold center color={Colors.Olive} style={Styles.howImportant}>
              Add your own...
            </Text>
            <Text bold center>
              Enter your own end-of-life preference below, then use the buttons
              undermeath to choose it's importance
            </Text>
            <TextInput
              style={Styles.textArea}
              value={this.state.yourOwn}
              multiline={true}
              onChangeText={text => {
                this.setState({ yourOwn: text });
              }}
            />
          </Card>
          <View style={Styles.levelBar}>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.onSelectedLevel.bind(this, 0)}
            >
              <View style={Styles.levelItem}>
                <Image source={Images.levelNot} style={Styles.levelIcon} />
                <Text bold color={Colors.Navy}>
                  Not
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.onSelectedLevel.bind(this, 1)}
            >
              <View style={Styles.levelItem}>
                <Image source={Images.levelSomewhat} style={Styles.levelIcon} />
                <Text bold color={Colors.Navy}>
                  Somewhat
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={this.onSelectedLevel.bind(this, 2)}
            >
              <View style={Styles.levelItem}>
                <Image source={Images.levelVery} style={Styles.levelIcon} />
                <Text bold color={Colors.Navy}>
                  Very
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button light bold onPress={() => goBack()}>
            Go back
          </Button>
          <View style={{ flex: 1 }} />
          <Button dark bold onPress={() => onFinish()}>
            Finish cards
          </Button>
        </View>
        <AddedModal
          visible={this.state.visibleAddedModal}
          onAddAnother={this.onAddAnother}
          onFinish={this.onFinish}
        />
      </ImageBackground>
    );
  }
}
