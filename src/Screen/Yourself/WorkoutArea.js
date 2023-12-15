import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Animated,
  Image,
  Platform,
  ScrollView,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import ProgressBar from './ProgressBar';
import Bulb from './Bulb';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import LinearGradient from 'react-native-linear-gradient';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

import {localImage} from '../../Component/Image';

const WorkoutArea = ({route, navigation}) => {
  // const {nextScreen} = route.params;
  // const [screen, setScreen] = useState(nextScreen);
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageView, setImageVIew] = useState([]);

  const {getLaterButtonData} = useSelector(state => state);
  useEffect(() => {
    animateElement();
    animateElement1();
    animateElement2();
    animateElement3();
  }, []);
  const translateValue = useRef(
    new Animated.ValueXY({x: -DeviceWidth, y: -DeviceHeigth}),
  ).current;
  const animateElement = () => {
    Animated.timing(translateValue, {
      toValue: {x: 0, y: 0}, // Destination position (top: 100, left: 100)
      duration: 1500, // Animation duration in milliseconds
      useNativeDriver: true,
    }).start();
  };
  const translateValue1 = useRef(
    new Animated.ValueXY({x: DeviceWidth, y: DeviceHeigth}),
  ).current;
  const animateElement1 = () => {
    Animated.timing(translateValue1, {
      toValue: {x: 0, y: 0},
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  const translateValue2 = useRef(
    new Animated.ValueXY({x: DeviceWidth, y: -DeviceHeigth}),
  ).current;
  const animateElement2 = () => {
    Animated.timing(translateValue2, {
      toValue: {x: 0, y: 0},
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  const translateValue3 = useRef(
    new Animated.ValueXY({x: -DeviceWidth, y: DeviceHeigth}),
  ).current;
  const animateElement3 = () => {
    Animated.timing(translateValue3, {
      toValue: {x: 0, y: 0},
      duration: 1500,
      useNativeDriver: true,
    }).start();
  };
  const setImageFocusArea = item => {
    const index = selectedItems.indexOf(item);
    const newSelectedItems = [...selectedItems];
    const newImageVIew = [...imageView];
    if (index === -1) {
      newSelectedItems.push(item);
      newImageVIew.push(item);
    } else {
      newSelectedItems.splice(index, 1);

      const imageVIewIndex = newImageVIew.indexOf(item);
      if (imageVIewIndex !== -1) {
        newImageVIew.splice(imageVIewIndex, 1);
      }
    }

    setSelectedItems(newSelectedItems);
    setImageVIew(newImageVIew);
  };
  console.log('FDFDFDFFDFDFDFDFDFFD', imageView);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />

      <View style={{height: DeviceHeigth * 0.25}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            marginTop: DeviceHeigth * 0.02,
          }}>
          <ProgressBar screen={10} />
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',

            marginTop: -DeviceHeigth * 0.01,
          }}>
          <Bulb
            screen={'What’s your comfort place to workout ?'}
            header={'You can select any 2 options among below given options'}
          />
        </View>
      </View>
      <View style={{height: DeviceHeigth * 0.57}}>
        <ScrollView
          keyboardDismissMode="interactive"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}
          // style={{bottom: 10}}
          keyboardShouldPersistTaps="handled">
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              top: DeviceHeigth * 0.03,
            }}>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateValue.x},
                  {translateY: translateValue.y},
                ],
              }}>
              <TouchableOpacity
                style={[
                  styles.shadowProp,
                  {
                    borderWidth: imageView.find(num => num === 'AtHome') && 1,
                    borderColor: imageView.find(num => num === 'AtHome')
                      ? 'red'
                      : 'white',
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  setImageFocusArea('AtHome');
                }}>
                <Image
                  source={localImage.AtHome}
                  style={styles.Image23}
                  resizeMode="cover"
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#505050',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginTop: 8,
                    lineHeight: 21,
                  }}>
                  At Home
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateValue2.x},
                  {translateY: translateValue2.y},
                ],
              }}>
              <TouchableOpacity
                style={[
                  styles.shadowProp,
                  {
                    borderWidth: imageView.find(num => num === 'AtBed') && 1,
                    borderColor: imageView.find(num => num === 'AtBed')
                      ? 'red'
                      : 'white',
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  setImageFocusArea('AtBed');
                }}>
                <Image
                  source={{uri:'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/3b41e81c-2485-4abf-ccab-666d58453500/public'}}
                  style={styles.Image23}
                  resizeMode={DeviceHeigth == '1024' ? 'stretch' : 'cover'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#505050',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginTop: 10,
                    lineHeight: 21,
                  }}>
                  At Bed
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              top: DeviceHeigth * 0.05,
            }}>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateValue3.x},
                  {translateY: translateValue3.y},
                ],
              }}>
              <TouchableOpacity
                style={[
                  styles.shadowProp,
                  {
                    borderWidth: imageView.find(num => num === 'Outdoor') && 1,
                    borderColor: imageView.find(num => num === 'Outdoor')
                      ? 'red'
                      : 'white',
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  setImageFocusArea('Outdoor');
                }}>
                <Image
                  source={{uri:'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/7818f34a-c717-46f8-4fb0-ad52fae40700/public'}}
                  style={styles.Image23}
                  resizeMode={DeviceHeigth == '1024' ? 'stretch' : 'stretch'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#505050',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginTop: 10,
                    lineHeight: 21,
                  }}>
                  Outdoor
                </Text>
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              style={{
                transform: [
                  {translateX: translateValue1.x},
                  {translateY: translateValue1.y},
                ],
              }}>
              <TouchableOpacity
                style={[
                  styles.shadowProp,
                  {
                    borderWidth: imageView.find(num => num === 'Anywhere') && 1,
                    borderColor: imageView.find(num => num === 'Anywhere')
                      ? 'red'
                      : 'white',
                  },
                ]}
                activeOpacity={0.8}
                onPress={() => {
                  setImageFocusArea('Anywhere');
                }}>
                <Image
                  source={{uri:'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/130f304c-8239-49e7-3b5d-91922eee0f00/public'}}
                  style={styles.Image23}
                  resizeMode={DeviceHeigth == '1024' ? 'stretch' : 'stretch'}
                />
                <Text
                  style={{
                    fontSize: 15,
                    color: '#505050',
                    fontWeight: '500',
                    textAlign: 'center',
                    marginTop: 10,
                    lineHeight: 21,
                  }}>
                  Anywhwere
                </Text>
              </TouchableOpacity>
            </Animated.View>
          </View>
          <View
            style={{
              height:
                Platform.OS == 'android'
                  ? DeviceHeigth * 0.1
                  : DeviceHeigth * 0.08,
            }}></View>
        </ScrollView>
      </View>
      <View style={{height: DeviceHeigth * 0.18}}>
        <View style={styles.buttons}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              backgroundColor: '#F7F8F8',
              width: 45,
              height: 45,
              borderRadius: 15,
              overflow: 'hidden',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Icons name="chevron-left" size={25} color={'#000'} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              // toNextScreen()
            }}>
            <LinearGradient
              start={{x: 0, y: 1}}
              end={{x: 1, y: 0}}
              colors={['#941000', '#D5191A']}
              style={[styles.nextButton]}>
              <Icons name="chevron-right" size={25} color={'#fff'} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },

  imageView: {
    flexDirection: 'row',
    width: DeviceWidth,
    height: DeviceHeigth * 0.7,
  },
  shadow: {
    width: DeviceWidth,
  },
  Image: {
    width: 106,
    height: 106,
  },
  textStyle: {
    color: 'black',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    fontFamily: 'Poppins',
  },
  LoginText2: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: '#3A4750',
    lineHeight: 20,
  },
  Image2: {
    width: DeviceWidth * 0.2,
    height: DeviceHeigth * 0.1,
    marginLeft: DeviceWidth * 0.02,
  },
  TextView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (DeviceWidth * 85) / 100,
    alignItems: 'center',
    alignSelf: 'center',
    top: 20,
  },
  nextButton: {
    backgroundColor: 'red',
    width: 45,
    height: 45,
    borderRadius: 50 / 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  Image23: {
    width:
      Platform.OS == 'android'
        ? DeviceWidth * 0.392
        : DeviceHeigth == '1024'
        ? DeviceWidth * 0.395
        : DeviceWidth * 0.395,
    height: DeviceHeigth * 0.2,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // borderRadius: 20,
    borderColor: 'red',
  },
  shadowProp: {
    width: DeviceWidth * 0.399,
    //height: DeviceHeigth * 0.3,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'white',
    shadowColor: '#171717',
    backgroundColor: 'white',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default WorkoutArea;