import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {AppColor} from '../../../Component/Color';
import ExerciseProgressBar from './ExerciseProgressBar';
import {DeviceHeigth, DeviceWidth, NewAppapi} from '../../../Component/Config';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntIcons from 'react-native-vector-icons/AntDesign';
import Video from 'react-native-video';
import Play from './Play';
import BottomSheetExercise from './BottomSheetExercise';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import WorkoutsDescription from '../WorkoutsDescription';
import GradientText from '../../../Component/GradientText';
import ProgreesButton from '../../../Component/ProgressButton';

const Exercise = ({navigation, route}: any) => {
  const {allExercise, currentExercise, data, day} = route.params;
  const VideoRef = useRef();
  const [visible, setVisible] = useState(false);
  const [playW, setPlayW] = useState(0);
  const [number, setNumber] = useState(0);
  const [pause, setPause] = useState(false);
  const [open, setOpen] = useState(false);
  const [back, setBack] = useState(false);
  const [timer, setTimer] = useState(5);
  const [restStart, setRestStart] = useState(false);
  const [isAPICalling, setAPICalling] = useState(false);
  const [currentData, setCurrentData] = useState(currentExercise);

  const {allWorkoutData, getUserDataDetails} = useSelector(
    (state: any) => state,
  );
  const dispatch = useDispatch();
  // console.log((100 / parseInt(currentData?.exercise_rest)))
  useEffect(() => {
    console.log(restStart, timer, playW);
    restStart
      ? setTimeout(() => {
          if (timer <= 0) {
            if (number == allExercise?.length - 1) return;
            setRestStart(false);
            const index = allExercise?.findIndex(
              (item: any) => item?.exercise_id == currentData?.exercise_id,
            );
            setCurrentData(allExercise[index + 1]);
            setPlayW(0);
            setNumber(number + 1);
            setTimer(5);
          } else setTimer(timer - 1);
        }, 1000)
      : setTimeout(() => {
          if (pause)
            setPlayW(playW + 100 / parseInt(currentData?.exercise_rest));
          if (playW >= 100 && number < allExercise?.length - 1) {
            console.log(number + 1, allExercise?.length);
            setPause(false);
            postCurrentDayAPI(number);
          } else if (playW >= 100 && number == allExercise?.length - 1) {
            console.log(number + 1, allExercise?.length);
            postCurrentDayAPI(number);
          }
        }, 1000);
  }, [playW, pause, currentData, timer]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Check if goBack has been called
      if (!e.data.action) {
        console.log('navigation.goBack was called');
        setBack(true);
      }
    });

    return unsubscribe;
  }, [navigation]);

  const FAB = ({icon}: any) => {
    return (
      <TouchableOpacity
        onPress={() => {
          if (icon == 'format-list-bulleted') {
            setRestStart(false);
            setVisible(true);
          }
          if (icon == 'info-outline') {
            // setVisible(false)
            setOpen(true);
          }
          // : ÷null;
        }}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: restStart ? 50 : 30,
          width: restStart ? 50 : 30,
          height: restStart ? 50 : 30,
          backgroundColor: restStart ? 'transparent' : '#D9D9D9B2',
          marginVertical: 5,
          marginTop: restStart ? 25 : 5,
          alignSelf: restStart ? 'flex-end' : 'auto',
        }}>
        {icon == 'info-outline' ? (
          <MaterialIcons
            name={icon}
            size={restStart ? 40 : 20}
            color={AppColor.INPUTTEXTCOLOR}
          />
        ) : (
          <Icons
            name={icon}
            size={restStart ? 40 : 20}
            color={restStart ? AppColor.WHITE : AppColor.INPUTTEXTCOLOR}
          />
        )}
      </TouchableOpacity>
    );
  };

  const postCurrentDayAPI = async (index: number) => {
    if (isAPICalling) {
      return; // If API call is already in progress, do not proceed
    }
    console.log(isAPICalling, 'isAPICalling')
    setAPICalling(true);
    const payload = new FormData();
    payload.append('user_exercise_id', allExercise[index]?.exercise_id);
    payload.append('user_id', getUserDataDetails?.id);
    payload.append('workout_id', data?.workout_id);
    payload.append('user_day', day);
    allExercise?.length - 1 == index &&
      payload.append('final_status', 'all_completed');
    console.log(payload);
    try {
      const res = await axios({
        url: NewAppapi.CURRENT_DAY_EXERCISE,
        method: 'Post',
        data: payload,
      });
      if (res.data) {
        console.log(res.data, 'Post');
        setCurrentData(allExercise[index]);
        setRestStart(true);
        setPlayW(0);
        // setRestStart(false)
      }
    } catch (error) {
      console.error(error, 'PostDaysAPIERror');
    } finally {
      setAPICalling(false);
    }
  };

  const PauseModal = () => {
    return (
      <Modal
        visible={back}
        onRequestClose={() => setBack(false)}
        animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: AppColor.WHITE,
            paddingHorizontal: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{height: DeviceHeigth * 0.4}} />
          <GradientText
            text={'Hold on!'}
            fontWeight={'700'}
            fontSize={32}
            width={300}
            x={DeviceWidth * 0.185}
          />
          <GradientText
            x={DeviceWidth * 0.32}
            width={500}
            text={`Don't give up!`}
            fontWeight={'700'}
            fontSize={32}
          />
          <Text
            style={{
              fontSize: 20,
              fontWeight: '500',
              fontFamily: 'Poppins',
              lineHeight: 30,
              marginTop: 20,
            }}>
            {`You have finished `}
            <Text style={{color: AppColor.RED}}>
              {(((number) / parseInt(allExercise?.length)) * 100).toFixed(
                0,
              ) + '%'}
            </Text>
            {'\n'}
            {' only '}
            <Text style={{color: AppColor.RED}}>
              {number + ' Exercises'}
            </Text>
            {' left '}
          </Text>
          <View style={{marginTop: 30}}>
            <ProgreesButton
              text="Resume"
              h={70}
              bR={10}
              flex={-1}
              mV={20}
              onPress={() => setBack(false)}
              bW={1}
            />
            <ProgreesButton
              onPress={() => setPlayW(0)}
              text="Restart this Exercise"
              h={70}
              bR={10}
              flex={-1}
              colors={['#F3F3F3', '#F3F3F3']}
              textStyle={{
                fontSize: 20,
                fontFamily: 'Poppins',
                lineHeight: 30,
                color: AppColor.BLACK,
                fontWeight: '700',
              }}
              bC="white"
              bW={1}
            />
            <TouchableOpacity
              style={{alignSelf: 'center', marginTop: 20}}
              onPress={() => navigation.goBack()}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: 'Poppins',
                  lineHeight: 30,
                  color: AppColor.BLACK,
                  fontWeight: '700',
                }}>
                Quit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: restStart ? AppColor.RED : AppColor.WHITE,
        paddingHorizontal: 20,
      }}>
      <ExerciseProgressBar
        ExerciseData={allExercise}
        INDEX={number}
        time={currentData?.exercise_rest == 1 ? 60 : 1}
        w={restStart ? '100%' : `${playW}%`}
        color={restStart ? AppColor.WHITE : AppColor.RED}
      />
      {restStart ? (
        <View style={{flex: 1}}>
          <FAB icon="format-list-bulleted" />
          <View style={{alignSelf: 'center', alignItems: 'center'}}>
            <Text
              style={{
                fontSize: 28,
                fontFamily: 'Poppins',
                lineHeight: 30,
                color: AppColor.WHITE,
                fontWeight: '700',
              }}>
              Rest
            </Text>
            <Text
              style={{
                fontSize: 48,
                fontFamily: 'Poppins',
                lineHeight: 60,
                color: AppColor.WHITE,
                fontWeight: '700',
              }}>
              {'00:' + timer}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity
                onPress={() => setTimer(timer + 30)}
                style={{
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#FCFCFC61',
                  paddingHorizontal: 20,
                  marginRight: 10,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    lineHeight: 30,
                    color: AppColor.WHITE,
                    fontWeight: '700',
                  }}>
                  +30s
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  if (number == allExercise?.length - 1) return;
                  else {
                    setRestStart(false);
                    const index = allExercise?.findIndex(
                      (item: any) =>
                        item?.exercise_id == currentData?.exercise_id,
                    );
                    postCurrentDayAPI(index + 1);
                    setNumber(number + 1);
                    setTimer(5);
                    setPlayW(0);
                  }
                }}
                style={{
                  borderRadius: 20,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#Fff',
                  paddingHorizontal: 20,
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: 'Poppins',
                    lineHeight: 30,
                    color: AppColor.RED,
                    fontWeight: '700',
                    textTransform: 'uppercase',
                  }}>
                  Skip
                </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignItems: 'flex-start',
                alignSelf: 'flex-start',
                width: DeviceWidth,
                marginLeft: 20,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  lineHeight: 30,
                  marginTop: DeviceHeigth * 0.1,
                  color: AppColor.WHITE,
                }}>
                {`Next `}
                {number + 1 + '/' + allExercise?.length}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '500',
                  fontFamily: 'Poppins',
                  lineHeight: 30,
                  color: AppColor.WHITE,
                }}>
                {allExercise[number + 1]?.exercise_title + ' '}
                <AntIcons
                  name="questioncircleo"
                  color={AppColor.WHITE}
                  size={15}
                  onPress={() => setOpen(true)}
                />
              </Text>
            </View>
          </View>
          <View style={styles.container}></View>
        </View>
      ) : (
        <>
          <TouchableOpacity
            onPress={() => {
              setBack(true);
            }}
            style={{
              marginTop: DeviceHeigth * 0.06,
              // backgroundColor: 'black',
              width: 40,
            }}>
            <Icons
              name={'chevron-left'}
              size={30}
              color={AppColor.INPUTTEXTCOLOR}
            />
          </TouchableOpacity>
          <View style={{height: DeviceHeigth * 0.5}}>
            <Video
              source={{
                // uri: 'https://customer-50ey2gp6ldpfu37q.cloudflarestream.com/477addc9f11b43b3ba5a2e6f27f5200d/downloads/default.mp4',
                uri: currentData?.exercise_video,
              }}
              onReadyForDisplay={() => {
                setPause(true);
              }}
              onLoad={() => console.log('second')}
              onVideoLoad={() => console.log('third')}
              onVideoLoadStart={() => console.log('forth')}
              // onBuffer={() => {
              //   console.log('third');
              //   setPause(false);
              // }}
              // onFrameChange={() => {
              //   setTimeout(() => {
              //     console.log(pause)
              //     if (pause) setPlayW(playW + 1);
              //     if (playW == 100) setPause(false);
              //   }, 1000);
              // }}
              paused={!pause}
              onPlaybackResume={() => {
                console.log(pause);
                setPause(true);
              }}
              style={StyleSheet.absoluteFill}
            />
            <View style={{alignSelf: 'flex-end'}}>
              <FAB icon="format-list-bulleted" />
              <FAB icon="info-outline" />
              <FAB icon="music" />
            </View>
          </View>
          <Text style={styles.head}>Get Ready</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text style={styles.name}>{currentData?.exercise_title}</Text>
            <Text style={[styles.name, {color: '#505050'}]}>
              <Icons
                name={'clock-outline'}
                size={20}
                color={AppColor.INPUTTEXTCOLOR}
              />
              {` ${currentData?.exercise_rest}`}
            </Text>
          </View>
          <Play
            play={!pause}
            fill={`${100 - playW}%`}
            h={80}
            playy={() => setPause(!pause)}
            next={() => {
              if (number == allExercise?.length - 1) return;
              const index = allExercise?.findIndex(
                (item: any) => item?.exercise_id == currentData?.exercise_id,
              );
              postCurrentDayAPI(index + 1);
              setNumber(number + 1);
            }}
            back={() => {
              if (number == 0) return;
              const index = allExercise?.findIndex(
                (item: any) => item?.exercise_id == currentData?.exercise_id,
              );
              postCurrentDayAPI(index - 1);
              setNumber(number - 1);
            }}
            colors={pause ? ['#941000', '#941000'] : ['#999999', '#D5191A']}
          />
          <BottomSheetExercise
            isVisible={visible}
            setVisible={setVisible}
            exerciseData={allExercise}
          />
        </>
      )}
      <PauseModal />
      <WorkoutsDescription open={open} setOpen={setOpen} data={currentData} />
    </SafeAreaView>
  );
};

export default Exercise;

const styles = StyleSheet.create({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  head: {
    fontSize: 30,
    fontFamily: 'Poppins',
    fontWeight: '700',
    lineHeight: 40,
  },
  name: {
    fontSize: 20,
    fontFamily: 'Poppins',
    fontWeight: '600',
    lineHeight: 30,
    color: '#1e1e1e',
  },
  container: {
    flex: 1,
    backgroundColor: AppColor.WHITE,
    // alignItems: 'center',
    height: DeviceHeigth * 0.5,
    width: DeviceWidth,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    bottom: -50,
    position: 'absolute',
    padding: 20,
    marginLeft: -20,
    // paddingTop: 50,
    ...Platform.select({
      ios: {
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 5,
        // shadowRadius: 10,
      },
      android: {
        elevation: 10,
        shadowColor: 'rgba(0, 0, 0, 0.6)',
        shadowOffset: {width: 5, height: 5},
        shadowOpacity: 0.9,
        // shadowRadius: 10,
      },
    }),
  },
});