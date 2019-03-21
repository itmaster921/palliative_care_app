import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  TouchableHighlight,
  Alert,
  Share
} from "react-native";
import { Colors, Images } from "@theme";
import Styles from "./styles";

import { postCardGameAnswers } from "@api";
import { Loader, Button, ImageButton, Text } from "@components";
import {
  ShareModal,
  EmailModal,
  EmailSentModal,
  DownloadedModal
} from "../../modals";
import { copy } from "@utils";
import SortableListView from "react-native-sortable-listview";

import { getSharingHTMLFromResult } from "./HtmlResult";
import RNHTMLtoPDF from "react-native-html-to-pdf";
import {
  deviceWidth,
  deviceHeight,
  windowHeight,
  windowWidth
} from "@ResponsiveDimensions";
import store from "../../../Store";

export default class SummaryDraggable extends Component {
  constructor(props) {
    super(props);
    const { cardGame } = this.props.navigation.state.params;

    var groupedCardByLevel = this.groupedCardByLevel(cardGame);

    this.state = {
      cardGame: cardGame,
      cardsWithSections: this.addSectionsToGroupedCards(groupedCardByLevel),
      loaderVisible: false,
      modalVisible: {
        share: false,
        downloaded: false,
        email: false,
        emailSent: false
      }
    };
  }

  openModal(modal) {
    this.closeModal();
    setTimeout(() => {
      this.setState({
        modalVisible: {
          share: false,
          downloaded: false,
          email: false,
          emailSent: false,
          ...modal
        }
      });
    }, 500);
  }

  closeModal() {
    this.setState({
      modalVisible: {
        share: false,
        downloaded: false,
        email: false,
        emailSent: false
      }
    });
  }

  groupedCardByLevel(cardGame) {
    var groupedCardByLevel = { "-1": [], "0": [], "1": [], "2": [] };
    for (const card of cardGame.cards) {
      groupedCardByLevel[card.selectedLevel].push(card);
    }
    return groupedCardByLevel;
  }

  addSectionsToGroupedCards(groupedCards) {
    var data = [];
    var sectionData = {
      "-1": {
        section: true,
        selectedLevel: -1,
        icon: Images.skip,
        text: "SKIPPED"
      },
      "0": {
        section: true,
        selectedLevel: 0,
        icon: Images.levelNot,
        text: "NOT IMPORTANT"
      },
      "1": {
        section: true,
        selectedLevel: 1,
        icon: Images.levelSomewhat,
        text: "SOMEWHAT IMPORTANT"
      },
      "2": {
        section: true,
        selectedLevel: 2,
        icon: Images.levelVery,
        text: "VERY IMPORTANT"
      }
    };
    for (let level = 2; level >= -1; level--) {
      const cards = groupedCards[level];
      data.push(sectionData[level]);
      data.push(...cards);
    }
    // alert(JSON.stringify(data))
    return data;
  }

  onSelectedLevel(cardIndex, level) {
    let cardGame = copy(this.state.cardGame);
    cardGame.cards[cardIndex].selectedLevel = level;

    var groupedCardByLevel = this.groupedCardByLevel(cardGame);

    this.setState({
      cardGame: cardGame,
      cardsWithSections: this.addSectionsToGroupedCards(groupedCardByLevel)
    });
  }

  onStarSelected(cardIndex) {
    let cardGame = copy(this.state.cardGame);
    let star = cardGame.cards[cardIndex].star == true;
    var starCount = 0;
    for (const card of cardGame.cards) {
      if (card.star == true) starCount++;
    }
    if (star == false && starCount >= 3) return;
    cardGame.cards[cardIndex].star = !star;

    var groupedCardByLevel = this.groupedCardByLevel(cardGame);

    this.setState({
      cardGame: cardGame,
      cardsWithSections: this.addSectionsToGroupedCards(groupedCardByLevel)
    });
  }

