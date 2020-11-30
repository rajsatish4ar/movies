import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {APP_ICON} from '../../const';
import {container} from '../../const/Styles';
import {useDispatch} from 'react-redux'
import {verifyLogin} from '../../redux/auth/Actions'
const Splash = (props) => {
  const {colors = {}} =props?.theme??{}
  const dispatch = useDispatch()
  const [anim] = React.useState(new Animated.Value(0));
  React.useEffect(() => {
    anim.setValue(0);
    Animated.spring(anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);

  React.useEffect(()=>{
    dispatch(verifyLogin())
  },[])

  const scale = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [3, 1],
  });
  return (
    <View style={[container, {backgroundColor: colors.background}]}>
      <Animated.Image
        source={APP_ICON}
        style={[
          styles.image,
          {
            transform: [
              {
                scale,
              },
            ],
          },
        ]}
      />
      <Text style={[styles.text,{color:colors.text}]}>{'Initializing ...'}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  text: {position: 'absolute', bottom: '10%', fontSize: 18, fontWeight: '600'},
  image: {width: 120, height: 120},
});
