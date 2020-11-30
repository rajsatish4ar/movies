import React from 'react'
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/app/Home'
import Details from '../screens/app/Details'
import NetInfo from '@react-native-community/netinfo';
import {APP_FLOW} from '../const'
import {useDispatch} from 'react-redux'
import {setAuthState} from '../redux/auth/Actions'
const Stack = createStackNavigator();
const Route = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (!state.isConnected)
        dispatch(setAuthState({appFlow: APP_FLOW.OFFLINE}));
    });
    return () => unsubscribe();
  }, [dispatch]);
    return (
        <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
      </Stack.Navigator>
      )
}

export default Route
