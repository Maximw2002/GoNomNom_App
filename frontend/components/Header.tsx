import { View, Text, Image } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font'
import AppLoading from 'expo-app-loading'
import { icons } from '@/constants/icons';



type HeaderProps = {
  title: string;
  back: boolean;
};

const Header = ({ title, back }:HeaderProps ) => {

const [fontsLoaded] = useFonts({
    'Orbitron-Bold': require('../assets/fonts/Orbitron-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  if (!back) {
  return (
    <View>
      <Text className='font-orbitron text-secondary text-4xl'>{title}</Text>
    </View>
  )
  }
    return (
    <View className='w-full flex-row items-center justify-center'>
        <View className="absolute left-2">
    <Image
      source={icons.arrowback}
      className="w-12 h-12"
    />
  </View>
        <Text className='font-orbitron text-secondary text-4xl border border-blue-100'
        >{title}</Text>
    </View>
  )

}

export default Header