import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import {
  AntDesign,
  Entypo,
  Feather,
  MaterialCommunityIcons,
} from "@expo/vector-icons/";
import storageService from "@/services/storageService";
import { ReactNode, useEffect, useState } from "react";
import answerService from "@/services/answerService";
import { Dimension } from "@/domain/Answer";
import ProgressCircle from "react-native-progress/Circle";
import scoreService from "@/services/scoreService";

const dimensions = ["procedural", "emotional", "cognitive", "critical"];

const HomeScreen = () => {
  const { t } = useTranslation();

  const [dimensionButtons, setDimensionButtons] = useState<ReactNode[]>([]);

  const goTo = (dimension: string, readonly: boolean = false) =>
    router.push(`/dimensions/${dimension}?readonly=${readonly}`);

  const Score = ({ score, color }: { score: number; color?: string }) => {
    return (
      <ProgressCircle
        color={color}
        animated={false}
        progress={score}
        borderWidth={0}
        thickness={3}
        showsText={true}
        size={60}
        strokeCap="round"
        textStyle={tw`font-bold`}
      />
    );
  };

  const Card = ({
    icon,
    title,
    dimension,
    isCompleted = false,
    answerCount = 0,
    score = 0,
    color,
  }: {
    icon: ReactNode;
    title: string;
    dimension: string;
    isCompleted?: boolean;
    answerCount?: number;
    score?: number;
    color?: string;
  }) => {
    const AnswersLeft = ({ style }: { style?: string }) => (
      <Text style={style || tw`text-xl`}>
        {answerCount}/{t(`${dimension}.count`)}
      </Text>
    );

    return (
      <TouchableOpacity
        onPress={() => {
          if (isCompleted) goTo(dimension, true);
        }}
        style={tw`flex-col gap-4 items-center justify-between w-[90%] rounded-lg border-2 border-gray-300 p-4`}
      >
        <View style={tw`flex-row w-full items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center justify-center`}>
            {icon}
            <Text style={tw`text-xl capitalize`}>{title}</Text>
          </View>
          {(!isCompleted && (
            <TouchableOpacity
              testID={`${title}-button`}
              onPress={() => goTo(dimension)}
              style={tw`flex gap-2 items-center justify-center`}
            >
              <AntDesign name="play" size={24} color="#007AFF" />
              <AnswersLeft style="text-sm" />
            </TouchableOpacity>
          )) || <AnswersLeft />}
        </View>
        {isCompleted && <Score score={score} color={color} />}
      </TouchableOpacity>
    );
  };

  const Loading = () => (
    <View style={tw`flex gap-4 items-center justify-center`}>
      <ProgressCircle size={30} indeterminate={true} />;
      <Text style={tw`text-2xl capitalize`}>{t("waiting_connection")}</Text>
    </View>
  );

  const createItems = async () => {
    const buttons = [];

    const token = await storageService.get("session");
    for (const dimension of dimensions) {
      const answers = await answerService.listByDimension(
        dimension as Dimension,
        token || "",
      );
      const questionsCount = t(`${dimension}.count`);
      const isCompleted = answers.length >= parseInt(questionsCount);

      const score = scoreService.calculate(dimension as Dimension, answers);
      const level = scoreService.toLevel(score);

      let color = "#000000";
      if (isCompleted) {
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
      }

      let icon: ReactNode = null;

      switch (dimension) {
        case "emotional":
          icon = <Feather name="smile" size={24} color={color} />;
          break;
        case "cognitive":
          icon = (
            <MaterialCommunityIcons name="brain" size={24} color={color} />
          );
          break;
        case "critical":
          icon = <Entypo name="magnifying-glass" size={24} color={color} />;
          break;
        default:
          icon = <Feather name="pen-tool" size={24} color={color} />;
          break;
      }

      const percent = score / 5;

      buttons.push(
        <Card
          key={dimension}
          icon={icon}
          color={color}
          title={t(`dimension.${dimension}`)}
          dimension={dimension}
          answerCount={answers.length}
          isCompleted={isCompleted}
          score={percent}
        />,
      );
    }

    setDimensionButtons(buttons);
  };

  useEffect(() => {
    createItems();
  }, []);

  return (
    <View style={tw`flex gap-8 w-full h-full items-center justify-start p-4`}>
      <TouchableOpacity
        style={tw`flex-row gap-2 w-full items-center justify-end`}
        onPress={async () => {
          storageService.remove("session");
          router.replace("/login");
        }}
      >
        <Text style={tw`capitalize`}>{t("logout")}</Text>
        <AntDesign name="logout" size={13} color="black" />
      </TouchableOpacity>
      <Text style={tw`text-2xl capitalize`}>{t("select_dimension")}</Text>
      {dimensionButtons.length === 0 ? (
        <Loading />
      ) : (
        <View style={tw`flex gap-4 w-full items-center justify-center`}>
          {dimensionButtons}
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
