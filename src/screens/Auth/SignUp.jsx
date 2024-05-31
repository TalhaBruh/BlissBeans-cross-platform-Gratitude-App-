import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import { SignUp } from "../../assets/authScreens";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import firebase from "firebase/app";
// import 'firebase/auth';
import app from "../../../FirebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { setItem } from "../../utils/AsyncStorage";

const SignUpScreen = () => {
  const navigation = useNavigation();
  const auth = getAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, { displayName: name });
      console.log("done");
      setItem("user", user);
      navigation.navigate("Home");
    } catch (error) {
      alert(error.message);
    }
  };
  // const handleGoogleSignIn = async () => {
  //   try {
  //     const provider = new GoogleAuthProvider(app);
  //     const result = await signInWithPopup(auth, provider);
  //     const user = result.user;
  //     // The user is signed in with Google. You can now save the user data in your context.
  //     navigation.navigate("Home");
  //   } catch (error) {
  //     // Handle any errors here.
  //     console.error(error);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-[#eae8e5]">
      <View>
        <Image source={SignUp} className="h-[150px] w-[150px] mb-10" />
      </View>
      <View>
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          className="bg-gray-100  text-center py-2 rounded-full m-2 "
        />
        <TouchableOpacity
          onPress={handleSignUp}
          className="bg-red-600 px-[30%] py-2 rounded-full m-2"
        >
          <Text className="text-white text-lg uppercase">Sign Up</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={handleGoogleSignIn}
          className="bg-red-600 px-[27%] py-2 rounded-full m-2"
        >
          <Text className="text-white text-lg uppercase">
            Sign In with Google
          </Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

export default SignUpScreen;
