import { Text, TextStyle } from "react-native";

const Bold = ({ children }: { children: React.ReactNode }) => (
  <Text style={tw`font-bold`}>{children}</Text>
);

const setFormat = (content: string) => {
  const parts = [];
  let lastIndex = 0;

  const regex = /<b>([\s\S]*?)<\/b>/gi;
  let match;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        text: content.substring(lastIndex, match.index),
        bold: false,
      });
    }

    parts.push({ text: match[1], bold: true });

    lastIndex = regex.lastIndex;
  }

  if (lastIndex < content.length) {
    parts.push({ text: content.substring(lastIndex), bold: false });
  }

  return parts.map((part, index) =>
    part.bold ? (
      <Bold key={index}>{part.text}</Bold>
    ) : (
      <Text key={index}>{part.text}</Text>
    ),
  );
};

const FormattedText = ({
  children,
  style,
}: {
  children: string;
  style?: TextStyle;
}) => <Text style={style}>{setFormat(children)}</Text>;

export default FormattedText;
