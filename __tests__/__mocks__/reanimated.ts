jest.mock("react-native-reanimated", () => {
  const { View, Text, Image, ScrollView } = require("react-native");

  const identity = <T>(value: T) => value;
  const noop = () => undefined;

  return {
    __esModule: true,
    default: {
      View,
      Text,
      Image,
      ScrollView,
      createAnimatedComponent: identity,
    },
    View,
    Text,
    Image,
    ScrollView,
    createAnimatedComponent: identity,
    useSharedValue: (value: unknown) => ({ value }),
    useAnimatedStyle: (callback: () => unknown) => callback(),
    useDerivedValue: (callback: () => unknown) => ({ value: callback() }),
    useAnimatedRef: () => ({ current: null }),
    useAnimatedScrollHandler: () => noop,
    useAnimatedReaction: noop,
    runOnJS: (callback: unknown) => callback,
    runOnUI: (callback: unknown) => callback,
    cancelAnimation: noop,
    withDelay: (_delay: number, animation: unknown) => animation,
    withRepeat: identity,
    withSequence: (...animations: unknown[]) => animations.at(-1),
    withSpring: identity,
    withTiming: identity,
    Easing: {
      linear: identity,
      ease: identity,
      in: identity,
      out: identity,
      inOut: identity,
    },
  };
});
