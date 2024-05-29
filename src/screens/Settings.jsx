import { SafeAreaView, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import app from '../../FirebaseConfig';
import { getAuth, signOut } from "firebase/auth";
import { MedicineContext } from "../context/ContextProvider";

const LogoutScreen = () => {
  const navigation = useNavigation();
  const {isUserSignedIn, setIsUserSignedIn, setUser} = useContext(MedicineContext);
  
  const auth = getAuth(app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsUserSignedIn(false);
      setUser(null);
      navigation.navigate('SignIn');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView className='flex-1 items-center justify-center bg-[#eae8e5]'>
      <View>
      <Text className='text-white text-lg uppercase mb-20'>Settings </Text>
        
        <TouchableOpacity onPress={handleLogout} className='bg-red-600 px-[30%] py-2 rounded-full m-2'>
          <Text className='text-white text-lg uppercase'>Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default LogoutScreen;