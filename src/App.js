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

if(Platform.OS === 'ios')
{
  KeyboardManager.setEnable(true);
  KeyboardManager.setEnableDebugging(true);
  KeyboardManager.setKeyboardDistanceFromTextField(10);
  KeyboardManager.setPreventShowingBottomBlankSpace(true);
  KeyboardManager.setEnableAutoToolbar(true);
  KeyboardManager.setToolbarDoneBarButtonItemText("Done");
  KeyboardManager.setToolbarManageBehaviour(0);
  KeyboardManager.setShouldToolbarUsesTextFieldTintColor(false);
  KeyboardManager.setToolbarPreviousNextButtonEnable(false);
  KeyboardManager.setShouldShowTextFieldPlaceholder(true);
  KeyboardManager.setOverrideKeyboardAppearance(false);
  KeyboardManager.setShouldResignOnTouchOutside(true);
  KeyboardManager.resignFirstResponder();
}

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