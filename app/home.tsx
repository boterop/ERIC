import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import {
  Animated,
  Easing,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from "react-native";
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
import userService from "@/services/userService";

const dimensions = ["procedural", "emotional", "cognitive", "critical"];

const HomeScreen = () => {
  const { t } = useTranslation();

  const [dimensionButtons, setDimensionButtons] = useState<ReactNode[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [shimmer] = useState(() => new Animated.Value(0));
  const [isProfessor, setIsProfessor] = useState(false);

  useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(shimmer, {
        toValue: 1,
        duration: 1300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }),
    );

    animation.start();

    return () => animation.stop();
  }, [shimmer]);

  const goTo = (dimension: string, readonly: boolean = false) =>
    router.push(`/dimensions/${dimension}?readonly=${readonly}`);

  const goToStudents = () => {
    setIsMenuOpen(false);
    router.push("/students");
  };

  const logout = async () => {
    setIsMenuOpen(false);
    storageService.remove("session");
    router.replace("/login");
  };

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
    const AnswersLeft = ({ style }: { style?: StyleProp<TextStyle> }) => (
      <Text style={style || tw`text-xl`}>
        {answerCount}/{t(`${dimension}.count`)}
      </Text>
    );

    return (
      <TouchableOpacity
        onPress={() => {
          if (isCompleted) goTo(dimension, true);
        }}
        style={tw`flex-col gap-4 items-center justify-between w-[90%] rounded-lg border-2 border-gray-200 bg-gray-50 p-4`}
      >
        <View style={tw`flex-row w-full items-center justify-between`}>
          <View style={tw`flex-row gap-2 items-center justify-center`}>
            <View style={tw`h-6 w-6 items-center justify-center`}>{icon}</View>
            <Text style={tw`text-xl capitalize`}>{title}</Text>
          </View>
          {(!isCompleted && (
            <TouchableOpacity
              testID={`${title}-button`}
              onPress={() => goTo(dimension)}
              style={tw`items-center justify-center`}
            >
              <View
                style={tw`h-7 w-7 items-center justify-center rounded-full border border-blue-200 bg-blue-50`}
              >
                <AntDesign name="play" size={16} color="#007AFF" />
              </View>
            </TouchableOpacity>
          )) || <AnswersLeft style={tw`text-sm`} />}
        </View>
        <View style={tw`min-h-[60px] items-center justify-center`}>
          {isCompleted ? (
            <Score score={score} color={color} />
          ) : (
            <AnswersLeft style={tw`text-xl font-semibold`} />
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const Loading = () => (
    <View style={tw`w-[90%] gap-4`}>
      {[1, 2, 3, 4].map((item) => (
        <SkeletonCard key={item} shimmer={shimmer} />
      ))}
    </View>
  );

  const SkeletonBlock = ({
    width,
    height,
    rounded = 6,
    shimmer,
  }: {
    width: number | string;
    height: number;
    rounded?: number;
    shimmer: Animated.Value;
  }) => {
    const translateX = shimmer.interpolate({
      inputRange: [0, 1],
      outputRange: [-60, 220],
    });

    return (
      <View
        style={tw.style(`overflow-hidden bg-gray-200`, {
          width,
          height,
          borderRadius: rounded,
        })}
      >
        <Animated.View
          style={{
            transform: [{ translateX }],
            opacity: 0.9,
            width: "45%",
            height: "100%",
            backgroundColor: "#F8FAFC",
          }}
        />
      </View>
    );
  };

  const SkeletonCard = ({ shimmer }: { shimmer: Animated.Value }) => (
    <View
      testID="home-skeleton-card"
      style={tw`flex-col gap-4 items-center justify-between w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-4`}
    >
      <View style={tw`flex-row w-full items-center justify-between`}>
        <View style={tw`flex-row gap-2 items-center justify-center`}>
          <SkeletonBlock
            width={24}
            height={24}
            rounded={12}
            shimmer={shimmer}
          />
          <SkeletonBlock width={110} height={18} shimmer={shimmer} />
        </View>
        <View style={tw`items-center justify-center gap-2`}>
          <SkeletonBlock
            width={28}
            height={28}
            rounded={14}
            shimmer={shimmer}
          />
          <SkeletonBlock width={44} height={12} shimmer={shimmer} />
        </View>
      </View>
      <View style={tw`h-[60px] w-full items-center justify-center`}>
        <SkeletonBlock width="60%" height={60} rounded={30} shimmer={shimmer} />
      </View>
    </View>
  );

  const createItems = async () => {
    const buttons = [];
    setIsLoading(true);

    const token = await storageService.get("session");
    const user = await userService.me(token || "");
    setIsProfessor(user!.type === "professor" || false);
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
    setIsLoading(false);
  };

  useEffect(() => {
    createItems();
  }, []);

  return (
    <View style={tw`flex gap-8 w-full h-full items-center justify-start p-4`}>
      <View style={tw`w-full items-end z-10`}>
        <TouchableOpacity
          testID="home-menu-button"
          style={tw`h-10 w-10 rounded-full items-center justify-center`}
          onPress={() => setIsMenuOpen((open) => !open)}
        >
          <Feather name="menu" size={22} color="black" />
        </TouchableOpacity>
        {isMenuOpen && (
          <View
            style={tw`absolute top-12 right-0 w-44 rounded-lg border border-gray-300 bg-white shadow-md`}
          >
            {isProfessor && (
              <TouchableOpacity
                style={tw`flex-row gap-2 items-center justify-between px-4 py-3 border-b border-gray-200`}
                onPress={goToStudents}
              >
                <Text style={tw`capitalize`}>{t("students")}</Text>
                <Feather name="users" size={16} color="black" />
              </TouchableOpacity>
            )}
            <TouchableOpacity
              style={tw`flex-row gap-2 items-center justify-between px-4 py-3`}
              onPress={logout}
            >
              <Text style={tw`capitalize`}>{t("logout")}</Text>
              <AntDesign name="logout" size={13} color="black" />
            </TouchableOpacity>
          </View>
        )}
      </View>
      <Text style={tw`text-2xl capitalize`}>{t("select_dimension")}</Text>
      {isLoading ? (
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
