import React from "react";
import { Text, View, ViewProps } from "react-native";

type ScreenProps = ViewProps & { text?: string; result?: string };

const Screen: React.FC<ScreenProps> = ({ text, result, ...props }) => {
  return (
    <View
      style={tw`flex bg-[#dae6da] px-3 py-2 rounded-xl w-full h-32`}
      {...props}
    >
      <View style={tw`flex justify-between h-full`}>
        <View
          style={tw`absolute top-0 left-0 w-full h-full bg-blue-500 opacity-10`}
        />
        <Text style={tw`text-xl text-black`}>{text}</Text>
        <Text style={tw`text-right text-xl text-black`}>{result}</Text>
      </View>
    </View>
  );
};

export default Screen;
