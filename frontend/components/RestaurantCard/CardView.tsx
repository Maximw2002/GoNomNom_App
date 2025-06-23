import { View, Text, Share, Dimensions, StyleSheet, Image } from 'react-native'
import React, { FC } from 'react'
import { Card } from '@/assets/data/data'
import { SharedValue } from 'react-native-reanimated'
import { LinearGradient } from "expo-linear-gradient";


const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");
const ROTATION_RANGE = 15;

interface CardViewProps {
    card: Card,
    index: number,
    totalCards: number,
    panHandlers: any,
    translateX: SharedValue<number>,
    translateY: SharedValue<number>,
    nextCardScale: SharedValue<number>,
    }
const CardView: FC<CardViewProps> = ({ 
    card, 
    index, 
    totalCards, 
    panHandlers, 
    translateX, 
    translateY, 
    nextCardScale }) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        <Image
        source={card.image}
        style={styles.image}/>
       <LinearGradient
         colors={["transparent", "rgba(0,0,0,0.4)", "rgba(0,0,0,0.8)", "#000"]}
         style={styles.linearGradient}/>
         </View>
         <View style={styles.description}>
            
            <Text>{card.name}, {card.address}</Text>
         </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.7,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    position: 'absolute',
    bottom: 0,
  },
  linearGradient: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.5,
    position: 'absolute',
    bottom: 0,
  }, 
    cardImage: {
        width: '100%',
        height: '100%',
        borderTopRightRadius: 60,
        borderTopLeftRadius: 60,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    description: {
        position: 'absolute',
        bottom: 150,
        fontSize: 18,
        fontWeight: 'bold',
        borderRadius: 25,
        zIndex: 10,
        backgroundColor: '#ffffff',
        height: 110,
        width: SCREEN_WIDTH * 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },

});
export default CardView;
