import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {container} from '../const/Styles';
const EmptyList = (props) => {
    const {colors={}} = props
  return (
    <View style={{...container, justifyContent: 'center'}}>
      <Icon name="format-list-bulleted" style={[styles.icon,{color:colors.primary}]} />
      <Text style={[styles.text,{color:colors.primary}]}>Empty list</Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({
  icon: {fontSize: 156, marginTop: '33%'},
  text: {fontSize: 36, width: '100%', textAlign: 'center'},
});
