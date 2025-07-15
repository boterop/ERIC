import React from "react";
import { Pressable, PressableProps, Text } from "react-native";

type BtnProps = Omit<PressableProps, "onPress"> & {
  className?: string;
  text: string;
  onPress: (_: string) => void;
  rounded?: "tl" | "tr" | "bl" | "br";
};

const Label: React.FC<{ text: string; size?: string }> = ({
  text,
  size = "4xl",
}) => {
  return <Text style={tw`text-white text-${size}`}>{text}</Text>;
};

const Btn: React.FC<BtnProps> = ({
  className,
  text,
  onPress,
  rounded,
  ...props
}) => {
  const round = !rounded ? "" : `rounded-${rounded}-2xl`;

  const size = text.length > 1 ? "xl" : "4xl";

  return (
    <Pressable
      style={tw`flex items-center justify-center h-10 py-0 px-5 bg-gray-400 rounded-md ${className} ${round}`}
      onPress={() => onPress(text)}
      {...props}
    >
      <Label text={text} size={size} />
    </Pressable>
  );
};

export default Btn;
