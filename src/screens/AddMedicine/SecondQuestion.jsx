// SecondQuestionScreen.js
import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SecondQuestionScreen = ({ route }) => {
  const { medicine } = route.params;
  const [medicineType, setMedicineType] = useState("");
  const navigation = useNavigation();

  const options = [
    "Pill",
    "Solution",
    "Injection",
    "Powder",
    "Drops",
    "Inhaler",
    "Other",
  ];

  return (
    <View className="flex-1 bg-[#eae8e5] items-center ">
      <Text className="m-5 mb-20 mt-20 text-xl  text-white font-bold ">
        What kind of medicine is it?
      </Text>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => {
            setMedicineType(option);
            navigation.navigate("ThirdQuestionScreen", {
              medicine,
              medicineType: option,
            });
          }}
          className="bg-yellow-300  px-4 py-2 w-[80vw] items-center rounded-full m-2"
        >
          <Text className="text-lg">{option}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SecondQuestionScreen;
