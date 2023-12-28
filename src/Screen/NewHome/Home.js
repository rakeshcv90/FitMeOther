import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Image,
  FlatList,
  Animated,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {AppColor} from '../../Component/Color';
import {DeviceHeigth, DeviceWidth, NewAppapi} from '../../Component/Config';
import {localImage} from '../../Component/Image';
import LinearGradient from 'react-native-linear-gradient';

import VersionNumber from 'react-native-version-number';
import AskHealthPermissionAndroid from '../../Component/AndroidHealthPermission';
import AppleHealthKit from 'react-native-health';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Dropdown} from 'react-native-element-dropdown';
import {LineChart} from 'react-native-chart-kit';
import AnimatedLottieView from 'lottie-react-native';
import axios from 'axios';

import {
  Stop,
  Circle,
  Svg,
  Text as SvgText,
  LinearGradient as SvgGrad,
} from 'react-native-svg';
import {CircularProgressBase} from 'react-native-circular-progress-indicator';
import {navigationRef} from '../../../App';
import {useSelector} from 'react-redux';
import ActivityLoader from '../../Component/ActivityLoader';
import {showMessage} from 'react-native-flash-message';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import RoundedCards from '../../Component/RoundedCards';
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

const ProgressBar = ({progress, image, text}) => {
  return (
    <View
      style={[
        styles.progressBarContainer,
        {
          flexDirection: 'row',
          alignItems: 'center',
        },
      ]}>
      <View
        style={[
          styles.progressIndicator,
          {
            width: `${progress}%`,

            position: 'absolute',
          },
        ]}></View>
      <Image
        source={image}
        style={[
          styles.img,
          {
            height: 20,
            width: 20,
            marginHorizontal: 10,
          },
        ]}
        resizeMode="contain"></Image>
      <Text
        style={{
          fontSize: 12,
          fontWeight: '700',
          fontFamily: 'Poppins',
          lineHeight: 18,
        }}>
        {text}
      </Text>
    </View>
  );
};

