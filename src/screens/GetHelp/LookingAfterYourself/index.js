import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  View,
  Linking,
  ScrollView,
  Share,
  FlatList,
  Dimensions,
  WebView,
  ImageBackground
} from 'react-native';

import Styles from './styles';
import Text from '@text';
import Footer from '@footer';
import Button from '@button';
import { Colors, Images, FontSizes } from '@theme';
import { Loader } from '@components';

const { width, height } = Dimensions.get('window');
import {
  responsiveWidth,
  responsiveHeight
} from 'react-native-responsive-dimensions';
import { SharedModal } from '../../modals';

export default class LookingAfterYourself extends Component {
  constructor(props) {
    super(props);
    this._share = this._share.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = {
      modalVisible: false
    };
  }

  componentDidMount() {}

  _showResult(result) {
    if (result.action == 'sharedAction') {
      this.setState({ modalVisible: true });
      console.log('Your content has been share successfully.');
    } else {
      console.log('You have cancelled sharing.');
    }
  }

  _share() {
    Share.share({
      message: 'Talking in the Bush',
      url: 'http://palliativecare.org.au'
    }).then(this._showResult.bind(this));
  }

  closeModal() {
    this.setState({
      modalVisible: false
    });
  }

  render() {
    return (
      <ImageBackground
        source={Images.bg_get_help}
        resizeMode='stretch'
        style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scroll}>
          <View style={Styles.titleView}>
            <Text large style={Styles.title}>
              Looking after yourself
            </Text>
          </View>

          <View style={[Styles.itemView]}>
            <Image
              style={[Styles.middleimage]}
              resizeMode='contain'
              source={Images.looking_after}
            />
            <Text smallMedium style={Styles.subtitle}>
              Many people who work in the health care sector do so with a desire
              to help others. For some clinicians this however can come at a
              cost to themselves and potentially, their personal relationships.
              It is important for clinicians to be aware of their own
              vulnerabilities, triggers, stress and compassion fatigue, and
              develop coping mechanisms to try and avoid burning out.
              Self-awareness is essential for the person themselves to monitor
              changes in their health and how this effects those around them
              such as their families, colleagues and patients. Therefore, people
              may undertake their own periodic self-reflection to gauge where
              they are at or to reflect on feedback from family or colleagues
              indicating they may need to consider their current resilience.
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              There are times in most clinicians careers that self-reflection
              alone may not be enough. Often support can be as simple an
              informal discussion with a colleague but support can also be found
              in more formalised discussions such as case debriefs, mentoring
              and clinical supervision to aid self-reflection and increase
              resilience. Most organisations will have internal policies and
              procedures in place to support staff wellbeing and care. Some may
              also have formal arrangements in place for staff to access
              external services for counselling and debriefing, which may have
              particular relevance following a distressing or problematic
              experience. These can be accessed through most Human Resources or
              Staff Health Departments.
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              Outside of their organisation there are alternatives that
              clinicians can access such as:
            </Text>

            <Text smallMedium style={Styles.subtitle}>
              {'\u25CF'} Speak with their own General Practitioner about what
              support may be available.
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              {'\u25CF'} Contact the CRANAplus’ Bush Support Service for
              24-hour/7-day phone counselling for rural and remote health
              practitioners on 1800 805 391.
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              {'\u25CF'} Contact the Doctors Health Advisory Service in your
              state or territory 24-hours/7-days – refer to the website for
              contact details http://www.adhn.org.au/
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              {'\u25CF'} Contact the RACGP GP Support Program (for RACGP
              members) by calling 1300 361 008 (Office hours are 8.30 am to 6.00
              pm Monday to Friday) or 1300 361 008 (24 hours/7 days) for crisis
              counselling.
            </Text>
            <Text smallMedium style={Styles.subtitle}>
              {'\u25CF'} Access the RACGP GP Self-care resource available at
              https://www.racgp.org.au/download/Documents/e-health/Self-care-and-mental-health-resources-for-general-practitioners.PDF
            </Text>
          </View>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button
            bold
            light
            onPress={() => this.props.navigation.navigate('Home')}>
            Go back
          </Button>
          <Button bold dark onPress={this._share}>
            Share
          </Button>
        </View>
        <SharedModal
          visible={this.state.modalVisible}
          onCancel={this.closeModal.bind(this)}
        />
      </ImageBackground>
    );
  }
}
