import { useEffect, useRef, useState } from "react";
import { View, Alert, Text, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import userService from "@/services/userService";
import storageService from "@/services/storageService";
import universityService from "@/services/universityService";
import { useTranslation } from "react-i18next";
import Input from "@/components/ui/Input";
import { Picker } from "@react-native-picker/picker";

const RegisterScreen = () => {
  const { t } = useTranslation();
  const initialMount = useRef(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"student" | "professor">("student");
  const [country, setCountry] = useState("");
  const [institution, setInstitution] = useState("");
  const [age, setAge] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [availableCountries, setAvailableCountries] = useState<string[]>([]);
  const [availableInstitutions, setAvailableInstitutions] = useState<string[]>(
    [],
  );
  const [writeInstitution, setWriteInstitution] = useState<boolean>(false);

  useEffect(() => {
    if (initialMount.current) {
      initialMount.current = false;
      fetch("https://restcountries.com/v3.1/all?fields=name")
        .then((res) => res.json())
        .then((data) => {
          const countries = data.map((country) => country.name.common).sort();
          setAvailableCountries(countries);
        })
        .catch((err) => Alert.alert("", err.message));
    }
  }, []);

  useEffect(() => {
    if (country) {
      setInstitution("");
      universityService
        .search(country)
        .then((data) => {
          if (!data.length) return setWriteInstitution(true);
          setWriteInstitution(false);
          const institutions = data
            .map((institution) => institution.name)
            .sort();
          setAvailableInstitutions(institutions);
        })
        .catch((_err) => setWriteInstitution(true));
    }
  }, [country]);

  const handleRegister = () => {
    if (
      !name ||
      !email ||
      !password ||
      !confirmPassword ||
      !type ||
      !country ||
      !institution ||
      !age
    )
      return Alert.alert("", t("all_fields_required"));

    if (password !== confirmPassword)
      return Alert.alert("", t("passwords_dont_match"));

    userService
      .register({ name, email, password, type, country, institution, age })
      .then(async (_user) => {
        const token = await userService.login(email, password);

        if (token) {
          storageService.save("session", token);
        }
        router.replace("/language");
      })
      .catch((error) => {
        Alert.alert("", error.message);
      });
  };

  const goToLogin = () => router.push("/login");

  return (
    <View
      style={tw`flex w-full h-full items-center justify-center bg-gray-100`}
    >
      <View
        style={tw`flex gap-4 bg-white w-80% p-4 py-8 rounded shadow-md items-center justify-center`}
      >
        <Text style={tw`text-2xl capitalize`}>{t("register")}</Text>
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("full_name")}
          onChangeText={setName}
          value={name}
        />
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("email")}
          onChangeText={setEmail}
          value={email}
        />
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("age")}
          onChangeText={setAge}
          value={age}
          type="number"
        />
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("password")}
          secureTextEntry
          onChangeText={setPassword}
          value={password}
        />
        <Input
          style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
          placeholder={t("confirm_password")}
          secureTextEntry
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Picker
          key="type"
          selectedValue={type}
          onValueChange={(value) => setType(value)}
          style={tw`w-full text-black`}
          mode="dropdown"
        >
          <Picker.Item label={t("student")} value="student" />
          <Picker.Item label={t("professor")} value="professor" />
        </Picker>
        {availableCountries.length > 0 && (
          <Picker
            key="country"
            selectedValue={country}
            onValueChange={(value) => setCountry(value)}
            style={tw`w-full text-black`}
          >
            <Picker.Item label={t("select_country")} value="" />
            {availableCountries.map((country) => (
              <Picker.Item key={country} label={country} value={country} />
            ))}
          </Picker>
        )}
        {availableInstitutions.length > 0 && !writeInstitution && (
          <Picker
            key="institution"
            selectedValue={institution}
            onValueChange={(value) => setInstitution(value)}
            style={tw`w-full text-black`}
          >
            <Picker.Item label={t("select_institution")} value="" />
            {availableInstitutions.map((institution) => (
              <Picker.Item
                key={institution}
                label={institution}
                value={institution}
              />
            ))}
          </Picker>
        )}
        {writeInstitution && (
          <Input
            style={tw`w-full rounded-lg border-2 border-gray-300 p-2`}
            placeholder={t("Institution")}
            onChangeText={setInstitution}
            value={institution}
          />
        )}
        <TouchableOpacity
          style={tw`w-full rounded-full bg-blue-500 py-2 px-4 text-white`}
          onPress={handleRegister}
        >
          <Text style={tw`text-center text-white`}>{t("register")}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => goToLogin()}>
          <Text style={tw`text-center text-blue-500`}>
            {t("register_login")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
