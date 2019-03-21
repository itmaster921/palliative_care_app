import React, { Component } from "react";
import { StyleSheet, View, Modal, Image } from "react-native";
import { Colors, Images } from "@theme";
import Button from "@button";
import Text from "@text";
import {
  deviceWidth,
  deviceHeight,
  windowHeight,
  windowWidth
} from "@ResponsiveDimensions";

import { getDiscussionStarter } from "@api";

export default (Downloaded = props => {
  return (
    <Modal
      supportedOrientations={["portrait", "landscape"]}
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Image source={Images.check} style={styles.checkIcon} />
          <Text medium center style={{ color: Colors.Olive }}>
            Shared
          </Text>
          <Button
            light
            bold
            color={Colors.Navy}
            buttonStyles={styles.closeButton}
            onPress={() => props.onCancel()}
          >
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundModal,
    justifyContent: "center",
    alignItems: "center"
  },

  modal: {
    backgroundColor: Colors.backgroundPrimary,
    width: 300,
    padding: 15,
    borderRadius: deviceWidth(1.2),
    shadowColor: "#000",
    shadowOffset: { width: deviceWidth(1.2), height: deviceWidth(1.2) },
    shadowOpacity: 0.5,
    shadowRadius: 0,
    justifyContent: "center",
    alignItems: "center"
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

  checkIcon: {
    width: 64,
    height: 64,
    marginVertical: 5
  }
});
