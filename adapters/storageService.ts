import AsyncStorage from "@react-native-async-storage/async-storage";
import { StorageService } from "../ports/StorageService";

export const storageService: StorageService = {
  save: (key, value) => AsyncStorage.setItem(`eric-${key}`, value),
  get: (key) => AsyncStorage.getItem(key),
};
