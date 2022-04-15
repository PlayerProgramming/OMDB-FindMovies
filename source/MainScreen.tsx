import React, { useState, useEffect, useRef } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Animated,
  SafeAreaView,
  Image,
} from "react-native";
import AwesomeButton from "react-native-really-awesome-button";
import { TextInput } from "react-native-paper";

interface Props {
  children: JSX.Element[] | JSX.Element;
}

export default function MainScreen(): React.ReactNode {
  const Titletranslation = useRef(new Animated.Value(0.8)).current;
  const [ContentsTranslation, setContentsTranslation] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState({ Title: "", Year: "", Poster: "" });
  const [search, setSearch] = useState("");
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
    <SafeAreaView style={[styles.container, { backgroundColor: "pink" }]}>
      <Animated.View
        style={{
          flex: Titletranslation,
          backgroundColor: "green",
          justifyContent: "center",
          borderBottomLeftRadius: 50,
          borderBottomRightRadius: 50,
        }}
      >
        <Text style={{ textAlign: "center" }}>
          "OMDB" {"\n"} Find Movies! {"\n"}
        </Text>
      </Animated.View>

      {ContentsTranslation && (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "grey",
          }}
        >
          <AwesomeButton {...undefined} onPress={onPress1} width={300}>
            <Text>Get Started</Text>
          </AwesomeButton>
        </View>
      )}
      {!ContentsTranslation && (
        <View
          style={{
            flex: 1,
            borderTopLeftRadius: 50,
            borderTopRightRadius: 50,
            backgroundColor: "grey",
          }}
        >
          <TextInput
            style={{
              margin: 20,
              borderRadius: 100,
              borderTopStartRadius: 100,
              borderTopEndRadius: 100,
            }}
            placeholder="Search Movies"
            onChangeText={(text) => setSearch(text)}
            autoComplete={undefined}
          />

          <View>
            <View style={{ alignItems: "center", margin: 10 }}>
              <Text style={{ fontSize: 30 }}>{data.Title}</Text>
              <Text>{data.Year}</Text>
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginVertical: 10,
              }}
            >
              <Image
                style={{
                  width: 250,
                  height: 400,
                  borderRadius: 30,
                  marginBottom: 15,
                }}
                source={{ uri: data.Poster }}
              />
            </View>
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
});
