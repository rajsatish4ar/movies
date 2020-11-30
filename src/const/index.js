import database from '@react-native-firebase/database';
export const APP_FLOW = {
    SPLASH: 0,
    LOGIN: 1,
    APP: 2,
    OFFLINE: 3,
  };
  
  export const APP_ICON=require('../../assets/AppIcon.png')

  export const KEYS = {
    EMAIL:'EMAIL',
    NAME:'NAME',
    PASSWORD:'PASSWORD',
    UUID:'UUID'

  }

  export const APIKEY = "448eb92c5041a3236bbc7aa9dacba20a"
  export const dbRef = database().ref('/movies');