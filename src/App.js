/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {PrimaryNav} from "./Router";
import KeyboardManager from 'react-native-keyboard-manager'
import store from './Store';


class App extends Component {

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar
          backgroundColor="blue"
          barStyle="light-content"
        />
        <PrimaryNav ref={ref=>store.topNavigator = ref}/>
      </View>
    );
  }
}
 export default App;