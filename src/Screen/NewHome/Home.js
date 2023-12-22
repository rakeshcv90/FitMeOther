import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Animated,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AppColor} from '../../Component/Color';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import {localImage} from '../../Component/Image';
import LinearGradient from 'react-native-linear-gradient';
import VersionNumber from 'react-native-version-number';
import {
  Stop,
  Circle,
  Svg,
  Text as SvgText,
  LinearGradient as SvgGrad,
} from 'react-native-svg';

import {CircularProgressBase} from 'react-native-circular-progress-indicator';

const GradientText = ({item}) => {
  const gradientColors = ['#D01818', '#941000'];

  return (
    <View
      style={{
        marginTop: 20,
        marginLeft: DeviceWidth * 0.03,
        justifyContent: 'center',
      }}>
      <Svg height="40" width={DeviceWidth * 0.9}>
        <SvgGrad id="grad" x1="0" y1="0" x2="100%" y2="0">
          <Stop offset="0" stopColor={gradientColors[0]} />
          <Stop offset="1" stopColor={gradientColors[1]} />
        </SvgGrad>
        <SvgText
          fontFamily="Poppins"
          fontWeight={'600'}
          fontSize={23}
          fill="url(#grad)"
          x="10"
          y="25">
          {item}
        </SvgText>
      </Svg>
    </View>
  );
};
const Home = () => {
  const [currentindex, setCurrentIndex] = useState(1);
  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.35,
  };
  const progressAnimation = useRef(new Animated.Value(0)).current;

  const progressBarWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'extend',
  });

  Platform.OS == 'android'
    ? console.log('Android Version', VersionNumber.appVersion)
    : console.log('IOS Version', VersionNumber.appVersion,VersionNumber.bundleIdentifier);
  useEffect(() => {
    Animated.timing(progressAnimation, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false,
    }).start();
  }, [progressAnimation]);
  const colors = [
    {color1: '#E2EFFF', color2: '#9CC2F5', color3: '#425B7B'},
    {color1: '#BFF0F5', color2: '#8DD9EA', color3: '#1F6979'},
    {color1: '#FAE3FF', color2: '#C97FCD', color3: '#7C3D80'},
  ];

  const data = [
    {id: '1', title: 'Focus'},
    {id: '2', title: 'Deep'},
    {id: '3', title: 'Slee'},
    {id: '4', title: 'Test'},
  ];
  const data1 = [
    {id: '1', title: 'Single Arm\nBicep Curls'},
    {id: '2', title: 'Deep'},
    {id: '3', title: 'Slee'},
    {id: '4', title: 'Test'},
  ];
  const ListItem = ({title, color}) => (
    <LinearGradient
      start={{x: 0, y: 1}}
      end={{x: 1, y: 0}}
      colors={[color.color1, color.color2]}
      style={styles.listItem}>
      <Text
        style={[
          styles.title,
          {
            color: color.color3,
          },
        ]}>
        {title}
      </Text>
      <Image
        source={localImage.Money}
        style={[
          styles.img,
          {
            height: 30,
            width: 30,
          },
        ]}
        resizeMode="cover"></Image>
    </LinearGradient>
  );
  const getTimeOfDayMessage = () => {
    const currentHour = new Date().getHours() + 5;

    if (currentHour >= 5 && currentHour < 12) {
      return 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 17) {
      return 'Good Afternoon';
    } else if (currentHour >= 17 && currentHour < 21) {
      return 'Good Evening';
    } else {
      return 'Good Night';
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={styles.profileView}>
        <View style={styles.rewardView}>
          <Image
            source={localImage.Money}
            style={[
              styles.img,
              {
                height: 30,
                width: 30,
              },
            ]}
            resizeMode="cover"></Image>
          <Text style={styles.monetText}>500</Text>
        </View>
        <View style={styles.profileView1}>
          <Image
            source={localImage.avt}
            style={styles.img}
            resizeMode="cover"></Image>
        </View>
      </View>
      <GradientText item={getTimeOfDayMessage() + ', Jane'} />
      <ScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View style={styles.CardBox}>
          <Text style={styles.healthText}>Health Overview</Text>
          <View style={styles.healthView}>
            <View style={styles.stepView}>
              <Text style={styles.healthText1}>Steps</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={localImage.Step3}
                  // source={localImage.Money}
                  style={[
                    styles.img,
                    {
                      height: 35,
                      width: 25,
                      tintColor: '#5FB67B',
                    },
                  ]}
                  resizeMode="contain"></Image>
                <Text style={[styles.monetText, {color: '#5FB67B'}]}>
                  2215
                  <Text style={[styles.monetText, {color: '#505050'}]}>
                    /5000 steps
                  </Text>
                </Text>
              </View>
              <Text style={styles.healthText1}>Distance</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={localImage.Step2}
                  style={[
                    styles.img,
                    {
                      height: 27,
                      width: 20,
                    },
                  ]}
                  resizeMode="contain"></Image>
                <Text style={[styles.monetText, {color: '#FCBB1D'}]}>
                  2215
                  <Text style={[styles.monetText, {color: '#505050'}]}>
                    /5000 steps
                  </Text>
                </Text>
              </View>
              <Text style={styles.healthText1}>Calories</Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingBottom: 10,
                }}>
                <Image
                  source={localImage.Step1}
                  style={[
                    styles.img,
                    {
                      height: 27,
                      width: 20,
                    },
                  ]}
                  resizeMode="contain"></Image>
                <Text style={[styles.monetText, {color: '#D01818'}]}>
                  2215
                  <Text style={[styles.monetText, {color: '#505050'}]}>
                    /5000 steps
                  </Text>
                </Text>
              </View>
            </View>
            <View style={styles.stepImageView}>
              <CircularProgressBase
                {...props}
                value={80}
                radius={32}
                activeStrokeColor={'#941000'}
                inActiveStrokeColor={'#941000'}>
                <CircularProgressBase
                  {...props}
                  value={30}
                  radius={55}
                  activeStrokeColor={'#FCBB1D'}
                  inActiveStrokeColor={'#FCBB1D'}>
                  <CircularProgressBase
                    {...props}
                    value={62}
                    radius={80}
                    activeStrokeColor={'#397E54'}
                    inActiveStrokeColor={'#397E54'}
                  />
                </CircularProgressBase>
              </CircularProgressBase>
            </View>
          </View>
        </View>
        <Text style={styles.meditionText}>Meditation</Text>
        <View style={styles.meditionBox}>
          <FlatList
            data={data}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            renderItem={({item, index}) => {
              return (
                <ListItem
                  title={item.title}
                  color={colors[index % colors.length]}
                />
              );
            }}
          />
        </View>
        <Text
          style={[
            styles.meditionText,
            {
              top: DeviceHeigth * 0.07,
            },
          ]}>
          Workouts
        </Text>
        <View
          style={[
            styles.meditionBox,
            {
              top: DeviceHeigth * 0.09,
            },
          ]}>
          <FlatList
            data={data1}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <>
                  <LinearGradient
                    start={{x: 0, y: 1}}
                    end={{x: 1, y: 0}}
                    colors={[
                      colors[index % colors.length].color1,
                      colors[index % colors.length].color2,
                    ]}
                    style={styles.listItem1}>
                    <View>
                      <Text
                        style={[
                          styles.title,
                          {
                            color: colors[index % colors.length].color3,
                          },
                        ]}>
                        {item.title}
                      </Text>
                      <View style={{flexDirection: 'row', marginVertical: 10}}>
                        <View
                          style={{
                            width: DeviceWidth * 0.25,
                            height: DeviceHeigth * 0.05,
                            borderRadius: 10,
                            backgroundColor: 'red',
                          }}></View>
                        <View
                          style={{
                            width: DeviceWidth * 0.25,
                            height: DeviceHeigth * 0.05,
                            backgroundColor: 'red',
                            borderRadius: 10,
                            marginHorizontal: 10,
                          }}></View>
                      </View>
                    </View>

                    <Image
                      source={localImage.Money}
                      style={[
                        styles.img,
                        {
                          height: 100,
                          width: 100,
                          overflow: '',
                          alignSelf: 'center',
                          zIndex: 1,
                        },
                      ]}
                      resizeMode="contain"></Image>
                    <Image
                      source={localImage.Money}
                      style={[
                        styles.img,
                        {
                          height: 15,
                          width: 15,
                          top: -DeviceHeigth * 0.05,
                        },
                      ]}
                      resizeMode="contain"></Image>
                  </LinearGradient>
                </>
              );
            }}
          />

          <View
            style={{
              flexDirection: 'row',
              top: DeviceHeigth * 0.01,
              justifyContent: 'center',
            }}>
            {data.map((value, index) => (
              <View
                key={index}
                style={{
                  marginHorizontal: 5,
                  flexDirection: 'row',
                  height: 5,
                  width: 7,
                  borderRadius: 20,
                  backgroundColor: AppColor.GRAY2,
                }}></View>
            ))}
          </View>
        </View>
        <Text
          style={[
            styles.meditionText,
            {
              top: DeviceHeigth * 0.1,
            },
          ]}>
          Meals
        </Text>
        <View
          style={[
            styles.meditionBox,
            {
              top: DeviceHeigth * 0.12,
              marginBottom: DeviceHeigth * 0.1,
            },
          ]}>
          <FlatList
            data={data1}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.listItem2}>
                    <Image
                      source={localImage.Money}
                      style={[
                        styles.img,
                        {
                          height: 100,
                          width: 100,
                          overflow: '',
                          alignSelf: 'center',
                        },
                      ]}
                      resizeMode="contain"></Image>
                    <Text
                      style={[
                        styles.title,
                        {
                          color: colors[index % colors.length].color3,
                        },
                      ]}>
                      {item.title}
                    </Text>
                  </View>
                </>
              );
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
  },
  profileView: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    height: DeviceHeigth * 0.06,
    alignItems: 'center',
    top: DeviceHeigth * 0.02,
  },
  profileView1: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  img: {
    height: 50,
    width: 50,
    borderRadius: 100 / 2,
  },
  rewardView: {
    height: 40,
    width: 80,
    borderRadius: 30,
    borderColor: AppColor.RED,
    borderWidth: 1,
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 5,
  },
  monetText: {
    fontSize: 11,
    fontWeight: '700',
    lineHeight: 15,
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  CardBox: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    top: DeviceHeigth * 0.02,
    borderRadius: 10,
    paddingLeft: DeviceWidth * 0.04,

    shadowColor: 'rgba(0, 0, 0, 1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  healthText: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 18,
    fontSize: 14,
    color: AppColor.BoldText,
    marginTop: 10,
  },
  healthView: {
    flexDirection: 'row',
  },
  stepView: {
    width: '55%',
  },
  stepImageView: {
    height: DeviceHeigth * 0.2,
    justifyContent: 'center',
    width: DeviceWidth * 0.4,
    alignItems: 'center',
    paddingRight: DeviceWidth * 0.04,
  },
  healthText1: {
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: 15,
    fontSize: 12,
    color: AppColor.BoldText,
    marginVertical: DeviceHeigth * 0.01,
  },
  listItem: {
    width: DeviceWidth * 0.4,
    height: 60,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 27,
    fontFamily: 'Poppins',
  },
  meditionBox: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    top: DeviceHeigth * 0.05,
  },
  meditionText: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'white',
    top: DeviceHeigth * 0.03,
    justifyContent: 'center',
    color: AppColor.BoldText,
    fontFamily: 'Poppins',
    fontWeight: '700',
    lineHeight: 24,
    fontSize: 16,
  },

  listItem1: {
    width: DeviceWidth * 0.9,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listItem2: {
    width: DeviceWidth * 0.4,
    height: DeviceWidth * 0.4,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    marginBottom: 30,
    shadowColor: 'rgba(0, 0, 0, 1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});
export default Home;
