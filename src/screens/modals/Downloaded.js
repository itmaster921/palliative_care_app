import React, { Component } from "react";
import { StyleSheet, View, Modal, Image } from "react-native";
import { Colors, Images } from "@theme";
import Button from "@button";
import Text from "@text";

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
          <Text medium center>
            Downloaded
          </Text>
          <Button
            light
            color={Colors.Red}
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
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
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
