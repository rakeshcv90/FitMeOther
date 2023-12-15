import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState} from 'react';
import {DeviceHeigth, DeviceWidth} from './Config';
import {AppColor} from './Color';

import {localImage} from './Image';
import ProgressBar from '../Screen/Yourself/ProgressBar';

const FocuseAreaMale = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [imageView, setImageVIew] = useState([]);

  // const setImageFocusArea = (itemId, item) => {
  //   const index = selectedItems.indexOf(itemId);
  //   if (index === -1) {
  //     setSelectedItems([...selectedItems, itemId]);
  //     setImageVIew([...selectedItems, itemId]);
  //   } else {
  //     const newSelectedItems = [...selectedItems];
  //     newSelectedItems.splice(index, 1);
  //     setSelectedItems(newSelectedItems);
  //     setImageVIew(newSelectedItems);
  //   }
  // };
  const setImageFocusArea = (itemId, item) => {
    const index = selectedItems.indexOf(itemId);
    const newSelectedItems = [...selectedItems];
    const newImageVIew = [...imageView];
    if (index === -1) {
      newSelectedItems.push(itemId);
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

  const buttonName = [
    {
      id: 1,
      text1: 'Chest',
    },
    {
      id: 2,
      text1: 'Shoulder',
    },
    {
      id: 3,
      text1: 'Biceps',
    },
  ];
  const buttonName1 = [
    {
      id: 4,
      text1: 'Abs',
    },
    {
      id: 5,
      text1: 'Triceps',
    },
    {
      id: 6,
      text1: 'Legs',
    },
    // {
    //   id: 7,
    //   text1: 'Back',
    // },
  ];

  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            width: DeviceWidth / 2.7,
            height: DeviceHeigth,
            padding: 5,
          }}>
          <View style={{top: DeviceHeigth * 0.13, height: DeviceHeigth * 0.7}}>
            <FlatList
              data={buttonName}
              scrollEnabled={false}
              extraData={({item, index}) => index.toString()}
              renderItem={({item, index}) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.buttonView,
                      {
                        marginVertical: DeviceHeigth * 0.04,
                        left: -10,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? 'red' : AppColor.WHITE,
                      },
                    ]}
                    onPress={() => {
                      setImageFocusArea(item.id, item.text1);
                    }}>
                    <Text
                      style={{
                        color: '#505050',
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                      }}>
                      {item.text1}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
        <View
          style={{
            height: DeviceHeigth,
          }}>
          <View
            style={{
              height: DeviceHeigth * 0.7,
              left: -DeviceWidth * 0.09,
            }}>
            <Image
              source={{uri:'https://imagedelivery.net/PG2LvcyKPE1-GURD0XmG5A/25357fb6-c174-4a3d-995c-77641d9ea900/public'}}
              style={styles.Image}
              resizeMode="contain"
            />
          </View>
          {imageView != 0 && (
            <View>
              <View>
                {imageView.find(num => num === 'Chest') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.3,
                      height: DeviceHeigth * 0.3,
                      position: 'absolute',

                      left:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.05
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.09
                          : -DeviceHeigth * 0.05,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.54
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.56
                          : -DeviceHeigth * 0.53,
                    }}>
                    <Image
                      source={localImage.Chest}
                      style={[
                        styles.Image2,
                        {width: DeviceWidth * 0.4, height: DeviceHeigth * 0.07},
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Shoulder') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.31,
                      height: DeviceHeigth * 0.35,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.045
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.058
                          : -DeviceHeigth * 0.044,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.53
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.561
                          : -DeviceHeigth * 0.525,
                    }}>
                    <Image
                      source={localImage.Solder}
                      style={[styles.Image2, {height: DeviceHeigth * 0.05}]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Shoulder') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.31,
                      height: DeviceHeigth * 0.35,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? DeviceHeigth * 0.039
                          : DeviceHeigth == '1024'
                          ? DeviceHeigth * 0.049
                          : DeviceHeigth * 0.035,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.54
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.58
                          : -DeviceHeigth * 0.54,
                    }}>
                    <Image
                      source={localImage.Solder1}
                      style={[styles.Image2, {height: DeviceHeigth * 0.05}]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Biceps') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.2,
                      height: DeviceHeigth * 0.4,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? DeviceHeigth * 0.085
                          : DeviceHeigth == '1024'
                          ? DeviceHeigth * 0.12
                          : DeviceHeigth * 0.09,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.525
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.53
                          : -DeviceHeigth * 0.5,
                    }}>
                    <Image
                      source={localImage.Leg}
                      style={[
                        styles.Image2,
                        {
                          height: DeviceHeigth * 0.07,
                          width: DeviceWidth * 0.07,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Abs') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.2,
                      height: DeviceHeigth * 0.4,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.019
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.02
                          : -DeviceHeigth * 0.015,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.46
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.47
                          : -DeviceHeigth * 0.46,
                    }}>
                    <Image
                      source={localImage.Abs2}
                      style={[
                        styles.Image2,
                        {
                          height: DeviceHeigth * 0.065,
                          width: DeviceWidth * 0.2,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Triceps') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.2,
                      height: DeviceHeigth * 0.4,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? DeviceHeigth * 0.085
                          : DeviceHeigth == '1024'
                          ? DeviceHeigth * 0.11
                          : DeviceHeigth * 0.085,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.525
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.53
                          : -DeviceHeigth * 0.5,
                    }}>
                    <Image
                      source={localImage.Leg}
                      style={[
                        styles.Image2,
                        {
                          height: DeviceHeigth * 0.07,
                          width: DeviceWidth * 0.09,
                        },
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
              </View>
              <View>
                {imageView.find(num => num === 'Legs') && (
                  <View
                    style={{
                      width: DeviceWidth * 0.2,
                      height: DeviceHeigth * 0.4,
                      position: 'absolute',
                      left:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.055
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.084
                          : -DeviceHeigth * 0.048,
                      top:
                        Platform.OS == 'android'
                          ? -DeviceHeigth * 0.34
                          : DeviceHeigth == '1024'
                          ? -DeviceHeigth * 0.32
                          : -DeviceHeigth * 0.34,
                    }}>
                    <Image
                      source={localImage.Leg}
                      style={[
                        styles.Image2,
                        {height: DeviceHeigth * 0.1, width: DeviceWidth * 0.5},
                      ]}
                      resizeMode="contain"
                    />
                  </View>
                )}
                <View>
                  {imageView.find(num => num === 'Legs') && (
                    <View
                      style={{
                        width: DeviceWidth * 0.2,
                        height: DeviceHeigth * 0.4,
                        position: 'absolute',
                        left:
                          Platform.OS == 'android'
                            ? -DeviceHeigth * 0.032
                            : DeviceHeigth == '1024'
                            ? -DeviceHeigth * 0.065
                            : -DeviceHeigth * 0.033,
                        top:
                          Platform.OS == 'android'
                            ? -DeviceHeigth * 0.25
                            : DeviceHeigth == '1024'
                            ? -DeviceHeigth * 0.24
                            : -DeviceHeigth * 0.27,
                      }}>
                      <Image
                        source={localImage.Leg2}
                        style={[
                          styles.Image2,
                          {
                            height: DeviceHeigth * 0.1,
                            width: DeviceWidth * 0.5,
                          },
                        ]}
                        resizeMode="contain"
                      />
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </View>

        <View
          style={{
            width: DeviceWidth / 3,
            height: DeviceHeigth,
          }}>
          <View
            style={{
              top: DeviceHeigth * 0.08,
              height: DeviceHeigth * 0.7,
              left: -DeviceWidth * 0.11,
            }}>
            <FlatList
              data={buttonName1}
              scrollEnabled={false}
              extraData={({item, index}) => index.toString()}
              renderItem={({item, index}) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <TouchableOpacity
                    activeOpacity={0.7}
                    style={[
                      styles.buttonView,
                      {
                        marginVertical: DeviceHeigth * 0.04,
                        borderWidth: isSelected ? 1 : 0,
                        borderColor: isSelected ? 'red' : AppColor.WHITE,
                      },
                    ]}
                    onPress={() => {
                      setImageFocusArea(item.id, item.text1);
                    }}>
                    <Text
                      style={{
                        color: '#505050',
                        fontFamily: 'Poppins',
                        fontWeight: '500',
                      }}>
                      {item.text1}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
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
  buttonView: {
    width: DeviceWidth * 0.28,
    height: DeviceHeigth * 0.04,
    backgroundColor: AppColor.WHITE,

    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 50,

    // shadowColor: 'rgba(0, 0, 0, 1)',
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 1)',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.3,
        shadowRadius: 3,
      },
      android: {
        elevation: 4,
        shadowRadius: 3,
      },
    }),
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
    width: DeviceWidth * 0.4,
    height: DeviceHeigth * 0.7,
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
});
export default FocuseAreaMale;