const Home = ({navigation}) => {
  const [progress, setProgress] = useState(10);
  const [mealList, setMealLIst] = useState(10);
  const [forLoading, setForLoading] = useState(false);
  const [value, setValue] = useState('Weekly');
  const [currentindex, setCurrentIndex] = useState(1);
  const progressAnimation = useRef(new Animated.Value(0)).current;
  const {
    getLaterButtonData,
    completeProfileData,
    getUserID,
    getUserDataDetails,
    mindsetConsent,
    customWorkoutData,
  } = useSelector(state => state);

  useEffect(() => {
    if (Platform.OS == 'android') {
      AskHealthPermissionAndroid();
    } else {
      AppleHealthKit.isAvailable((err, available) => {
   
        const permissions = {
          permissions: {
            read: [
              AppleHealthKit.Constants.Permissions.DistanceWalkingRunning,
              AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
              AppleHealthKit.Constants.Permissions.Steps,
            ],
          },
        };
        if (err) {
          console.log('error initializing Healthkit: ', err);
        } else if (available == true) {
          AppleHealthKit.initHealthKit(permissions, error => {
            
            if (error) {
              console.log('[ERROR] Cannot grant permissions!', error);
            }
          });
        } else {
          Alert.alert(
            'Attention',
            "Health data can't be tracked in this Device due to its specifications",
            {},
          );
        }
      });
    }
  });

  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.35,
  };

  const data = [
    {id: '1', title: 'Focus'},
    {id: '2', title: 'Deep'},
    {id: '3', title: 'Slee'},
    {id: '4', title: 'Test'},
  ];
  const data1 = [
    
  ];
  const data2 = [
    {label: 'Weekly', value: '1'},
    {label: 'Daily', value: '2'},
  ];
  const progressBarWidth = progressAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
    extrapolate: 'extend',
  });
  useEffect(() => {
    Meal_List();
  }, []);
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
  const colors1 = [
    {color1: '#E7D9FB'},
    {color1: '#D7FBFF'},
    {color1: '#DFEEFE'},
  ];
  const Meal_List = async () => {
    setForLoading(true);
    try {
      const data = await axios(`${NewAppapi.Meal_Categorie}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          token: getUserDataDetails.login_token,
          version: VersionNumber.appVersion,
        },
      });
      if (data.data.categories.length > 0) {
        setForLoading(false);

        setMealLIst(data.data.categories);
      } else {
        setForLoading(false);
      }
    } catch (error) {
      setMealLIst([]);
      setForLoading(false);
      console.log('Meal List Error', error);
    }
  };
  const ListItem = ({title, color}) => (
    <TouchableOpacity
      onPress={() => {
        showMessage({
          message: 'Work in Progress',
          floating: true,
          duration: 500,
          type: 'info',
          icon: {icon: 'auto', position: 'left'},
        });
      }}>

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
          {title.workout_mindset_title}
        </Text>

        <Image
          source={
            title.workout_mindset_image_link != null
              ? {uri: title.workout_mindset_image_link}
              : localImage.Noimage
          }
          style={[
            styles.img,
            {
              height: 30,
              width: 30,
            },
          ]}
          resizeMode="cover"></Image>
      </LinearGradient>
    </TouchableOpacity>
  );
  const getTimeOfDayMessage = () => {
    const currentHour = new Date().getHours();

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

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  const emptyComponent = () => {

    return (
      <View
        style={{
        
       flex:1
        }}>
        <AnimatedLottieView
          source={require('../../Icon/Images/NewImage/NoData.json')}
          speed={2}
          autoPlay
          loop
          resizeMode="contain"
          style={{
            width: DeviceWidth * 0.3,
            height: DeviceHeigth * 0.15,
          
          }}
        />
      </View>
    );
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
        <TouchableOpacity
          style={styles.profileView1}
          onPress={() => {
            navigation.navigate('Profile');
          }}>
          <Image
            source={localImage.avt}
            style={styles.img}
            resizeMode="cover"></Image>
        </TouchableOpacity>
      </View>
      <GradientText
        item={getTimeOfDayMessage() + ', ' + getUserDataDetails.name}
      />
      {forLoading ? <ActivityLoader /> : ''}

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
  
        {mindsetConsent == false && (
          
          <>
            <View
              style={{
                flexDirection: 'row',
                width: '95%',
                alignSelf: 'center',
                top: DeviceHeigth * 0.03,
                justifyContent: 'space-between',
              }}>
              <Text
                style={{
                  color: AppColor.BoldText,
                  fontFamily: 'Poppins',
                  fontWeight: '700',
                  lineHeight: 24,
                  fontSize: 16,
                  // marginLeft:20,
                  justifyContent: 'flex-start',
                }}>
                Meditation
              </Text>
              <TouchableOpacity onPress={() => {}}>
                <Icons name="chevron-right" size={25} color={'#000'} />
              </TouchableOpacity>
            </View>
            <View style={styles.meditionBox}>
              <FlatList
                data={customWorkoutData?.minset_workout}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                ListEmptyComponent={emptyComponent}
                renderItem={({item, index}) => {
                  return (
                    <ListItem
                      title={item}
                      color={colors[index % colors.length]}
                    />
                  );
                }}
              />
            </View>
          </>
        )}

        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            top: DeviceHeigth * 0.03,
            justifyContent: 'space-between',
            top: DeviceHeigth * 0.07,
          }}>
          <Text
            style={{
              color: AppColor.BoldText,
              fontFamily: 'Poppins',
              fontWeight: '700',
              lineHeight: 24,
              fontSize: 16,
              // marginLeft:20,
              justifyContent: 'flex-start',
            }}>
            Workouts
          </Text>
          <TouchableOpacity
            onPress={() => {
              showMessage({
                message: 'Work in Progress',
                floating: true,
                duration: 500,
                type: 'info',
                icon: {icon: 'auto', position: 'left'},
              });
            }}>
            <Icons name="chevron-right" size={25} color={'#000'} />
          </TouchableOpacity>
        </View>
        <View
          style={[
            styles.meditionBox,
            {
              top: DeviceHeigth * 0.09,
            },
          ]}>
      
          <FlatList
            data={customWorkoutData?.workout}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            ListEmptyComponent={emptyComponent}
            pagingEnabled
            renderItem={({item, index}) => {
          
              return (
                <View
                  style={[
                    styles.listItem1,
                    {
                      backgroundColor: colors1[index % colors1.length].color1,
                      marginTop: 20,
                    },
                  ]}>
                  <View style={{marginVertical: 10}}>
                    <Text
                      style={[
                        styles.title,
                        {
                          color: AppColor.BoldText,
                          width:DeviceHeigth*0.2
                        },
                      ]}>
                      {item.workout_title}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginVertical: 10,
                      }}>
                      <View>
                        <ProgressBar
                          progress={progress}
                          image={localImage.Play}
                          text={'2 Min'}
                        />
                      </View>
                      <View style={{marginHorizontal: 10}}>
                        <ProgressBar
                          progress={progress}
                          image={localImage.Step1}
                          text={'100Kcal'}
                        />
                      </View>
                    </View>
                  </View>

                  <Image
                    source={localImage.GymImage}
                    style={{
                      height: DeviceHeigth * 0.2,
                      width: DeviceWidth * 0.35,

                      bottom: -50,
                      left: -30,
                      marginTop: -DeviceHeigth * 0.11,
                    }}
                    resizeMode="contain"></Image>
                  <TouchableOpacity
                    style={[
                      styles.img,
                      {
                        height: 25,
                        width: 25,
                        // backgroundColor:'red',
                        left: -45,
                        borderRadius: 0,
                        top: -DeviceHeigth * 0.055,
                      },
                    ]}
                    onPress={() => {
                      console.log('Fevvdsvdfvgfd', item);
                    }}>
                    <Image
                      source={localImage.dw7}
                      style={[
                        styles.img,
                        {
                          height: 25,
                          width: 25,
                          borderRadius: 0,
                          // tintColor:'red',
                        },
                      ]}
                      resizeMode="contain"></Image>
                  </TouchableOpacity>
                </View>
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

        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            top: DeviceHeigth * 0.03,
            justifyContent: 'space-between',
            top: DeviceHeigth * 0.11,
          }}>
          <Text
            style={{
              color: AppColor.BoldText,
              fontFamily: 'Poppins',
              fontWeight: '700',
              lineHeight: 24,
              fontSize: 16,
              // marginLeft:20,
              justifyContent: 'flex-start',
            }}>
            Meals
          </Text>
          <TouchableOpacity onPress={() => {}}>
            <Icons name="chevron-right" size={25} color={'#000'} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            styles.meditionBox,
            {
              top: DeviceHeigth * 0.12,
            },
          ]}>
          <FlatList
            data={mealList}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={item => item.id}
            pagingEnabled
            renderItem={({item, index}) => {
              return (
                <>
                  <View style={styles.listItem2}>
                    <Image
                      source={{uri: item.category_image}}
                      style={[
                        styles.img,
                        {
                          height: 70,
                          width: 70,
                          borderRadius: 140 / 2,
                          alignSelf: 'center',
                          top: -5,
                        },
                      ]}
                      resizeMode="cover"></Image>
                    <Text
                      style={[
                        styles.title,
                        {
                          fontSize: 13,
                          fontWeight: '500',
                          lineHeight: 18,
                          fontFamily: 'Poppins',
                          textAlign: 'center',
                          color: colors[index % colors.length].color3,
                        },
                      ]}>
                      {item.category_title}
                    </Text>
                  </View>
                </>
              );
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: '95%',
            alignSelf: 'center',
            alignItems: 'center',
            top: DeviceHeigth * 0.03,
            justifyContent: 'space-between',
            top: DeviceHeigth * 0.1,
          }}>
          <Text
            style={{
              color: AppColor.BoldText,
              fontFamily: 'Poppins',
              fontWeight: '700',
              lineHeight: 24,
              fontSize: 16,
              // marginLeft:20,
              justifyContent: 'flex-start',
            }}>
            Activities
          </Text>

          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            data={data2}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={value}
            value={value}
            onChange={item => {
              setValue(item.value);
            }}
            renderItem={renderItem}
          />
        </View>
        <View
          style={{
            top: DeviceHeigth * 0.11,
            width: '95%',
            // height: 200,
            marginBottom: DeviceHeigth * 0.08,
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <LineChart
            data={{
              labels: ['Sun', 'Mon', 'Tue', 'Thur', 'Fri', 'Sat'],
              datasets: [
                {
                  data: [100, 0, 0, 0, 0, 0],
                },
              ],
            }}
            width={DeviceWidth * 0.95}
            height={300}
            yAxisInterval={1}
            chartConfig={{
              backgroundColor: 'white',
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              decimalPlaces: 1,
              color: () => {
                '#efefef';
              },
              labelColor: () => {
                '#efefef';
              },
              style: {
                borderRadius: 20,
              },
              propsForDots: {
                r: '3',
                strokeWidth: '5',
                stroke: 'red',
              },
            }}
            bezier
            style={{
              borderRadius: 10,
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
    alignItems:'center'
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
    // paddingRight: 10,
    paddingBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  listItem2: {
    width: DeviceWidth * 0.3,
    height: DeviceWidth * 0.3,
    marginHorizontal: 10,
    borderRadius: 10,
    // paddingLeft: 10,
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
  progressBarContainer: {
    width: DeviceWidth * 0.25,
    height: DeviceHeigth * 0.05,
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: '#D018184D',
  },
  dropdown: {
    margin: 16,
    height: 30,
    width: DeviceWidth * 0.25,
    borderColor: 'red',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#000',
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
});
export default Home;
