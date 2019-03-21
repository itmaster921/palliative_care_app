import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Image,
    View,
    Linking,
    ScrollView,
    Share,
    TouchableOpacity,
    Dimensions,
    WebView
} from 'react-native';

import Styles from './styles';
import Text from '@text'
import Footer from '@footer'
import Button from '@button'
import { Loader } from '@components';
import EmailModal from '../../modals/Email'
import EmailSentModal from '../../modals/EmailSent'

import { getGetHelp, API_HTML_ROOT} from "@api";
import HTMLView from 'react-native-htmlview';
import Communications from 'react-native-communications';
import {Colors} from '@theme';
var { width,height } = Dimensions.get('window');
var orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

function renderNode(node, index, siblings, parent, defaultRenderer) {

    if(Platform.OS === 'ios')
    {
        if (node.name == 'iframe') {
            var atribute = node.attribs;
            var iframeHtml = `<iframe width=\"${atribute.width}\" height=\"${atribute.height}\" src=\"${atribute.src}" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>`;
            return (
              <View key={index} style={{width: width/3.5, height: height/10.5}}>
                <WebView source={{html: iframeHtml}}/>
              </View>
            );
          }

        if (node.name == 'a') {
            var atribute = node.attribs;
            if(atribute.href.startsWith("https"))
            {
                var source = atribute.href;
                var aHtml = `<a href=\"${source}\" >${node.children[0].data}</a>`;
                return (
                    <HTMLView
                        value={aHtml}
                    />
                );
            }
            else
            {
                var source = API_HTML_ROOT + atribute.href;
                var aHtml = `<a href=\"${source}\" >${node.children[0].data}</a>`;
                return (
                    <HTMLView
                        value={aHtml}
                    />
                );
            }

        }
    }
    else
    {
        console.log(node);
        if (node.name == 'div') {
            var atribute = node.children[0].next.attribs;
            var iframeHtml = `<iframe src=\"${atribute.src}" width=\"${width/1.7}\" frameborder=\"0\" allow=\"autoplay; encrypted-media\" allowfullscreen></iframe>`;
            return (
              <View key={index} style={{height: height/4.3,}}>
                <WebView
                    source={{html: iframeHtml}}
                    style={{backgroundColor: Colors.backgroundSecondary}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}/>
              </View>
            );
        }
        if (node.name == 'p') {
             if(node.children[0] != null)
             {
                console.log(".......",node);
                if(node.children[0].name == 'a')
                {
                    var atribute = node.children[0].attribs;
                    if(atribute.href.startsWith("https"))
                    {
                        var source = atribute.href;
                        var aHtml = `<p><a href=\"${source}\" >${node.children[0].children[0].data}</a></p>`;
                        return (
                            <HTMLView
                                value={aHtml}
                            />
                        );
                    }
                    else
                    {
                        var source = API_HTML_ROOT + atribute.href;
                        var aHtml = `<p><a href=\"${source}\" >${node.children[0].children[0].data}</a></p>`;
                        return (
                            <HTMLView
                                value={aHtml}
                            />
                        );
                    }
                }
             }
        }
    }
    if (node.name == 'img') {
        var atribute = node.attribs;
        var source = API_HTML_ROOT + atribute.src;
        var imgHtml = `<img src=\"${source}\" width=\"${width/1.5}\" height=\"${height/2.7}\" >`;
        return (
            <HTMLView
                value={imgHtml}
            />
        );
    }
}

export default class UserGuidesDetail extends Component {
    constructor(props) {
        super(props);
        const {gethelpIndexes} = this.props.navigation.state.params
        this._share=this._share.bind(this);
        this._showResult=this._showResult.bind(this);
        this.state = ({
            gethelpIndexes: gethelpIndexes,
            title : '',
            logo : '',
            description : '',
            email : '',
            website : '',
            phonenumber : '',
            loaderVisible: true,
            modalVisible: {
                email: false,
                emailSent: false,
            },
        })
    }

