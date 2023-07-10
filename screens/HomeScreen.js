import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Platform } from "react-native";
import { StatusBar } from "expo-status-bar";
import {
  Bars3CenterLeftIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { styles } from "../theme";
import { Touchable } from "react-native";
import { TouchableOpacity } from "react-native";
import { ScrollView } from "react-native";
import TrendingMovies from "../components/TrendingMovies";
import MovieList from "../components/MovieList";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from "../api/movieDb";

const ios = Platform.OS == "ios";
const HomeScreen = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([])
  const[loading, setLoading] = useState(true);

  const navigation = useNavigation();

  useEffect(()=> {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies();
    if(data && data.results) setTrending(data.results) 
    setLoading(false);
  }

  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies();
    if(data && data.results)  setUpcoming(data.results)
  }

  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if(data && data.results) setTopRated(data.results) 
    setLoading(false);
  }

  return (
    <View className="flex-1 bg-neutral-800">
      {/* SearchBar and Logo */}
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row mx-4 justify-between items-center">
          <Bars3CenterLeftIcon color="white" size="30" strokeWidth={2} />
          <Text className="text-white text-3xl font-bold">
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=>navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        loading?(
          <Loading/>
        ):(
          <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 10 }}
        >
          {/* Trending movies carousel */}
          {trending.length>0 &&<TrendingMovies data={trending} />}
  
          {/* upcoming movies carousel */}
          <MovieList title="Upcoming" data={upcoming}/>
  
          {/* Top Rated Movies */}
          <MovieList title="Top Rated" data ={topRated}/>
        </ScrollView>
        )
      }
    </View>
  );
};

export default HomeScreen;
