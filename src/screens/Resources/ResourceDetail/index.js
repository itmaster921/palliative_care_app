import React, { Component } from 'react';
import {
  Image,
  View,
  Linking,
  ScrollView,
  ImageBackground
} from 'react-native';

import Styles from './styles';
import Text from '@text';
import Button from '@button';
import HTML from 'react-native-render-html';
import { htmlStyles, htmlRenderers, Images } from '@theme';
import { getResources } from '@api';
import { fixSpaceInHTML } from '@utils';
import { exportHelpPdf } from '@helppdf';

var BASE_URL = 'https://pca.techequipt.com.au';

export default class ResourceDetail extends Component {
  constructor(props) {
    super(props);
    const { resourceIndex } = this.props.navigation.state.params;
    this.state = {
      resourceIndex: resourceIndex,
      title: '',
      subtitle: '',
      link: '',
      image: ''
    };
  }

  async componentDidMount() {
    const ds = await getResources();
    const resources = ds.resources;
    const resource = resources[this.state.resourceIndex];

    this.setState({
      title: resource.title,
      subtitle: resource.information_text,
      link: resource.link,
      image: resource.image ? BASE_URL + resource.image.url : ''
    });
  }

  exportPage = async () => {
    await exportHelpPdf(this.state.title, this.state.subtitle);
  };

  render() {
    return (
      <ImageBackground
        source={Images.bg_more_information}
        resizeMode='stretch'
        style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scroll}>
          <View style={Styles.titleView}>
            <Text large style={Styles.title}>
              {this.state.title}
            </Text>
          </View>

          <View style={[Styles.itemView]}>
            {this.state.image && (
              <Image
                style={[Styles.middleimage]}
                resizeMode='contain'
                source={{ uri: this.state.image }}
              />
            )}
            <HTML
              html={fixSpaceInHTML(this.state.subtitle)}
              // renderers = {htmlRenderers}
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
          <Button light bold onPress={() => this.props.navigation.goBack()}>
            Go back
          </Button>
          <View style={{ flex: 1 }} />
          <Button bold light onPress={this.exportPage}>
            Export
          </Button>
          {this.state.link == '' ? null : (
            <Button
              dark
              bold
              onPress={() =>
                Linking.openURL(this.state.link).catch(err =>
                  console.error('An error occurred', err)
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
