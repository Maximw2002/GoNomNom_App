import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import React from 'react'
import images from '@/constants/images'

const favorites = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={images.backGround}
        style={styles.backGroundImage}
      />
    </ScrollView>
  )
}


export default favorites

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backGroundImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
})