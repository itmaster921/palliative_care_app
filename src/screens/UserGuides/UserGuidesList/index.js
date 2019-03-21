import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  View,
  ScrollView,
  AsyncStorage,
  ImageBackground,
  Dimensions
} from 'react-native';

import Styles from './styles';
import Footer from '@footer';
import { Button, Loader, Card, Text } from '@components';
import { getUserGuides, updateTimeInterval } from '@api';
import moment from 'moment';
import { Colors, Images, FontSizes } from '@theme';
import { MediaQuery } from 'react-native-responsive';
import {
  responsiveWidth,
  responsiveHeight
} from 'react-native-responsive-dimensions';
import {
  deviceWidth,
  deviceHeight,
  windowHeight,
  windowWidth
} from '@ResponsiveDimensions';

const { width, height } = Dimensions.get('window');

export default class UserGuidesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userguideIndexes: [],
      loaderVisible: false
    };
  }

  async componentDidMount() {
    // try
    // {
    //     let value = await AsyncStorage.getItem('lastRefereshTimeUserGuide');

    //     if (value != null){
    //       // do something

    //         var currrentTime = moment(new Date()).format("HH:mm:ss");
    //         var startTime=moment(value, "HH:mm:ss");
    //         var endTime=moment(currrentTime, "HH:mm:ss");
    //         var duration = moment.duration(endTime.diff(startTime));
    //         var difference = moment.utc(+duration).format('H');

    //         if(difference >= updateTimeInterval)
    //         {
    //             this.setState({
    //                 loaderVisible: true
    //             })

    //             await AsyncStorage.setItem('lastRefereshTimeUserGuide', currrentTime);
    //             const ds = await getUserGuides()
    //             const userguides = ds[0].guides

    //             var userguideIndexes = [];
    //             for(var i = 0; i < userguides.length; i ++){
    //                 userguideIndexes.push(userguides[i]);
    //             }

    //             this.setState({
    //                 userguideIndexes: userguideIndexes,
    //                 loaderVisible: false
    //             })
    //         }
    //         else
    //         {

    //             const ds = await getUserGuides(true)
    //             const userguides = ds[0].guides

    //             var userguideIndexes = [];
    //             for(var i = 0; i < userguides.length; i ++){
    //                 userguideIndexes.push(userguides[i]);
    //             }

    //             this.setState({
    //                 userguideIndexes: userguideIndexes,
    //                 loaderVisible: false
    //             })
    //         }
    //     }
    //     else {
    //       // do something else
    //         this.setState({
    //             loaderVisible: true
    //         })

    //         var currrentTime = moment(new Date()).format("HH:mm:ss");
    //         await AsyncStorage.setItem('lastRefereshTimeUserGuide', currrentTime);
    //         const ds = await getUserGuides()
    //         const userguides = ds[0].guides

    //         var userguideIndexes = [];
    //         for(var i = 0; i < userguides.length; i ++){
    //             userguideIndexes.push(userguides[i]);
    //         }

    //         this.setState({
    //             userguideIndexes: userguideIndexes,
    //             loaderVisible: false
    //         })
    //     }
    // }
    // catch (error) {
    //   // Error retrieving data
    // }
    var json = await getUserGuides(true);
    if (!json) {
      this.setState({ loaderVisible: true });
      json = await getUserGuides(false);
      this.setState({ loaderVisible: false });
    }
    const userguides = json[0].guides;
    console.log(userguides);

    var userguideIndexes = [];
    for (var i = 0; i < userguides.length; i++) {
      userguideIndexes.push(userguides[i]);
    }
    this.setState({ userguideIndexes });
  }

  renderUserGuideItem({ item, index }) {
    const { navigate } = this.props.navigation;
    const first = index === 0;
    const second = index === 1;
    return (
      <View style={{ flex: 0.5 }}>
        {first ? (
          <Card
            topbar={{ color: Colors.Red }}
            style={Styles.item}
            contentStyle={Styles.item_content}
            onPress={() => {
              navigate('UserGuidesDetail', { userguideIndex: index });
            }}>
            <MediaQuery minDeviceWidth={768}>
              <View style={Styles.icon_wrap}>
                <Image source={Images.discussion_starter} style={Styles.icon} />
              </View>
              <View style={Styles.cardView}>
                <Text
                  smallmedium
                  bold
                  style={[Styles.cardtitle, { color: Colors.Red }]}>
                  {item.title}{' '}
                </Text>
              </View>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={767}>
              <View
                style={[Styles.cardView, { paddingVertical: deviceWidth(4) }]}>
                <Text
                  smallmedium
                  bold
                  style={[Styles.cardtitle, { color: Colors.Red }]}>
                  {item.title}{' '}
                </Text>
              </View>
            </MediaQuery>
          </Card>
        ) : second ? (
          <Card
            topbar={{ color: Colors.Red }}
            style={Styles.item}
            contentStyle={Styles.item_content}
            onPress={() => {
              navigate('UserGuidesDetail', { userguideIndex: index });
            }}>
            <MediaQuery minDeviceWidth={768}>
              <View style={Styles.icon_wrap}>
                <Image source={Images.cardgame} style={Styles.icon} />
              </View>
              <View style={Styles.cardView}>
                <Text
                  smallmedium
                  bold
                  style={[Styles.cardtitle, { color: Colors.Red }]}>
                  {item.title}{' '}
                </Text>
              </View>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={767}>
              <View
                style={[Styles.cardView, { paddingVertical: deviceWidth(4) }]}>
                <Text
                  smallmedium
                  bold
                  style={[Styles.cardtitle, { color: Colors.Red }]}>
                  {item.title}{' '}
                </Text>
              </View>
            </MediaQuery>
          </Card>
        ) : (
          <Card
            style={Styles.item}
            contentStyle={Styles.item_content}
            onPress={() => {
              navigate('UserGuidesDetail', { userguideIndex: index });
            }}>
            <MediaQuery minDeviceWidth={768}>
              <View
                style={[
                  Styles.cardView,
                  { paddingHorizontal: deviceWidth(0.5) }
                ]}>
                <View>
                  <Image
                    source={Images.icon_professional}
                    resizeMode='stretch'
                    style={Styles.smallIcon}
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingRight: deviceWidth(5)
                  }}>
                  <Text smallmedium bold style={[Styles.cardtitle]}>
                    {item.title}
                  </Text>
                </View>
              </View>
            </MediaQuery>
            <MediaQuery maxDeviceWidth={767}>
              <View style={Styles.cardView}>
                <Image
                  source={Images.icon_professional}
                  resizeMode='stretch'
                  style={Styles.smallIcon}
                />
                <Text smallmedium bold style={Styles.cardtitle}>
                  {item.title}
                </Text>
              </View>
            </MediaQuery>
          </Card>
        )}
      </View>
    );
  }

  render() {
    return (
      <ImageBackground
        source={Images.bg_how_to}
        resizeMode='stretch'
        style={Styles.container}>
        <ScrollView contentContainerStyle={Styles.scroll}>
          <Loader loading={this.state.loaderVisible} />
          <Card
            topbar={{ color: Colors.Navy }}
            style={Styles.titleView}
            contentStyle={Styles.title_content}>
            <Text large style={Styles.title}>
              Using this app
            </Text>
            <Text smallmedium style={Styles.subtitle}>
              Using and getting the most out of the Talking in the Bush app
            </Text>
          </Card>

          <MediaQuery minDeviceWidth={768}>
            <FlatList
              numColumns={2}
              columnWrapperStyle={{ justifyContent: 'center' }}
              data={this.state.userguideIndexes}
              renderItem={this.renderUserGuideItem.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />
          </MediaQuery>

          <MediaQuery maxDeviceWidth={767}>
            <FlatList
              numColumns={1}
              data={this.state.userguideIndexes}
              renderItem={this.renderUserGuideItem.bind(this)}
              keyExtractor={(item, index) => index.toString()}
            />
          </MediaQuery>
        </ScrollView>
        <View style={Styles.buttonBar}>
          <Button
            light
            bold
            onPress={() => this.props.navigation.navigate('Home')}>
            Go back
          </Button>
        </View>
      </ImageBackground>
    );
  }
}
