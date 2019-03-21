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
    ImageBackground
} from 'react-native';

import Styles from './styles';
import Text from '@text'
import Footer from '@footer'
import { Loader } from '@components';
import { getResources,updateTimeInterval } from "@api";
import moment from 'moment'
import {Colors, Images, FontSizes} from '@theme';
import { MediaQuery } from "react-native-responsive";

export default class Resources extends Component {
    constructor(props) {
        super(props);
        Props=this.props;
        this.state = ({
            resourceIndexes: [],
            loaderVisible: false
        })
    }

    async componentDidMount() {

        var json = await getResources(true)
        if(!json){
            this.setState({loaderVisible: true})
            json = await getResources(false)
            this.setState({loaderVisible: false})
        }
        const resources = json.resources
        console.log(resources);

        var resourceIndexes = [];
        for(var i = 0; i < resources.length; i ++){
            resourceIndexes.push(resources[i]);
        }
        this.setState({resourceIndexes})

    }

    renderResourceItem({item, index}){
        const {navigate} = this.props.navigation
        return (

                <TouchableOpacity style={Styles.item} onPress={()=>{navigate("ResourceDetail", {resourceIndex: index})}}>
                    <View style={Styles.cardView}>
                        <Text smallmedium bold style={Styles.cardtitle}>{item.title}</Text>
                    </View>
                </TouchableOpacity>

        )
    }

    render() {
        return (

            <ImageBackground source={Images.bg_more_information} resizeMode="stretch" style={Styles.container} >

                <ScrollView contentContainerStyle={Styles.scroll}>
                    <Loader loading={this.state.loaderVisible}/>
                    <View style={Styles.titleView}>
                        <Text large style={Styles.title}>Resource library</Text>
                        <Text medium style={Styles.subtitle}>
                            Extra information and resources.
                        </Text>
                    </View>

                    <MediaQuery minDeviceWidth={768}>
                        <FlatList
                            numColumns = {2}
                            columnWrapperStyle = {{justifyContent:'center'}}
                            data = {this.state.resourceIndexes}
                            renderItem = {this.renderResourceItem.bind(this)}
                            keyExtractor={item => item.title}
                        />
                    </MediaQuery>

                    <MediaQuery maxDeviceWidth={767}>
                        <FlatList
                            numColumns = {1}
                            data = {this.state.resourceIndexes}
                            renderItem = {this.renderResourceItem.bind(this)}
                            keyExtractor={item => item.title}
                        />
                    </MediaQuery>

                </ScrollView>
            </ImageBackground>
        );
    }
}