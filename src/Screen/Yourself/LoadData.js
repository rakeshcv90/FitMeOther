import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Animated,
  StyleSheet,
  Easing,
  TouchableOpacity,
  FlatList,
  Image,
  Dimensions,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import AnimatedLottieView from 'lottie-react-native';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import {AppColor} from '../../Component/Color';

import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);


const LoadData = () => {
  const buttonName = [
    {
      id: 1,
   
      image:require('../../Icon/Images/NewImage/testImage.png')
    },
    {
      id: 2,

      image:require('../../Icon/Images/NewImage/testImage1.png')
    },
    {
      id: 3,
 
      image:require('../../Icon/Images/NewImage/testImage2.png')
    },
    {
      id: 4,

      image:require('../../Icon/Images/NewImage/testImage3.png')
    },
    
  ];
  const buttonName1 = [
    {
      id: 1,
      image:require('../../Icon/Images/NewImage/testImage3.png')
   
    },
    {
      id: 2,

      image:require('../../Icon/Images/NewImage/testImage2.png')
    },
    {
      id: 3,
 
     
      image:require('../../Icon/Images/NewImage/testImage1.png')
    },
    {
      id: 4,
      image:require('../../Icon/Images/NewImage/testImage.png')
   
    },
    
  ];
  const translationX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    animateList();
  }, []);
  const animateList = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(translationX, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: true,
          easing: Easing.linear,
        }),
     
      ]),
    ).start();
 
  };

  const renderItem = ({item, index}) => {
  
  };
  const renderItem1 = ({item, index}) => {
    const translateX = translationX.interpolate({

      inputRange: [0, 1],
      outputRange: [-10, 300], // 
   
    });

    return (
      <Animated.View style={[styles.item, {transform: [{translateX}]}]}>
        <Image
          resizeMode="contain"
          source={item.image}
          style={{
            width: 70,
            height: 70,
          }}
        />
      </Animated.View>
    );
  };


  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar barStyle={'dark-content'} backgroundColor={'#fff'} />
      <View
        style={{
          width: DeviceWidth * 0.5,
          height: DeviceHeigth * 0.2,

          alignSelf: 'center',
          //backgroundColor: 'red',
        }}>
        <AnimatedLottieView
          source={require('../../Icon/Images/NewImage/circle.json')}
          resizeMode="contain"
          speed={1}
          autoPlay
          loop
          style={{
            width: DeviceWidth * 0.5,
            height: DeviceHeigth * 0.2,
          }}
        />
      </View>
      <Text style={styles.text}>49%</Text>
      <Text style={styles.text1}>Creating your personalized plan...</Text>
      <Text style={styles.text2}>10,00,000+</Text>
      <Text style={styles.text2}>Training Plan</Text>
      <Text
        style={[
          styles.text2,
          {
            color: AppColor.BLACK,
            marginTop: 20,
            fontSize: 20,
            fontWeight: '600',
          },
        ]}>
        Have Completed
      </Text>
      <View
        style={{
          width: '100%',
          height: DeviceHeigth * 0.15,
          marginTop: DeviceHeigth * 0.05,
        }}>
        <AnimatedFlatList
          data={buttonName}
          renderItem={({item, index})=>{
            console.log("dsvddsfdfsd",item)
            const translateX = translationX.interpolate({
        
              inputRange: [0, 1],
              outputRange: [10, -300], // 
           
            });
        
            return (
              <Animated.View style={[styles.item, {transform: [{translateX}]}]}>
                <Image
                  resizeMode="contain"
                  source={item.image}
                  style={{
                    width: 70,
                    height: 70,
                  }}
                />
              </Animated.View>
            );

          }}

          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>
      <View
        style={{
          width: '100%',
          height: DeviceHeigth * 0.15,
        }}>
        <AnimatedFlatList
          data={buttonName1}
          showsHorizontalScrollIndicator={false}
          renderItem={renderItem1}
          keyExtractor={(item, index) => index.toString()}
          horizontal
        />
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          //   onPress={() => navigation.goBack()}
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
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 30,
    fontFamily: 'Poppins',
    color: AppColor.BLACK,
  },
  text1: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 30,
    fontFamily: 'Poppins',
    color: '#424242',
    top: 10,
  },
  text2: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    lineHeight: 35,
    fontFamily: 'Poppins',
    color: 'rgb(197, 23, 20)',
    top: DeviceHeigth * 0.03,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (DeviceWidth * 85) / 100,
    alignItems: 'center',
    alignSelf: 'center',
    bottom:DeviceHeigth*0.05,
    position: 'absolute',
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
  item: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    marginLeft: 50,
    borderRadius: 20,
  },
});
export default LoadData;