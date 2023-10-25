import { View, Text, SafeAreaView ,Image, StyleSheet} from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import HeaderWithoutSearch from '../Component/HeaderWithoutSearch';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
import { localImage } from '../Component/Image';
import { DeviceHeigth, DeviceWidth } from '../Component/Config';
localImage
const Completed = () => {
  const route = useRoute();
  const Data = route.params;
  const { defaultTheme } = useSelector(state => state)
  console.log(Data)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: defaultTheme ? "#000" : "#fff" }}>
      <View style={[styles.closeButton, { margin: 35 }]}>
        <TouchableOpacity onPress={() => {
          navigation.goBack()
        }}><Icons name="close" size={27} color={defaultTheme ? "#fff" : "#000"} /></TouchableOpacity>
      </View>
      <View>
      <Image source={localImage.logo} style={styles.image}/>
      </View>
     
    </SafeAreaView>
  )
}
const styles=StyleSheet.create({
  image:{
    width:DeviceWidth*50/100,
    height:DeviceHeigth*20/100,
    resizeMode:'contain'
  }
})
export default Completed