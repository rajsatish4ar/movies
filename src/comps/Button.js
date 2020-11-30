import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Button = (props) => {
  const {colors = {}} = useTheme();
  const {text = 'Submit'} = props;
  const {onPress = () => {}} = props;
  const {btnStyle = {}, textStyle = {}} = props;
  return (
    <TouchableOpacity
      style={[btnStyle, styles.btn, {backgroundColor: colors.primary}]}
      activeOpacity={0.7}
      onPress={() => onPress()}>
      <Text
        numberOfLines={1}
        style={[textStyle, styles.btnText, {color: colors.text}]}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  btnText: {
    fontSize: 16,
    fontWeight: '500',
    width: '100%',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  btn: {
    width: '100%',
    height: 46,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
});
