import {useTheme} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, TextInput, View, Text} from 'react-native';
const MyTextInput = (props) => {
  const {colors = {}} = useTheme();
  const {
  
    label,
    editable,
    meta: {touched, error, warning, active},
    meta,
    placeholder,
    input,
    style = {},
    ...inputProps
  } = props;
  const { input : inp, ...otherProps } = props;
  const isError = touched && (error || warning);
  const errorMsg = error ? error : warning ? warning : '';
  return (
    <View style={styles.container}>
      {label && (
        <View style={styles.labelContainer}>
          <Text style={[styles.labelText, {color: colors.text}]}>{label}</Text>
        </View>
      )}
      <TextInput
        style={[
          styles.input,
          {
            color: colors.text,
            borderBottomWidth: 1,
            borderBottomColor: isError
              ? 'red'
              : active
              ? colors.primary
              : colors.grey,
          },

          style,
        ]}
        
        defaultValue={`${input.value?input.value:''}`}
        {...otherProps}
        onBlur={input.onBlur}
        onFocus={input.onFocus}
        onChangeText={(a)=>input.onChange(a)}
        underlineColorAndroid="transparent"
        placeholder={placeholder}
        autoCapitalize="none"
        placeholderTextColor={colors.grey}
      />
      {isError && (
        <Text style={[styles.errorText, {color: colors.primary}]}>
          {errorMsg}
        </Text>
      )}
    </View>
  );
};

export default MyTextInput;

const styles = StyleSheet.create({
  errorIcon: {fontSize: 18, color: 'red'},
  labelContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    width: '100%',
    textAlign: 'left',
    fontSize: 15,
  },

  errorText: {
    width: '100%',
    textAlign: 'right',
    color: 'red',
    fontSize: 12,
    marginTop: 3,
  },
  input: {
    fontSize: 17,
    paddingVertical: 10,
    borderRadius: 4,
    width: '100%',
    paddingHorizontal: 0,
  },
  container: {
    width: '100%',
    borderRadius: 6,
    height: 60,
    marginVertical: 10,
  },
});