    async componentDidMount() {
        const ds = await getGetHelp(true)
        const gethepls = ds[0].services
        const gethelp = gethepls[this.state.gethelpIndexes]


        this.setState({
            title : gethelp.title,
            logo : gethelp.logo,
            description : gethelp.description,
            email : gethelp.email_address,
            website : gethelp.website,
            phonenumber : gethelp.phone_number,
            loaderVisible: false
        })

        Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
        });
    }

    _showResult(result){
        if(result.action == "sharedAction")
        {
            alert("Your content has been share successfully.");
        }
        else
        {
            alert("You have cancelled sharing.");
        }
    }

    _share(){
        Share.share({
            message : 'Talking in the Bush',
            url : this.state.website
        }).then(this._showResult.bind(this));
    }

    onShareEmail() {
        this.setState({
            modalVisible: {
                share: false,
                downloaded: false,
                email: false,
                emailSent: false,
            }
        })
        setTimeout(()=>{
            this.setState({
                modalVisible: {
                    share: false,
                    downloaded: false,
                    email: true,
                    emailSent: false,
                }
            })
        }, 200)
    }

    onSendEmail(name, email){
        setTimeout(()=>{
            this.setState({
                modalVisible: {
                    share: false,
                    downloaded: false,
                    email: false,
                    emailSent: true,
                }
            })
        }, 1000)
    }

    onShareCancel() {
        this.setState({
            modalVisible: {
                share: false,
                downloaded: false,
                email: false,
                emailSent: false,
            }
        })
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
            <View style={[Styles.scrollcontainer]}>
               <ScrollView contentContainerStyle={Styles.scroll}>

                    <Loader loading={this.state.loaderVisible}/>
                    <View style={[Styles.itemTop,{paddingVertical : height/45,width : width/1.2,marginTop : width/25,}]}>
                        <Text bold style={[Styles.title,{fontSize:  orientation === 'PORTRAIT' ?  width/15 : height/15}]}>{this.state.title}</Text>
                    </View>

                    <View style={[Styles.itemBottom,{width : width/1.2,}]}>

                            {this.state.logo == null ?
                                <Image style={{ width:width/1.2,height:height/2.5,marginBottom : 8}} source={require('../../../../assets/images/default_appLogo.png')} resizeMode="stretch"/>
                                :
                                <Image style={{ width:width/1.2,height:height/2.5,marginBottom : 8}} source={{uri:  API_HTML_ROOT + this.state.logo.url}} resizeMode="stretch"/>
                            }

                        <View style={[Styles.viewBody,{marginHorizontal : width/9,}]}>
                            <HTMLView
                                value={this.state.description}
                                renderNode={renderNode}
                            />

                        </View>


                        {this.state.email == ''
                            ?
                            <View style={{flex:1}}>
                                <View style={{flexDirection : 'row',padding:10}}>

                                    <View style={Styles.contactView}>
                                        <View style={{justifyContent:'center'}}><Image source={require('../../../../assets/images/icon_call.png')}/></View>
                                        <Text style={Styles.contactText}>{this.state.phonenumber}</Text>
                                    </View>
                                    <View style={Styles.contactView}>
                                        <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_website.png')}/></View>
                                        <Text style={Styles.contactText}>{this.state.website}</Text>
                                    </View>

                                </View>
                                <View style={Styles.listitemBottomView}>
                                    <TouchableOpacity style={[Styles.buttonleft,{ width:width/2.6,height:  orientation === 'PORTRAIT' ? height/18 : width/18}]} onPress={() => Communications.phonecall(this.state.phonenumber, true)}>
                                        <View style={Styles.buttonView}>
                                            <View style={{justifyContent:'center'}}><Image source={require('../../../../assets/images/icon_call.png')}/></View>
                                            <Text style={[Styles.buttonText,{paddingHorizontal:width/50,fontSize:  orientation === 'PORTRAIT' ? width/30 : height/30}]}>CALL</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Styles.buttonright,{ width:width/2.2,height:  orientation === 'PORTRAIT' ? height/18 : width/18}]} onPress={ ()=> Linking.openURL(this.state.website) }>
                                        <View style={Styles.buttonView}>
                                            <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_website.png')}/></View>
                                            <Text style={[Styles.buttonText,{paddingHorizontal:width/50,fontSize:  orientation === 'PORTRAIT' ? width/30 : height/30}]}>WEBSITE</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            :

                            <View style={{flex:1}}>
                                <View style={{flexDirection : 'row',padding:10}}>

                                    <View style={Styles.contactView}>
                                        <View style={{justifyContent:'center'}}><Image source={require('../../../../assets/images/icon_call.png')}/></View>
                                        <Text style={[Styles.contactText,{paddingHorizontal:width/50,fontSize: orientation === 'PORTRAIT' ?  width/50 : height/50}]}>{this.state.phonenumber}</Text>
                                    </View>
                                    <View style={Styles.contactView}>
                                        <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_website.png')}/></View>
                                        <Text style={[Styles.contactText,{paddingHorizontal:width/50,fontSize: orientation === 'PORTRAIT' ?  width/50 : height/50}]}>{this.state.website}</Text>
                                    </View>
                                    <View style={Styles.contactView}>
                                        <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_email.png')}/></View>
                                        <Text style={[Styles.contactText,{paddingHorizontal:width/50,fontSize: orientation === 'PORTRAIT' ?  width/50 : height/50}]}>{this.state.email}</Text>
                                    </View>

                                </View>
                                <View style={Styles.listitemBottomView}>
                                    <TouchableOpacity style={[Styles.button,{width:width/3.6,height:  orientation === 'PORTRAIT' ?  height/18 : width/18}]} onPress={() => Communications.phonecall(this.state.phonenumber,true)}>
                                        <View style={Styles.buttonView}>
                                            <View style={{justifyContent:'center'}}><Image source={require('../../../../assets/images/icon_call.png')}/></View>
                                            <Text style={[Styles.buttonText,{paddingHorizontal:width/50,fontSize:  orientation === 'PORTRAIT' ? width/30 : height/30}]}>CALL</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Styles.buttonMiddle,{width:width/3.6,height:  orientation === 'PORTRAIT' ?  height/18 : width/18}]} onPress={ ()=> Linking.openURL(this.state.website) }>
                                        <View style={Styles.buttonView}>
                                            <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_website.png')}/></View>
                                            <Text style={[Styles.buttonText,{paddingHorizontal:width/50,fontSize:  orientation === 'PORTRAIT' ? width/30 : height/30}]}>WEBSITE</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[Styles.button,{width:width/3.6,height:  orientation === 'PORTRAIT' ?  height/18 : width/18}]} onPress={this.onShareEmail.bind(this)}>
                                        <View style={Styles.buttonView}>
                                            <View style={{justifyContent:'center'}}><Image  source={require('../../../../assets/images/icon_email.png')}/></View>
                                            <Text style={[Styles.buttonText,{paddingHorizontal:width/50,fontSize:  orientation === 'PORTRAIT' ? width/30 : height/30}]}>EMAIL</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                    </View>

                    <View style={[Styles.itemBottom,{width : width/1.2,}]}>
                        <View style={Styles.buttonContainer}>
                            <Button light onPress={ ()=> this.props.navigation.goBack() }>GO BACK</Button>
                            <View style={{flex:1}}/>
                            <Button dark  onPress={this._share}>SHARE</Button>
                        </View>
                    </View>
                    <EmailModal
                        visible={this.state.modalVisible.email}
                        onSend={this.onSendEmail.bind(this)}
                        onCancel={this.onShareCancel.bind(this)}
                        />
                    <EmailSentModal
                        visible={this.state.modalVisible.emailSent}
                        onCancel={this.onShareCancel.bind(this)}
                        />
                </ScrollView>
                </View>
            </View>
        );
    }
}