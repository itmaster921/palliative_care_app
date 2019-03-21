import React, { Component } from "react";
import { StyleSheet, View, Modal, TextInput } from "react-native";
import { Colors, FontSizes } from "@theme";
import Button from "@button";
import Text from "@text";

import { getDiscussionStarter } from "@api";

export default (Email = props => {
  var name,
    email = "";
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
            Email the results
          </Text>
          <View>
            <Text center>Name</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => (name = text)}
            />
          </View>
          <View>
            <Text center>Email</Text>
            <TextInput
              style={styles.textInput}
              onChangeText={text => (email = text)}
            />
          </View>
          <View style={styles.buttons}>
            <Button light color={Colors.Red} onPress={() => props.onCancel()}>
              CANCEL
            </Button>
            <Button dark onPress={() => props.onSend(name, email)}>
              SEND
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

  textInput: {
    height: 44,
    backgroundColor: Colors.backgroundSecondary,
    marginVertical: 10,
    fontSize: FontSizes.smallMedium,
    color: Colors.textPrimary
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "center"
  }
});
