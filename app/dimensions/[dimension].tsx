import FormattedText from "@/components/FormattedText";
import { Dimension } from "@/domain/Answer";
import answerService from "@/services/answerService";
import storageService from "@/services/storageService";
import { AntDesign, Feather } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import ProgressBar from "react-native-progress/Bar";

const DimensionScreen = () => {
  const token = useRef<string>("");

  const { t } = useTranslation();
  const { dimension } = useLocalSearchParams();
  const options = Array.from({ length: 5 }, (_, i) => i + 1);
  const count = parseInt(t(`${dimension}.count`));

  const [isReady, setIsReady] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [question, setQuestion] = useState(1);
  const [response, setResponse] = useState(0);

  const getQuestion = useCallback(async () => {
    const answers = await answerService.listByDimension(
      dimension.toString() as Dimension,
      token.current,
    );

    if (answers.length === 0) return null;

    return answers.find((a) => a.question === question);
  }, [dimension, question]);

  const saveResp = useCallback(async () => {
    const resp = await answerService.create(
      {
        question: question,
        value: response,
        dimension: dimension.toString() as Dimension,
      },
      token.current,
    );

    return resp.id !== null;
  }, [dimension, response, question]);

  const updateResp = useCallback(
    async (id: string) => {
      const resp = await answerService.update(
        {
          id: id,
          question: question,
          value: response,
          dimension: dimension.toString() as Dimension,
        },
        token.current || "",
      );

      const noUpdated = resp.id === null;

      if (noUpdated) return false;

      return true;
    },
    [dimension, response, question],
  );

  const updateResponse = useCallback(async () => {
    const answer = await getQuestion();
    if (!answer) return setResponse(0);

    setResponse(answer.value);
  }, [getQuestion]);

  useEffect(() => {
    if (isReady) return;

    storageService.get("session").then((t) => {
      token.current = t || "";

      answerService
        .listByDimension(dimension.toString() as Dimension, t || "")
        .then((answers) => {
          let lastQuestion = 0;
          for (const answer of answers) {
            if (answer.question > lastQuestion) lastQuestion = answer.question;
          }

          setQuestion(lastQuestion + 1);
          setIsReady(true);
        });

      setIsReady(true);
    });
  }, []);

  useEffect(() => {
    updateResponse();
  }, [isReady, question]);

  const previous = () => {
    if (question === 1) return;
    setQuestion(question - 1);
  };

  const next = async () => {
    const savedResponse = await getQuestion();
    let savedUpdated = false;
    if (!savedResponse) {
      savedUpdated = await saveResp();
    } else {
      if (response === savedResponse.value) savedUpdated = true;
      else savedUpdated = await updateResp(savedResponse.id || "");
    }

    if (!savedUpdated) {
      return Alert.alert("Error", t("connection_error"));
    }

    if (question === count)
      return router.replace({
        pathname: "/score",
        params: { dimension: dimension },
      });

    setQuestion(question + 1);
  };

  const Instructions = () => (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-8 bg-white w-90% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <FormattedText>{t(`${dimension}.instructions`)}</FormattedText>
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
        <Text style={tw`text-xl`}>{label}</Text>
      </TouchableOpacity>
    </View>
  );

  if (!isReady) return null;
  if (showInstructions) return <Instructions />;

  return (
    <View
      style={tw`flex gap-6 w-full h-full items-center justify-center bg-gray-100`}
    >
      <Text style={tw`text-2xl capitalize`}>{t(`dimension.${dimension}`)}</Text>
      <View style={tw`flex w-full gap-2 items-center justify-center`}>
        <Text>{`${t("question")} ${question} ${t("of")} ${count}`}</Text>
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
          <Text style={tw`w-full font-bold text-start`}>
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
            <Text style={tw`text-lg text-center text-white`}>
              {question === count ? t("finish") : t("next")}
            </Text>
            <AntDesign name="right" size={14} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DimensionScreen;
