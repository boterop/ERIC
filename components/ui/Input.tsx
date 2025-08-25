import { TextInput } from "react-native";

const Input = (props: any) => (
  <TextInput
    {...props}
    style={[props.style, tw`text-black`]}
    placeholderTextColor={props.placeholderTextColor || "#9CA3AF"}
  />
);

export default Input;
