import { View, Text, Pressable, Dimensions, StyleSheet, Image } from 'react-native';
import React, { FC } from 'react';
import { Card } from '@/assets/data/data';
import { SharedValue } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const ROTATION_RANGE = 15;

interface CardViewProps {
  card: Card;
  index: number;
  totalCards: number;
  panHandlers: any;
  translateX: SharedValue<number>;
  translateY: SharedValue<number>;
  nextCardScale: SharedValue<number>;
}

const CardView: FC<CardViewProps> = ({
  card,
  index,
  totalCards,
  panHandlers,
  translateX,
  translateY,
  nextCardScale,
}) => {
  // Shared value for tap‑feedback scale on the description box
  const descriptionScale = useSharedValue(1);

  const descriptionAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: descriptionScale.value }],
  }));

  return (
    <View style={styles.card}>
      <View style={styles.cardImage}>
        <Image source={card.image} style={styles.image} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.4)', 'rgba(0,0,0,0.8)', '#000']}
          style={styles.linearGradient}
        />
      </View>

      <Pressable
        onPressIn={() => {
          descriptionScale.value = withTiming(0.94, { duration: 120 });
        }}
        onPressOut={() => {
          descriptionScale.value = withTiming(1, { duration: 120 });
        }}
        style={styles.pressable}
      >
        <Animated.View style={[styles.description, descriptionAnimatedStyle]}>
          <Text style={styles.descriptionText}>
            {card.name}, {card.address}
          </Text>
        </Animated.View>
      </Pressable>
    </View>
  );
};

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
    overflow: 'hidden',
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
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pressable: {
    position: 'absolute',
    bottom: 150,
    width: SCREEN_WIDTH * 0.8,
    height: 110,
    alignSelf: 'center',
  },
  description: {
    flex: 1,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  descriptionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default CardView;
