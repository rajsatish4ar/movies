import React from 'react';
import {View, ActivityIndicator} from 'react-native';

const ListFooter = (props) => {
  const {loading, colors = {}} = props;
  if (!loading) return null;
  return (
    <View style={{width: '100%', marginVertical: 16}}>
      <ActivityIndicator color={colors.primary} size="large" />
    </View>
  );
};

export default ListFooter;
