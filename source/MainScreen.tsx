import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Image,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { TextInput } from "react-native-paper";
import { white } from "react-native-paper/lib/typescript/styles/colors";

export default function MainScreen(): React.ReactNode {
  const Titletranslation = useRef(new Animated.Value(0.8)).current;
  const [ContentsTranslation, setContentsTranslation] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({
    Title: "",
    Year: "",
    Poster: "",
    Plot: "",
    Genre: "",
  });
  const [search, setSearch] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  /* ----------------------- JSON Handeling Part----------------------- */

  useEffect(() => {
    fetch("http://www.omdbapi.com/?t=" + search + "&apikey=92d4b7fb")
      .then((response) => response.json())
      .then((json) =>
        setData({
          Title: json["Title"],
          Year: json["Year"],
          Poster: json["Poster"],
          Plot: json["Plot"],
          Genre: json["Genre"],
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  /* ----------------------- Animation Handeling Part----------------------- */
  const onPress1 = () => {
    {
      Animated.timing(Titletranslation, {
        toValue: 0.00001,
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }
    setContentsTranslation(false);
  };

  return (
    <SafeAreaView style={[styles.container]}>
      {/* --------------------------------------------- Before Animated Title Part --------------------------------------------- */}

      <View style={styles.background}></View>
      <Animated.View
        style={[{ flex: Titletranslation }, styles.titleContainer]}
      >
        <Text style={styles.titleFont}>
          "OMDB" {"\n"} Find Movies! {"\n"}
        </Text>
      </Animated.View>
      {/* --------------------------------------------- After Animated Title Part --------------------------------------------- */}

      {/* ------------------------------------------------- Before Animated Contents Part --------------------------------------------- */}

      {ContentsTranslation && (
        <View style={styles.beforeAnimated}>
          <AwesomeButton
            {...undefined}
            onPress={onPress1}
            width={300}
            borderRadius={20}
            raiseLevel={8}
            backgroundColor={"grey"}
          >
            <Text style={{ fontWeight: "bold" }}>Get Started</Text>
          </AwesomeButton>
        </View>
      )}
      {/* ------------------------------------------------- Before Animated Contents Part --------------------------------------------- */}

      {/* ------------------------------------------------- After Animated Contents Part --------------------------------------------- */}
      {!ContentsTranslation && (
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.afterAnimated}>
            <TextInput
              style={styles.textinput}
              left={<TextInput.Icon name="movie" />}
              placeholder="Search Movies"
              placeholderTextColor={"white"}
              onChangeText={(text) => setSearch(text)}
              autoComplete={undefined}
              underlineColor="white"
              theme={{
                colors: {
                  placeholder: "white",
                  text: "white",
                  primary: "white",
                  background: "#003489",
                },
              }}
            />

            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              {data.Poster && (
                <Image
                  style={styles.posterImage}
                  source={{ uri: data.Poster }}
                />
              )}
            </View>
            {data.Plot && (
              <ScrollView style={{ margin: 10 }}>
                <Text style={{ fontSize: 30, color: "white" }}>
                  {data.Title} ({data.Year})
                </Text>
                <Text style={{ color: "grey" }}>{data.Genre}</Text>

                <Text style={{ color: "white" }}></Text>
                <Text style={{ color: "white", fontSize: 24 }}>Plot:</Text>
                <Text style={{ color: "#c6c6c6" }}>{data.Plot}</Text>
                <View style={{ alignItems: "center", marginTop: 50 }}>
                  <AwesomeButton
                    {...undefined}
                    onPress={() => setModalVisible(!modalVisible)}
                    width={80}
                    height={80}
                    raiseLevel={8}
                    borderRadius={1000}
                    backgroundColor={"grey"}
                  >
                    <Text style={{ textAlign: "center" }}>
                      Want to Click me?
                    </Text>
                  </AwesomeButton>
                </View>
              </ScrollView>
            )}

            {/* ------------------------------------------------- After Animated Contents Part --------------------------------------------- */}

            {/* ------------------------------------------------- Modal Part Begin --------------------------------------------- */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <View style={styles.modalView}>
                  <View style={{ margin: 10 }}>
                    <View style={{ alignItems: "center" }}>
                      <Image
                        style={{ width: 150, height: 250, margin: 10 }}
                        source={{ uri: data.Poster }}
                      />
                      <Text style={{ fontWeight: "bold" }}>{data.Title}</Text>
                      <Text>{data.Year}</Text>
                      <Text style={{ color: "grey" }}>{data.Genre}</Text>
                      <Text
                        style={{
                          // borderWidth: 1.5,
                          // borderColor: "black",
                          backgroundColor: "white",
                          borderRadius: 15,
                          padding: 10,
                        }}
                      >
                        "{data.Plot}"
                      </Text>
                    </View>
                  </View>

                  <View style={{ alignItems: "center" }}>
                    <AwesomeButton
                      {...undefined}
                      onPress={() => setModalVisible(!modalVisible)}
                      width={100}
                      backgroundColor={"#fff"}
                    >
                      <Text>Got it</Text>
                    </AwesomeButton>
                  </View>
                </View>
              </View>
            </Modal>
            {/* ------------------------------------------------- Modal Part End --------------------------------------------- */}
          </View>
        </TouchableWithoutFeedback>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  background: {
    position: "absolute",
    height: Platform.OS === "web" ? "100%" : "120%",
    backgroundColor: "#343d46",
    // backgroundColor: "white",
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
  },
  titleFont: {
    textAlign: "center",
    marginTop: 16,
    fontSize: 60,
    color: "white",
    fontWeight: "bold",
  },
  titleContainer: {
    backgroundColor: "#FFD700",
    justifyContent: "center",
    borderBottomLeftRadius: 60,
    borderBottomRightRadius: 60,
  },
  posterImage: {
    width: 250,
    height: 400,
    borderRadius: 30,
    marginBottom: 15,
  },
  beforeAnimated: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#343d46",
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
  },
  afterAnimated: {
    alignItems: "center",
    flex: 1,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    backgroundColor: "#343d46",
  },
  textinput: {
    margin: 20,
    height: 50,
    width: "80%",
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
    backgroundColor: "#343d46",
    color: "white",
  },
  modalView: {
    backgroundColor: "#F2E5D9",
    // alignContent: "center",
    borderRadius: 20,
    borderColor: "grey",
    borderWidth: 1,
    width: "90%",
    height: "60%",
  },
});
{
  /* {data.Poster && (
                  <Text style={{ textAlign: "center", color: "grey" }}>
                    Click images to see details
                  </Text>
                )} */
}
