import React, { FC, useState } from "react";
import { Pressable, Text, Image, ImageSourcePropType } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { images } from "@/constants/images";

type Props = {
  picture: any;
  onPress: () => void;
  viewStyle?: any;
  pictureStyle?: any;
};

const ClickableImage: FC<Props> = ({
  picture,
  onPress,
  viewStyle,
  pictureStyle,
}) => {
  const [imageSource, setImageSource] = useState<ImageSourcePropType>(
    picture ? { uri: picture } : images.restaurantImage2
  );

  const handleError = () => {
    setImageSource(images.restaurantImage3);
  };

  const btnScale = useSharedValue(1);
  const btnAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: btnScale.value }],
  }));

  return (
    <Pressable
      onPressIn={() => {
        btnScale.value = withTiming(0.9, { duration: 120 });
      }}
      onPressOut={() => {
        btnScale.value = withTiming(1, { duration: 120 });
      }}
      onPress={() => onPress()}
    >
      <Animated.View style={[viewStyle, btnAnimatedStyle]}>
        <Image
          source={imageSource}
          style={pictureStyle}
          resizeMode="cover"
          onError={handleError}
        />
      </Animated.View>
    </Pressable>
  );
};

export default ClickableImage;
