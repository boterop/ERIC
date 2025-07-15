import React from "react";
import { Text, View } from "react-native";
import { Screen } from "@/components";
import { NumberPad } from "@/components";
import useCalculator from "@/hooks/useCalculator";

const BRAND = "CASIO";
const MODEL_NAME = "fx-82LA PLUS";
const TITLE = "NATURAL-V.P.A.M.";
const EDITION = "2nd";

const FX82LA_plus = () => {
  const { text, result, onPress } = useCalculator();

  return (
    <View style={tw`flex gap-4 bg-[#313133] p-6 h-full`}>
      <View style={tw`flex-row items-center justify-between`}>
        <Text style={tw`text-2xl font-bold text-white uppercase`}>{BRAND}</Text>
        <Text style={tw`text-white`}>{MODEL_NAME}</Text>
      </View>
      <View style={tw`flex gap-1`}>
        <Text style={tw`text-center text-white italic uppercase`}>{TITLE}</Text>
        <Text style={tw` text-xs text-right text-white`}>
          {EDITION} edition
        </Text>
      </View>
      <Screen text={text} result={result} />
      <NumberPad onPress={onPress} />
    </View>
  );
};

export default FX82LA_plus;
