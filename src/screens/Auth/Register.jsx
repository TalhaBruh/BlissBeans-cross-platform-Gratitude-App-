import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SignUp } from "../../assets/authScreens";
import { useNavigation } from "@react-navigation/native";
const RegisterScreen = () => {
  const navigation = useNavigation();
  const handleSignUp = async () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#eae8e5]">
      <View>
        <Image source={SignUp} className="h-[150px] w-[150px] mb-10" />
      </View>
      <View>
        <TextInput
          placeholder="Name"
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="email"
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="password"
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="confirm password"
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />

        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-red-600 px-[30%] py-2 rounded-full m-2"
        >
          <Text className="text-white text-lg uppercase">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;
