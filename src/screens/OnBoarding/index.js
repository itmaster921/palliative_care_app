import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Image,
	ImageBackground,
	View,
	TouchableOpacity,
	Dimensions,
	ScrollView,
	Orientation
} from 'react-native';

import Styles from '@OnBoardingstyles';
let { width, height } = Dimensions.get('window'); // use for device height and width
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions'; // use for responsive screen UI
import { deviceWidth, deviceHeight, windowHeight, windowWidth } from '@ResponsiveDimensions';
import Button from '@button';
import Footer from '@footer';
import Text from '@text';
import { Colors, Images, FontSizes } from '@theme';
const initialOrientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
// let orientation = 'PORTRAIT';
let orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
let orientationWidth = width;

let swiperprops; // use to get props for navigating to home screen

/**
*  set constuctor and initial configuration of swiper
*/
class Swiper extends Component {
	constructor(props) {
		super(props);
	}

	// Props for ScrollView component
	static defaultProps = {
		// Arrange screens horizontally
		horizontal: true,
		// Scroll exactly to the next screen, instead of continous scrolling
		pagingEnabled: true,
		// Hide all scroll indicators
		showsHorizontalScrollIndicator: false,
		showsVerticalScrollIndicator: false,
		// Do not bounce when the end is reached
		bounces: false,
		// Do not scroll to top when the status bar is tapped
		scrollsToTop: false,
		// Remove offscreen child views
		removeClippedSubviews: true,
		// Do not adjust content behind nav-, tab- or toolbars automatically
		automaticallyAdjustContentInsets: false,
		// First is screen is active
		index: 0,
		// IMPORTANT Set this to the number of slides
		total: 5
	};

	componentDidMount() {
		Dimensions.addEventListener('change', ({ window: { width, height } }) => {
			orientation = width > height ? 'LANDSCAPE' : 'PORTRAIT';
		});
	}

	state = this.initState(this.props);

	/**
   * Initialize the state
   */
	initState(props) {
		// Current index
		const total = props.total;
		// Current index
		const index = total > 1 ? Math.min(props.index, total - 1) : 0;
		// Current offset
		const offset = width * index;

		const state = {
			total,
			index,
			offset,
			width,
			height
		};

		// Component internals as a class property,
		// and not state to avoid component re-renders when updated
		this.internals = {
			isScrolling: false,
			offset
		};

		return state;
	}

	/**
  * Scroll begin handler
  */
	onScrollBegin = (e) => {
		// Update internal isScrolling state
		this.internals.isScrolling = true;
	};

	/**
   * Scroll end handler
   */
	onScrollEnd = (e) => {
		// Update internal isScrolling state
		this.internals.isScrolling = false;

		// Update index
		this.updateIndex(
			e.nativeEvent.contentOffset
				? e.nativeEvent.contentOffset.x
				: // When scrolled with .scrollTo() on Android there is no contentOffset
					e.nativeEvent.position * orientationWidth
		);
	};

	/**
  * Drag end handler
  */
	onScrollEndDrag = (e) => {
		const { contentOffset: { x: newOffset } } = e.nativeEvent,
			{ children } = this.props,
			{ index } = this.state,
			{ offset } = this.internals;

		// Update internal isScrolling state
		// if swiped right on the last slide
		// or left on the first one
		if (offset === newOffset && (index === 0 || index === children.length - 1)) {
			this.internals.isScrolling = false;
		}
	};

	/**
  * Update index after scroll
  */
	updateIndex = (offset) => {
		const state = this.state,
			diff = offset - this.internals.offset,
			step = orientationWidth;
		let index = state.index;

		// Do nothing if offset didn't change
		if (!diff) {
			return;
		}

		// Make sure index is always an integer
		index = parseInt(index + Math.round(diff / step), 10);

		// Update internal offset
		this.internals.offset = offset;
		// Update index in the state
		this.setState({
			index
		});
	};

	/**
  * Swipe one slide forward
  */
	swipe = () => {
		console.log('swipe');
		console.log(this.internals.isScrolling);
		console.log(this.state.total);
		// Ignore if already scrolling or if there is less than 2 slides
		if (this.internals.isScrolling || this.state.total < 2) {
			return;
		}

		const state = this.state,
			diff = this.state.index + 1,
			x = diff * orientationWidth,
			y = 0;

		// Call scrollTo on scrollView component to perform the swipe
		this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

		// Update internal scroll state
		this.internals.isScrolling = true;

		// Trigger onScrollEnd manually on android
		if (Platform.OS === 'android') {
			setImmediate(() => {
				this.onScrollEnd({
					nativeEvent: {
						position: diff
					}
				});
			});
		}
	};

