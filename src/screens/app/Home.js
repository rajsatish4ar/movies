import React from 'react';
import {View, Text, Alert, StyleSheet, FlatList,ActivityIndicator} from 'react-native';
import {container} from '../../const/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {doLogout, setAuthState} from '../../redux/auth/Actions';
import {getMovies, setAppState} from '../../redux/app/Actions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTheme} from '@react-navigation/native';
import MovieCarItem from '../../comps/MovieCardtem';
import EmptyList from '../../comps/EmptyList';
const Home = (props) => {
  const {colors = {}} = useTheme();
  const dispatch = useDispatch();
  const showAlert = () => {
    Alert.alert('', 'Wanna logout ??', [
      {
        text: 'Yes',
        onPress: () => dispatch(doLogout()),
      },
      {
        text: 'Cancel',
        onPress: null,
      },
    ]);
  };

  React.useEffect(() => {
    dispatch(getMovies())
  }, []);
  const name = useSelector((_) => _?.auth?.name ?? 'User');
  const theme = useSelector((_) => _?.auth?.theme ?? 'dark');
  const movies = useSelector((_) => _?.app?.movies ?? []);
  const loading = useSelector((_) => _?.app?.loadinga ?? true);
  const genre = useSelector((_) => _?.app?.genre ?? {});
  const isDark = theme === 'dark';
  return (
    <View style={[container, {justifyContent: null}]}>
      <View style={styles.header}>
        <Text
          style={[styles.headerText, {color: colors.text}]}
          numberOfLines={1}>{`Hey, ${name}`}</Text>
        <Icon name="brightness-4" style={[styles.icon, {color: colors.text}]} 
        onPress={()=>dispatch(setAuthState({theme:isDark?'light':'dark'}))}
        />
        <Icon name="logout" style={[styles.icon, {color: colors.primary}]} 
        onPress={()=>showAlert()}
        />
      </View>
      <FlatList
        data={movies}
        style={{width: '100%'}}
        initialNumToRender={12}
        maxToRenderPerBatch={8}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => `TODO${index}`}
        onEndReachedThreshold={4}
        onEndReached={()=>dispatch(getMovies())}
        renderItem={(d) => (
          <MovieCarItem
            {...d}
            colors={colors}
            onPress={(movie) => {
              dispatch(setAppState({movie}))
              props.navigation.navigate('Details')
            }}
            genre={genre}
          />
        )}
        ListFooterComponentStyle={()=><ListFooter loading={loading}
        colors={colors}
        />}
        ListEmptyComponent={()=><EmptyList colors={colors}/>}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerText: {flex: 1, fontSize: 18, fontWeight: '600'},
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: 46,
  },
  icon: {fontSize: 24, marginHorizontal: 12},
});
