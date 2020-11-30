import React from 'react';
import {StatusBar} from 'react-native';
// navigation things
import {NavigationContainer, useTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
// global content
import {navigationRef, loaderRef, toastRef} from '../utils/Root';

// them and redux
import {useSelector} from 'react-redux';
import {ThemeLight, ThemeDark} from '../const/Colors';
// screens
import {APP_FLOW} from '../const';
import Splash from '../screens/auth/Splash';
import Login from '../screens/auth/Login';
import App from './Route';
import Offline from '../screens/app/Offline';

// comps
import AppLoader from '../comps/AppLoader';
import AppToast from '../comps/AppToast';
const Stack = createStackNavigator();

const getFlow = (flow = APP_FLOW.LOGIN) => {
  if (flow === APP_FLOW.OFFLINE) {
    return <Stack.Screen name="Offline" component={Offline} />;
  }
  return <Stack.Screen name="Auth" component={Login} />;
};
const NavHome = () => {
  const theme = useSelector((_) => _?.auth?.theme ?? 'dark');
  const {colors} = useTheme();
  const flow = useSelector((_) => _?.auth?.appFlow ?? APP_FLOW.SPLASH);
  const isDark = theme === 'dark';
  if (flow === APP_FLOW.SPLASH) {
    return <Splash theme={isDark ? ThemeDark : ThemeLight} />;
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
          <NavigationContainer
            ref={navigationRef}
            theme={isDark ? ThemeDark : ThemeLight}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              {flow == APP_FLOW.APP ? (
                <Stack.Screen name="App" component={App} />
              ) : (
                getFlow(flow)
              )}
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </SafeAreaProvider>
      <StatusBar barStyle={!isDark ? 'light-content' : 'dark-content'} />
    </>
  );
};

const Root = (props) => {
  const {colors} = useTheme();
  return (
    <>
      <NavHome {...props} />
      <AppToast ref={toastRef} colors={colors} />
      <AppLoader ref={loaderRef} colors={colors} />
    </>
  );
};
export default Root;
