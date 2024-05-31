import * as ImagePicker from "expo-image-picker";
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  BackHandler,
  Alert,
} from "react-native";
import Modal from "react-native-modal";
import Document from "../assets/setup-icon.png";
import granny from "../assets/granny.png";
import beansPlate from "../assets/beansPlate.png";
import Pill from "../assets/Pill.png";
import diary from "../assets/diary-icon.png";
import save from "../assets/save-icon.png";
import photo from "../assets/photo-icon.png";
import { createBean } from "../utils/db";
import { useNavigation, useRoute } from "@react-navigation/native";
import diaryHeader from "../assets/bean-blessbean.png";
import message from "../assets/HeaderMessage.png";
import germanMessage from "../assets/GermanMessage.png";
import throwBeanGif from "../assets/Gif/throwBean.gif";
import ThrowABeanGermen from "../assets/Gif/throwBeanGerman.gif";
import smoke from "../assets/bean-swoosh.png";
import beanImg from "../assets/bean.png";
import LottieView from "lottie-react-native";
import * as Animatable from "react-native-animatable";
import { Audio } from "expo-av";
import {
  bean_animation,
  dry_pop,
  entry_list,
  setup,
} from "../assets/Sounds/AllSounds";
import { LanguageProvider, LanguageContext } from "../context/LanguageContext";
import ImagePickerComp from "../components/ImageModal";

