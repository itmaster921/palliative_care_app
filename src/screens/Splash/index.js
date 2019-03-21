import React, { Component } from "react";
import { Image, ImageBackground, Text, View, ScrollView } from "react-native";
import { MySpinner } from "@components";

import { Images } from "@theme";
import Styles from "./styles";
import { getBundle } from "@api";
import { deviceWidth, deviceHeight } from "@ResponsiveDimensions";

export default class Splash extends Component {
  state = {
    loading: true
  };

  async componentDidMount() {
    const { navigate } = this.props.navigation;
    let json = await getBundle();

    // alert(JSON.stringify(json))
    this.setState({ loading: false });

    navigate("OnBoardingScreen");
  }

  render() {
    return (
      <ImageBackground
        style={Styles.backgroundImage}
        source={Images.bg_splash_onboarding}
      >
        <ScrollView
          contentContainerStyle={Styles.scrollView}
          style={{ backgroundColor: "#0009" }}
        >
          {/* <View style={Styles.circle_above}>
            <Image source={Images.dtt_blue} style={Styles.pca_logo} />
          </View> */}
          <View style={Styles.center_view}>
            <Text style={Styles.app_name}>Talking in the Bush</Text>
            <Text style={Styles.text_desc}>
              Working out what is right for you at the end of your life
            </Text>
            {/* <Text style={Styles.text_website}>dyingtotalk.org.au</Text> */}
          </View>
          <View style={Styles.bottom_view}>
            <View style={Styles.circle_center}>
              <MySpinner
                loading={this.state.loading}
                size={deviceWidth(10)}
                style={Styles.spinner}
              />
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
