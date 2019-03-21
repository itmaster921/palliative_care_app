import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    View,
    ScrollView,
    Dimensions,
    Linking,
    AsyncStorage
} from 'react-native';

import Styles from './styles';
import Text from '@text'
import Footer from '@footer'
import Button from '@button'
import { Loader } from '@components';
import { getGetHelp,updateTimeInterval,API_HTML_ROOT } from "@api";
import Communications from 'react-native-communications';
import moment from 'moment';
var { width,height } = Dimensions.get('window');
var orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

export default class GetHelpList extends Component {
    constructor(props) {
        super(props);
        this.state = ({
           gethelpIndexes: [],
           title : '',
           tagline : '',
           loaderVisible: false,
           Y:0,
           atBottomEnd:false,
           atTopEnd: true,
        })
    }

    async componentDidMount() {
        try
            {
                let value = await AsyncStorage.getItem('lastRefereshTimeGetHelp');

                if (value != null){

                    var currrentTime = moment(new Date()).format("HH:mm:ss");
                    var startTime=moment(value, "HH:mm:ss");
                    var endTime=moment(currrentTime, "HH:mm:ss");
                    var duration = moment.duration(endTime.diff(startTime));
                    var difference = moment.utc(+duration).format('H');

                    if(difference >= updateTimeInterval)
                    {
                        await AsyncStorage.setItem('lastRefereshTimeGetHelp', currrentTime);
                        const ds = await getGetHelp()
                        const gethelp = ds[0].services

                        var gethelpIndexes = [];
                        for(var i = 0; i < gethelp.length; i ++){
                            gethelpIndexes.push(gethelp[i]);
                        }

                        this.setState({
                            gethelpIndexes: gethelpIndexes,
                            title : ds[0].title,
                            tagline : ds[0].tagline,
                            loaderVisible: false
                        })
                    }
                    else
                    {
                        const ds = await getGetHelp(true)
                        const gethelp = ds[0].services

                        var gethelpIndexes = [];
                        for(var i = 0; i < gethelp.length; i ++){
                            gethelpIndexes.push(gethelp[i]);
                        }

                        this.setState({
                            gethelpIndexes: gethelpIndexes,
                            title : ds[0].title,
                            tagline : ds[0].tagline,
                            loaderVisible: false
                        })
                    }
                }
                else {
                    var currrentTime = moment(new Date()).format("HH:mm:ss");
                    await AsyncStorage.setItem('lastRefereshTimeGetHelp', currrentTime);
                    const ds = await getGetHelp()
                    const gethelp = ds[0].services

                    var gethelpIndexes = [];
                    for(var i = 0; i < gethelp.length; i ++){
                        gethelpIndexes.push(gethelp[i]);
                    }

                    this.setState({
                        gethelpIndexes: gethelpIndexes,
                        title : ds[0].title,
                        tagline : ds[0].tagline,
                        loaderVisible: false
                    })
                }
            }
            catch (error) {
              // Error retrieving data
            }

            Dimensions.addEventListener('change', ({ window: { width, height } }) => {
              orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

            });
    }

