import React, { Component } from "react";
import { StyleSheet, View, Modal } from "react-native";
import { Colors } from "@theme";
import Button from "@button";
import Text from "@text";

import { getDiscussionStarter } from "@api";

export default (Share = props => {
  return (
    <Modal
      supportedOrientations={["portrait", "landscape"]}
      animationType="slide"
      transparent={true}
      visible={props.visible}
    >
      <View style={styles.container}>
        <View style={styles.modal}>
          <Text medium center style={styles.title}>
            Share
          </Text>
          <View>
            <Button dark onPress={() => props.onDownload()}>
              DOWNLOAD
            </Button>
            <Button dark onPress={() => props.onEmail()}>
              EMAIL
            </Button>
            <Button light color={Colors.Red} onPress={() => props.onCancel()}>
              CANCEL
            </Button>
          </View>
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
    shadowRadius: 2
  },

  title: {
    marginBottom: 10
  },

  buttons: {}
});
