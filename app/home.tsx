import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons/";
import storageService from "@/services/storageService";
import { ReactNode, useEffect, useState } from "react";
import answerService from "@/services/answerService";
import { Dimension } from "@/domain/Answer";

const dimensions = ["procedural", "emotional", "cognitive", "critical"];

const HomeScreen = () => {
  const { t } = useTranslation();

  const [dimensionButtons, setDimensionButtons] = useState<ReactNode[]>([]);

  const goTo = (dimension: string) => router.push(`/dimensions/${dimension}`);

  const Card = ({
    icon,
    title,
    dimension,
    isCompleted = false,
    answerCount = 0,
  }: {
    icon: ReactNode;
    title: string;
    dimension: string;
    isCompleted?: boolean;
    answerCount?: number;
  }) => {
    const AnswersLeft = ({ style }: { style?: string }) => (
      <Text style={style || tw`text-xl`}>
        {answerCount}/{t(`${dimension}.count`)}
      </Text>
    );

    return (
      <View
        style={tw`flex-row items-center justify-between w-[90%] rounded-lg border-2 border-gray-300 p-4`}
      >
        <View style={tw`flex-row gap-2 items-center justify-center`}>
          {icon}
          <Text style={tw`text-xl capitalize`}>{title}</Text>
        </View>
        {(!isCompleted && (
          <TouchableOpacity
            onPress={() => goTo(dimension)}
            style={tw`flex gap-2 items-center justify-center`}
          >
            <AntDesign name="play" size={24} color="#007AFF" />
            <AnswersLeft style="text-sm" />
          </TouchableOpacity>
        )) || <AnswersLeft />}
      </View>
    );
  };

  const Loading = () => (
    <Text style={tw`text-2xl capitalize`}>{t("waiting_connection")}</Text>
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

      const icon = isCompleted ? "Trophy" : "question";
      buttons.push(
        <Card
          key={dimension}
          icon={<AntDesign name={icon} size={24} color="black" />}
          title={t(`dimension.${dimension}`)}
          dimension={dimension}
          answerCount={answers.length}
          isCompleted={isCompleted}
        />,
      );
    }

    setDimensionButtons(buttons);
  };

  useEffect(() => {
    createItems();
  }, []);

  return (
    <View style={tw`flex gap-16 w-full h-full items-center justify-center p-4`}>
      <TouchableOpacity
        style={tw`absolute top-12 right-4 flex-row gap-2 items-center justify-center`}
        onPress={async () => {
          storageService.remove("session");
          router.replace("/login");
        }}
      >
        <Text style={tw`text-right capitalize`}>{t("logout")}</Text>
        <AntDesign name="logout" size={13} color="black" />
      </TouchableOpacity>
      {dimensionButtons.length === 0 ? (
        <Loading />
      ) : (
        <>
          <Text style={tw`text-2xl capitalize`}>{t("select_dimension")}</Text>
          <View style={tw`flex gap-4 w-full items-center justify-center`}>
            {dimensionButtons}
          </View>
        </>
      )}
    </View>
  );
};

export default HomeScreen;