    renderGetHelpItem({item, index}){
        const {navigate} = this.props.navigation

        return (
            <View style={[Styles.listitem,{ width : width/1.3,}]} onLayout={this.onLayout.bind(this)}>
                    <View style={Styles.listitemTopView}>
                        {item.logo == null ?
                            <Image style={{ width:width/2.5,height:height/5}} source={require('../../../../assets/images/default_appLogo.png')} resizeMode="stretch"/>
                            :
                            <Image style={{ width:width/2.5,height:height/5}} source={{uri:  API_HTML_ROOT + item.logo.url}} resizeMode="stretch"/>
                        }
                        <View style={[Styles.listTitleView,{ marginLeft:width/25,}]}>
                            <Text bold style={[Styles.listTitle,{ fontSize: orientation === 'PORTRAIT' ? width/25 : height/25}]}>{item.title}</Text>
                            <Text  style={[Styles.listDesc,{fontSize: orientation === 'PORTRAIT' ? width/30 : height/30}]}>{item.short_description}</Text>
                        </View>
                    </View>
                    <View style={Styles.listitemBottomView}>
                        <TouchableOpacity style={[Styles.listButton,{ width:width/4.05,height: orientation === 'PORTRAIT' ? height/18 : width/18}]} onPress={() => Communications.phonecall(item.phone_number, true)}>
                            <View style={Styles.listButtonView}>
                                <View style={{justifyContent:'center'}}><Image source={require('../../../../assets/images/icon_call.png')}/></View>
                                <Text style={[Styles.listButtonText,{ fontSize: orientation === 'PORTRAIT' ? width/30 : height/30,paddingHorizontal:width/50,}]}>CALL</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.listButtonMiddle,{ width:width/3.6,height: orientation === 'PORTRAIT' ? height/18 : width/18}]} onPress={ ()=> Linking.openURL(item.website) }>
                            <View style={Styles.listButtonView}>
                                <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_website.png')}/></View>
                                <Text style={[Styles.listButtonText,{ fontSize: orientation === 'PORTRAIT' ? width/30 : height/30,paddingHorizontal:width/50,}]}>WEBSITE</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={[Styles.listButton,{ width:width/4.05,height: orientation === 'PORTRAIT' ? height/18 : width/18}]} onPress={() => {navigate("GetHelpDetail", {gethelpIndexes: index})}}>
                            <View style={Styles.listButtonView}>
                                <Text style={[Styles.listButtonText,{ fontSize: orientation === 'PORTRAIT' ? width/30 : height/30,paddingHorizontal:width/50,}]}>VIEW</Text>
                                <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_view.png')}/></View>
                            </View>
                        </TouchableOpacity>
                    </View>
            </View>
        )
    }



    onScroll(event) {
        if(event.nativeEvent.contentOffset.y >= event.nativeEvent.contentSize.height - height/1.2)
        {
            this.setState({
                atBottomEnd: true,
                atTopEnd: false
            })
        }
        else if(this.state.Y <= 0)
        {
            this.setState({
                atBottomEnd: false,
                atTopEnd: true
            })
        }
        else
        {
            this.setState({
                atBottomEnd: false,
                atTopEnd: false
            })
        }
    }

    scrollDown(){
        if(!this.state.atBottomEnd)
        {
            this.setState({Y:this.state.Y + height/1.3})

            setTimeout(() => {
                    this.refs.scrollView.scrollTo({y: this.state.Y})
            }, 10)
        }
    }

    scrollUp(){

        if(!this.state.atTopEnd)
        {
            this.setState({Y:this.state.Y - height/1.3})

            setTimeout(() => {
                this.refs.scrollView.scrollTo({y: this.state.Y})
            }, 10)
        }
    }

    onLayout(e) {

        height = Dimensions.get('window').height;
        width = Dimensions.get('window').width;
        this.setState({
                        gethelpIndexes: this.state.gethelpIndexes,
                    })
         this.forceUpdate();
    }

    render() {
        return (
            <View style={Styles.container} onLayout={this.onLayout.bind(this)}>
                <View style={[Styles.scrollcontainer,{paddingHorizontal:width/25}]}>
                        <ScrollView contentContainerStyle={[Styles.scroll,{marginLeft:width/20}]} ref="scrollView" onScroll={this.onScroll.bind(this)} scrollEnabled={false}>
                            <Loader loading={this.state.loaderVisible}/>

                            <View style={[Styles.item,{ width : width/1.3, paddingVertical : height/45,marginTop : width/25,}]}>
                                <Text bold style={[Styles.title,{ fontSize: orientation === 'PORTRAIT' ? width/15 : height/15}]}>{this.state.title}</Text>
                                <Text style={[Styles.subtitle,{fontSize: orientation === 'PORTRAIT' ? width/25 : height/25, marginBottom: height/50,}]}>
                                    {this.state.tagline}
                                </Text>
                            </View>

                            <FlatList
                                scrollEnabled={false}
                                data = {this.state.gethelpIndexes}
                                extraData={this.state}
                                renderItem = {this.renderGetHelpItem.bind(this)}
                                keyExtractor = {(index) => index.toString()}
                            />

                        </ScrollView>

                        <View style={{justifyContent:'space-between'}}>
                            <TouchableOpacity  onPress={this.scrollUp.bind(this)}>
                                 <Image style={{width:orientation === 'PORTRAIT' ? width/15 : height/15,height: orientation === 'PORTRAIT' ? width/15 : height/15,marginTop:height/35,marginBottom:height/40, }} source={require('../../../../assets/images/up_arrow.png')} resizeMode="stretch"/>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={this.scrollDown.bind(this)}>
                                 <Image style={{width:orientation === 'PORTRAIT' ? width/15 : height/15,height: orientation === 'PORTRAIT' ? width/15 : height/15,marginTop:height/35,marginBottom:height/40, }} source={require('../../../../assets/images/down_arrow.png')}/>
                            </TouchableOpacity>
                        </View>

                </View>
            </View>
        );
    }
}