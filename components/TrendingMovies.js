import { View, Text,Image } from 'react-native'
import React from 'react'
import Carousel from "react-native-snap-carousel";
import { Dimensions } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';


let {width,height} = Dimensions.get('window');

const TrendingMovies = ({data}) => {

    const navigation = useNavigation();
    const handleClick = () =>{
        navigation.navigate('Movie', item);
    }

  return (
    <View className ='mb-8'>
      <Text className='text-white text-xl mx-4 mb-5'>TrendingMovies</Text>
      <Carousel
      data={data}
      renderItem={({item})=> <MovieCard item = {item} handleClick={handleClick} />}
      firstItem={1}
      inactiveSlideOpacity={0.60}
      sliderWidth={width}
      itemWidth={width*0.62}
      slideStyle={{display:'flex', alignItems:'center'}}
      />
    </View>
  )
}

export default TrendingMovies

const MovieCard = ({item,handleClick}) => {
    return(
        <TouchableWithoutFeedback onPress={handleClick}>
            <Image
            source ={require("../assets/images/moviePoster1.png")}
            style = {{
                width: width*0.6,
                height : height*0.4
            }}
            className="rounded-3xl" 
            />
        </TouchableWithoutFeedback>
    )
}