  async onExit() {
    this.setState({ loaderVisible: true });
    await postCardGameAnswers(this.state.cardGame);
    this.setState({ loaderVisible: false });

    const { navigate, goBack } = this.props.navigation;
    setTimeout(() => {
      Alert.alert(
        "Are you sure?",
        "Are you sure to exit without share the results?",
        [
          {
            text: "NO",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          {
            text: "YES",
            onPress: () => {
              goBack(store.routesInStack[0]);
              store.activeRoute = null;
              store.routesInStack = [];
            }
          }
        ],
        { cancelable: false }
      );
    }, 500);
  }

  async onShare() {
    this.setState({ loaderVisible: true });
    await postCardGameAnswers(this.state.cardGame);
    this.setState({ loaderVisible: false });
    this.openModal({ share: true });
  }

  onShareEmail() {
    this.openModal({ email: true });
  }

  async onShareDownload() {
    this.closeModal();

    var html = getSharingHTMLFromResult(this.state.cardGame);
    console.log(html);

    let options = {
      html: html,
      fileName: "test",
      directory: "docs"
    };

    let file = await RNHTMLtoPDF.convert(options);
    console.log(file.filePath);
    setTimeout(() => {
      Share.share({
        title: "Share this!",
        message: "I just wanted to show you this:",
        url: file.filePath,
        subject: "I am only visible for emails :("
      });
    }, 500);
  }

  onSendEmail(name, email) {
    this.openModal({ emailSent: true });
  }

  onShareCancel() {
    this.closeModal();
  }

  renderCardItem(item) {
    if (item.section != null) {
      var sectionItem = (
        <View style={Styles.importantBar}>
          <View style={Styles.row}>
            <Image source={item.icon} style={Styles.levelIcon} />
            <Text bold>{item.text}</Text>
          </View>
          {item.selectedLevel == 2 && (
            <View style={Styles.row}>
              <Text small>Choose your top 3 priorities with a </Text>
              <Image source={Images.star} style={Styles.levelIcon} />
            </View>
          )}
        </View>
      );
      return sectionItem;
    } else {
      var cardItemStyle = {
        marginRight: deviceWidth(1)
      };
      if (item.selectedLevel < 2) {
        cardItemStyle.marginRight = deviceWidth(4);
      }

      var cardItem = (
        <TouchableHighlight
          underlayColor={"#0000"}
          style={{
            borderBottomWidth: 1,
            borderColor: "#0000"
          }}
        >
          <View style={Styles.cardItemWithStar}>
            <View style={[Styles.cardItem, cardItemStyle]}>
              <Image source={Images.threeDots} style={Styles.dragIcon} />
              <Text style={Styles.question}>{item.question}</Text>
              {item.selectedLevel != 0 && (
                <ImageButton
                  source={Images.levelNot}
                  style={Styles.levelIcon}
                  onPress={this.onSelectedLevel.bind(this, item.cardIndex, 0)}
                />
              )}
              {item.selectedLevel != 1 && (
                <ImageButton
                  source={Images.levelSomewhat}
                  style={Styles.levelIcon}
                  onPress={this.onSelectedLevel.bind(this, item.cardIndex, 1)}
                />
              )}
              {item.selectedLevel != 2 && (
                <ImageButton
                  source={Images.levelVery}
                  style={Styles.levelIcon}
                  onPress={this.onSelectedLevel.bind(this, item.cardIndex, 2)}
                />
              )}
            </View>
            {item.selectedLevel == 2 && (
              <ImageButton
                source={item.star ? Images.star : Images.starEmpty}
                style={Styles.levelIcon}
                onPress={this.onStarSelected.bind(this, item.cardIndex)}
              />
            )}
          </View>
        </TouchableHighlight>
      );
      return cardItem;
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={Styles.container}>
        <Loader loading={this.state.loaderVisible} />
        <View style={Styles.title}>
          <Text mediumLarge bold center>
            Your Priorities
          </Text>
        </View>
        <SortableListView
          style={{ flex: 1, marginBottom: 0 }}
          data={this.state.cardsWithSections}
          onRowMoved={e => {
            const { row, from, to } = e;
            var selectedLevel =
              to > 0 ? this.state.cardsWithSections[to - 1].selectedLevel : 2;
            this.onSelectedLevel(row.data.cardIndex, selectedLevel);
          }}
          renderRow={this.renderCardItem.bind(this)}
        />
        <View style={Styles.buttonBar}>
          <Button light onPress={this.onExit.bind(this)}>
            EXIT
          </Button>
          <Button dark onPress={this.onShare.bind(this)}>
            SHARE RESULTS
          </Button>
        </View>

        <ShareModal
          visible={this.state.modalVisible.share}
          onDownload={this.onShareDownload.bind(this)}
          onEmail={this.onShareEmail.bind(this)}
          onCancel={this.onShareCancel.bind(this)}
        />
        <EmailModal
          visible={this.state.modalVisible.email}
          onSend={this.onSendEmail.bind(this)}
          onCancel={this.onShareCancel.bind(this)}
        />
        <EmailSentModal
          visible={this.state.modalVisible.emailSent}
          onCancel={this.onShareCancel.bind(this)}
        />
        <DownloadedModal
          visible={this.state.modalVisible.downloaded}
          onCancel={this.onShareCancel.bind(this)}
        />
      </View>
    );
  }
}
