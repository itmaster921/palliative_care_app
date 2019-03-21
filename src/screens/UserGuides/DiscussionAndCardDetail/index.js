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
import Text from '@text'
import Button from '@button'
import Footer from '@footer'
import { Loader } from '@components';
import moment from 'moment';
import {Colors, Images, FontSizes} from '@theme';
const { width,height } = Dimensions.get('window');
import { MediaQuery } from "react-native-responsive";
import { responsiveWidth, responsiveHeight } from 'react-native-responsive-dimensions';

export default class DiscussionAndCardDetail extends Component {
    constructor(props) {
        super(props);
        this.state = ({
            loaderVisible: false
        })
    }

    componentDidMount() {

    }

    render() {

        return (
            <ImageBackground source={Images.bg_how_to} resizeMode="stretch" style={Styles.container} >

                <ScrollView contentContainerStyle={Styles.scroll}>

                            <Loader loading={this.state.loaderVisible}/>
                             <View style={Styles.titleView}>
                                <Text large style={Styles.title}>How to</Text>
                                <Text medium style={Styles.subtitle}>
                                    Using and getting the most out of the dying to talk app
                                </Text>
                            </View>
                            <MediaQuery minDeviceWidth={768}>
                                <View style={{flexDirection:'row'}}>
                                    <TouchableOpacity style={Styles.firstrowItem}>
                                        <Image source={Images.icon_professional} resizeMode='stretch' style={Styles.icon}/>
                                        <View style={Styles.cardView}>
                                            <Text medium style={Styles.cardtitle}>Professional</Text>
                                            <Image source={Images.icon_left_arrow} resizeMode='stretch'/>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Styles.firstrowItem} >             
                                        <Image source={Images.icon_community} resizeMode='stretch' style={[Styles.icon,{width:width/5,}]}/>
                                        <View style={Styles.cardView}>
                                            <Text medium style={Styles.cardtitle}>Community</Text>
                                            <Image source={Images.icon_left_arrow} resizeMode='stretch'/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </MediaQuery>
                            <MediaQuery maxDeviceWidth={767}>
                                <View >
                                    <TouchableOpacity style={Styles.firstrowItem}>
                                           
                                        <View style={Styles.cardView}>
                                            <Text medium style={Styles.cardtitle}>Professional</Text>
                                            <Image source={Images.icon_left_arrow} resizeMode='stretch'/>
                                        </View>
                                    </TouchableOpacity>

                                    <TouchableOpacity style={Styles.firstrowItem}>            
                                           
                                        <View style={Styles.cardView}>
                                            <Text medium style={Styles.cardtitle}>Community</Text>
                                            <Image source={Images.icon_left_arrow} resizeMode='stretch'/>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </MediaQuery>

                        </ScrollView>
                    <View style={Styles.buttonBackView}>
                        <Button light onPress={ ()=> this.props.navigation.goBack() } buttonStyles={Styles.buttonBack}>Go back</Button>
                    </View>
                </ImageBackground>
        );
    }
}