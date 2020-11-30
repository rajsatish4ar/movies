import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Animated} from 'react-native';
const {width} = Dimensions.get('screen');
class AppToast extends Component {
  constructor(props) {
    super(props);
    this.state = {msg: ''};
    this.anim = new Animated.Value(0);
  }
  show = (msg = 'Something went wrong, Try again', type = 1) => {
    this.anim.setValue(0);
    this.setState({msg, type});
    Animated.spring(this.anim, {
      toValue: 1,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        this.hide();
      }, 2000);
    });
  };
  hide = () => {
    Animated.spring(this.anim, {
      toValue: 0,
      useNativeDriver: true,
    }).start(() => {
      this.setState({msg: undefined, type: 1});
    });
  };
  render() {
    
    const {msg, type} = this.state;
    if (!msg) {
      return null;
    }
    const y = this.anim.interpolate({
      inputRange: [0, 1],
      outputRange: [100, -100],
    });
    const {colors={}} = this.props
    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [
              {
                translateY: y,
              },
            ],
          },
        ]}>
        <View
          style={{
            padding: 10,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primary,
          }}>
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
              },
            ]}>
            {msg}
          </Text>
        </View>
      </Animated.View>
    );
  }
}

export default AppToast;

const styles = StyleSheet.create({
  text: {
    width: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
    color: 'black',
  },
  container: {
    width: width - 32,
    height: 52,
    position: 'absolute',
    marginHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
});
