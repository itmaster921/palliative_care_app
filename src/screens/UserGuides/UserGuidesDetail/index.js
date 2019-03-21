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
import Footer from '@footer';
import { Colors, Images, FontSizes, htmlStyles, htmlRenderers } from '@theme';
import { Button, Card, Text } from '@components';
import { getUserGuides, API_HTML_ROOT } from '@api';
const { width, height } = Dimensions.get('window');
import {
  responsiveWidth,
  responsiveHeight
} from 'react-native-responsive-dimensions';
import { SharedModal } from '../../modals';
import HTML from 'react-native-render-html';
import { exportHelpPdf } from '@helppdf';
import { fixSpaceInHTML } from '@utils';
import { CDSingleView } from '../../CardGame/index';

export default class UserGuidesDetail extends Component {
  constructor(props) {
    super(props);
    const { userguideIndex } = this.props.navigation.state.params;
    this._share = this._share.bind(this);
    this._showResult = this._showResult.bind(this);
    this.state = {
      userguideIndex: userguideIndex,
      title: '',
      image: '',
      body: '',
      faqs: [],
      loaderVisible: true,
      modalVisible: false
    };
  }

  async componentDidMount() {
    const ds = await getUserGuides(true);
    const userguides = ds[0].guides;
    const userguide = userguides[this.state.userguideIndex];

    if (userguide.featured_image == null) {
      this.setState({
        title: userguide.title,
        body: userguide.body,
        faqs: userguide.faqs
      });
    } else {
      this.setState({
        title: userguide.title,
        body: userguide.body,
        faqs: userguide.faqs,
        image: API_HTML_ROOT + userguide.featured_image.url
      });
    }
  }

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

  renderFAQItem({ item, index }) {
    return (
      <View style={Styles.faqItem}>
        <View style={Styles.itemTitle}>
          <Text bold style={[Styles.txtQuestion]}>
            {index + 1}:{' '}
          </Text>
          <Text style={Styles.txtQuestion}> {item.question}</Text>
        </View>
        <Text style={[Styles.txtAnswer]}>{item.answer} </Text>
      </View>
    );
  }

  exportPage = async () => {
    await exportHelpPdf(this.state.title, this.state.body, this.state.faqs);
  };

  render() {
    return (
      <ImageBackground
        source={Images.bg_how_to}
        resizeMode='stretch'
        style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scroll}>
          <Card
            topbar={{ color: Colors.Navy }}
            style={Styles.titleView}
            contentStyle={Styles.title_content}>
            <Text large style={Styles.title}>
              Using this app
            </Text>
            <Text medium style={Styles.subtitle}>
              {this.state.title}
            </Text>
          </Card>

          <Card style={Styles.item} contentStyle={Styles.item_content}>
            <View style={Styles.viewBody}>
              <HTML
                html={fixSpaceInHTML(this.state.body)}
                tagsStyles={htmlStyles}
                onLinkPress={(e, url) => {
                  Linking.openURL(url).catch(err =>
                    console.error('An error occurred', err)
                  );
                }}
              />
            </View>

            {this.state.image == '' ? null : (
              <View style={Styles.viewImage}>
                <Image
                  style={[Styles.middleimage]}
                  source={{ uri: this.state.image }}
                  resizeMode='stretch'
                />
              </View>
            )}

            {this.state.faqs.length == 0 ? null : (
              <View>
                <View style={Styles.faqTitle}>
                  <Text bold>FAQ</Text>
                </View>

                <FlatList
                  data={this.state.faqs}
                  renderItem={this.renderFAQItem.bind(this)}
                  keyExtractor={(item, index) => index.toString()}
                  style={Styles.flatList}
                />
              </View>
            )}
          </Card>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button light bold onPress={() => this.props.navigation.goBack()}>
            Go back
          </Button>
          <Button bold light onPress={this.exportPage}>
            Export
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
