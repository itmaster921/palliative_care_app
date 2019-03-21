import React, { Component } from 'react';
import {
  View,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  Linking
} from 'react-native';
import Styles from './styles';
import Text from '@text';
import Button from '@button';
import { htmlStyles, Images } from '@theme';
import { getApiData } from '@api';
import HTML from 'react-native-render-html';
import { API_HTML_ROOT } from '@api';
import store from '../../Store';
import { gotoHome } from 'router';
import { fixSpaceInHTML } from '@utils';

let { width } = Dimensions.get('window');

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageContent: ''
    };
  }

  async componentDidMount() {
    const { pageName } = this.props.navigation.state.params;
    const content = await getApiData(pageName);
    this.setState({ pageContent: content[0] });
  }

  render() {
    return (
      <ImageBackground
        source={Images.bg_navigation}
        resizeMode='stretch'
        style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scroll}>
          <View style={Styles.titleView}>
            <Text large center style={Styles.title}>
              {this.state.pageContent.title}
            </Text>
          </View>

          <View style={[Styles.itemView]}>
            {this.state.pageContent.featured_image_full ? (
              width <= 375 ? (
                <View style={Styles.featuredImage}>
                  <Image
                    source={{
                      uri:
                        API_HTML_ROOT +
                        this.state.pageContent.featured_image_600.url
                    }}
                    style={{
                      width: this.state.pageContent.featured_image_600.width,
                      height: this.state.pageContent.featured_image_600.height
                    }}
                  />
                </View>
              ) : (
                <View style={Styles.featuredImage}>
                  <Image
                    source={{
                      uri:
                        API_HTML_ROOT +
                        this.state.pageContent.featured_image_1200.url
                    }}
                    style={{
                      width: this.state.pageContent.featured_image_1200.width,
                      height: this.state.pageContent.featured_image_1200.height
                    }}
                  />
                </View>
              )
            ) : null}
            <HTML
              html={fixSpaceInHTML(this.state.pageContent.body)}
              tagsStyles={htmlStyles}
              onLinkPress={(e, url) => {
                Linking.openURL(url).catch(err =>
                  console.error('An error occurred', err)
                );
              }}
            />
          </View>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button
            bold
            light
            onPress={() => {
              gotoHome();
              store.activeRoute = null;
              store.routesInStack = [];
            }}>
            Go back
          </Button>
          {console.log(this.state)}
          {this.state.pageContent.read_more_url == '' ? null : (
            <Button
              dark
              bold
              onPress={() =>
                Linking.openURL(this.state.pageContent.read_more_url).catch(
                  err => console.error('An error occurred', err)
                )
              }>
              Find out more
            </Button>
          )}
        </View>
      </ImageBackground>
    );
  }
}