	/**
  * Swipe one slide forward
  */
	swipePrev = () => {
		// Ignore if already scrolling or if there is less than 2 slides
		if (this.internals.isScrolling || this.state.total < 2) {
			return;
		}

		const state = this.state,
			diff = this.state.index - 1,
			x = diff * orientationWidth,
			y = 0;

		// Call scrollTo on scrollView component to perform the swipe
		this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

		// Update internal scroll state
		this.internals.isScrolling = true;

		// Trigger onScrollEnd manually on android
		if (Platform.OS === 'android') {
			setImmediate(() => {
				this.onScrollEnd({
					nativeEvent: {
						position: diff
					}
				});
			});
		}
	};

	/**
  * Render pagination indicators
  */
	renderPagination = () => {
		if (this.state.total <= 1) {
			return null;
		}

		const ActiveDot = <View style={[ Styles.dot, Styles.activeDot ]} />,
			Dot = <View style={[ Styles.dot ]} />;

		let dots = [];

		for (let key = 0; key < this.state.total; key++) {
			dots.push(
				key === this.state.index
					? // Active dot
						React.cloneElement(ActiveDot, { key })
					: // Other dots
						React.cloneElement(Dot, { key })
			);
		}

		return (
			<View pointerEvents="none" style={[ Styles.pagination ]}>
				{dots}
			</View>
		);
	};

	/**
* Method to handle Done button click
*/
	onDone() {
		const { navigate } = swiperprops.navigation;
		navigate('DrawerStack');
	}

	/**
 * Render Next or Done button
 */
	renderButton = () => {
		return (
			<View pointerEvents="box-none">
				<View style={Styles.buttonContainer}>
					{this.state.index > 0 ? (
						<Button
							light
							bold
							textStyles={{ color: Colors.darkNavy }}
							buttonStyles={Styles.buttonPrev}
							onPress={() => this.swipePrev()}
						>
							Previous
						</Button>
					) : null}
					<Button
						dark
						bold
						textStyles={{ color: Colors.white }}
						buttonStyles={Styles.buttonNext}
						onPress={this.state.index === this.state.total - 1 ? () => this.onDone() : () => this.swipe()}
					>
						{this.state.index === this.state.total - 1 ? `Done` : `Next`}
					</Button>
				</View>
			</View>
		);
	};

	/**
  * Render ScrollView component
  */
	renderScrollView = () => {
		return (
			<ScrollView
				ref={(component) => {
					this.scrollView = component;
				}}
				{...this.props}
				onScrollBeginDrag={this.onScrollBegin}
				onMomentumScrollEnd={this.onScrollEnd}
				onScrollEndDrag={this.onScrollEndDrag}
			>
				{/* Slide 1 */}
				<View
					style={[ orientation == 'PORTRAIT' ? Styles.slide : Styles.slideLandscape, { width: width } ]}
					key="1"
				>
					<ImageBackground
						source={Images.onboarding_icon_background}
						resizeMode="stretch"
						style={Styles.middleimage}
					>
						<Image
							style={[ Styles.middleicon ]}
							resizeMode="contain"
							source={Images.onboarding_icon_logo}
						/>
					</ImageBackground>

					<View style={orientation == 'PORTRAIT' ? Styles.cardDetails : Styles.cardDetailsLandscape}>
						<View style={[ Styles.textView ]}>
							<Text smallMedium style={Styles.descText}>
								This app will help start conversations around end-of-life wishes and planning.
							</Text>
						</View>
						<View style={Styles.buttonpageView}>
							{this.renderButton()}
							{/* Render pagination */}
							{this.renderPagination()}
						</View>
					</View>
				</View>

				{/* Slide 2 */}
				<View
					style={[ orientation == 'PORTRAIT' ? Styles.slide : Styles.slideLandscape, { width: width } ]}
					key="2"
				>
					<ImageBackground
						source={Images.onboarding_icon_background}
						resizeMode="stretch"
						style={Styles.middleimage}
					>
						<Image
							style={[ Styles.middleicon ]}
							resizeMode="contain"
							source={Images.onboarding_icon_discussion}
						/>
					</ImageBackground>

					<View style={orientation == 'PORTRAIT' ? Styles.cardDetails : Styles.cardDetailsLandscape}>
						<View style={[ Styles.textView ]}>
							<Text smallMedium style={Styles.descText}>
								The discussion starter will guide you through talking about how you want to be cared for
								at the end of your life.
							</Text>
						</View>
						<View style={Styles.buttonpageView}>
							{this.renderButton()}
							{/* Render pagination */}
							{this.renderPagination()}
						</View>
					</View>
				</View>

				{/* Slide 3 */}
				<View
					style={[ orientation == 'PORTRAIT' ? Styles.slide : Styles.slideLandscape, { width: width } ]}
					key="3"
				>
					<ImageBackground
						source={Images.onboarding_icon_background}
						resizeMode="stretch"
						style={Styles.middleimage}
					>
						<Image
							style={[ Styles.middleicon ]}
							resizeMode="contain"
							source={Images.onboarding_icon_resources}
						/>
					</ImageBackground>

					<View style={orientation == 'PORTRAIT' ? Styles.cardDetails : Styles.cardDetailsLandscape}>
						<View style={[ Styles.textView ]}>
							<Text smallMedium style={Styles.descText}>
								You will find resources and more information to support you before, during and after
								this conversation.
							</Text>
						</View>
						<View style={Styles.buttonpageView}>
							{this.renderButton()}
							{/* Render pagination */}
							{this.renderPagination()}
						</View>
					</View>
				</View>

				{/* Slide 4 */}
				<View
					style={[ orientation == 'PORTRAIT' ? Styles.slide : Styles.slideLandscape, { width: width } ]}
					key="4"
				>
					<ImageBackground
						source={Images.onboarding_icon_background}
						resizeMode="stretch"
						style={Styles.middleimage}
					>
						<Image
							style={[ Styles.middleicon ]}
							resizeMode="contain"
							source={Images.onboarding_icon_padlock}
						/>
					</ImageBackground>

					<View style={orientation == 'PORTRAIT' ? Styles.cardDetails : Styles.cardDetailsLandscape}>
						<View style={[ Styles.textView ]}>
							<Text smallMedium style={Styles.descText}>
								Palliative Care Australia respects the privacy of all app users and will not make any
								attempt to identify you.
							</Text>
						</View>
						<View style={Styles.buttonpageView}>
							{this.renderButton()}
							{/* Render pagination */}
							{this.renderPagination()}
						</View>
					</View>
				</View>

				{/* Slide 5 */}
				<View
					style={[ orientation == 'PORTRAIT' ? Styles.slide : Styles.slideLandscape, { width: width } ]}
					key="5"
				>
					<ImageBackground
						source={Images.onboarding_icon_background}
						resizeMode="stretch"
						style={Styles.middleimage}
					>
						<Image
							style={[ Styles.middleicon ]}
							resizeMode="contain"
							source={Images.onboarding_icon_info}
						/>
					</ImageBackground>

					<View style={orientation == 'PORTRAIT' ? Styles.cardDetails : Styles.cardDetailsLandscape}>
						<View style={[ Styles.textView ]}>
							<Text smallMedium style={Styles.descText}>
								This resource should not be considered legal advice and is not an Advance Care Plan.
								People should always consult health care professionals for advice about their specific
								circumstances.
							</Text>
						</View>
						<View style={Styles.buttonpageView}>
							{this.renderButton()}
							{/* Render pagination */}
							{this.renderPagination()}
						</View>
					</View>
				</View>
			</ScrollView>
		);
	};

