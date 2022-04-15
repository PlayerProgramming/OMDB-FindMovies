import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Image,
  Platform,
  TouchableOpacity,
  Modal,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { TextInput } from "react-native-paper";

export default function MainScreen(): React.ReactNode {
  const Titletranslation = useRef(new Animated.Value(0.8)).current;
  const [ContentsTranslation, setContentsTranslation] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ Title: "", Year: "", Poster: "" });
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
        })
      )
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  });

  /* ----------------------- Animation Handeling Part----------------------- */
  const onPress1 = () => {
    {
      Animated.timing(Titletranslation, {
        toValue: 0.2,
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
      <Animated.View style={[{ flex: Titletranslation }, styles.animated]}>
        <Text style={styles.title}>
          "OMDB" {"\n"} Find Movies! {"\n"}
        </Text>
      </Animated.View>
      {/* --------------------------------------------- After Animated Title Part --------------------------------------------- */}

      {/* ------------------------------------------------- Before Animated Contents Part --------------------------------------------- */}

      {ContentsTranslation && (
        <View style={styles.beforeAnimated}>
          <AwesomeButton {...undefined} onPress={onPress1} width={300}>
            <Text>Get Started</Text>
          </AwesomeButton>
        </View>
      )}
      {/* ------------------------------------------------- Before Animated Contents Part --------------------------------------------- */}

      {/* ------------------------------------------------- After Animated Contents Part --------------------------------------------- */}
      {!ContentsTranslation && (
        <View style={styles.afterAnimated}>
          <TextInput
            style={styles.textinput}
            placeholder="Search Movies"
            onChangeText={(text) => setSearch(text)}
            autoComplete={undefined}
          />
          <View>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text style={{ fontSize: 26 }}>{data.Title}</Text>
              <Text>{data.Year}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                <Image
                  style={styles.posterImage}
                  source={{ uri: data.Poster }}
                />
              </TouchableOpacity>
            </View>
            <Text>Click images to see details</Text>
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
                  <Text>{data.Title}</Text>

                  <AwesomeButton
                    {...undefined}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text>Got it</Text>
                  </AwesomeButton>
                </View>
              </View>
            </Modal>
            {/* ------------------------------------------------- Modal Part End --------------------------------------------- */}
          </View>
        </View>
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
    backgroundColor: "#000000",
    flex: 1,
    left: 0,
    right: 0,
    top: 0,
  },
  title: { textAlign: "center", marginTop: 16, fontSize: 40 },
  animated: {
    backgroundColor: "#4b0082",
    justifyContent: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
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
    backgroundColor: "#6A5ACD",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  afterAnimated: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#6A5ACD",
  },
  textinput: {
    margin: 20,
    borderRadius: 10,
    borderTopStartRadius: 10,
    borderTopEndRadius: 10,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    width: "90%",
    height: "60%",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
