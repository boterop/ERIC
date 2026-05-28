import { Dimension } from "@/domain/Answer";
import { Level } from "@/domain/Level";
import { User } from "@/domain/User";
import answerService from "@/services/answerService";
import scoreService from "@/services/scoreService";
import storageService from "@/services/storageService";
import userService from "@/services/userService";
import { AntDesign, Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ProgressCircle from "react-native-progress/Circle";

const dimensions: Dimension[] = [
  "procedural",
  "emotional",
  "cognitive",
  "critical",
];

type StudentScore = {
  answerCount: number;
  color: string;
  isCompleted: boolean;
  level: Level | null;
  percent: number;
};

const studentKey = (student: User) => student.id || student.email;

const StudentsScreen = () => {
  const { t } = useTranslation();
  const [students, setStudents] = useState<User[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);
  const [scores, setScores] = useState<Record<Dimension, StudentScore> | null>(
    null,
  );
  const [query, setQuery] = useState("");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const sortedStudents = useMemo(
    () =>
      [...students].sort((a, b) =>
        a.name.localeCompare(b.name, undefined, { sensitivity: "base" }),
      ),
    [students],
  );

  const filteredStudents = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return sortedStudents;

    return sortedStudents.filter((student) =>
      `${student.name} ${student.email}`
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [query, sortedStudents]);

  const loadStudents = useCallback(async () => {
    const session = await storageService.get("session");

    const loadedStudents = await userService.students(session || "");
    setToken(session || "");
    setStudents(loadedStudents);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadStudents().catch(() => {
      setIsLoading(false);
      Alert.alert("Error", t("connection_error"));
    });
  }, [loadStudents, t]);

  const getScoreColor = (level: Level | null) => {
    switch (level) {
      case "low":
        return "#FF0000";
      case "medium":
        return "#FF9900";
      case "high":
        return "#009F00";
      default:
        return "#000000";
    }
  };

  const loadStudentScores = async (student: User) => {
    setSelectedStudent(student);
    setScores(null);

    const nextScores = {} as Record<Dimension, StudentScore>;
    for (const dimension of dimensions) {
      const answers = await answerService.listByDimension(
        dimension,
        token,
        studentKey(student),
      );
      const questionsCount = parseInt(t(`${dimension}.count`));
      const isCompleted = answers.length >= questionsCount;
      const score = answers.length
        ? scoreService.calculate(dimension, answers)
        : 0;
      const level = answers.length ? scoreService.toLevel(score) : null;

      nextScores[dimension] = {
        answerCount: answers.length,
        color: getScoreColor(level),
        isCompleted,
        level,
        percent: score / 5,
      };
    }

    setScores(nextScores);
  };

  const downloadStudents = () => {
    if (Platform.OS !== "web") {
      Alert.alert(t("students"), t("download_only_web"));
      return;
    }

    const header = ["Nombre", "Correo", "Pais", "Institucion", "Edad"];
    const rows = sortedStudents.map((student) => [
      student.name,
      student.email,
      student.country || "",
      student.institution || "",
      student.age?.toString() || "",
    ]);
    const escapeCell = (value: string) =>
      value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    const tableRows = [header, ...rows]
      .map(
        (row) =>
          `<tr>${row.map((cell) => `<td>${escapeCell(cell)}</td>`).join("")}</tr>`,
      )
      .join("");
    const blob = new Blob([`<table>${tableRows}</table>`], {
      type: "application/vnd.ms-excel",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.xls";
    link.click();
    URL.revokeObjectURL(url);
  };

  const Score = ({ score, color }: { score: number; color: string }) => (
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

  const DimensionIcon = ({
    dimension,
    color,
  }: {
    dimension: Dimension;
    color: string;
  }) => {
    switch (dimension) {
      case "emotional":
        return <Feather name="smile" size={24} color={color} />;
      case "cognitive":
        return <MaterialCommunityIcons name="brain" size={24} color={color} />;
      case "critical":
        return <Feather name="search" size={24} color={color} />;
      default:
        return <Feather name="pen-tool" size={24} color={color} />;
    }
  };

  const ResultCard = ({
    dimension,
    score,
  }: {
    dimension: Dimension;
    score: StudentScore;
  }) => (
    <View
      style={tw`flex-col gap-4 items-center justify-between w-full rounded-lg border-2 border-gray-200 bg-gray-50 p-4`}
    >
      <View style={tw`flex-row w-full items-center justify-between`}>
        <View style={tw`flex-row gap-2 items-center justify-center`}>
          <View style={tw`h-6 w-6 items-center justify-center`}>
            <DimensionIcon dimension={dimension} color={score.color} />
          </View>
          <Text style={tw`text-xl capitalize`}>
            {t(`dimension.${dimension}`)}
          </Text>
        </View>
        <Text style={tw`text-sm`}>
          {score.answerCount}/{t(`${dimension}.count`)}
        </Text>
      </View>
      <View style={tw`min-h-[60px] items-center justify-center`}>
        {score.isCompleted ? (
          <Score score={score.percent} color={score.color} />
        ) : (
          <Text style={tw`text-xl font-semibold`}>
            {score.answerCount}/{t(`${dimension}.count`)}
          </Text>
        )}
      </View>
    </View>
  );

  const Results = () => (
    <View style={tw`w-full gap-4`}>
      <TouchableOpacity
        style={tw`flex-row gap-2 items-center`}
        onPress={() => setSelectedStudent(null)}
      >
        <AntDesign name="left" size={14} color="black" />
        <Text>{t("students")}</Text>
      </TouchableOpacity>
      <Text style={tw`text-2xl font-bold`}>{selectedStudent?.name}</Text>
      <Text style={tw`text-gray-500`}>{selectedStudent?.email}</Text>
      {scores ? (
        <View style={tw`gap-4`}>
          {dimensions.map((dimension) => (
            <ResultCard
              key={dimension}
              dimension={dimension}
              score={scores[dimension]}
            />
          ))}
        </View>
      ) : (
        <Text>{t("waiting_connection")}</Text>
      )}
    </View>
  );

  if (isLoading) return null;

  return (
    <ScrollView contentContainerStyle={tw`grow p-4`}>
      <View style={tw`w-full gap-4`}>
        {selectedStudent ? (
          <Results />
        ) : (
          <>
            <View style={tw`flex-row items-center justify-between`}>
              <Text style={tw`text-2xl capitalize`}>{t("students")}</Text>
              <TouchableOpacity
                style={tw`h-10 w-10 rounded-full items-center justify-center bg-blue-500`}
                onPress={downloadStudents}
              >
                <Feather name="download" size={18} color="white" />
              </TouchableOpacity>
            </View>
            <View
              style={tw`flex-row gap-2 items-center rounded-lg border border-gray-300 px-3`}
            >
              <Feather name="search" size={18} color="gray" />
              <TextInput
                style={tw`flex-1 py-3`}
                placeholder={t("search")}
                value={query}
                onChangeText={setQuery}
              />
            </View>
            <View style={tw`gap-2`}>
              {filteredStudents.map((student) => (
                <TouchableOpacity
                  key={studentKey(student)}
                  style={tw`rounded-lg border border-gray-200 bg-gray-50 p-4`}
                  onPress={() => loadStudentScores(student)}
                >
                  <Text style={tw`text-lg font-semibold`}>{student.name}</Text>
                  <Text style={tw`text-gray-500`}>{student.email}</Text>
                </TouchableOpacity>
              ))}
              {filteredStudents.length === 0 && (
                <Text style={tw`text-center text-gray-500`}>
                  {t("no_students")}
                </Text>
              )}
            </View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default StudentsScreen;
