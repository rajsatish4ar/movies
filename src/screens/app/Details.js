import React from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {container} from '../../const/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {useTheme} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getImageURL} from '../../utils/Request';
import StarRating from 'react-native-star-rating';
import {isValueNullOrEmpty} from '../../utils/Validations';
import {setAppState} from '../../redux/app/Actions';
const {width, height} = Dimensions.get('screen');
const Details = (props) => {
  const {colors = {}} = useTheme();
  const dispatch = useDispatch();
  const genre = useSelector((_) => _?.app?.genre ?? {});
  const movie = useSelector((_) => _.app?.movie ?? {});
  const title = movie?.title ?? 'N/A';
  const poster_path = movie?.poster_path ?? '';
  const image = getImageURL(poster_path, 'original');
  const vote_average = movie?.vote_average ?? 0;
  const release_date = movie?.release_date ?? 'N/A';
  const overview =movie?.overview ??'N/A';
  const genre_ids = movie?.genre_ids ?? [];
  const genreText = [];
  genre_ids.map((it, i) => {
    if (genre[it]) genreText.push(genre[it]);
  });
  const genreNames = genreText;
  React.useEffect(()=>{
    return ()=>dispatch(setAppState({movie:undefined}))
  },[])
  return (
    <View style={[container, {padding: 0}]}>
      <Icon
        name="arrow-left"
        style={[styles.icon, {color: 'black'}]}
        onPress={() => props.navigation.goBack()}
      />
      <ScrollView
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: image}}
            style={styles.image}
            resizeMode="stretch"
          />
        </View>
        <View style={{flex: 1, padding: 16}}>
          <Text style={[styles.name, {color: colors.text}]}>{title}</Text>
          <Text style={[styles.headLable,{color:colors.text}]}>{'Release Date -'}</Text>
          <Text
            style={[
              styles.date,
              {color: colors.text},
            ]}>{`Release Date - ${release_date}`}</Text>
             <Text style={[styles.headLable,{color:colors.text}]}>{'Genre -'}</Text>
          <Text style={{color: colors.text}}>
            {!isValueNullOrEmpty(genreNames) ? genreNames : 'N/A'}
          </Text>
          

          <Text style={[styles.headLable,{color:colors.text}]}>{'Overview  -'}</Text>
          <Text
            numberOfLines={3}
            style={[styles.details, {color: colors.text}]}>
            {overview}
          </Text>
          <Text style={[styles.headLable,{color:colors.text,marginBottom: 8,}]}>{'Rating  -'}</Text>
          <StarRating
            disabled={true}
            maxStars={5}
            rating={Number(vote_average)/2}
            fullStarColor={colors.rating}
            emptyStarColor="grey"
            halfStarColor={colors.rating}
            starSize={34}
            containerStyle={{width: '80%'}}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  headLable: {fontSize: 16, opacity:0.4, marginTop: 16},
  details: {marginVertical: 8, fontSize: 18, lineHeight: 28},
  date: {fontSize: 18},
  name: {fontSize: 30, fontWeight: '700'},

  list: {width},
  imageContainer: {width, height: height * 0.7},
  image: {width: null, height: null, flex: 1},
  overlay: {
    width,
    height: height * 0.7,
    position: 'absolute',
    zIndex: 1000,
    backgroundColor: 'rgba(1,1,1,0.1)',
  },
  headerText: {flex: 1, fontSize: 18, fontWeight: '600', marginHorizontal: 8},
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 36,
  },
  icon: {fontSize: 34, position: 'absolute', top: 10, zIndex: 1000, left: 16},
});
