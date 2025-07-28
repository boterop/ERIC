import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

const DimensionScreen = () => {
  const { t } = useTranslation();
  const { dimension } = useLocalSearchParams();
  const options = Array.from({ length: 5 }, (_, i) => i + 1);
  const count = parseInt(t(`${dimension}.count`));

  const [showInstructions, setShowInstructions] = useState(true);
  const [question, setQuestion] = useState(1);
  const [response, setResponse] = useState(0);

  useEffect(() => {
    // TODO: Load response and check it
    setResponse(0);
  }, [question]);

  const previous = () => {
    if (question === 1) return;
    setQuestion(question - 1);
  };
  const next = () => {
    if (question === count) return router.replace("/home");
    setQuestion(question + 1);
    // TODO: Save or update response
  };

  const Instructions = () => (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-8 bg-white w-90% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw``}>{t(`${dimension}.instructions`)}</Text>
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-500 py-2 px-4`}
          onPress={() => setShowInstructions(false)}
        >
          <Text style={tw`text-xl text-center text-white`}>{t("start")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const CheckBox = ({ checked, onPress, label }) => (
    <View style={tw`flex-row w-full gap-2`}>
      <TouchableOpacity
        style={tw`flex-row gap-2 w-full items-center justify-start`}
        onPress={onPress}
      >
        <Feather
          name={checked ? "check-circle" : "circle"}
          size={24}
          color="black"
        />
        <Text style={tw`text-xl capitalize`}>{label}</Text>
      </TouchableOpacity>
    </View>
  );

  if (showInstructions) return <Instructions />;

  return (
    <View
      style={tw`flex gap-6 w-full h-full items-center justify-center bg-gray-100`}
    >
      <Text style={tw`text-2xl capitalize`}>{t(`dimension.${dimension}`)}</Text>
      <View style={tw`flex w-full gap-2 items-center justify-center`}>
        <Text>{`${t("question")} ${question - 1} ${t("of")} ${count}`}</Text>
        <ProgressBar
          progress={(question - 1) / count}
          color="black"
          width={null}
          style={tw`w-[90%]`}
        />
      </View>
      <View
        style={tw`flex gap-8 bg-white w-90% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        {t(`${dimension}.description`) && (
          <Text style={tw`w-full font-bold text-start capitalize`}>
            {t(`${dimension}.description`)}
          </Text>
        )}
        <Text style={tw`text-lg`}>
          {t(`${dimension}.questions.${question}`)}
        </Text>
        <View style={tw`flex w-full gap-4`}>
          {options.map((option) => (
            <CheckBox
              key={option}
              label={t(`${dimension}.options.${option}`)}
              checked={response === option}
              onPress={() => setResponse(option)}
            />
          ))}
        </View>
        <View style={tw`flex-row w-full gap-4`}>
          <TouchableOpacity
            disabled={question === 1}
            style={tw`flex-1 flex-row gap-2 items-center justify-center rounded-full border-2 py-2 px-4 ${question === 1 ? "border-gray-100" : "border-black"}`}
            onPress={previous}
          >
            <AntDesign
              name="left"
              size={14}
              color={question === 1 ? "#eee" : "black"}
            />
            <Text
              style={tw`text-lg text-center ${question === 1 ? "text-gray-100" : "text-black"}`}
            >
              {t("previous")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={response === 0}
            style={tw`flex-1 flex-row gap-2 items-center justify-center rounded-full py-2 px-4 ${response === 0 ? "bg-blue-100" : "bg-blue-500"}`}
            onPress={next}
          >
            <Text style={tw`text-lg text-center text-white`}>{t("next")}</Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DimensionScreen;
