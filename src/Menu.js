import React, { Component } from 'react';
import { View, Alert, Image, Dimensions, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Colors, Images, MediaQueries } from './theme';
import Icon from 'react-native-vector-icons/FontAwesome';
import Text from '@text';
import { deviceWidth, deviceHeight, windowHeight } from '@ResponsiveDimensions';
import { NavigationActions } from 'react-navigation';
import store from './Store';
import { ArrowText } from '@components';
import { MediaQueryStyleSheet } from 'react-native-responsive';
import {checkAndGo} from './Router';
let { width, height } = Dimensions.get('window');
const initialOrientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';

const CHECK_ROUTES = [ 'DiscussionStarter', 'CardGame' ];
export default class Menu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			orientation: initialOrientation
		};
	}

	goto(routeName, pageName) {
		this.props.navigation.navigate('DrawerClose');
		if (store.activeRoute == routeName && store.activePage == pageName) return;

		let goToRoute = (routeName, pageName) => {
			setTimeout(() => {
				var key = `${routeName} ${store.routesInStack.length}`;
				store.activeRoute = routeName;
				store.activePage = pageName;
				store.routesInStack.push(key);
				this.props.navigation.navigate(
					routeName,
					{
						pageName: pageName
					},
					null,
					key
				);
			}, 500);
		};

		checkAndGo(()=>{
			goToRoute(routeName, pageName);
		});
	}

	async componentDidMount() {
		Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			let newOrientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
			this.setState({
				orientation: newOrientation
			});
		});
	}

	goBackToOnboarding() {
		checkAndGo(()=>{
			const resetAction = NavigationActions.reset({
				index: 0,
				key: null,
				actions: [ NavigationActions.navigate({ routeName: 'OnBoardingScreen' }) ]
			});
			this.props.navigation.dispatch(resetAction);
		});
	}

	render() {
		return (
			<ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: Colors.darkNavy }}>
				<View
					style={{
						borderRadius: deviceWidth(15),
						backgroundColor: '#fff',
						justifyContent: 'center',
						alignItems: 'center',
						alignSelf: 'center',
						marginTop: deviceWidth(5),
						width: this.state.orientation == 'PORTRAIT' ? deviceWidth(30) : deviceWidth(18),
						height: this.state.orientation == 'PORTRAIT' ? deviceWidth(30) : deviceWidth(18)
					}}
				>
					<Image
						source={Images.dtt_blue}
						style={{
							resizeMode: 'contain',
							width: this.state.orientation == 'PORTRAIT' ? deviceWidth(23) : deviceWidth(15),
							height: this.state.orientation == 'PORTRAIT' ? deviceWidth(23) : deviceWidth(15)
						}}
					/>
				</View>
				<View style={styles.menu}>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('Page', 'about_this_app')}>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							About this app
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goBackToOnboarding()}>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							Welcome slides
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('DiscussionStarter')}>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							Use discussion starter
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity style={styles.menuItem} onPress={() => this.goto('CardGame')}>
						<ArrowText light bold color={Colors.white} style={styles.menuItemText}>
							Start discussion cards
						</ArrowText>
					</TouchableOpacity> */}
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('UserGuides')}>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							Using this app
						</Text>
					</TouchableOpacity>
					<TouchableOpacity style={styles.menuItem} onPress={() => this.goto('Resources')}>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							Resource library
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => this.goto('Page', 'looking_after_yourself')}
					>
						<Text light bold color={Colors.white} style={styles.menuItemText}>
							Looking after yourself
						</Text>
					</TouchableOpacity>
					{/* <TouchableOpacity style={styles.menuItem}>
						<ArrowText light bold color={Colors.white} style={styles.menuItemText}>
							Take our survey
						</ArrowText>
					</TouchableOpacity> */}
				</View>
				<Image source={Images.logo_footer} resizeMode={'contain'} style={styles.logo_pca} />
				<Image source={Images.flying_doctor_logo} resizeMode={'contain'} style={styles.logo_rfds} />
				<SafeAreaView style={{ backgroundColor: Colors.darkNavy }}>
					<View style={styles.footer}>
						<Text style={styles.text_footer}>
							Funded by the Australian Government through the Dementia and Aged Care Services Fund
						</Text>
					</View>
				</SafeAreaView>
			</ScrollView>
		);
	}
}

const styles = MediaQueryStyleSheet.create(
	{
		container: {
			flexGrow: 1,
			backgroundColor: Colors.Navy
		},

		icon_dtt: {
			tintColor: '#fff'
		},

		menu: {
			flex: 1,
			padding: 24
		},

		menuItem: {
			paddingVertical: deviceWidth(1.2)
		},

		menuItemText: {
			fontSize: 22
		},

		footer: {
			paddingHorizontal: 8,
			backgroundColor: Colors.darkNavy,
			justifyContent: 'center',
			alignItems: 'center',
			height: deviceHeight(6)
		},

		text_footer: {
			color: '#fff',
			fontSize: 13,
			fontStyle: 'italic',
			textAlign: 'center'
		},

		logo_pca: {
			width: deviceHeight(20),
			height: deviceHeight(5),
			marginBottom: deviceWidth(1),
			alignSelf: 'center'
		},

		logo_rfds: {
			width: deviceHeight(20),
			height: deviceHeight(5.5),
			marginBottom: deviceWidth(1),
			alignSelf: 'center'
		}
	},
	{
		[MediaQueries.iPhone]: {
			menuItemText: {
				fontSize: 18
			},

			footer: {
				height: deviceHeight(9)
			},

			text_footer: {
				fontSize: 12
			},

			logo_pca: {
				width: '90%',
				height: deviceHeight(8)
			},

			logo_rfds: {
				width: '90%',
				height: deviceHeight(9),
				marginBottom: deviceWidth(5)
			}
		}
	}
);
