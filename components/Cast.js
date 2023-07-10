import {
  View,
  Text,
  ScrollView,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { fallbackPersonImage, image185 } from "../api/movieDb";

const Cast = ({ cast }) => {
  const navigation = useNavigation();
  let original_name = "keanu Reevs";
  let character = "John wick";
  return (
    <View className="my-6">
      <Text className="text-white text-lg mx-4 mb-5">Top Cast</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {
          // another way of doing this...
          // {cast.length ? (
          //     cast.map((person, index) => {
          //       // Render cast member item components
          //     })
          //   ) : (
          //     <Text>No cast members available</Text>
          //   )}

          cast &&
            cast.map((person, index) => {
              return (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Person", person)}
                  key={index}
                  className="mr-4 items-center"
                >
                  <View className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500">
                    <Image
                      className="rounded-2xl h-24 w-20"
                      source={{uri:image185(person?.profile_path)||fallbackPersonImage}}
                      // source={require("../assets/images/castImage1.png")}
                    />
                  </View>
                  <Text className="text-white text-xs mt-1">
                    {person?.character.length > 10
                      ? person?.character.slice(0, 10) + "..."
                      : person?.character}
                  </Text>
                  <Text className="text-neutral-400 text-xs mt-1">
                    {person?.original_name.length > 10
                      ? person?.original_name.slice(0, 10) + "..."
                      : person?.original_name}
                  </Text>
                </TouchableOpacity>
              );
            })
        }
      </ScrollView>
    </View>
  );
};

export default Cast;
