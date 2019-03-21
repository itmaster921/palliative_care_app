import React, { Component } from 'react';
import {
  Image,
  ImageBackground,
  FlatList,
  View,
  Alert,
  Share,
  ScrollView
} from 'react-native';
import { Colors, Images, FontSizes } from '@theme';
import Styles from './styles';
import { Button, Text, Loader, InfoAlert } from '@components';

import { postDiscussionAnswers } from '@api';
import { getSharingHTMLFromResult } from './HtmlResult';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Mailer from 'react-native-mail';
import { Card } from '@components';
import { deviceWidth } from '@ResponsiveDimensions';
import store from '../../../Store';
import { gotoHome } from 'router';

export default class Complete extends Component {
  constructor(props) {
    super(props);
    const { discussionStarter } = this.props.navigation.state.params;
    const activities = discussionStarter.discussion_starter;
    activities.forEach((activity, index) => (activity.index = index));
    const startedActivities = activities.filter(activity => activity.isStarted);
    console.log(discussionStarter);
    this.state = {
      discussionStarter: discussionStarter,
      activities: activities,
      startedActivities,
      loaderVisible: false,
      modalVisible: {
        exported: false,
        emailSent: false
      }
    };
  }

  openModal(modal) {
    this.closeModal();
    setTimeout(() => {
      this.setState({
        modalVisible: {
          exported: false,
          emailSent: false,
          ...modal
        }
      });
    }, 500);
  }

  closeModal() {
    this.setState({
      modalVisible: {
        exported: false,
        emailSent: false
      }
    });
  }

  async onExit() {
    this.setState({ loaderVisible: true });
    await postDiscussionAnswers(this.state.discussionStarter);
    this.setState({ loaderVisible: false });

    setTimeout(() => {
      const { navigate, goBack } = this.props.navigation;
      Alert.alert(
        'Are you sure?',
        'Any information you have entered will be deleted.',
        [
          {
            text: 'NO',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          },
          {
            text: 'YES',
            onPress: () => {
              // goBack(store.routesInStack[0]);
              gotoHome();
              store.activeRoute = null;
              store.routesInStack = [];
            }
          }
        ],
        { cancelable: false }
      );
    }, 500);
  }

  async onShareEmail() {
    var html = getSharingHTMLFromResult(this.state.discussionStarter);

    let options = {
      html: html,
      fileName: 'results',
      directory: 'docs'
    };

    let file = await RNHTMLtoPDF.convert(options);
    Mailer.mail(
      {
        subject: 'Discussion Starter Results',
        recipients: [],
        body: '<b>Resuls as pdf attach</b>',
        isHTML: true,
        attachment: {
          path: file.filePath, // The absolute path of the file from which to read data.
          type: 'pdf', // Mime Type: jpg, png, doc, ppt, html, pdf, csv
          name: 'results.pdf' // Optional: Custom filename for attachment
        }
      },
      (error, event) => {
        console.log('mail', error, event);
        if (event == 'sent') {
          this.openModal({ emailSent: true });
        }
      }
    );
  }

  async onShareExport() {
    this.closeModal();

    var html = getSharingHTMLFromResult(this.state.discussionStarter);
    let options = {
      html: html,
      fileName: 'results',
      directory: 'docs'
    };
    let file = await RNHTMLtoPDF.convert(options);

    setTimeout(async () => {
      try {
        let res = await Share.share({
          title: 'Discussion Starter Results',
          message: 'Discussion Starter Results',
          url: file.filePath,
          subject: 'Discussion Starter Results'
        });
        if (res.action == 'sharedAction') {
          this.openModal({ exported: true });
        }
      } catch (error) {
        console.log('An error happened');
      }
    }, 500);
  }

  onEdit(activityIndex) {
    const { navigate, goBack } = this.props.navigation;
    navigate('Activity', {
      editFromResults: true,
      activityIndex,
      discussionStarter: this.state.discussionStarter
    });
  }

  renderActivityItem({ item }) {
    return (
      <View style={Styles.currentWrapper}>
        <View style={Styles.current}>
          <View style={Styles.currentHeader}>
            <View style={{ flexDirection: 'row' }}>
              <Image source={Images.check} style={Styles.checkIcon} />
              <Text medium bold color={'#fff'} style={Styles.complete_text}>
                Complete
              </Text>
            </View>
            <Button
              light
              bold
              color={'#fff'}
              onPress={() => this.onEdit(item.index)}>
              Edit
            </Button>
          </View>
          <View style={Styles.currentDescView}>
            <Text medium color={Colors.Navy} style={Styles.currentTitle}>
              Activity {item.index + 1}: {item.stage}
            </Text>
            {item.index == 3 && (
              <Text center style={Styles.currentPrecomment}>
                {item.post_completion_text}
              </Text>
            )}
          </View>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ImageBackground
        source={Images.bg_discussion_starter}
        style={Styles.container}>
        <Loader loading={this.state.loaderVisible} />
        <ScrollView contentContainerStyle={Styles.contentView}>
          <Card
            topbar
            style={Styles.titleView}
            contentStyle={{ paddingVertical: deviceWidth(4) }}>
            <Text
              mediumLarge
              center
              color={Colors.Red}
              style={{ fontWeight: '300' }}>
              Your Results
            </Text>
          </Card>
          <FlatList
            data={this.state.startedActivities}
            renderItem={this.renderActivityItem.bind(this)}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={Styles.flatList}
            ListFooterComponent={() => (
              <View style={Styles.saveView}>
                <Text
                  medium
                  bold
                  center
                  color={Colors.Navy}
                  style={Styles.currentTitle}>
                  Save a copy of my results
                </Text>
                <Text center style={{ marginVertical: 8 }}>
                  Palliative Care Australia respects the privacy of all app
                  users and will not make any attempt to identify you.
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 8,
                    justifyContent: 'center'
                  }}>
                  <Button
                    dark
                    bold
                    buttonStyles={{ paddingHorizontal: 32 }}
                    onPress={this.onShareExport.bind(this)}>
                    Export
                  </Button>
                  {/* <Button
										dark
										bold
										buttonStyles={{ paddingHorizontal: 32 }}
										onPress={this.onShareEmail.bind(this)}
									>
										Email
									</Button> */}
                  <Button
                    light
                    bold
                    buttonStyles={{ paddingHorizontal: 32 }}
                    onPress={this.onExit.bind(this)}>
                    Exit
                  </Button>
                </View>
              </View>
            )}
          />
        </ScrollView>
        {/* <View style={Styles.buttonBar}>
					<Button light bold onPress={this.onExit.bind(this)}>
						Exit
					</Button>
				</View> */}
        <InfoAlert
          visible={this.state.modalVisible.exported}
          icon={Images.check}
          message='Exported'
          onCancel={() => this.closeModal()}
        />
        <InfoAlert
          visible={this.state.modalVisible.emailSent}
          icon={Images.check}
          message='Email sent'
          onCancel={() => this.closeModal()}
        />
      </ImageBackground>
    );
  }
}
