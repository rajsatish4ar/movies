import { useTheme } from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../../comps/Button';
import { container } from '../../const/Styles';
import {tryOnlineAgain} from '../../redux/app/Actions'
import {useDispatch} from 'react-redux';
const Offline = (props) => {
    const {colors={}} = useTheme()
    const dispatch = useDispatch();

  return (
    <View style={{...container,backgroundColor:colors.background}}>
      <Icon
        name="wifi-strength-off-outline"
        style={{fontSize: 156,color:colors.primary}}
      />
      <Text style={{fontSize:32 ,marginTop: 24,color:colors.primary}}>No Internet</Text>
       <Button
       text="Try Again"
       btnStyle={{marginTop: 36,}}
       onPress={()=>{dispatch(tryOnlineAgain())}}
       /> 
    </View>
  );
};

export default Offline;