const Welcome = (props) => {
  let route = useRoute();
  const [count, setCount] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isPillVisible, setPillVisible] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [bean, setBean] = useState({ text: "", picture: null });
  const navigation = useNavigation();
  const increment = () => {
    // setCount(count + 1);
    setPillVisible(true);
    setIsSaved(false);
    playSound(bean_animation);
    setTimeout(() => {
      setModalVisible(true);
      setPillVisible(false);
    }, 200);
  };
  // alert(route.name)

  const handleSave = async () => {
    const time_created = new Date().toISOString();
    const description = bean.text;
    const picture_uri = bean.picture;
    try {
      const id = await createBean(time_created, description, picture_uri);
      console.log(`Bean created with ID: ${id}`);
      setBean({ text: "", picture: null });
      setModalVisible(false);
      setCount(count + 1);
      setIsSaved(true);
      playSound(dry_pop);
    } catch (error) {
      console.error(`Error creating bean: ${error}`);
    }
  };

  const [imageModal, setImageModal] = useState(false);
  const [result, setResult] = useState(null);
  const handleImageResponse = (_data) => {
    // console.log("Data = ",_data)
    setResult(_data);
    setImageModal(false);
    if (_data) {
      setBean({ ...bean, picture: _data.assets[0].uri });
    }
  };
  const selectImage = async () => {
    playSound(setup);
    setImageModal(true);
  };

  //Exit from app When back Press
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to exit from app?", [
        { text: "Cancel", onPress: () => null, style: "cancel" },
        { text: "YES", onPress: () => BackHandler.exitApp() },
      ]);
      return true;
    };

    if (route.name == "Home") {
      BackHandler.addEventListener("hardwareBackPress", backAction);
    }

    // return () => backHandler.remove();
  }, []);

  // Sound Effect
  const [sound, setSound] = useState();
  async function playSound(audioWillBe) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audioWillBe);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    checkWhichLangIsSelected();
  }, []);
  const { language, setLanguage } = useContext(LanguageContext);
  const checkWhichLangIsSelected = async () => {
    let selectedLang = await getItem("language");
    if (selectedLang == "1") {
      setLanguage("english");
    } else {
      setLanguage("german");
    }
  };

  const animation = React.useRef(null);
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <Animatable.View
          animation="bounceIn"
          duration={2000} // Adjust duration as needed
          // iterationCount={'infinite'}
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Image
            source={diaryHeader}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </Animatable.View>
        <Animatable.View animation="zoomIn" style={styles.imageContainer}>
          <Image source={granny} style={styles.image} />
          <View style={styles.countContainer}>
            <Text style={styles.count}>{count}</Text>
          </View>
        </Animatable.View>
        <TouchableOpacity
          style={{
            height: 120,
            width: 100,
            position: "absolute",
            top: 105,
            right: 25,
          }}
          onPress={() => {
            navigation.navigate("Onboarding");
          }}
        >
          <Image
            source={language == "english" ? message : germanMessage}
            style={styles.messageImage}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => {
            setModalVisible(false);
            navigation.navigate("Donation");
          }}
        >
          <Image
            source={Document}
            style={[styles.icon, { width: 50, height: 50 }]}
          />
        </TouchableOpacity>
        <Image
          source={language == "english" ? throwBeanGif : ThrowABeanGermen}
          style={styles.throwBeanImage}
          resizeMode="contain"
        />
        <TouchableOpacity onPress={increment}>
          <Image source={beansPlate} style={styles.largeIcon} />
          {/* {isPillVisible && <Image source={Pill} style={styles.pill} />} */}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Diary");
            playSound(entry_list);
            setIsSaved(false);
          }}
        >
          <Image
            source={diary}
            style={[styles.icon, { width: 45, height: 40 }]}
          />
        </TouchableOpacity>
      </View>

      {/* Bean Movin from plate */}
      {isModalVisible ? (
        <View
          style={{
            height: "10%",
            width: "30%",
            position: "absolute",
            bottom: 80,
            left: 120,
          }}
        >
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: "100%",
              // backgroundColor: '#eee',
            }}
            loop={false}
            source={require("../assets/Animations/bean (10).json")}
          />
        </View>
      ) : (
        ""
      )}

      {/* Bean going to pocket */}
      <View
        style={{
          height: "70%",
          width: "100%",
          position: "absolute",
          top: 140,
          right: 50,
        }}
      >
        {isSaved ? (
          <LottieView
            autoPlay
            ref={animation}
            style={{
              width: "100%",
              height: "90%",
              marginTop: 50,
              paddingTop: 50,
              // backgroundColor:'#fff'
            }}
            loop={false}
            source={require("../assets/Animations/bean (9).json")}
          />
        ) : (
          ""
        )}
        {
          // Smoke Animation
          <View
            style={{
              height: "70%",
              width: "100%",
              position: "absolute",
              bottom: 0,
              left: 20,
            }}
          >
            {isSaved ? (
              <LottieView
                autoPlay
                ref={animation}
                style={{
                  width: "100%",
                  height: "90%",
                  marginTop: 50,
                  paddingTop: 50,
                  // backgroundColor:'#fff'
                }}
                loop={false}
                source={require("../assets/Animations/bean-swoosh.json")}
              />
            ) : (
              ""
            )}
          </View>
        }
      </View>

      <Modal
        isVisible={isModalVisible}
        backdropOpacity={0.1}
        onBackdropPress={() => {
          setModalVisible(false);
        }}
      >
        <View style={styles.modal}>
          <View style={styles.triangle} />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <View style={styles.modalLeft}>
              <Text style={styles.modalHeading}>
                {language == "english"
                  ? `Write your today's happiness moment`
                  : `Hinterlasse hier deinen heutigen Happy Moment!`}
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Text"
                value={bean.text}
                onChangeText={(text) => setBean({ ...bean, text: text })}
              />
            </View>

            {bean.picture ? (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  width: "33%",
                }}
              >
                <Image
                  source={{ uri: bean.picture }}
                  style={styles.InputImage}
                />
              </View>
            ) : (
              <Text style={{ fontSize: 100, marginRight: 20 }}>+</Text>
            )}
          </View>

          <View style={styles.buttons}>
            <TouchableOpacity onPress={handleSave}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 5,
                  alignContent: "center",
                }}
              >
                <Image
                  source={save}
                  style={[styles.icon, { width: 30, height: 30 }]}
                />
                <Text
                  style={{
                    color: "#9a6041",
                    alignSelf: "center",
                    fontSize: 11,
                  }}
                >
                  {language == "english" ? `Save Entry` : "Eintrag speichern"}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={selectImage}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 5,
                  alignContent: "center",
                }}
              >
                <Text
                  style={{
                    color: "#9a6041",
                    alignSelf: "center",
                    fontSize: 11,
                  }}
                >
                  {language == "english" ? `Got a photo` : "Foto gemacht?"}
                </Text>
                <Image
                  source={photo}
                  style={[styles.icon, { width: 30, height: 30 }]}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ImagePickerComp
        isVisible={imageModal}
        ImageResult={handleImageResponse}
        onCloseModal={(res) => {
          setImageModal(res);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cecac1",
  },
  topSection: {
    flex: 0.8,
    backgroundColor: "eae8e5",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    height: 40,
    width: 200,
    borderColor: "transparent",
    borderWidth: 1,
    marginVertical: 10,
    color: "#9a6041",
    // backgroundColor:'yellow'
  },
  InputImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    fontFamily: "sans-serif",
    fontStyle: "italic",
  },
  imageContainer: {
    position: "relative",
    width: "80%",
    height: "90%",
    marginTop: 20,
    marginTop: 50,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  countContainer: {
    position: "absolute",
    top: 330,
    right: 180,
    backgroundColor: "#9a6041",
    width: 30,
    height: 30,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  count: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },

  bottomSection: {
    flex: 0.2,
    backgroundColor: "#9a6041",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  icon: {
    width: 40,
    height: 40,
  },
  largeIcon: {
    width: 200,
    height: 200,
  },
  pill: {
    position: "absolute",
    width: 30,
    height: 30,
    top: 0,
    left: 0,
  },
  modal: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 15,
    color: "orange",
    minHeight: "30%",
    justifyContent: "space-between",
    borderRadius: 20,
    borderColor: "rgba(0, 0, 0, 0.1)",
    width: "100%",
    alignSelf: "center",
    // flexDirection: "row", // Add this
    alignItems: "center", // Add this
  },
  triangle: {
    position: "absolute",
    left: 20, // Adjust this
    bottom: -70, // Adjust this
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderLeftWidth: 10, // Increase this
    borderRightWidth: 30, // Increase this
    borderTopWidth: 70, // Increase this
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
    borderTopColor: "rgba(255, 255, 255, 0.85)",
  },
  modalLeft: {
    gap: 30,
    // backgroundColor:'green',
    width: "70%",
  },
  modalHeading: {
    color: "#9a6041",
    fontSize: 14,
    fontWeight: "bold",
    maxWidth: "90%",
    // backgroundColor:'yellow'
  },
  buttons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  headerImage: {
    width: "100%",
    height: 150,
    zIndex: 1,
    position: "absolute",
    top: 30,
  },
  messageImage: {
    width: "100%",
    height: 100,
    // position: 'absolute', top: 105, right:25,
    resizeMode: "cover",
  },
  throwBeanImage: {
    width: "30%",
    height: 100,
    position: "absolute",
    right: 90,
    bottom: 130,
    resizeMode: "cover",
  },
  topHeader: {
    width: "100%",
    height: 100,
    marginBottom: -20,
  },
});

export default Welcome;
