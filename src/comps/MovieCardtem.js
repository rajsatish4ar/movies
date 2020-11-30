import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {getImageURL} from '../utils/Request';
import StarRating from 'react-native-star-rating';
import {isValueNullOrEmpty} from '../utils/Validations';
const MovieCardtem = (props) => {
  const {item = {}, colors = {}} = props;
  const {genre = {}} = props;
  const {onPress = () => {}} = props;
  const title = item?.title ?? 'N/A';
  const poster_path = item?.poster_path ?? '';
  const image = getImageURL(poster_path, 'original');
  const vote_average = item?.vote_average ?? 0;
  const release_date = item?.release_date ?? 'N/A';
  const overview = item?.overview ?? 'N/A';
  const genre_ids = item?.genre_ids ?? [];
  const genreText = [];
  genre_ids.map((it, i) => {
    if (genre[it]) genreText.push(genre[it]);
  });
  const genreNames = genreText;
  return (
    <TouchableOpacity
      style={[styles.card, {backgroundColor: colors?.cardbg}]}
      activeOpacity={0.7}
      onPress={() => onPress(item)}>
      <View style={styles.imageContainer}>
        <Image source={{uri: image}} style={styles.image} resizeMode="center" />
      </View>
      <View style={styles.content}>
        <Text style={[styles.name, {color: colors.text}]}>{title}</Text>
        <Text
          style={[styles.date, {color: colors.text}]}>{`${release_date}`}</Text>
        <Text style={{color: colors.text}}>
          {!isValueNullOrEmpty(genreNames) ? genreNames : 'N/A'}
        </Text>

        <Text numberOfLines={2} style={{marginVertical: 8, color: colors.text}}>
          {overview}
        </Text>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={Number(vote_average)/2}
          fullStarColor={colors.rating}
          emptyStarColor="grey"
          halfStarColor={colors.rating}
          starSize={24}
          containerStyle={{width: '70%'}}
        />
      </View>
    </TouchableOpacity>
  );
};

export default MovieCardtem;

const styles = StyleSheet.create({
  date: {fontSize: 14, marginVertical: 8},
  name: {fontSize: 18, fontWeight: '700'},
  content: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
  },
  imageContainer: {height: 180, width: 150, borderRadius: 6},
  image: {
    height: undefined,
    width: undefined,
    flex: 1,
    borderRadius: 6,
  },
  card: {
    height: 200,
    width: '100%',
    marginVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    flexDirection: 'row',
  },
});
