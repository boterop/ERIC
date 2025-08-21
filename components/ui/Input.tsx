import { TextInput } from "react-native";

const Input = (props: any) => (
  <TextInput
    {...props}
    placeholderTextColor={props.placeholderTextColor || "#9CA3AF"}
  />
);

export default Input;
