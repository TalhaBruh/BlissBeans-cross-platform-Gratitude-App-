import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    console.log("Error Setting item");
  }
};

export const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    console.log("Error getting Item");
  }
};

export const removeItem = async (key) => {
  try {
    const value = await AsyncStorage.removeItem(key);
    return value;
  } catch (error) {
    console.log("Error removing item");
  }
};
  qw