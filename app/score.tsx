import { Dimension } from "@/domain/Answer";
import { Level } from "@/domain/Level";
import answerService from "@/services/answerService";
import scoreService from "@/services/scoreService";
import storageService from "@/services/storageService";
import { AntDesign } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";

const ScoreScreen = () => {
  const { t } = useTranslation();
  const params = useLocalSearchParams();
  const [color, setColor] = useState("#000000");
  const [level, setLevel] = useState<Level | null>(null);
  const [percent, setPercent] = useState(0);

  const calculateScore = useCallback(async () => {
    const token = await storageService.get("session");
    const answers = await answerService.listByDimension(
      params.dimension as Dimension,
      token || "",
    );

    const score = scoreService.calculate(
      params.dimension as Dimension,
      answers,
    );

    const level = scoreService.toLevel(score);

    let color = "#000000";
    switch (level) {
      case "low":
        color = "#FF0000";
        break;
      case "medium":
        color = "#FF9900";
        break;
      default:
        color = "#009F00";
        break;
    }

    const percent = score / 5;
    setColor(color);
    setLevel(level);
    setPercent(percent);
  }, [params]);

  useEffect(() => {
    calculateScore();
  }, []);

  if (level === null) return null;

  return (
    <View style={tw`flex w-full h-full items-center justify-around p-8`}>
      <View
        style={tw`flex items-center justify-center rounded-full bg-[#A1D8F7] p-8`}
      >
        <AntDesign name="trophy" size={64} color={color} />
      </View>
      <View style={tw`flex gap-4 items-center justify-center`}>
        <Text style={tw`text-lg capitalize`}>{params.dimension}</Text>
        <Text style={tw`text-3xl font-bold`}>{parseInt(percent * 100)}%</Text>
        <View
          style={tw`flex items-center justify-center rounded-full bg-[#A1F7C1] px-4 py-1`}
        >
          <Text style={tw`text-sm font-bold capitalize`}>{level}</Text>
        </View>
      </View>
      <Text style={tw`text-center`}>{t("thank_you")}</Text>
      <TouchableOpacity
        style={tw`w-full rounded-full bg-blue-500 py-2 px-4`}
        onPress={() => router.replace("/home")}
      >
        <Text style={tw`text-xl text-center text-white`}>{t("continue")}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScoreScreen;
