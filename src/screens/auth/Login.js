import {useTheme} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {container} from '../../const/Styles';
import MyTextInput from '../../comps/TextInput';
import Button from '../../comps/Button';
import {useDispatch, useSelector} from 'react-redux';
import {reduxForm, Field, SubmissionError} from 'redux-form';
import {setAuthState, emailLogin} from '../../redux/auth/Actions';
import {
  isValueNullOrEmpty,
  isNameValid,
  isEmailValid,
} from '../../utils/Validations';
import {
  VALID_NAME,
  VALID_PASS,
  SAME_PASS,
  VALID_EMAIL,
} from '../../const/Strings';
const Login = (props) => {
  const {colors = {}} = useTheme();
  const dispatch = useDispatch();
  const isLogin = useSelector((_) => _?.auth?.wannaLogin ?? true);
  const {handleSubmit} = props;
  const submit = (values) => {
    const {name, email, password, pass} = values ?? {};
    const payload = {isLogin};

    if (isLogin) {
      //    login
      if (isValueNullOrEmpty(email) || !isEmailValid(email)) {
        throw new SubmissionError({email: VALID_EMAIL});
      }
      if (isValueNullOrEmpty(password) || password.length < 5) {
        throw new SubmissionError({password: VALID_PASS});
      }
      payload.email = String(email).trim();
      payload.password = String(password).trim();
    } else {
      // sign up
      if (isValueNullOrEmpty(name) || !isNameValid(name)) {
        throw new SubmissionError({name: VALID_NAME});
      }

      if (isValueNullOrEmpty(email) || !isEmailValid(email)) {
        throw new SubmissionError({email: VALID_EMAIL});
      }
      if (isValueNullOrEmpty(password) || password.length < 5) {
        throw new SubmissionError({password: VALID_PASS});
      }
      if (isValueNullOrEmpty(pass) || pass.length < 5) {
        throw new SubmissionError({pass: VALID_PASS});
      }
      if (password != pass) throw new SubmissionError({pass: SAME_PASS});
      payload.name = String(name).trim();
      payload.email = String(email).trim();
      payload.password = String(password).trim();
    }
    dispatch(emailLogin({payload}));
  };
  return (
    <View style={[container, {backgroundColor: colors.background}]}>
      {!isLogin && (
        <Field
          name="name"
          component={MyTextInput}
          placeholder="Enter name"
          label="Full Name"
        />
      )}
      <Field
        name="email"
        component={MyTextInput}
        placeholder="Enter Email"
        label="Email"
      />
      <Field
        name="password"
        secureTextEntry={true}
        component={MyTextInput}
        placeholder="Enter Password"
        label="Password"
      />
      {!isLogin && (
        <Field
          name="pass"
          secureTextEntry={true} 
          component={MyTextInput}
          placeholder="Re-Enter Password"
          label="Password"
        />
      )}
      <Button
        onPress={handleSubmit(submit)}
        text={isLogin ? 'Login' : 'Create Account'}
        btnStyle={{marginTop: 24}}
      />

      <Text
        numberOfLines={1}
        style={[styles.account, {color: colors.primary}]}
        onPress={() => dispatch(setAuthState({wannaLogin: !isLogin}))}>
        {!isLogin ? 'Want to Login ?' : 'Create new account...'}
      </Text>
    </View>
  );
};
export default reduxForm({form: 'auth'})(Login);

const styles = StyleSheet.create({
  account: {
    width: '100%',
    textAlign: 'left',
    fontSize: 18,
  },
});
