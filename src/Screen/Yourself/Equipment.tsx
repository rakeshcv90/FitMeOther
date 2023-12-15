import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Animated,
  FlatList,
  Easing,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Image} from 'react-native';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import {AppColor} from '../../Component/Color';
import {localImage} from '../../Component/Image';
import LinearGradient from 'react-native-linear-gradient';
import ProgressBar from './ProgressBar';
import Bulb from './Bulb';
import {setLaterButtonData} from '../../Component/ThemeRedux/Actions';
import {useDispatch, useSelector} from 'react-redux';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';

const Equipment = ({route, navigation}: any) => {
  const {nextScreen} = route.params;

  const {defaultTheme, completeProfileData, getLaterButtonData} = useSelector(
    (state: any) => state,
  );
  console.log('DDDDDDDDD', getLaterButtonData);
  const dispatch = useDispatch();
  const [selected, setSelected] = useState('');
  const [screen, setScreen] = useState(nextScreen);
  const translateE = useRef(new Animated.Value(0)).current;
  const translateW = useRef(new Animated.Value(0)).current;
  const scaleSelected = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setScreen(nextScreen);
  }, []);
  const scaleSelectedInterpolate = scaleSelected.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.1], // Adjust the starting and ending scale factors as needed
  });
  const handleImagePress = (gender: string) => {
    // Set the selected gender
    const easing = Easing.linear(1);
    console.log(gender, selected, DeviceWidth / 2, -DeviceWidth * 0.4);
    if (gender === '') {
      Animated.parallel([
        Animated.timing(translateE, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
          delay: 250, // Delay the return to center animation for a smoother effect
        }),
        Animated.timing(translateW, {
          toValue: 0,
          // toValue: selected == 'M' ? 0 : DeviceWidth / 2,
          duration: 500,
          useNativeDriver: true,
          delay: 500, // Delay the return to center animation for a smoother effect
        }),
        Animated.timing(scaleSelected, {
          toValue: 0, // Adjust the scaling factor as needed
          duration: 500,
          useNativeDriver: true,
          easing: Easing.elastic(1),
        }),
      ]).start();
      setTimeout(() => {
        setScreen(screen - 1);
        setSelected('');
      }, 1000);
    } else {
      // Animate the translation of the unselected image
      Animated.parallel([
        Animated.timing(translateE, {
          toValue:
            gender == 'With\nEquipment' ? DeviceWidth * 0.2 : -DeviceWidth / 2,
          duration: 500,
          useNativeDriver: true,
          delay: gender == 'With\nEquipment' ? 0 : 500, // Delay the return to center animation for a smoother effect
        }),
        Animated.timing(translateW, {
          toValue:
            gender == 'Without\nEquipment'
              ? -DeviceWidth * 0.2
              : DeviceWidth / 2,
          duration: 500,
          useNativeDriver: true,
          delay: gender == 'Without\nEquipment' ? 500 : 0, // Delay the return to center animation for a smoother effect
        }),
        Animated.timing(scaleSelected, {
          toValue: 1, // Adjust the scaling factor as needed
          duration: 500,
          useNativeDriver: true,
          easing: Easing.elastic(1),
          delay: 1250,
        }),
      ]).start();
      setTimeout(() => {
        setSelected(gender);
        toNextScreen();
      }, 1000);
    }
  };
  const toNextScreen = () => {
    const currentData = {
      equipment: selected,
    };
    dispatch(setLaterButtonData([...getLaterButtonData, currentData]));
    navigation.navigate('FocusArea', {nextScreen: screen + 1});
  };
  const data = [
    {
      gender: 'M',
      name: 'With\nEquipment',
      image: localImage.WithEquipment,
      image2:
        'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/70caf85b-6425-4d62-b2c7-369917626900/public',
    },
    {
      gender: 'F',
      name: 'With\nEquipment',
      image: localImage.WithoutEquipment,
      image2:
        'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/29164007-f1a2-4a75-41e7-223b95196800/public',
    },
    {
      gender: 'M',
      name: 'Without\nEquipment',
      image: localImage.WithEquipment,
      image2:
        'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/8a2695c6-a5b5-47e2-d899-c827a0c26500/public',
    },
    {
      gender: 'F',
      name: 'Without\nEquipment',
      image: localImage.WithoutEquipment,
      image2:
        'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/7c1523d9-bdc7-4a38-af02-be1377509f00/public',
    },
  ];
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: 50,
        backgroundColor: AppColor.WHITE,
      }}>
      <ProgressBar screen={screen} />
      <Bulb
        screen={'Choose you fitness goal'}
        header={
          'We will filter unsuitable workouts for you, Also you can select 1 or 2 Injuries only'
        }
      />

      <View
        style={{
          // flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          height: DeviceHeigth * 0.6,
          width: DeviceWidth,
        }}>
        <FlatList
          data={data}
          horizontal
          scrollEnabled={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}: any) => {
            if (getLaterButtonData[0]?.gender != item?.gender) return;
            return (
              <TouchableOpacity
                onPress={() => selected == '' && handleImagePress(item?.name)}
                activeOpacity={1}>
                <Animated.View
                  style={{
                    width: DeviceWidth / 2,
                    height: DeviceHeigth * 0.6,
                    justifyContent: 'center',
                    alignItems: 'center',
                    transform: [
                      {
                        translateX:
                          item?.name == 'With\nEquipment'
                            ? translateE
                            : translateW,
                      },
                      {
                        scale:
                          item?.name == selected ? scaleSelectedInterpolate : 1,
                      },
                    ],
                  }}>
                  <Image
                    resizeMode="contain"
                    source={{uri: item?.image2}}
                    style={{
                      width: DeviceWidth * 0.45,
                      height: DeviceHeigth * 0.4,
                      alignSelf: 'flex-start',
                    }}
                  />
                  <View
                    style={{
                      backgroundColor: '#D9D9D9',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: 20,
                      padding: 5,
                      position: 'relative',
                      top: '4%',
                      left: '30%',
                      width: 30,
                      height: 30,
                    }}>
                    <Image
                      source={item?.image}
                      style={{width: 20, height: 20}}
                      resizeMode="contain"
                    />
                  </View>
                  <View
                    style={{
                      padding: 20,
                      borderRadius: 15,
                      borderWidth: item?.name == selected ? 1.5 : 1,
                      borderColor:
                        item?.name == selected ? AppColor.RED : '#404040',
                      alignItems: 'center',
                      justifyContent: 'center',
                      zIndex: -1,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        fontFamily: 'Poppins',
                        lineHeight: 18,
                        color: '#404040',
                        textAlign: 'center',
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={{
            backgroundColor: '#F7F8F8',
            width: 45,
            height: 45,
            borderRadius: 15,
            overflow: 'hidden',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() =>
            selected != '' ? handleImagePress('') : navigation.goBack()
          }>
          <Icons name="chevron-left" size={25} color={'#000'} />
        </TouchableOpacity>
        <TouchableOpacity disabled>
          {/* <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#941000', '#D5191A']}
            style={[styles.nextButton]}> */}
          <Icons name="chevron-right" size={25} color={'#fff'} />
          {/* </LinearGradient> */}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Equipment;

const styles = StyleSheet.create({
  box: {
    width: DeviceWidth * 0.8,
    height: DeviceHeigth / 10,
    borderRadius: 20,
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // overflow: 'hidden',
    backgroundColor: '#fff',
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
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (DeviceWidth * 85) / 100,
    alignItems: 'center',
    alignSelf: 'center',
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
});