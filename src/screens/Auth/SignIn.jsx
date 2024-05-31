import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SignIn } from "../../assets/authScreens";
import { useNavigation } from "@react-navigation/native";
import { useState, useContext } from "react";
import app from "../../../FirebaseConfig";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { MedicineContext } from "../../context/ContextProvider";
const SignInScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isUserSignedIn, setIsUserSignedIn, setUser } =
    useContext(MedicineContext);

  const auth = getAuth(app);

  const handleSignUp = async () => {
    navigation.navigate("SignUp");
  };

  const handleSignIn = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      setIsUserSignedIn(true);
      setUser(user);
      navigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  const handleForgotPass = async () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#eae8e5]">
      <View>
        <Image source={SignIn} className="h-[150px] w-[150px] mb-10" />
      </View>
      <View>
        <TextInput
          placeholder="email"
          className="bg-gray-100 text-center py-2 rounded-full m-2"
          onChangeText={setEmail}
          value={email}
        />
        <TextInput
          placeholder="password"
          className="bg-gray-100 text-center py-2 rounded-full m-2"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TouchableOpacity
          onPress={handleSignIn}
          className="bg-red-600 px-[30%] py-2 rounded-full m-2"
        >
          <Text className="text-white text-lg uppercase">Log In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-red-600 px-[30%] py-2 rounded-full m-2"
        >
          <Text className="text-white text-lg uppercase">Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPass}>
          <Text className="text-sm text-gray-300 italic w-full text-center">
            Forgot pass?
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
