import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ImageBackground,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NewHeader from '../../Component/Headers/NewHeader';
import {DeviceHeigth, DeviceWidth} from '../../Component/Config';
import axios from 'axios';
import {AppColor} from '../../Component/Color';
import {NewApi, NewAppapi} from '../../Component/Config';
import ActivityLoader from '../../Component/ActivityLoader';
import AnimatedLottieView from 'lottie-react-native';
const WorkoutCategories = ({navigation}) => {
  const [WorkoutData, setWorkoutData] = useState([]);
  const [selectedButton, setSelectedButton] = useState('1');
  const [isLoaded, setLoaded] = useState(false);
  useEffect(() => {
    getData();
  }, [selectedButton]);
  const getData = async () => {
    setLoaded(true)
    try {
      let payload = new FormData();
      payload.append('id', 6);
      const data = await axios(`${NewApi}${NewAppapi.All_Workouts}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: payload,
      });
      setLoaded(false);
      // console.log('Workout response is', res.data.workout_details);
      if (data.data) {
        if (selectedButton == '1') {
          setWorkoutData(
            data.data.workout_details.filter(
              item => item.level_title == 'Beginner',
            ),
          );
          //setLoaded(true);
        } else if (selectedButton == '2') {
          setWorkoutData(
            data.data.workout_details.filter(
              item => item.level_title == 'Intermediate',
            ),
          );
          //setLoaded(true);
        } else if (selectedButton == '3') {
          setWorkoutData(
            data.data.workout_details.filter(
              item => item.level_title == 'Advanced',
            ),
          );
          // setLoaded(true);
        }
      } else {
        console.log('No data available');
        setLoaded(false);
      }
    } catch (error) {
      console.log('Workout Error', error);
    }
  };

  const handleButtonColor = ButtonNumber => {
    setSelectedButton(ButtonNumber);
    setLoaded(false);
  };
  const noData = () => {
    return (
      <View
        style={{
          alignItems: 'center',
          top:DeviceHeigth*0.1,
          height: DeviceHeigth,
      
        }}>
        <AnimatedLottieView
          source={require('../../Icon/Images/NewImage/NoData.json')}
          speed={2}
          autoPlay
          loop
          style={{width: DeviceWidth  *0.5, height: DeviceHeigth *0.5,}}
        />
      </View>
    );
  };
  return (
    <View style={[style.Container, {backgroundColor: AppColor.WHITE}]}>
      <NewHeader header={'Workout Categories'} backButton />
      {isLoaded ? <ActivityLoader /> : ''}
      <View style={style.buttonView}>
        <TouchableOpacity
          style={[
            style.Buttons,
            selectedButton == '1' ? {backgroundColor: AppColor.RED} : null,
          ]}
          onPress={() => {
            handleButtonColor('1');
          }}>
          <Text
            style={[
              ,
              selectedButton == '1'
                ? {color: AppColor.WHITE}
                : {color: AppColor.INPUTTEXTCOLOR},
                {fontFamily: 'Verdana',fontWeight:'600'},
            ]}>
            Beginner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.Buttons,
            selectedButton == '2' ? {backgroundColor: AppColor.RED} : null,
          ]}
          onPress={() => {
            handleButtonColor('2');
          }}>
          <Text
            style={[
              ,
              selectedButton == '2'
                ? {color: AppColor.WHITE}
                : {color: AppColor.INPUTTEXTCOLOR},
                {fontFamily: 'Verdana',fontWeight:'600'},
            ]}>
            Intermediate
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            style.Buttons,
            selectedButton == '3' ? {backgroundColor: AppColor.RED} : null,
          ]}
          onPress={() => {
            handleButtonColor('3');
          }}>
          <Text
            style={[
              ,
              selectedButton == '3'
                ? {color: AppColor.WHITE}
                : {color: AppColor.INPUTTEXTCOLOR},
                {fontFamily: 'Verdana',fontWeight:'600'},

            ]}>
            Advance
          </Text>
        </TouchableOpacity>
      </View>
      <View style={style.FlatListView}>
        <FlatList
          data={WorkoutData}
          renderItem={elements => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('WorkoutsDetails', {WorkoutData: elements.item});
              }}
              >
              <ImageBackground
                source={{uri: elements.item.image_path}}
                style={style.TextDesign}>
                <View style={style.LinearG}>
                  <View style={style.TitleText}>
                    <Text style={style.Text}>
                      {elements.item.workout_title}
                    </Text>
                    <Text
                      style={[style.Text, {fontSize: 14, fontWeight: 'bold'}]}>
                      {' '}
                      {elements.item.workout_duration}
                    </Text>
                  </View>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          ListEmptyComponent={noData}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  Container: {
    flex: 1,
  },
  buttonView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: DeviceHeigth * 0.03,
    marginHorizontal: DeviceWidth * 0.05,
  },
  Buttons: {
 
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F0F0F0',
    padding:15
  },
  TextStyle: {},
  Text: {
    color: 'white',
    fontFamily: 'Poppins',
    fontWeight: '600',
    marginLeft: 15,
    fontSize: 18,
    marginBottom: 5,
    width: (DeviceWidth * 70) / 100,
  },
  TextDesign: {
    height: (DeviceHeigth * 20) / 100,
    borderRadius: 8,
    overflow: 'hidden',
    margin: 15,
    resizeMode: 'contain',
  },
  LinearG: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    height: (DeviceHeigth * 20) / 100,
    justifyContent: 'flex-end',
    paddingBottom: 4,
  },
  FlatListView: {
    marginBottom: (DeviceHeigth * 2) / 100,
    flex: 1,
  },
  TitleText: {
    flexDirection: 'column',
  },
});
export default WorkoutCategories;
