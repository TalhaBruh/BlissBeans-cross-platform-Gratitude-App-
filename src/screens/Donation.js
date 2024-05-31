import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  FlatList,
  BackHandler,
} from "react-native";
import diary from "../assets/diary-icon.png";
import Document from "../assets/setup-icon.png";
import beansPlate from "../assets/beansPlate.png";
import donationHeader from "../assets/DonationHeader.png";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Audio } from "expo-av";
import { setup } from "../assets/Sounds/AllSounds";
import {
  Apple,
  English,
  Facebook,
  German,
  Instagram,
  Paypal,
  Tiktok,
} from "../assets/SocialMedaiLinks/linkimages";
import * as Font from "expo-font";
import { LanguageContext, useLanguage } from "../context/LanguageContext";
import { setItem } from "../utils/AsyncStorage";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

const Donation = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();
  async function playSound(audioWillBe) {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(audioWillBe);
    setSound(sound);
    console.log("Playing Sound");
    await sound.playAsync();
  }

  const handleCenterPress = () => {
    playSound(setup);
    navigation.navigate("Home");
  };

  const handleBackPress = () => {
    navigation.goBack();
    return true;
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const [fontsLoaded, fontError] = Font.useFonts({
    PaytoneOne: require("../../assets/fonts/PaytoneOne-Regular.ttf"),
  });

  if (!fontsLoaded) {
    // alert("Aaaaaaaaaa = ",fontsLoaded )
    // return null
  }

  const { language, setLanguage } = useContext(LanguageContext);
  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    if (newLanguage == "english") {
      setItem("language", "1");
    } else {
      setItem("language", "0");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.topSection}>
        <View style={styles.topHeader}>
          <Image
            source={donationHeader}
            style={styles.headerImage}
            resizeMode="contain"
          />
        </View>
        <View style={styles.languageView}>
          <Text style={styles.font}>
            {language == "english"
              ? `Chose your language!`
              : "Wähle Deine Sprache!"}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <View style={{ width: 100, height: 100 }}>
              <TouchableOpacity onPress={() => handleLanguageChange("german")}>
                <Image source={German} style={styles.flag} />
              </TouchableOpacity>
            </View>
            <View style={{ width: 100, height: 100, marginLeft: 10 }}>
              <TouchableOpacity onPress={() => handleLanguageChange("english")}>
                <Image source={English} style={styles.flag} />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.separator} />
        </View>
        <View style={[styles.languageView, { height: "35%" }]}>
          <Text style={styles.font}>
            {language == "english"
              ? `Make a donation`
              : "Spende an den Entwickler"}
          </Text>

          {language == "english" ? (
            <Text style={styles.donationFont}>
              Your donations are what allows to achieve our goals at the
              BlissBeans project. The best way to support me is making a
              donation or by signing up to Patreon and becoming a monthly
              donator. By doing this you'll also recieve a unique monthly gift
              to you!
            </Text>
          ) : (
            <>
              <View style={{ width: "100%" }}>
                <Text
                  style={styles.donationFont}
                >{`Mit Deiner Spende kann ich BlissBeans weiterentwicklen. Der beste Weg, mich zu unterstützen, ist eine Spende :-)`}</Text>
              </View>
              <View style={{ width: "100%" }}>
                <Text style={styles.donationFont}>
                  {"Folge Mir auch auf Instagram, Facebook und TikTok!"}
                </Text>
              </View>
            </>
          )}

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
              alignSelf: "center",
            }}
          >
            <View style={{ width: 120, height: 50 }}>
              <TouchableOpacity
                onPress={() =>
                  // WebBrowser.openBrowserAsync(
                  //   "https://www.paypal.com/donate/?hosted_button_id=VZDL6YX6V6X2N"
                  // )
                  Linking.openURL(
                    "https://www.paypal.com/donate/?hosted_button_id=VZDL6YX6V6X2N"
                  )
                }
              >
                <Image source={Paypal} style={{ height: 50, width: 120 }} />
              </TouchableOpacity>
            </View>
            <View style={{ width: 120, height: 50 }}>
              <TouchableOpacity
              // onPress={() => WebBrowser.openBrowserAsync('https://developer.apple.com/documentation/apple_pay_on_the_web/payment_request_api/setting_up_the_payment_request_api_to_accept_apple_pay')}
              >
                <Image
                  source={Apple}
                  resizeMode="contain"
                  style={{ height: 50, width: 120 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.Links}>
          <Text style={styles.font}>
            {language == "english" ? `Follow blissbeans` : `Folge Blissbeans`}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "95%",
              alignSelf: "center",
            }}
          >
            <View style={{ width: 50, height: 50 }}>
              <TouchableOpacity
                onPress={() =>
                  // WebBrowser.openBrowserAsync(
                  //   "https://www.instagram.com/bliss_beans?igsh=MTBkMzJlNzB6MGhseg%3D%3D&utm_source=qr"
                  // )
                  Linking.openURL(
                    "https://www.instagram.com/bliss_beans?igsh=MTBkMzJlNzB6MGhseg%3D%3D&utm_source=qr"
                  )
                }
              >
                <Image
                  source={Instagram}
                  resizeMode="contain"
                  style={{ height: 50, width: 120, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: 50, height: 50 }}>
              <TouchableOpacity
                onPress={() =>
                  // WebBrowser.openBrowserAsync(
                  //   "https://www.facebook.com/share/ytveXMYWzjU3Ucd7/?mibextid=LQQJ4d"
                  // )
                  Linking.openURL(
                    "https://www.facebook.com/share/ytveXMYWzjU3Ucd7/?mibextid=LQQJ4d"
                  )
                }
              >
                <Image
                  source={Facebook}
                  resizeMode="contain"
                  style={{ height: 50, width: 120, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
            <View style={{ width: 120, height: 50 }}>
              <TouchableOpacity
                onPress={() =>
                  // WebBrowser.openBrowserAsync(
                  //   "https://www.tiktok.com/@blissbeans.me"
                  // )
                  Linking.openURL("https://www.tiktok.com/@blissbeans.me")
                }
              >
                <Image
                  source={Tiktok}
                  resizeMode="contain"
                  style={{ height: 50, width: 120, alignSelf: "center" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.bottomSection}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Donation");
          }}
        >
          <Image
            source={Document}
            style={[styles.icon, { width: 50, height: 50 }]}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleCenterPress}>
          <Image source={beansPlate} style={styles.largeIcon} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Diary");
          }}
        >
          <Image
            source={diary}
            style={[styles.icon, { width: 45, height: 40 }]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cecac1",
    // backgroundColor:'red'
  },
  topSection: {
    flex: 0.8,
    backgroundColor: "#eae8e5",
    alignItems: "center",
    // justifyContent: "center",
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
  headerImage: {
    width: "100%",
    height: 150,
    zIndex: 1,
    // backgroundColor:'red',
  },
  topHeader: {
    width: "100%",
    height: "20%",
    // backgroundColor:'yellow',
    paddingHorizontal: 20,
  },
  separator: {
    borderBottomColor: "#9a6041",
    borderBottomWidth: 2,
    width: "95%",
    // marginLeft: 30,
    marginTop: 10,
    alignSelf: "center",
  },
  languageView: {
    // backgroundColor:'skyblue',
    height: "25%",
    width: "100%",
    justifyContent: "space-around",
    // alignItems:'center'
    padding: 10,
  },
  Links: {
    // backgroundColor:'pink',
    height: "20%",
    width: "100%",
    justifyContent: "space-around",
    // alignItems:'center'
    padding: 10,
  },
  flag: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  font: {
    fontFamily: "PaytoneOne",
    fontSize: 22,
    color: "#e87353",
    marginHorizontal: 10,
  },
  donationFont: {
    fontFamily: "PaytoneOne",
    fontSize: 10,
    color: "#9a6041",
    marginHorizontal: 10,
  },
});

export default Donation;
