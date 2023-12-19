import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import {AppColor} from '../../Component/Color';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProgressBar = ({screen, Type}: any) => {
  console.log(screen);
  return (
    <SafeAreaView
      style={{
        //   flex: 1,
        alignSelf: 'flex-start',
        alignItems: 'center',
        width: DeviceWidth * 0.9,
        marginBottom: DeviceHeigth * 0.05,
        marginTop: Type ? DeviceHeigth * 0.03 : 0,
      }}>
      <View style={{flexDirection: 'row-reverse', alignSelf: 'flex-end'}}>
        <Text
          style={{
            color: '#83898C',
            fontFamily: 'Poppins',
            fontWeight: '400',
          }}>
          <Text style={{color: AppColor.RED}}>{`Step  ${screen} `}</Text>
          {Type ? 'of 6' : 'of 11'}
        </Text>
      </View>
      <View
        style={{
          width: DeviceWidth * 0.8,
          backgroundColor: '#E2E6F9',
          height: 5,
          borderRadius: 5,
          marginLeft: 40,
          marginTop: 5,
        }}>
        <View
          style={{
            width:
              screen == 0
                ? Type
                  ? '16.2%'
                  : '11%'
                : `${Type ? 17 * screen : 9 * screen}%`,
            backgroundColor: AppColor.RED,
            height: 5,
            borderRadius: 5,
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({});
