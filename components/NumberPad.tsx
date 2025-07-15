import React from "react";
import { View, ViewProps } from "react-native";
import { Btn } from ".";

type NumberPadProps = ViewProps & {
  onPress: (_: string) => void;
};

const Column: React.FC<ViewProps> = ({ children, ...props }) => {
  return (
    <View style={tw`flex gap-4`} {...props}>
      {children}
    </View>
  );
};

const NumberPad: React.FC<NumberPadProps> = ({ onPress, ...props }) => {
  return (
    <View
      style={tw`flex flex-row items-center justify-between w-full`}
      {...props}
    >
      <Column>
        <Btn text="7" onPress={onPress} rounded="tl" />{" "}
        <Btn text="4" onPress={onPress} />
        <Btn text="1" onPress={onPress} />
        <Btn text="0" onPress={onPress} rounded="bl" />
      </Column>
      <Column>
        <Btn text="8" onPress={onPress} />
        <Btn text="5" onPress={onPress} />
        <Btn text="2" onPress={onPress} />
        <Btn text="." onPress={onPress} />
      </Column>
      <Column>
        <Btn text="9" onPress={onPress} />
        <Btn text="6" onPress={onPress} />
        <Btn text="3" onPress={onPress} />
        <Btn text="*10^x" onPress={onPress} />
      </Column>
      <Column>
        <Btn text="DEL" onPress={onPress} />
        <Btn text="*" onPress={onPress} />
        <Btn text="+" onPress={onPress} />
        <Btn text="Ans" onPress={onPress} />
      </Column>
      <Column>
        <Btn text="AC" onPress={onPress} rounded="tr" />
        <Btn text="/" onPress={onPress} />
        <Btn text="-" onPress={onPress} />
        <Btn text="=" onPress={onPress} rounded="br" />
      </Column>
    </View>
  );
};

export default NumberPad;