	onLayout(e) {
		width = Dimensions.get('window').width;
		height = Dimensions.get('window').height;

		if (orientation === 'LANDSCAPE') {
			orientationWidth = width;
			offset = orientationWidth * this.state.index;

			this.internals = {
				isScrolling: false,
				offset
			};

			(x = this.state.index * width), (y = 0);

			this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });

			this.forceUpdate();
		} else {
			orientationWidth = width;

			offset = orientationWidth * this.state.index;

			this.internals = {
				isScrolling: false,
				offset
			};

			(x = this.state.index * width), (y = 0);

			if (Platform.OS === 'ios') {
				setTimeout(() => {
					this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });
				}, 5);
			} else {
				this.scrollView && this.scrollView.scrollTo({ x, y, animated: true });
			}

			this.forceUpdate();
		}
	}

	/**
  * Render the component
  */
	render = ({ children } = this.props) => {
		return (
			<View style={Styles.container} onLayout={this.onLayout.bind(this)}>
				<ImageBackground source={Images.bg_splash_onboarding} resizeMode="stretch" style={Styles.background}>
					<ScrollView contentContainerStyle={Styles.scrollcontainer} style={{ backgroundColor: '#0009' }}>
						{/* Render screens */}
						<Text bold large style={Styles.titleText}>
							Talking in the Bush
						</Text>
						<View style={Styles.subTitleView}>
							<Text bold medium style={Styles.subTitleText}>
								Working out what is right for you at the end of your life
							</Text>
							{/* <Text bold medium style={Styles.subTitleText}>dyingtotalk.org.au</Text> */}
						</View>

						{this.renderScrollView(children)}

						<Button light bold color={Colors.white} onPress={() => this.onDone()}>
							Skip
						</Button>
					</ScrollView>
				</ImageBackground>
			</View>
		);
	};
}

/**
*  set constuctor and initial configuration of page
*/
export default class OnBoarding extends Component {
	constructor(props) {
		super(props);
		swiperprops = props;
	}

	/**
    * call just after load main view  
    */
	componentDidMount() {}

	onLayout(e) {
		width = Dimensions.get('window').width;
		height = Dimensions.get('window').height;

		this.forceUpdate();
	}

	/**
    * Render View with Swip
    */
	render() {
		return <Swiper onLayout={this.onLayout.bind(this)} />;
	}
}

// const Styles = StyleSheet.create({

// });
